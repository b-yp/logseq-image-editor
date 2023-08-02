import React, { useEffect, useRef } from "react";
import ImageEditor from "tui-image-editor";

interface ImageEditorProps {
  path: string;
}

const ImageEditorComponent: React.FC<ImageEditorProps> = ({ path }) => {
  const editorRef = useRef<ImageEditor | null>(null);

  const handleInsert = () => {
    const storage = logseq.Assets.makeSandboxStorage();
    const imageName = editorRef.current?.getImageName();
    const imageBase64 = editorRef.current?.toDataURL() as string;

    fetch(imageBase64)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        storage
          .setItem(
            decodeURIComponent(`${imageName}_${Date.now()}.png`),
            buffer as any
          )
          .then((one) => {
            logseq.UI.showMsg(`SAVE DONE 🎉 - ${one}`, "success");

            // 将图片插入到下一个 block
          });
      });
  };

  useEffect(() => {
    if (!editorRef.current) {
      // 初始化 Image-editor
      editorRef.current = new ImageEditor(
        document.querySelector("#tui-image-editor") as Element,
        {
          includeUI: {
            loadImage: {
              // path,
              path: "https://picsum.photos/id/1002/600/400",
              name: "sampleImage",
            },
            theme: {
              // 主题样式设置（可选）
            },
            initMenu: "filter",
          },
          cssMaxWidth: 700,
          cssMaxHeight: 500,
          usageStatistics: false,
        }
      );
    }
  }, []);

  return (
    <>
      <div className="top-bar">
        <div className="icon-button" onClick={handleInsert}>
          <svg
            t="1690981419588"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="14550"
            width="20"
            height="20"
          >
            <path
              d="M306.176 549.376l1.024 1.024 173.568 152.576c19.968 17.92 50.176 17.408 70.144-0.512l168.448-152.576c20.992-19.968 22.016-53.248 2.048-74.24-19.456-20.48-51.712-22.016-72.704-3.584l-83.456 75.264V72.192c0-29.184-23.552-52.736-52.736-52.736-29.184 0-52.736 23.552-52.736 52.736v472.064L376.32 471.04c-21.504-19.456-54.784-17.408-74.24 4.096-19.456 21.504-17.92 54.784 4.096 74.24z"
              fill="#ffffff"
              p-id="14551"
            ></path>
            <path
              d="M969.216 628.224c-30.208 0-54.784 24.576-54.784 54.784v211.968H109.056v-211.968c0-30.208-24.576-54.784-54.784-54.784S0 652.8 0 683.008V901.12c0 56.832 49.664 102.912 110.592 102.912h802.816c60.928 0 110.592-46.08 110.592-102.912v-218.112c0-30.208-24.576-54.784-54.784-54.784z"
              fill="#ffffff"
              p-id="14552"
            ></path>
          </svg>
        </div>
        <div
          className="icon-button"
          onClick={() => {
            logseq.hideMainUI();
          }}
        >
          <svg
            t="1690981494401"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="17225"
            width="20"
            height="20"
          >
            <path
              d="M512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024zM512 96a416 416 0 1 0 0 832 416 416 0 0 0 0-832z m176 640a47.68 47.68 0 0 1-33.92-14.08L512 579.904 369.92 721.92a48 48 0 0 1-67.84-67.84L444.096 512 302.08 369.92a48 48 0 0 1 67.84-67.84L512 444.096l142.08-142.016a48 48 0 0 1 67.84 67.84L579.904 512l142.016 142.08a48 48 0 0 1-33.92 81.92z"
              fill="#ffffff"
              p-id="17226"
            ></path>
          </svg>
        </div>
      </div>
      <div className="main">
        <div id="tui-image-editor">
          <canvas></canvas>
        </div>
      </div>
    </>
  );
};

export default ImageEditorComponent;
