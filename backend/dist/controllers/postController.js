"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPostsByUserId = exports.getMyPosts = exports.getPosts = exports.createPost = void 0;
const formidable_1 = __importDefault(require("formidable"));
const cloudinary_1 = require("cloudinary");
const client_1 = require("@prisma/client");
const auth_1 = require("../lib/auth");
const config_1 = require("../config");
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
cloudinary_1.v2.config({
    cloud_name: config_1.configKeys.cloudinaryName,
    api_key: config_1.configKeys.cloudinaryApiKey,
    api_secret: config_1.configKeys.cloudinaryApiSecret,
});
const MAX_CHAR_LIMIT = {
    GratiFan: 280,
    GratiStar: 25000,
};
const uploadToCloudinary = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.v2.uploader.upload(filePath, {
        folder: "posts",
        resource_type: "auto",
    });
    return result.secure_url;
});
// POST:
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method !== "POST")
        return res.status(405).end("Method Not Allowed");
    const user = (yield (0, auth_1.getAuthUser)(req));
    if (!user)
        return res.status(401).json({ error: "Unauthorized" });
    const form = (0, formidable_1.default)({ multiples: true, keepExtensions: true });
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ error: "Invalid form data" });
        }
        const text = Array.isArray(fields.text)
            ? fields.text.join(" ")
            : fields.text || "";
        const audience = Array.isArray(fields.audience)
            ? fields.audience[0]
            : typeof fields.audience === "string"
                ? fields.audience
                : "everyone";
        const scheduledAt = fields.scheduledAt
            ? new Date(Array.isArray(fields.scheduledAt)
                ? fields.scheduledAt[0]
                : fields.scheduledAt)
            : null;
        const charLimit = MAX_CHAR_LIMIT[user.user_type];
        if (text.length > charLimit) {
            return res.status(400).json({
                error: `Text exceeds limit of ${charLimit} characters for ${user.user_type}`,
            });
        }
        const mediaFiles = Array.isArray(files.media)
            ? files.media
            : files.media
                ? [files.media]
                : [];
        const mediaUrls = [];
        for (const file of mediaFiles) {
            const uploadedUrl = yield uploadToCloudinary(file.filepath);
            mediaUrls.push(uploadedUrl);
            fs_1.default.unlinkSync(file.filepath);
        }
        const now = new Date();
        const isPublished = !scheduledAt || scheduledAt <= now;
        const post = yield prisma.post.create({
            data: {
                text,
                audience,
                media: mediaUrls,
                scheduledAt,
                createdAt: now,
                isPublished,
                author: {
                    connect: { id: user.id },
                },
            },
            include: {
                author: true,
            },
        });
        return res.status(201).json({
            message: "Your post was sent.",
            data: post,
        });
    }));
});
exports.createPost = createPost;
// GET:
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method !== "GET")
        return res.status(405).end("Method Not Allowed");
    const now = new Date();
    const posts = yield prisma.post.findMany({
        where: {
            OR: [{ scheduledAt: null }, { scheduledAt: { lte: now } }],
            isPublished: true,
        },
        include: {
            author: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return res.status(200).json({
        message: "Fetched posts successfully",
        posts,
    });
});
exports.getPosts = getPosts;
// GET:
const getMyPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method !== "GET")
        return res.status(405).end("Method Not Allowed");
    const user = yield (0, auth_1.getAuthUser)(req);
    if (!user)
        return res.status(401).json({ error: "Unauthorized" });
    const posts = yield prisma.post.findMany({
        where: {
            authorId: user.id,
        },
        include: {
            author: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return res.status(200).json({
        message: "Fetched your posts successfully",
        posts,
    });
});
exports.getMyPosts = getMyPosts;
// GET:
const getPostsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method !== "GET")
        return res.status(405).end("Method Not Allowed");
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
        return res.status(400).json({ error: "Invalid or missing user ID" });
    }
    const now = new Date();
    const posts = yield prisma.post.findMany({
        where: {
            authorId: userId,
            OR: [{ scheduledAt: null }, { scheduledAt: { lte: now } }],
            isPublished: true,
        },
        include: {
            author: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return res.status(200).json({
        message: `Fetched posts for user ${userId}`,
        posts,
    });
});
exports.getPostsByUserId = getPostsByUserId;
// DELETE:
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method !== "DELETE")
        return res.status(405).end("Method Not Allowed");
    const user = yield (0, auth_1.getAuthUser)(req);
    if (!user)
        return res.status(401).json({ error: "Unauthorized" });
    const { postId } = req.params;
    if (!postId || typeof postId !== "string") {
        return res.status(400).json({ error: "Invalid or missing post ID" });
    }
    const post = yield prisma.post.findUnique({
        where: { id: postId },
    });
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    if (post.authorId !== user.id) {
        return res
            .status(403)
            .json({ error: "You are not allowed to delete this post" });
    }
    yield prisma.post.delete({
        where: { id: postId },
    });
    return res.status(200).json({ message: "Your post was deleted" });
});
exports.deletePost = deletePost;
