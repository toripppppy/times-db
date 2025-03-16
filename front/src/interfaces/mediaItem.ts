import mediaFile from "./mediaFile";

interface MediaItem {
  id: number;

  mediaFileId: number;
  mediaFile: mediaFile;

  comment: string;

  createdAt: string;
  updatedAt: string;
}

export default MediaItem;
