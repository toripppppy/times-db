import downloadService from "../services/download.js";

async function download(req, res) {
  const { filename } = req.query;

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

export default download;
