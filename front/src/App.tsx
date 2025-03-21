import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import MediaItem from "./interfaces/mediaItem";
import MediaCard from "./components/MediaCard";

const App: React.FC = () => {
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

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {mediaItems?.map((media) => (
        <MediaCard media={media} />
      ))}
    </Container>
  );
};

export default App;
