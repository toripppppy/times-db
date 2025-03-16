import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MediaItemSeeder {
  async seed() {
    const test1 = await prisma.mediaItem.create({
      data: {
        mediaFileId: 1,
        comment: "機械仕掛けの再革命.mp3です",
      },
    });
    const test2 = await prisma.mediaItem.create({
      data: {
        mediaFileId: 2,
        comment: "test2",
      },
    });
    const test3 = await prisma.mediaItem.create({
      data: {
        mediaFileId: 3,
        comment: "test3",
      },
    });
  }
}

export default new MediaItemSeeder();
