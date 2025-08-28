# Image to Canvas Converter

A React application that converts images from URLs or file uploads to canvas format, with CORS bypass using a proxy server.

## Features

- ✅ **URL Image Loading**: Load images from URLs via proxy server
- ✅ **File Upload**: Upload and convert local image files
- ✅ **Canvas Rendering**: Convert images to canvas format
- ✅ **Download**: Download converted images as PNG
- ✅ **CORS Bypass**: Uses hosted proxy server to avoid CORS issues
- ✅ **Chakra UI**: Modern, accessible UI components

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_PROXY_BASE_URL=https://your-vercel-app.vercel.app
```

**Replace `https://your-vercel-app.vercel.app` with your actual Vercel proxy server URL.**

### 3. Start Development Server

```bash
npm run dev
```

## Environment Variables

### Vite Environment Variables

- **`VITE_PROXY_BASE_URL`**: Your hosted proxy server URL
  - Example: `https://my-proxy-server.vercel.app`
  - Used to bypass CORS restrictions when loading images from URLs

### How Vite Environment Variables Work

- **Prefix**: All environment variables must start with `VITE_`
- **Access**: Use `import.meta.env.VITE_VARIABLE_NAME`
- **Build-time**: Variables are embedded at build time
- **Security**: Only `VITE_` prefixed variables are exposed to the client

## Usage

1. **Load from URL**: Enter an image URL and click "Convert"
2. **Upload File**: Click "Choose File" to upload a local image
3. **View Canvas**: The converted image appears in the canvas
4. **Download**: Click "Download" to save the canvas as PNG

## Architecture

### Hooks

- **`useImageLoader`**: Handles loading images from URLs/files to data URLs
- **`useCanvasRenderer`**: Renders data URLs to canvas and manages canvas state

### Components

- **`ImageInput`**: URL input and file upload interface
- **`CanvasOutput`**: Canvas display and download functionality

## Proxy Server

This app requires a hosted proxy server to bypass CORS restrictions. The proxy server should:

- **Endpoint**: `/proxy?url={image_url}`
- **Response**: `{dataUrl: "data:image/..."}`
- **Hosting**: Deployed on Vercel, Render, or similar platform

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Technologies

- **React 18** with TypeScript
- **Vite** for build tooling
- **Chakra UI** for components
- **HTML5 Canvas API** for image processing
