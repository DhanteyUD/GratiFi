import formidable from "formidable";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@/lib/auth";
import { configKeys } from "@/config";
import fs from "fs";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: configKeys.cloudinaryName!,
  api_key: configKeys.cloudinaryApiKey!,
  api_secret: configKeys.cloudinaryApiSecret!,
});

const MAX_CHAR_LIMIT = {
  GratiFan: 280,
  GratiStar: 25000,
};

const uploadToCloudinary = async (filePath: string): Promise<string> => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "posts",
    resource_type: "auto",
  });
  return result.secure_url;
};

// POST:
const createPost = async (req: Request, res: Response) => {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const user = (await getAuthUser(req)) as {
    id: string;
    name: string;
    email: string;
    picture: string | null;
    user_type: "GratiFan" | "GratiStar";
    createdAt: Date;
    updatedAt: Date;
  } | null;

  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const form = formidable({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
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
      ? new Date(
          Array.isArray(fields.scheduledAt)
            ? fields.scheduledAt[0]
            : fields.scheduledAt
        )
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
    const mediaUrls: string[] = [];

    for (const file of mediaFiles) {
      const uploadedUrl = await uploadToCloudinary((file as any).filepath);
      mediaUrls.push(uploadedUrl);
      fs.unlinkSync((file as any).filepath);
    }

    const now = new Date();
    const isPublished = !scheduledAt || scheduledAt <= now;

    const post = await prisma.post.create({
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
      message: "Post created successfully!",
      data: post,
    });
  });
};

// GET:
const getPosts = async (req: Request, res: Response) => {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

  const now = new Date();

  const posts = await prisma.post.findMany({
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
    data: posts,
  });
};

export { createPost, getPosts };
