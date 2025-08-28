import { useState, useEffect } from "react";
import { Container, Heading, VStack, HStack } from "@chakra-ui/react";
import { ImageInput, CanvasOutput } from "./components";
import { useImageLoader, useCanvasRenderer } from "./hooks";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [activeSource, setActiveSource] = useState<"url" | "file" | null>(null);

  const { dataUrl, isLoading, loadFromUrl, loadFromFile } = useImageLoader();

  const {
    canvasDataUrl,
    isRendering,
    canvasRef,
    renderToCanvas,
    downloadCanvas,
  } = useCanvasRenderer();

  const handleUrlSubmit = async () => {
    setActiveSource("url");
    await loadFromUrl(imageUrl);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedImage(file);
    setActiveSource("file");
    await loadFromFile(file);
  };

  const getPreviewSrc = () => {
    if (activeSource === "file" && uploadedImage) {
      return URL.createObjectURL(uploadedImage);
    }
    if (activeSource === "url" && imageUrl) {
      return imageUrl;
    }
    return "";
  };

  const handleDownload = () => {
    downloadCanvas();
  };

  // Auto-render to canvas when dataUrl changes
  useEffect(() => {
    if (dataUrl) {
      renderToCanvas(dataUrl);
    }
  }, [dataUrl, renderToCanvas]);

  return (
    <Container py={8} w="full">
      <VStack gap={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Image to Canvas Converter
        </Heading>

        <HStack gap={8} align="flex-start">
          <ImageInput
            imageUrl={imageUrl}
            isLoading={isLoading || isRendering}
            previewSrc={getPreviewSrc()}
            onUrlChange={setImageUrl}
            onUrlSubmit={handleUrlSubmit}
            onFileUpload={handleFileUpload}
          />

          <CanvasOutput
            canvasRef={canvasRef}
            canvasDataUrl={canvasDataUrl}
            onDownload={handleDownload}
          />
        </HStack>
      </VStack>
    </Container>
  );
}

export default App;
