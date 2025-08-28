import { useState, useRef } from "react";
import { showAlert, validateImageFile } from "../utils/image-utils";

export const useImageConverter = () => {
  const [canvasDataUrl, setCanvasDataUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const convertImage = async (imageSource: string | File) => {
    setIsLoading(true);

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new window.Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        try {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);

          const dataUrl = canvas.toDataURL("image/png");
          setCanvasDataUrl(dataUrl);
          setIsLoading(false);
          showAlert("Image converted successfully!");
        } catch (error) {
          setIsLoading(false);
          showAlert("Error converting image. Please try again.");
        }
      };

      img.onerror = () => {
        setIsLoading(false);
        showAlert(
          "Failed to load image. Please check the URL or try a different image."
        );
      };

      if (typeof imageSource === "string") {
        img.src = imageSource;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target?.result as string;
        };
        reader.readAsDataURL(imageSource);
      }
    } catch (error) {
      setIsLoading(false);
      showAlert("Error converting image. Please try again.");
    }
  };

  const convertFromUrl = (url: string) => {
    if (!url.trim()) {
      showAlert("Please enter an image URL");
      return;
    }
    convertImage(url);
  };

  const convertFromFile = (file: File) => {
    if (!validateImageFile(file)) {
      showAlert("Please select an image file");
      return;
    }
    convertImage(file);
  };

  return {
    convertFromUrl,
    convertFromFile,
    canvasDataUrl,
    isLoading,
    canvasRef,
  };
};
