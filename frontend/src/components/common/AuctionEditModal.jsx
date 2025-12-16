/**
 * AuctionEditModal - Modal for editing auction details
 * Allows editing title, description, category, price, end date, and images
 */

import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { Card } from './Card';
import { Input } from './Input';
import { Select } from './Select';
import { Button } from './Button';
import { Alert } from './Alert';
import api from '../../services/api';

const AuctionEditModal = ({ auction, isOpen, onClose, onSuccess, isRep = false }) => {
  // Form data state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    startingPrice: '',
    endsAt: ''
  });
  
  // Image management states
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  
  // UI states
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Format date to datetime-local input format (YYYY-MM-DDTHH:mm)
  const formatDateTimeLocal = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Populate form when auction data changes
  useEffect(() => {
    if (auction && isOpen) {
      setFormData({
        title: auction.title || '',
        description: auction.description || '',
        category: auction.category || 'Electronics',
        startingPrice: auction.startingPrice || auction.startPrice || '',
        endsAt: formatDateTimeLocal(auction.endsAt)
      });
      setExistingImages(auction.images || []);
      setImagesToDelete([]);
      setNewImages([]);
      setImagePreviews([]);
      setMessage(null);
    }
  }, [auction, isOpen]);

  // Handle new image selection with validation
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    // Check total image limit (5 max)
    if (files.length + existingImages.length - imagesToDelete.length > 5) {
      setMessage({ type: 'error', text: 'Maximum 5 images allowed' });
      return;
    }

    // Validate each file
    const validFiles = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Only image files are allowed' });
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Add valid files and create previews
    setNewImages([...newImages, ...validFiles]);
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
    setMessage(null);
  };

  // Remove newly selected image before upload
  const removeNewImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      URL.revokeObjectURL(prev[index]); // Clean up memory
      return prev.filter((_, i) => i !== index);
    });
  };

  // Toggle existing image for deletion
  const markExistingImageForDelete = (imageId) => {
    if (imagesToDelete.includes(imageId)) {
      setImagesToDelete(prev => prev.filter(id => id !== imageId));
    } else {
      setImagesToDelete(prev => [...prev, imageId]);
    }
  };

  // Submit form with auction updates and image changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        startingPrice: parseFloat(formData.startingPrice),
        endsAt: formData.endsAt ? new Date(formData.endsAt).toISOString() : formData.endsAt
      };

      // 1. Update auction details
      const updateResponse = await api.updateAuction(auction.id, submitData);
      
      // 2. Delete marked images
      for (const imageId of imagesToDelete) {
        await api.deleteAuctionImage(imageId);
      }

      // 3. Upload new images
      if (newImages.length > 0) {
        await api.uploadAuctionImages(auction.id, newImages);
      }

      setMessage({ type: 'success', text: 'Auction updated successfully!' });
      setTimeout(() => {
        onSuccess && onSuccess();
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Error updating auction:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || 'Failed to update auction' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !auction) return null;

  const totalImages = existingImages.length - imagesToDelete.length + newImages.length;

  // Get minimum datetime (current time) for validation
  const getMinDateTime = () => {
    const now = new Date();
    return formatDateTimeLocal(now.toISOString());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Auction</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Status messages */}
        {message && (
          <Alert variant={message.type} className="mb-4">
            {message.text}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title input */}
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          {/* Description textarea */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Category select */}
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            options={[
              { value: 'Electronics', label: 'Electronics' },
              { value: 'Fashion', label: 'Fashion' },
              { value: 'Home', label: 'Home & Garden' },
              { value: 'Sports', label: 'Sports' },
              { value: 'Other', label: 'Other' }
            ]}
          />

          {/* Starting price input with dollar sign */}
          <div className='text-sm text-gray-700 -mb-2 font-medium'>
            Starting Price
            <div className='flex my-2'>
              <div className='mr-3 my-2'>$</div>
              <div className='flex-grow'>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.startingPrice}
                  onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* End date and time picker */}
          <Input
            label="End Date & Time"
            type="datetime-local"
            value={formData.endsAt}
            onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
            min={getMinDateTime()}
            required
          />

          {/* Image management section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Auction Images ({totalImages}/5)
            </label>

            {/* Existing images grid */}
            {existingImages.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 mb-2">Current Images</p>
                <div className="grid grid-cols-5 gap-2">
                  {existingImages.map((img, index) => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.imageUrl}
                        alt={`Existing ${index + 1}`}
                        className={`w-full h-24 object-cover rounded border-2 transition ${
                          imagesToDelete.includes(img.id)
                            ? 'border-red-500 opacity-50'
                            : 'border-gray-300'
                        }`}
                      />
                      {/* Delete/undo button */}
                      <button
                        type="button"
                        onClick={() => markExistingImageForDelete(img.id)}
                        className={`absolute top-1 right-1 rounded-full p-1 transition ${
                          imagesToDelete.includes(img.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white opacity-0 group-hover:opacity-100'
                        }`}
                        title={imagesToDelete.includes(img.id) ? 'Undo delete' : 'Mark for deletion'}
                      >
                        {imagesToDelete.includes(img.id) ? '↺' : <Trash2 className="w-4 h-4" />}
                      </button>
                      {/* Primary image indicator */}
                      {img.isPrimary && (
                        <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New images preview grid */}
            {imagePreviews.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 mb-2">New Images to Upload</p>
                <div className="grid grid-cols-5 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`New ${index + 1}`}
                        className="w-full h-24 object-cover rounded border-2 border-green-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add new images button */}
            {totalImages < 5 && (
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                  id="new-images-input"
                />
                <label
                  htmlFor="new-images-input"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                >
                  <Upload className="w-4 h-4" />
                  Add Images
                </label>
                <span className="text-xs text-gray-500">
                  {5 - totalImages} more allowed
                </span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AuctionEditModal;