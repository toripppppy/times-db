import { GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import s3Client from "@/services/s3Client";

async function download(key: string): Promise<Readable> {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
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
