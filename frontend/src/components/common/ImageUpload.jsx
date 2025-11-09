import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from './Button';
import { Alert } from './Alert';

const ImageUpload = ({ 
  onUpload, 
  multiple = false, 
  maxFiles = 5,
  currentImage = null,
  label = "Upload Image"
}) => {
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setError('');

    // Validate file count
    if (multiple && files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    // Validate file types and sizes
    const validFiles = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Create previews
    const newPreviews = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (previews.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const files = previews.map(p => p.file);
      await onUpload(multiple ? files : files[0]);
      setPreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const removePreview = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {label}
        </Button>

        {previews.length > 0 && (
          <Button
            type="button"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : `Upload ${previews.length} image${previews.length > 1 ? 's' : ''}`}
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="error">{error}</Alert>
      )}

      {/* Current Image Display */}
      {currentImage && previews.length === 0 && (
        <div className="relative">
          <img
            src={currentImage}
            alt="Current"
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
          />
          <p className="text-sm text-gray-600 mt-2">Current Image</p>
        </div>
      )}

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview.url}
                alt={preview.name}
                className="w-full h-32 object-cover rounded-lg border-2 border-blue-300"
              />
              <button
                type="button"
                onClick={() => removePreview(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-xs text-gray-600 mt-1 truncate">{preview.name}</p>
            </div>
          ))}
        </div>
      )}

      {multiple && (
        <p className="text-sm text-gray-500">
          Maximum {maxFiles} images • JPG, PNG, or WebP • Max 5MB each
        </p>
      )}
    </div>
  );
};

export default ImageUpload;