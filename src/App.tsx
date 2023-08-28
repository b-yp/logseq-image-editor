import React, { useEffect, useState } from "react";

import { useAppVisible } from "./utils";
import ImageEditor from "./ImageEditor";

function App() {
  const visible = useAppVisible();
  const [imageUrl, setImageUrl] = useState("");
  const [uuid, setUuid] = useState("");

  const init = () => {
    logseq.Editor.registerBlockContextMenuItem("Image Editor", async (res) => {
      setUuid(res.uuid);
      const currentGraph = await logseq.App.getCurrentGraph();
      const path = currentGraph?.path;
      const block = await logseq.Editor.getBlock(res.uuid);
      const text = block?.content;

      if (!text) return;

      const imageRegex = /!\[.*?\]\((.*?)\)/g;
      const urlRegex =
        /(https?:\/\/[^\s]*\.(png|jpg|jpeg|gif|bmp|webp|mp3|wav|ogg|mp4|mov|avi|wmv|flv|pdf))([^\s(){}]*)/gi;
      const matches = text.match(imageRegex);
      const urls = text.match(urlRegex);

      if (urls && urls.length) {
        console.log("urll", urls[0]);
        setImageUrl(urls[0]);

        logseq.showMainUI();
        return;
      }

      if (matches && matches.length) {
        const imageUrls = matches.map(
          (match) =>
            `${path}${(match.match(/!\[.*?\]\((.*?)\)/) || [])[1].substring(2)}`
        );

        setImageUrl(imageUrls[0]);
        logseq.showMainUI();
        return;
      }

      logseq.hideMainUI();
      logseq.UI.showMsg("No image URLs found.", "warning");
      console.log("No image URLs found.");
    });
  };

  useEffect(() => {
    init();
  }, []);

  if (visible) {
    return (
      <main className="logseq-image-editor-main">
        {imageUrl && <ImageEditor uuid={uuid} path={imageUrl} />}
      </main>
    );
  }
  return null;
}

export default App;
