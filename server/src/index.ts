import express from "express";
import downloadController from "@/controllers/download";
import AudioController from "@/controllers/audio";

const app = express();

/**
 * GET /download?filename=***
 */
app.use("/download", downloadController);

app.use("/audio", AudioController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
