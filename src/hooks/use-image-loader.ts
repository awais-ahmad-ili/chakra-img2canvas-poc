import { useState } from "react";
import { showAlert, validateImageFile } from "../utils/image-utils";
import { PROXY_BASE_URL } from "@/constants";

export const useImageLoader = () => {
  const [dataUrl, setDataUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadFromUrl = async (url: string) => {
    if (!url.trim()) {
      showAlert("Please enter an image URL");
      return;
    }

    setIsLoading(true);
    try {
      // Use your hosted proxy server
      const proxyUrl = `${PROXY_BASE_URL}/proxy?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error(`Proxy request failed: ${response.status}`);
      }

      const data = await response.json();

      // Check if dataUrl exists in the response
      if (!data.dataUrl) {
        throw new Error("Invalid response from proxy server");
      }

      setDataUrl(data.dataUrl);
    } catch (error) {
      console.error("Image loading failed:", error);
      showAlert(
        `Failed to load image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromFile = async (file: File) => {
    if (!validateImageFile(file)) {
      showAlert("Please select an image file");
      return;
    }

    setIsLoading(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Failed to read file"));
          }
        };
        reader.onerror = () => reject(new Error("File reading failed"));
        reader.readAsDataURL(file);
      });

      setDataUrl(dataUrl);
    } catch (error) {
      console.error("File loading failed:", error);
      showAlert("Failed to load image file. Please try a different file.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearDataUrl = () => {
    setDataUrl("");
  };

  return {
    dataUrl,
    isLoading,
    loadFromUrl,
    loadFromFile,
    clearDataUrl,
  };
};
