/**
 * ProfileModal - Modal for editing user profile
 * Allows users to update avatar, username, and password
 */

import React, { useState } from 'react';
import { X, Upload, User, Lock, Mail } from 'lucide-react';
import { Input } from './Input';
import { Button } from './Button';
import { Alert } from './Alert';
import Avatar from './Avatar';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('avatar'); // avatar, username, password
  
  // Form state for all tabs
  const [formData, setFormData] = useState({
    username: user?.username || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Avatar upload state
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  if (!isOpen) return null;

  // Handle avatar file selection with validation
  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setError('');
  };

  // Upload avatar to server
  const handleAvatarUpload = async () => {
    if (!avatarFile) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.updateProfileImage(avatarFile);
      
      // Update user context with new profile image
      updateUser({ profileImage: response.imageUrl });
      
      setSuccess('Profile image updated successfully!');
      setAvatarFile(null);
      setAvatarPreview(null);
      
      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile image');
    } finally {
      setLoading(false);
    }
  };

  // Update username
  const handleUsernameUpdate = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim()) {
      setError('Username cannot be empty');
      return;
    }

    if (formData.username === user.username) {
      setError('New username must be different');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.updateUsername(formData.username);
      updateUser({ username: response.username });
      
      setSuccess('Username updated successfully!');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update username');
    } finally {
      setLoading(false);
    }
  };

  // Update password with validation
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Validate all fields filled
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All password fields are required');
      return;
    }

    // Validate password length
    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    // Validate passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    // Validate new password is different
    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await api.updatePassword(formData.currentPassword, formData.newPassword);
      
      setSuccess('Password updated successfully!');
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  // Reset form and close modal
  const handleClose = () => {
    setFormData({
      username: user?.username || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setAvatarPreview(null);
    setAvatarFile(null);
    setError('');
    setSuccess('');
    setActiveTab('avatar');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('avatar')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'avatar'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Avatar
          </button>
          <button
            onClick={() => setActiveTab('username')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'username'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Username
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'password'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Password
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Status messages */}
          {error && (
            <Alert variant="error" className="mb-4">
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert variant="success" className="mb-4">
              {success}
            </Alert>
          )}

          {/* Avatar Tab */}
          {activeTab === 'avatar' && (
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-4">
                {/* Current/preview avatar */}
                <Avatar
                  src={avatarPreview || user?.profileImage}
                  name={user?.username}
                  size="xl"
                />
                
                {/* File selection button */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    Current profile picture
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarSelect}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    Choose New Image
                  </label>
                </div>

                {/* Preview of selected image */}
                {avatarPreview && (
                  <div className="w-full">
                    <p className="text-sm text-gray-700 mb-2 text-center">
                      Preview:
                    </p>
                    <div className="flex justify-center">
                      <Avatar
                        src={avatarPreview}
                        name={user?.username}
                        size="xl"
                      />
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 text-center">
                  JPG, PNG or WebP • Max 5MB
                </p>
              </div>

              {/* Upload button (shown when file selected) */}
              {avatarFile && (
                <Button
                  onClick={handleAvatarUpload}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? 'Uploading...' : 'Upload Avatar'}
                </Button>
              )}
            </div>
          )}

          {/* Username Tab */}
          {activeTab === 'username' && (
            <form onSubmit={handleUsernameUpdate} className="space-y-4">
              {/* Current username display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Username
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{user?.username}</span>
                </div>
              </div>

              {/* New username input */}
              <Input
                label="New Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Enter new username"
                required
              />

              {/* Email display (read-only) */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{user?.email}</span>
              </div>
              <p className="text-xs text-gray-500">Email cannot be changed</p>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={loading || formData.username === user?.username}
                className="w-full"
              >
                {loading ? 'Updating...' : 'Update Username'}
              </Button>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              {/* Current password */}
              <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
                required
              />

              {/* New password */}
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password (min 6 characters)"
                required
              />

              {/* Confirm new password */}
              <Input
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
                required
              />

              {/* Submit button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;