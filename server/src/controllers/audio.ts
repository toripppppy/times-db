import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const allAudios = await prisma.audio.findMany();
  console.log(allAudios);

  res.send(allAudios.toString());
});

export default router;
