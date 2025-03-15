import { S3Client } from "@aws-sdk/client-s3";
import "dotenv/config";

const { AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY, AWS_S3_REGION } = process.env;

if (!AWS_ACCESS_KEY || !AWS_SECRET_ACCESS_KEY || !AWS_S3_REGION) {
  throw new Error("AWS credentials or region are missing");
}

// S3 を操作するためのインスタンスを生成
const s3Client = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
  region: "ap-northeast-1",
});

export default s3Client;
