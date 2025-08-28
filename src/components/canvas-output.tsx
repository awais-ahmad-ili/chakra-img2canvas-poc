import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { type RefObject } from "react";
import { downloadCanvas } from "../utils/image-utils";

interface CanvasOutputProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  canvasDataUrl: string;
  onDownload: () => void;
}

export const CanvasOutput = ({
  canvasRef,
  canvasDataUrl,
  onDownload,
}: CanvasOutputProps) => {
  return (
    <Box
      flex={1}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      bg="chakra-subtle-bg"
    >
      <Heading size="md" mb={4}>
        Canvas Output
      </Heading>
      <VStack gap={4}>
        {/* Always render canvas but hide when no data */}
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            maxWidth: "100%",
            height: "auto",
            display: canvasDataUrl ? "block" : "none",
          }}
        />

        {canvasDataUrl ? (
          <Button colorScheme="green" onClick={onDownload} w="full">
            Download Canvas
          </Button>
        ) : (
          <Box
            border="2px dashed"
            borderColor="chakra-border-color"
            borderRadius="md"
            p={8}
            textAlign="center"
            w="full"
            minH="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="chakra-muted-text">
              Convert an image to see the canvas output
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};
