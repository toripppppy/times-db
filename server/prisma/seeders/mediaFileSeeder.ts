import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MediaFileSeeder {
  async seed() {
    const test1 = await prisma.mediaFile.create({
      data: {
        filename: "test1.wav",
        mimeType: "audio/wav",
        s3Key: "aaaaa.wav",
      },
    });
    const test2 = await prisma.mediaFile.create({
      data: {
        filename: "test1.wav",
        mimeType: "audio/wav",
        s3Key: "aaaaa.wav",
      },
    });
    const test3 = await prisma.mediaFile.create({
      data: {
        filename: "test1.wav",
        mimeType: "audio/wav",
        s3Key: "aaaaa.wav",
      },
    });
  }
}

export default new MediaFileSeeder();
