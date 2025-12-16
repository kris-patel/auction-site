/**
 * ============================================
 * RegisterPage.jsx
 * ============================================
 * Registration page for new users
 * 
 * Features:
 * - User registration form (username, email, password, role)
 * - Optional profile picture upload
 * - Image preview before upload
 * - Role selection (buyer or seller)
 * - Form validation and error handling
 * - Auto-login after successful registration
 * - Link to login page for existing users
 * - Image size and type validation (max 5MB, images only)
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/common/Alert';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Card } from '../components/common/Card';
import api from '../services/api';

const RegisterPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer'
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Registering user with data:', formData);

      // Register user first
      const res = await api.register(formData);
      console.log('Registration response:', res);

      const user = res?.data?.user || res?.user;
      const token = res?.data?.token || res?.token;

      if (!user || !token) {
        throw new Error("Invalid registration response");
      }

      // Login user immediately
      login(user, token);

      // Upload profile image if provided
      if (profileImage) {
        try {
          console.log('Uploading profile image...');
          const uploadResponse = await api.uploadProfileImage(profileImage);
          console.log('Profile image upload response:', uploadResponse);
          
          // Update user data with new profile image
          if (uploadResponse.user) {
            login(uploadResponse.user, token);
          }
        } catch (imgErr) {
          console.error('Failed to upload profile image:', imgErr);
          // Don't block registration if image upload fails
        }
      }

      // Navigation happens automatically in AuthContext
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Register as Buyer or Seller</p>
        </div>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: 'buyer', label: 'Buyer' },
              { value: 'seller', label: 'Seller' }
            ]}
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile Picture (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {imagePreview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-blue-300"
                />
              </div>
            )}
          </div>

          <Button 
            type="submit"
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-blue-600 hover:underline text-sm"
          >
            Already have an account? Sign in
          </Link>
        </div>

        <div className="mt-2 text-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-900 text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;