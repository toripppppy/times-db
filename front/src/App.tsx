import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import MediaItem from "./interfaces/mediaItem";

const App: React.FC = () => {
  const [loadedMedia, setLoadedMedia] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});

  const [mediaItems, setMediaItems] = useState<MediaItem[]>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8000/media-item");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      // 型安全が確保されたので、mediaItemsを更新
      setMediaItems(data);
    }
    fetchData();
  }, []);

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
      {mediaItems?.map((media) => (
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
