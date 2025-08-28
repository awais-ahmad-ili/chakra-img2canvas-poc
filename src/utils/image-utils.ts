export const showAlert = (message: string): void => {
  alert(message);
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
