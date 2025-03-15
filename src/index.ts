import express from "express";
import downloadController from "@/controllers/download";

const app = express();

/**
 * GET /download?filename=***
 */
app.use("/download", downloadController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
