-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_media_items" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comment" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "mediaFileId" INTEGER NOT NULL,
    CONSTRAINT "media_items_mediaFileId_fkey" FOREIGN KEY ("mediaFileId") REFERENCES "media_files" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_media_items" ("comment", "created_at", "id", "mediaFileId", "updated_at") SELECT "comment", "created_at", "id", "mediaFileId", "updated_at" FROM "media_items";
DROP TABLE "media_items";
ALTER TABLE "new_media_items" RENAME TO "media_items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
