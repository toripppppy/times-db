import dotenv from "dotenv";
import s3Client from "./s3-client.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";

dotenv.config();

async function download(filename) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
  };

  // S3からファイルをダウンロードするストリームを取得して返す
  const result = await s3Client.send(new GetObjectCommand(params));

  return result.Body;
}

export default download;
