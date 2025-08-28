import { useState, useRef } from "react";
import { showAlert } from "../utils/image-utils";

export const useCanvasRenderer = () => {
  const [canvasDataUrl, setCanvasDataUrl] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderToCanvas = async (dataUrl: string) => {
    if (!dataUrl) {
      showAlert("No image data to render");
      return;
    }

    setIsRendering(true);
    try {
      const canvas = canvasRef.current;
      if (!canvas) {
        throw new Error("Canvas element not found");
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      // Load the image and render to canvas
      await new Promise<void>((resolve, reject) => {
        const img = new window.Image();

        img.onload = () => {
          try {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const canvasDataUrl = canvas.toDataURL("image/png");
            setCanvasDataUrl(canvasDataUrl);
            resolve();
          } catch (error) {
            reject(error);
          }
        };

        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };

        img.src = dataUrl;
      });
    } catch (error) {
      console.error("Canvas rendering failed:", error);
      showAlert(
        `Failed to render image to canvas: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsRendering(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setCanvasDataUrl("");
  };

  const downloadCanvas = () => {
    if (!canvasDataUrl) {
      showAlert("No canvas data to download");
      return;
    }

    const link = document.createElement("a");
    link.download = "converted-image.png";
    link.href = canvasDataUrl;
    link.click();
  };

  return {
    canvasDataUrl,
    isRendering,
    canvasRef,
    renderToCanvas,
    clearCanvas,
    downloadCanvas,
  };
};
