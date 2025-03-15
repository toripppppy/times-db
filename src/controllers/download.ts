import downloadService from "@/services/download";
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { filename } = req.query;

  if (typeof filename === "string") {
    const fileStream = await downloadService(filename);

    if (fileStream) {
      res.attachment(filename);

      fileStream.pipe(res);

      fileStream.on("error", (err) => {
        res.status(500).send({ error: err });
      });
    } else {
      // ファイルが存在しない場合のエラーハンドリング
      res.status(404).send({ error: "File not found" });
    }
  }
});

export default router;
