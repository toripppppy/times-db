import downloadService from "@/services/download";
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

/**
 * GET /download?key=***
 */
router.get("/download", async (req: Request, res: Response) => {
  const { key } = req.query;

  if (typeof key === "string") {
    const fileStream = await downloadService(key);

    if (fileStream) {
      res.attachment(key);

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
