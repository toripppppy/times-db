import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const test1 = await prisma.audio.create({
    data: {
      filename: "test1.wav",
      filetype: "WAV",
      uuid: "aaaaa",
    },
  });
  const test2 = await prisma.audio.create({
    data: {
      filename: "test2.wav",
      filetype: "WAV",
      uuid: "bbbbb",
    },
  });
  const test3 = await prisma.audio.create({
    data: {
      filename: "test3.mp3",
      filetype: "MP3",
      uuid: "ccccc",
    },
  });
}

main();
