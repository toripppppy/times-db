import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MediaFileSeeder {
  async seed() {
    const test1 = await prisma.mediaFile.create({
      data: {
        filename: "機械仕掛けの再革命.mp3",
        mimeType: "audio/wav",
        s3Key: "機械仕掛けの再革命.mp3",
      },
    });
    const test2 = await prisma.mediaFile.create({
      data: {
        filename: "test2.wav",
        mimeType: "audio/wav",
        s3Key: "aaaaa.wav",
      },
    });
    const test3 = await prisma.mediaFile.create({
      data: {
        filename: "test3.wav",
        mimeType: "audio/wav",
        s3Key: "aaaaa.wav",
      },
    });
  }
}

export default new MediaFileSeeder();
