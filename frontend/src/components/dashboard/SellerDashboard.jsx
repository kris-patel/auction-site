import React, { useState, useEffect } from 'react';
import { List, Plus, Package, Clock, CheckCircle, XCircle, Search, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Card } from '../common/Card';
import AuctionDetailsModal from '../common/AuctionDetailsModal';
import AuctionEditModal from '../common/AuctionEditModal';
import AuctionCard from '../common/AuctionCard';
import api from '../../services/api';

const SellerDashboard = () => {
  const [view, setView] = useState('list');
  const [statusFilter, setStatusFilter] = useState('all');
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    startingPrice: '',
    endsAt: ''
  });
  const [auctionImages, setAuctionImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useAuth();

  useEffect(() => {
    if (view === 'list') loadAuctions();
  }, [view]);

  useEffect(() => {
    filterAuctions();
  }, [auctions, statusFilter, searchQuery]);

  const loadAuctions = async () => {
    try {
      const data = await api.getMyAuctions();
      const auctionsWithUpdatedStatus = Array.isArray(data) ? data.map(auction => {
        const now = new Date();
        const endDate = new Date(auction.endsAt);
        const isExpired = endDate <= now;
        
        return {
          ...auction,
          computedStatus: isExpired && auction.status === 'active' ? 'completed' : auction.status,
          isExpired
        };
      }) : [];
      
      setAuctions(auctionsWithUpdatedStatus);
    } catch (err) {
      console.error('Error loading auctions:', err);
      setMessage({ type: 'error', text: 'Failed to load auctions' });
    }
  };

  const filterAuctions = () => {
    // First filter by status
    let filtered = statusFilter === 'all' 
      ? auctions 
      : auctions.filter(auction => auction.computedStatus === statusFilter);

    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(auction => {
        return (
          auction.title?.toLowerCase().includes(query) ||
          auction.description?.toLowerCase().includes(query) ||
          auction.category?.toLowerCase().includes(query)
        );
      });
    }

    setFilteredAuctions(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const getStatusCounts = () => {
    return {
      all: auctions.length,
      pending: auctions.filter(a => a.computedStatus === 'pending').length,
      active: auctions.filter(a => a.computedStatus === 'active').length,
      completed: auctions.filter(a => a.computedStatus === 'completed' || a.computedStatus === 'closed').length
    };
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      setMessage({ type: 'error', text: 'Maximum 5 images allowed' });
      return;
    }

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

    setAuctionImages(validFiles);
    const previews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setMessage(null);
  };

  const removeImage = (index) => {
    setAuctionImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.createAuction({
        ...formData,
        startingPrice: parseFloat(formData.startingPrice)
      });
      
      const newAuction = response.auction;
      
      if (!newAuction || !newAuction.id) {
        throw new Error('Failed to get auction ID from response');
      }
      
      if (auctionImages.length > 0) {
        await api.uploadAuctionImages(newAuction.id, auctionImages);
      }
      
      setMessage({ type: 'success', text: 'Auction created successfully and pending approval!' });
      setFormData({
        title: '',
        description: '',
        category: 'Electronics',
        startingPrice: '',
        endsAt: ''
      });
      setAuctionImages([]);
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      setImagePreviews([]);
      
      setTimeout(() => {
        setView('list');
        loadAuctions();
      }, 1500);
    } catch (err) {
      console.error('Error creating auction:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || err.message || 'Failed to create auction' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (auction) => {
    setLoadingDetails(true);
    try {
      const fullAuction = await api.getAuctionDetail(auction.id);
      setSelectedAuction(fullAuction);
      setShowDetailsModal(true);
    } catch (err) {
      console.error('Error loading auction details:', err);
      setMessage({ type: 'error', text: 'Failed to load auction details' });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleEdit = async (auction) => {
    try {
      const fullAuction = await api.getAuctionDetail(auction.id);
      setSelectedAuction(fullAuction);
      setShowEditModal(true);
    } catch (err) {
      console.error('Error loading auction for edit:', err);
      setMessage({ type: 'error', text: 'Failed to load auction details' });
    }
  };

  const handleEditSuccess = () => {
    setMessage({ type: 'success', text: 'Auction updated successfully!' });
    loadAuctions();
  };

  const handleDelete = async (auction) => {
    if (!window.confirm(`Are you sure you want to delete "${auction.title}"?`)) {
      return;
    }

    try {
      await api.deleteAuction(auction.id);
      setMessage({ type: 'success', text: 'Auction deleted successfully!' });
      loadAuctions();
    } catch (err) {
      console.error('Error deleting auction:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || 'Failed to delete auction' 
      });
    }
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
        <div className="flex gap-2">
          <Button
            variant={view === 'list' ? 'primary' : 'outline'}
            onClick={() => setView('list')}
          >
            <div className='flex'>
              <List className="w-4 h-4 mr-2 my-1" />
              My Auctions
            </div>
          </Button>
          <Button
            variant={view === 'create' ? 'primary' : 'outline'}
            onClick={() => setView('create')}
          >
            <div className='flex'>
              <Plus className="w-4 h-4 mr-2 my-1" />
              Create
            </div>
          </Button>
        </div>
      </div>

      {message && (
        <Alert variant={message.type}>
          {message.text}
        </Alert>
      )}

      {view === 'create' ? (
        <Card>
          <h3 className="text-xl font-bold mb-4">Create New Auction</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            
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
            
            <Input
              label="Starting Price"
              type="number"
              step="0.01"
              value={formData.startingPrice}
              onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
              required
            />
            
            <Input
              label="End Date"
              type="datetime-local"
              value={formData.endsAt}
              onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              required
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Auction Images (Optional - Max 5)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded border-2 border-blue-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
                      >
                        ×
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {auctionImages.length > 0 && (
                <p className="text-sm text-green-600">
                  {auctionImages.length} image{auctionImages.length > 1 ? 's' : ''} selected (First image will be primary)
                </p>
              )}
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating...' : 'Create Auction'}
            </Button>
          </form>
        </Card>
      ) : (
        <>
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search your auctions by title, description, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Search Results Count */}
          {searchQuery && (
            <div className="text-sm text-gray-600">
              Found {filteredAuctions.length} result{filteredAuctions.length !== 1 ? 's' : ''}
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          )}

          {/* Status Filter Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setStatusFilter('all')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  statusFilter === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All ({statusCounts.all})
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  statusFilter === 'pending'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Clock className="w-4 h-4" />
                Pending ({statusCounts.pending})
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  statusFilter === 'active'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Active ({statusCounts.active})
              </button>
              <button
                onClick={() => setStatusFilter('closed')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  statusFilter === 'closed'
                    ? 'border-gray-500 text-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <XCircle className="w-4 h-4" />
                Completed ({statusCounts.completed})
              </button>
            </div>
          </div>

          {/* Auctions Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAuctions.length > 0 ? (
              filteredAuctions.map(auction => (
                <AuctionCard
                  key={auction.id}
                  auction={auction}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showBidButton={false}
                  showEditButton={auction.status === 'pending'}
                  showDeleteButton={auction.status === 'pending' || (auction.bids?.length === 0 && auction._count?.bids === 0)}
                  isLoading={loadingDetails}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                {searchQuery ? (
                  <>
                    <p>No auctions found matching "{searchQuery}"</p>
                    <button
                      onClick={clearSearch}
                      className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Clear search
                    </button>
                  </>
                ) : (
                  <>
                    <p>No {statusFilter !== 'all' ? statusFilter : ''} auctions found</p>
                    <p className="text-sm mt-2">
                      {statusFilter === 'all' && "Click 'Create' to list your first item"}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}

      <AuctionDetailsModal
        auction={selectedAuction}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedAuction(null);
        }}
      />

      <AuctionEditModal
        auction={selectedAuction}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAuction(null);
        }}
        onSuccess={handleEditSuccess}
        isRep={false}
      />
    </div>
  );
};

export default SellerDashboard;