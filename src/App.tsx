import { useState } from "react";
import { Container, Heading, VStack, HStack } from "@chakra-ui/react";
import { ImageInput, CanvasOutput } from "./components";
import { useImageConverter } from "./hooks";
import { downloadCanvas } from "./utils";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [activeSource, setActiveSource] = useState<"url" | "file" | null>(null);

  const {
    convertFromUrl,
    convertFromFile,
    canvasDataUrl,
    isLoading,
    canvasRef,
  } = useImageConverter();

  const handleUrlSubmit = () => {
    setActiveSource("url");
    convertFromUrl(imageUrl);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedImage(file);
    setActiveSource("file");
    convertFromFile(file);
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
    downloadCanvas(canvasDataUrl);
  };

  return (
    <Container py={8} w="full">
      <VStack gap={8} align="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Image to Canvas Converter
        </Heading>

        <HStack gap={8} align="flex-start">
          <ImageInput
            imageUrl={imageUrl}
            isLoading={isLoading}
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
