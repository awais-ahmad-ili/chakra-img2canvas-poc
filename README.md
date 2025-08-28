# Image to Canvas Converter

A React application that converts images to canvas elements, supporting both URL input and file uploads.

## Features

- **URL Input**: Convert images from URLs
- **File Upload**: Upload and convert local image files
- **Real-time Preview**: See the input image before conversion
- **Canvas Output**: View the converted canvas
- **Download**: Download the canvas as a PNG file
- **CORS Handling**: Smart handling of cross-origin image restrictions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ImageInput.tsx   # Input section with URL and file upload
│   ├── CanvasOutput.tsx # Canvas display and download
│   ├── provider.tsx     # Chakra UI theme provider
│   └── index.ts         # Component exports
├── hooks/               # Custom React hooks
│   ├── useImageConverter.ts # Main business logic hook
│   └── index.ts         # Hook exports
├── types/               # TypeScript type definitions
│   └── image.ts         # Image-related types
├── utils/               # Utility functions
│   ├── imageUtils.ts    # Image processing utilities
│   └── index.ts         # Utility exports
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Architecture

### Components

- **ImageInput**: Handles URL input, file upload, and preview
- **CanvasOutput**: Displays canvas and download functionality
- **Provider**: Chakra UI theme configuration

### Hooks

- **useImageConverter**: Main business logic for image conversion

### Utilities

- **imageUtils**: Helper functions for image processing and alerts

### Types

- **ImageSource**: Type definitions for image sources
- **ActiveSource**: Type for tracking active input source

## Usage

1. **Enter Image URL**: Type an image URL and click "Convert"
2. **Upload File**: Select an image file from your device
3. **Preview**: See the selected image before conversion
4. **Convert**: The image is converted to a canvas element
5. **Download**: Download the canvas as a PNG file

## Technical Details

- **Framework**: React with TypeScript
- **UI Library**: Chakra UI
- **Build Tool**: Vite
- **Image Processing**: HTML5 Canvas API
- **CORS Handling**: Smart fallback for cross-origin images

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Browser Compatibility

- Modern browsers with HTML5 Canvas support
- File API support for uploads
- Fetch API for URL processing
