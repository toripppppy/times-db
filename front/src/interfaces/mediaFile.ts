interface mediaFile {
  id: number;
  filename: string;
  mimeType: string;

  s3Key: string;

  createdAt: string;
  updatedAt: string;
}

export default mediaFile;
