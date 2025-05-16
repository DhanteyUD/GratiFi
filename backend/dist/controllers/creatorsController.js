"use strict";
// import { PrismaClient } from "@prisma/client";
// import { Request, Response } from "express";
// const prisma = new PrismaClient();
// interface ListCreatorsRequest extends Request {}
// interface ListCreatorsResponse extends Response {}
// interface CreateCreatorRequest extends Request {
//   body: {
//     name: string;
//     address: string;
//   };
// }
// interface CreateCreatorResponse extends Response {}
// export async function createCreator(
//   req: CreateCreatorRequest,
//   res: CreateCreatorResponse
// ): Promise<void> {
//   const { name, address } = req.body;
//   try {
//     const creator = await prisma.creator.create({
//       data: { name, address },
//     });
//     res.status(201).json(creator);
//   } catch (err) {
//     res.status(400).json({ error: "Creator already exists or invalid data" });
//   }
// }
// export async function listCreators(
//   req: ListCreatorsRequest,
//   res: ListCreatorsResponse
// ): Promise<void> {
//   const creators = await prisma.creator.findMany();
//   res.json(creators);
// }
