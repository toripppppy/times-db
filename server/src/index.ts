import express from "express";
import cors from "cors";

import mediaFileController from "@/controllers/mediaFile";
import MediaItemController from "@/controllers/mediaItem";

const app = express();

app.use(cors());

app.use("/media-file", mediaFileController);
app.use("/media-item", MediaItemController);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
