import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import MediaItem from "../interfaces/mediaItem";
import { useState } from "react";

export default function MediaCard({ media }: { media: MediaItem }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceUrl, setSourceUrl] = useState<string>("");

  const handleLoadMedia = async (id: number, s3Key: string) => {
    if (sourceUrl !== "") return; // 既にロード済みなら何もしない
    setLoading(true); // 読み込み中にする

    try {
      const response = await fetch(
        "http://localhost:8000/media-file/download?key=" + s3Key
      );
      console.log(response);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      setSourceUrl(objectURL);
    } catch (error) {
      console.error("音声ファイルのダウンロードに失敗:", error);
    } finally {
      // 読み込み完了なので読み込み中を外す
      setLoading(false);
    }
  };

  return (
    <Card
      key={media.id}
      sx={{
        mb: 3,
        p: 2,
        textAlign: "center",
        boxShadow: 3,
        borderRadius: 2,
      }}>
      <CardContent>
        {sourceUrl ? (
          <audio controls src={sourceUrl} style={{ width: "100%" }} />
        ) : (
          <Button
            variant="contained"
            onClick={() => handleLoadMedia(media.id, media.mediaFile.s3Key)}
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "再生"}
          </Button>
        )}
        <Typography variant="body1" sx={{ mt: 2 }}>
          {media.comment}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          作成日: {media.createdAt}
        </Typography>
      </CardContent>
    </Card>
  );
}
