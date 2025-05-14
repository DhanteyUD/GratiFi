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

export const config = {
  api: {
    bodyParser: false,
  },
};

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

export const createPost = async (req: Request, res: Response) => {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const user = await getAuthUser(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const form = formidable({ multiples: true, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Failed to parse form data" });
    }

    const text = (fields.text as string) || "";
    const audience = (fields.audience as string) || "public";
    const scheduledAt = fields.scheduledAt
      ? new Date(fields.scheduledAt as string)
      : null;

    const charLimit = MAX_CHAR_LIMIT[user.userType];
    if (text.length > charLimit) {
      return res.status(400).json({
        error: `Text exceeds limit of ${charLimit} characters for ${user.userType}`,
      });
    }

    // Upload all files
    const mediaFiles = Array.isArray(files.media)
      ? files.media
      : files.media
        ? [files.media]
        : [];
    const mediaUrls: string[] = [];

    for (const file of mediaFiles) {
      const uploadedUrl = await uploadToCloudinary((file as any).filepath);
      mediaUrls.push(uploadedUrl);
      fs.unlinkSync((file as any).filepath); // clean up temp
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

    return res.status(201).json(post);
  });
};
