import React, { useRef, useState } from 'react';
import { Upload, X, Plus, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { validateImageFile, uploadProductImage } from '../../lib/storage';

export interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  productPrefix?: string;
  error?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  images,
  onChange,
  productPrefix = 'product',
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);
    setIsUploading(true);

    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validation = validateImageFile(file);
        if (!validation.valid) {
          setUploadError(validation.error || 'Invalid file');
          continue;
        }

        const url = await uploadProductImage(file, productPrefix);
        uploadedUrls.push(url);
      }

      if (uploadedUrls.length > 0) {
        onChange([...images, ...uploadedUrls]);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to upload image. Please try again.';
      setUploadError(message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    onChange(copy);
  };

  return (
    <div className="w-full space-y-4">
      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1">
        Product Images
      </label>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed transition-all cursor-pointer text-center ${
          isDragOver
            ? 'border-[#C47A53] bg-[#F7ECE4]'
            : 'border-[#EBDCD2] bg-[#FAF6F2] hover:bg-[#F7ECE4]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2 py-4 text-[#C47A53]">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p className="text-xs font-medium">Uploading image...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5 py-2">
            <div className="w-10 h-10 rounded-full bg-white border border-[#EBDCD2] flex items-center justify-center text-[#7D6B63] shadow-xs">
              <Upload className="w-4 h-4 text-[#C47A53]" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#2B1A15]">
              Click to upload <span className="text-[#7D6B63] font-normal">or drag & drop</span>
            </p>
            <p className="text-[11px] text-[#7D6B63]/80 font-mono">
              ( JPG, PNG, WEBP — up to 5MB )
            </p>
          </div>
        )}
      </div>

      {(error || uploadError) && (
        <p className="text-xs text-red-600 font-medium">
          {error || uploadError}
        </p>
      )}

      {/* Previews Thumbnails Grid */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs text-warm-gray">
            First image is the primary cover photo. Use arrows to reorder.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {images.map((url, idx) => (
              <div
                key={idx}
                className="relative group w-24 h-24 rounded-lg overflow-hidden border border-brand-border bg-white shadow-xs"
              >
                <img
                  src={url}
                  alt={`Upload preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Primary label */}
                {idx === 0 && (
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-brand-dark/80 text-[9px] font-semibold uppercase text-white tracking-wider">
                    Primary
                  </span>
                )}

                {/* Overlay actions */}
                <div className="absolute inset-0 bg-brand-dark/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(idx);
                      }}
                      className="p-1 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs"
                      title="Remove image"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMove(idx, 'left');
                      }}
                      className="p-1 rounded bg-white/90 text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white"
                      title="Move left"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMove(idx, 'right');
                      }}
                      className="p-1 rounded bg-white/90 text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white"
                      title="Move right"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick '+' add more tile */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 rounded-lg border-2 border-dashed border-brand-border bg-ivory/40 hover:bg-ivory flex flex-col items-center justify-center text-warm-gray hover:text-brand-brown transition-colors"
              title="Add another photo"
            >
              <Plus className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-medium uppercase tracking-wider">Add</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
