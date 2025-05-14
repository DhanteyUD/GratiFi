// lib/getAuthUser.ts
import jwt from "jsonwebtoken";
import { Request } from "express";
import { PrismaClient } from "@prisma/client";
import { configKeys } from "@/config";

const prisma = new PrismaClient();

export const getAuthUser = async (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized! No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, configKeys.jwtSecret);

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
