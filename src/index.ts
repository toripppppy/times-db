import express from "express";
import download from "./controllers/download.js";

const app = express();

/**
 * GET /download?filename=***
 */
app.get("/download", download);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
