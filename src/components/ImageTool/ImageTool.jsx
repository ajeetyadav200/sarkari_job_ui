import { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload,
  Download,
  RotateCw,
  RotateCcw,
  Crop,
  RefreshCw,
  Image as ImageIcon,
  Settings,
  X,
  Check,
} from "lucide-react";

const ImageTool = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [processedSize, setProcessedSize] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [quality, setQuality] = useState(0.8);
  const [targetSize, setTargetSize] = useState(25);
  const [outputFormat, setOutputFormat] = useState("jpeg");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [outputWidth, setOutputWidth] = useState(0);
  const [outputHeight, setOutputHeight] = useState(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);

  // Crop interaction state
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState(null); // 'move' or 'nw', 'ne', 'sw', 'se'
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [cropStartState, setCropStartState] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setOriginalSize(file.size);
      setRotation(0);
      setIsCropping(false);
      setProcessedImage(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
          setOutputWidth(img.width);
          setOutputHeight(img.height);
          setAspectRatio(img.width / img.height);
          setCropArea({ x: 0, y: 0, width: 100, height: 100 });
        };
        img.src = event.target.result;
        setOriginalImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect({ target: { files: [file] } });
    }
  };

  // Rotate image
  const rotateImage = (direction) => {
    setRotation((prev) => {
      const newRotation = direction === "cw" ? prev + 90 : prev - 90;
      return ((newRotation % 360) + 360) % 360;
    });
  };

  // Get mouse position relative to image
  const getRelativePosition = (e) => {
    if (!imageRef.current || !imageContainerRef.current) return { x: 0, y: 0 };

    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const imgRect = imageRef.current.getBoundingClientRect();

    // Calculate position relative to the image (not container)
    const x = ((e.clientX - imgRect.left) / imgRect.width) * 100;
    const y = ((e.clientY - imgRect.top) / imgRect.height) * 100;

    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  // Start crop drag
  const handleCropStart = (e, type) => {
    if (!isCropping) return;
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    setDragType(type);
    setDragStartPos(getRelativePosition(e));
    setCropStartState({ ...cropArea });
  };

  // Handle crop drag move
  const handleCropMove = useCallback((e) => {
    if (!isDragging || !isCropping) return;

    const currentPos = getRelativePosition(e);
    const deltaX = currentPos.x - dragStartPos.x;
    const deltaY = currentPos.y - dragStartPos.y;

    let newCrop = { ...cropStartState };

    if (dragType === 'move') {
      // Moving the entire crop area
      newCrop.x = Math.max(0, Math.min(100 - cropStartState.width, cropStartState.x + deltaX));
      newCrop.y = Math.max(0, Math.min(100 - cropStartState.height, cropStartState.y + deltaY));
    } else {
      // Resizing from corners
      const minSize = 5; // Minimum 5% size

      switch (dragType) {
        case 'nw':
          newCrop.x = Math.max(0, Math.min(cropStartState.x + cropStartState.width - minSize, cropStartState.x + deltaX));
          newCrop.y = Math.max(0, Math.min(cropStartState.y + cropStartState.height - minSize, cropStartState.y + deltaY));
          newCrop.width = cropStartState.width - (newCrop.x - cropStartState.x);
          newCrop.height = cropStartState.height - (newCrop.y - cropStartState.y);
          break;
        case 'ne':
          newCrop.y = Math.max(0, Math.min(cropStartState.y + cropStartState.height - minSize, cropStartState.y + deltaY));
          newCrop.width = Math.max(minSize, Math.min(100 - cropStartState.x, cropStartState.width + deltaX));
          newCrop.height = cropStartState.height - (newCrop.y - cropStartState.y);
          break;
        case 'sw':
          newCrop.x = Math.max(0, Math.min(cropStartState.x + cropStartState.width - minSize, cropStartState.x + deltaX));
          newCrop.width = cropStartState.width - (newCrop.x - cropStartState.x);
          newCrop.height = Math.max(minSize, Math.min(100 - cropStartState.y, cropStartState.height + deltaY));
          break;
        case 'se':
          newCrop.width = Math.max(minSize, Math.min(100 - cropStartState.x, cropStartState.width + deltaX));
          newCrop.height = Math.max(minSize, Math.min(100 - cropStartState.y, cropStartState.height + deltaY));
          break;
      }
    }

    setCropArea(newCrop);
  }, [isDragging, isCropping, dragType, dragStartPos, cropStartState]);

  // End crop drag
  const handleCropEnd = useCallback(() => {
    setIsDragging(false);
    setDragType(null);
  }, []);

  // Global mouse events for crop
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleCropMove(e);
      const handleMouseUp = () => handleCropEnd();

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleCropMove, handleCropEnd]);

  // Process image with compression
  const processImage = useCallback(async () => {
    if (!originalImage) return;

    setIsProcessing(true);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = async () => {
      const isRotated90or270 = Math.abs(rotation % 180) === 90;
      let srcWidth = img.width;
      let srcHeight = img.height;

      // Apply crop percentages
      const cropX = (cropArea.x / 100) * srcWidth;
      const cropY = (cropArea.y / 100) * srcHeight;
      const cropWidth = (cropArea.width / 100) * srcWidth;
      const cropHeight = (cropArea.height / 100) * srcHeight;

      // Final output dimensions
      let finalWidth = outputWidth || cropWidth;
      let finalHeight = outputHeight || cropHeight;

      if (isRotated90or270) {
        [finalWidth, finalHeight] = [finalHeight, finalWidth];
      }

      canvas.width = finalWidth;
      canvas.height = finalHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      if (isRotated90or270) {
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, -finalHeight / 2, -finalWidth / 2, finalHeight, finalWidth);
      } else {
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, -finalWidth / 2, -finalHeight / 2, finalWidth, finalHeight);
      }

      ctx.restore();

      // Compress to target size
      let currentQuality = quality;
      let blob;
      let attempts = 0;
      const maxAttempts = 20;
      const targetBytes = targetSize * 1024;

      do {
        blob = await new Promise((resolve) => {
          canvas.toBlob((b) => resolve(b), `image/${outputFormat}`, currentQuality);
        });

        if (blob.size > targetBytes && currentQuality > 0.1) {
          currentQuality -= 0.05;
        } else if (blob.size < targetBytes * 0.5 && currentQuality < 1) {
          currentQuality += 0.02;
        }

        attempts++;
      } while (
        attempts < maxAttempts &&
        (blob.size > targetBytes * 1.1 || blob.size < targetBytes * 0.3) &&
        currentQuality > 0.1 &&
        currentQuality < 1
      );

      const processedUrl = URL.createObjectURL(blob);
      setProcessedImage(processedUrl);
      setProcessedSize(blob.size);
      setIsProcessing(false);
    };

    img.src = originalImage;
  }, [originalImage, rotation, cropArea, quality, targetSize, outputFormat, outputWidth, outputHeight]);

  // Download processed image
  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement("a");
    const extension = outputFormat === "jpeg" ? "jpg" : outputFormat;
    const baseName = fileName.replace(/\.[^/.]+$/, "");
    link.download = `${baseName}_processed.${extension}`;
    link.href = processedImage;
    link.click();
  };

  // Reset all settings
  const resetAll = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setFileName("");
    setOriginalSize(0);
    setProcessedSize(0);
    setRotation(0);
    setQuality(0.8);
    setTargetSize(25);
    setCropArea({ x: 0, y: 0, width: 100, height: 100 });
    setIsCropping(false);
    setOutputWidth(0);
    setOutputHeight(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle dimension change
  const handleWidthChange = (value) => {
    const newWidth = parseInt(value) || 0;
    setOutputWidth(newWidth);
    if (maintainAspectRatio && aspectRatio) {
      setOutputHeight(Math.round(newWidth / aspectRatio));
    }
  };

  const handleHeightChange = (value) => {
    const newHeight = parseInt(value) || 0;
    setOutputHeight(newHeight);
    if (maintainAspectRatio && aspectRatio) {
      setOutputWidth(Math.round(newHeight * aspectRatio));
    }
  };

  // Format file size
  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Image Compression Tool</h1>
          <p className="text-gray-600">Compress, crop, rotate, and resize images for government job applications</p>
        </div>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} className="hidden" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Upload & Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Upload Area */}
            <div
              className="bg-white rounded-xl shadow-md p-6 border-2 border-dashed border-gray-300 hover:border-orange-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
              />
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium">Click or drag image here</p>
                <p className="text-sm text-gray-400 mt-1">Supports JPG, PNG, WEBP</p>
              </div>
            </div>

            {/* Controls */}
            {originalImage && (
              <div className="bg-white rounded-xl shadow-md p-6 space-y-5">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </h3>

                {/* Target Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Size: {targetSize} KB
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    value={targetSize}
                    onChange={(e) => setTargetSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>5 KB</span>
                    <span>500 KB</span>
                  </div>
                </div>

                {/* Quick Size Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[10, 15, 20, 25, 50, 100, 200].map((size) => (
                    <button
                      key={size}
                      onClick={() => setTargetSize(size)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        targetSize === size
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-600 border-gray-300 hover:border-orange-500"
                      }`}
                    >
                      {size} KB
                    </button>
                  ))}
                </div>

                {/* Output Format */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WEBP</option>
                  </select>
                </div>

                {/* Output Dimensions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Output Dimensions (px)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={outputWidth}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      placeholder="Width"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="text-gray-500">x</span>
                    <input
                      type="number"
                      value={outputHeight}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      placeholder="Height"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <label className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={maintainAspectRatio}
                      onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                      className="rounded text-orange-500 focus:ring-orange-500"
                    />
                    Maintain aspect ratio
                  </label>
                </div>

                {/* Quick Dimension Presets */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Common Sizes</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "Passport", w: 413, h: 531 },
                      { label: "3.5x4.5", w: 413, h: 531 },
                      { label: "2x2", w: 200, h: 200 },
                      { label: "Signature", w: 300, h: 80 },
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          setOutputWidth(preset.w);
                          setOutputHeight(preset.h);
                          setAspectRatio(preset.w / preset.h);
                        }}
                        className="px-3 py-1 text-sm rounded-full border bg-white text-gray-600 border-gray-300 hover:border-orange-500 hover:bg-orange-50 transition-colors"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rotation Buttons */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rotate Image</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => rotateImage("ccw")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Left
                    </button>
                    <button
                      onClick={() => rotateImage("cw")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <RotateCw className="w-4 h-4" />
                      Right
                    </button>
                  </div>
                </div>

                {/* Crop Toggle */}
                <button
                  onClick={() => setIsCropping(!isCropping)}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isCropping
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <Crop className="w-4 h-4" />
                  {isCropping ? "Cropping Active" : "Enable Crop"}
                </button>

                {isCropping && (
                  <div className="text-sm text-gray-500 text-center space-y-1">
                    <p>Drag the crop area to move it</p>
                    <p>Drag corner handles to resize</p>
                    <p className="text-xs">
                      Crop: X:{Math.round(cropArea.x)}% Y:{Math.round(cropArea.y)}%
                      W:{Math.round(cropArea.width)}% H:{Math.round(cropArea.height)}%
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2 space-y-4">
            {originalImage ? (
              <>
                {/* Image Preview */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Preview</h3>
                    <span className="text-sm text-gray-500">Rotation: {rotation}</span>
                  </div>

                  <div
                    ref={imageContainerRef}
                    className="relative bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ minHeight: "300px" }}
                  >
                    <img
                      ref={imageRef}
                      src={originalImage}
                      alt="Preview"
                      className="max-w-full h-auto"
                      style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: "transform 0.3s ease",
                        maxHeight: "500px",
                      }}
                    />

                    {/* Crop Overlay - positioned relative to image */}
                    {isCropping && imageRef.current && (
                      <div
                        className="absolute"
                        style={{
                          top: imageRef.current.offsetTop,
                          left: imageRef.current.offsetLeft,
                          width: imageRef.current.offsetWidth,
                          height: imageRef.current.offsetHeight,
                        }}
                      >
                        {/* Dark overlay with cutout */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                          <defs>
                            <mask id="cropMask">
                              <rect width="100%" height="100%" fill="white" />
                              <rect
                                x={`${cropArea.x}%`}
                                y={`${cropArea.y}%`}
                                width={`${cropArea.width}%`}
                                height={`${cropArea.height}%`}
                                fill="black"
                              />
                            </mask>
                          </defs>
                          <rect
                            width="100%"
                            height="100%"
                            fill="rgba(0,0,0,0.5)"
                            mask="url(#cropMask)"
                          />
                        </svg>

                        {/* Crop selection box */}
                        <div
                          className="absolute border-2 border-white cursor-move"
                          style={{
                            left: `${cropArea.x}%`,
                            top: `${cropArea.y}%`,
                            width: `${cropArea.width}%`,
                            height: `${cropArea.height}%`,
                          }}
                          onMouseDown={(e) => handleCropStart(e, 'move')}
                        >
                          {/* Grid lines */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute w-full h-px bg-white opacity-40" style={{ top: '33.33%' }} />
                            <div className="absolute w-full h-px bg-white opacity-40" style={{ top: '66.66%' }} />
                            <div className="absolute h-full w-px bg-white opacity-40" style={{ left: '33.33%' }} />
                            <div className="absolute h-full w-px bg-white opacity-40" style={{ left: '66.66%' }} />
                          </div>

                          {/* Corner handles */}
                          <div
                            className="absolute w-4 h-4 bg-white rounded-full shadow-lg cursor-nwse-resize -top-2 -left-2"
                            onMouseDown={(e) => handleCropStart(e, 'nw')}
                          />
                          <div
                            className="absolute w-4 h-4 bg-white rounded-full shadow-lg cursor-nesw-resize -top-2 -right-2"
                            onMouseDown={(e) => handleCropStart(e, 'ne')}
                          />
                          <div
                            className="absolute w-4 h-4 bg-white rounded-full shadow-lg cursor-nesw-resize -bottom-2 -left-2"
                            onMouseDown={(e) => handleCropStart(e, 'sw')}
                          />
                          <div
                            className="absolute w-4 h-4 bg-white rounded-full shadow-lg cursor-nwse-resize -bottom-2 -right-2"
                            onMouseDown={(e) => handleCropStart(e, 'se')}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Size Info */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Original Size</p>
                      <p className="text-xl font-bold text-gray-800">{formatSize(originalSize)}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {imageDimensions.width} x {imageDimensions.height} px
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-500">Processed Size</p>
                      <p className="text-xl font-bold text-green-600">
                        {processedImage ? formatSize(processedSize) : `~${targetSize} KB`}
                      </p>
                      {processedImage && (
                        <p className="text-xs text-green-500 mt-1">
                          {Math.round((1 - processedSize / originalSize) * 100)}% reduced
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={processImage}
                    disabled={isProcessing}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-xl font-semibold transition-colors shadow-md"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-5 h-5" />
                        Process Image
                      </>
                    )}
                  </button>

                  {processedImage && (
                    <button
                      onClick={downloadImage}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors shadow-md"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                  )}

                  <button
                    onClick={resetAll}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Processed Image Preview */}
                {processedImage && (
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      Processed Image
                    </h3>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <img
                        src={processedImage}
                        alt="Processed"
                        className="max-w-full h-auto mx-auto rounded"
                        style={{ maxHeight: "400px" }}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Image Selected</h3>
                <p className="text-gray-500 mb-4">Upload an image to start compressing, cropping, and rotating</p>
                <p className="text-sm text-gray-400">Perfect for passport photos, signatures, and government form uploads</p>
              </div>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Government Form Image Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-700 mb-2">Passport Photo</h4>
              <ul className="text-gray-600 space-y-1">
                <li>Size: 10-200 KB</li>
                <li>Dimensions: 3.5 x 4.5 cm (413 x 531 px)</li>
                <li>Format: JPG/JPEG</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">Signature</h4>
              <ul className="text-gray-600 space-y-1">
                <li>Size: 4-30 KB</li>
                <li>Dimensions: 140 x 60 px (varies)</li>
                <li>Format: JPG/JPEG</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-700 mb-2">Documents</h4>
              <ul className="text-gray-600 space-y-1">
                <li>Size: 50-500 KB</li>
                <li>Clear and readable</li>
                <li>Format: JPG/PNG/PDF</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTool;
