import express from "express";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// S3 を操作するためのインスタンスを生成
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_S3_REGION,
});

/**
 * GET /download?filename=***
 */
app.get("/download", async (req, res) => {
  const { filename } = req.query;

  // ブラウザにダウンロードダイアログを表示させるための
  // レスポンスヘッダーを付与
  res.attachment(filename);

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filename,
  };

  // S3からダウンロードしたファイルの内容を
  // ストリームオブジェクトに変換し、レスポンスに書き込む
  const result = await s3.send(new GetObjectCommand(params));

  const readableObj = result.Body;

  //readableObjをresに少しづつ書き込む
  readableObj.pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
