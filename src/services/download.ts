import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import s3Client from "./s3-client";

async function download(filename: string): Promise<Readable> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
  };

  // S3からファイルをダウンロードする
  const result = await s3Client.send(new GetObjectCommand(params));

  // BodyがReadableStreamの場合はそのまま返す
  if (result.Body instanceof Readable) {
    return result.Body;
  }

  // それ以外はエラー
  throw new Error("Unexpected response body type");
}

export default download;
