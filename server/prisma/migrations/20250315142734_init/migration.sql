/*
  Warnings:

  - You are about to drop the column `name` on the `audios` table. All the data in the column will be lost.
  - Added the required column `filename` to the `audios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filetype` to the `audios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `audios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_audios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filename" TEXT NOT NULL,
    "filetype" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_audios" ("id", "uuid") SELECT "id", "uuid" FROM "audios";
DROP TABLE "audios";
ALTER TABLE "new_audios" RENAME TO "audios";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
