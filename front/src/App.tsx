import React, { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const mediaData = [
  {
    id: 1,
    mediaFile: {
      filename: "機械仕掛けの再革命.mp3",
      mimeType: "audio/mpeg",
      s3Key: "機械仕掛けの再革命.mp3",
    },
    comment: "機械仕掛けの再革命",
    createdAt: "2025-03-14",
  },
  {
    id: 2,
    mediaFile: {
      filename: "test2.wav",
      mimeType: "audio/wav",
      s3Key: "bbbbb.wav",
    },
    comment: "test2",
    createdAt: "2025-03-14",
  },
];

const App: React.FC = () => {
  const [loadedMedia, setLoadedMedia] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  const handleLoadMedia = async (id: number, s3Key: string) => {
    if (loadedMedia[id]) return; // 既にロード済みなら何もしない
    setLoading((prev) => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(
        "http://localhost:8000/media-file/download?key=" + s3Key
      );
      console.log(response);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);

      setLoadedMedia((prev) => ({ ...prev, [id]: objectURL }));
    } catch (error) {
      console.error("音声ファイルのダウンロードに失敗:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {mediaData.map((media) => (
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
            {loadedMedia[media.id] ? (
              <audio
                controls
                src={loadedMedia[media.id]}
                style={{ width: "100%" }}
              />
            ) : (
              <Button
                variant="contained"
                onClick={() => handleLoadMedia(media.id, media.mediaFile.s3Key)}
                disabled={loading[media.id]}>
                {loading[media.id] ? <CircularProgress size={24} /> : "再生"}
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
      ))}
    </Container>
  );
};

export default App;
