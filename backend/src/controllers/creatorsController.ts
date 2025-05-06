import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

interface ListCreatorsRequest extends Request {}
interface ListCreatorsResponse extends Response {}

export async function listCreators(
  req: ListCreatorsRequest,
  res: ListCreatorsResponse
): Promise<void> {
  const creators = await prisma.creator.findMany();
  res.json(creators);
}
