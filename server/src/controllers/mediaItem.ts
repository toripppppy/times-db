import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const mediaFiles = await prisma.mediaItem.findMany();
  console.log(mediaFiles);

  res.send(mediaFiles.toString());
});

export default router;
