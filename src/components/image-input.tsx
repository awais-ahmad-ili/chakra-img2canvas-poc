import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";

interface ImageInputProps {
  imageUrl: string;
  isLoading: boolean;
  previewSrc: string;
  onUrlChange: (url: string) => void;
  onUrlSubmit: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageInput = ({
  imageUrl,
  isLoading,
  previewSrc,
  onUrlChange,
  onUrlSubmit,
  onFileUpload,
}: ImageInputProps) => {
  return (
    <Box flex={1} p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
      <Heading size="md" mb={4}>
        Input Image
      </Heading>
      <VStack gap={4}>
        {/* URL Input */}
        <Box w="full">
          <Text mb={2} fontWeight="medium">
            Image URL
          </Text>
          <HStack>
            <Input
              placeholder="Enter image URL..."
              value={imageUrl}
              onChange={(e) => onUrlChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onUrlSubmit()}
            />
            <Button
              colorScheme="blue"
              onClick={onUrlSubmit}
              loading={isLoading}
            >
              {isLoading ? "Converting..." : "Convert"}
            </Button>
          </HStack>
        </Box>

        <Box
          w="full"
          borderTopWidth={1}
          borderColor="chakra-border-color"
          pt={4}
        >
          <Text mb={2} fontWeight="medium">
            Or upload an image
          </Text>
          <Input
            type="file"
            accept="image/*"
            onChange={onFileUpload}
            disabled={isLoading}
          />
        </Box>

        {/* Preview */}
        {previewSrc ? (
          <Box w="full">
            <Text mb={2} fontWeight="medium">
              Preview
            </Text>
            <Image
              src={previewSrc}
              alt="Preview"
              maxH="200px"
              objectFit="contain"
              border="1px solid"
              borderColor="chakra-border-color"
              borderRadius="md"
            />
          </Box>
        ) : null}
      </VStack>
    </Box>
  );
};
