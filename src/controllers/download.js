import downloadService from "../services/download.js";

async function download(req, res) {
  const { filename } = req.query;

  res.attachment(filename);

  const fileStream = await downloadService(filename);

  fileStream.pipe(res);

  fileStream.on("error", (err) => {
    res.status(500).send({ error: err });
  });
}

export default download;
