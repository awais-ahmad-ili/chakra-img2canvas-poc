import { type ImageSource } from "../types/image";

export const showAlert = (message: string): void => {
  alert(message);
};

export const loadImageAsDataUrl = (
  imageSource: ImageSource
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (imageSource.type === "file") {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(imageSource.value as File);
    } else {
      resolve(imageSource.value as string);
    }
  });
};

export const downloadCanvas = (canvasDataUrl: string): void => {
  if (!canvasDataUrl) return;

  const link = document.createElement("a");
  link.download = "converted-image.png";
  link.href = canvasDataUrl;
  link.click();
};

export const validateImageFile = (file: File): boolean => {
  return file.type.startsWith("image/");
};
