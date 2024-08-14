import { useState, useRef, useEffect, ChangeEvent } from "react";
import AvatarEditor from "react-avatar-editor";
import "../../App.css";

interface ImageCropUploaderProps {
  save: boolean;
  cancel: boolean;
  setCancel: (cancel: boolean) => void;
}

const ImageCropUploader: React.FC<ImageCropUploaderProps> = ({
  save,
  cancel,
  setCancel,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1.0);
  const editorRef = useRef<AvatarEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCancel(false);
      setImage(file);
      setCroppedImage(null);
      event.target.value = "";
    }
  };

  const handleZoomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const zoomLevel = parseFloat(e.target.value);
    setZoom(zoomLevel);
  };

  const handleImageUpload = () => {
    if (editorRef.current) {
      setCancel(false);
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob: Blob | null) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          setCroppedImage(imageUrl);
          setImage(null);
          setZoom(1.0);
        }
      }, "image/jpeg");
    }
  };

  const handleImageDelete = () => {
    setCroppedImage(null);
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (cancel) {
      setCroppedImage(null);
      setImage(null);
      setZoom(1.0);
    }
  }, [cancel]);

  return (
    <div className="image-crop-uploader">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        ref={fileInputRef}
        disabled={save}
        style={{ display: "none" }}
      />

      {!image && !croppedImage && (
        <div onClick={handleDivClick}>
          <div className="box">
            <div className="image-text">Image</div>
            <div className="update-img-text">Click to update</div>
          </div>
        </div>
      )}

      {image && !croppedImage && (
        <div className="editor-container">
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={150}
            height={150}
            border={50}
            color={[255, 255, 255, 0.6]}
            scale={zoom}
            rotate={0}
          />
          <input
            type="range"
            min="1"
            max="2"
            step="0.01"
            value={zoom}
            onChange={handleZoomChange}
          />
          <button onClick={handleImageUpload}>Upload</button>
        </div>
      )}

      {croppedImage && (
        <div>
          <img src={croppedImage} alt="Cropped Preview" />
          {!save && (
            <div className="delete-btn-pos">
              <button onClick={handleImageDelete} className="delete-btn">
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCropUploader;
