import React, { useState, useEffect } from 'react';
import { Users, Trash2, Clock, CheckCircle, XCircle, Edit, Search, X } from 'lucide-react';
import { Alert } from '../common/Alert';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import AuctionDetailsModal from '../common/AuctionDetailsModal';
import AuctionEditModal from '../common/AuctionEditModal';
import api from '../../services/api';

const RepDashboard = () => {
  const [users, setUsers] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [message, setMessage] = useState(null);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterAuctions();
  }, [auctions, statusFilter, searchQuery]);

  const loadData = async () => {
    try {
      const [usersData, auctionsData] = await Promise.all([
        api.getRepUsers(),
        api.getRepAuctions()
      ]);
      setUsers(usersData);
      
      const auctionsWithStatus = Array.isArray(auctionsData) ? auctionsData.map(auction => {
        const now = new Date();
        const endDate = new Date(auction.endsAt);
        const isExpired = endDate <= now;
        
        return {
          ...auction,
          computedStatus: isExpired && auction.status === 'active' ? 'completed' : auction.status
        };
      }) : [];
      
      setAuctions(auctionsWithStatus);
    } catch (err) {
      console.error('Error loading data:', err);
      setMessage({ type: 'error', text: 'Failed to load data' });
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
          auction.category?.toLowerCase().includes(query) ||
          auction.seller?.username?.toLowerCase().includes(query)
        );
      });
    }

    setFilteredAuctions(filtered);
  };

  const getFilteredUsers = () => {
    if (!userSearchQuery.trim()) {
      return users;
    }

    const query = userSearchQuery.toLowerCase();
    return users.filter(user => {
      return (
        user.username?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query)
      );
    });
  };

  const clearAuctionSearch = () => {
    setSearchQuery('');
  };

  const clearUserSearch = () => {
    setUserSearchQuery('');
  };

  const getStatusCounts = () => {
    return {
      all: auctions.length,
      pending: auctions.filter(a => a.computedStatus === 'pending').length,
      active: auctions.filter(a => a.computedStatus === 'active').length,
      closed: auctions.filter(a => a.computedStatus === 'closed' || a.computedStatus === 'closed').length
    };
  };

  const handleApproveAuction = async (auctionId, approved) => {
    try {
      await api.approveAuction(auctionId, approved);
      setMessage({ 
        type: 'success', 
        text: approved ? 'Auction approved!' : 'Auction rejected!' 
      });
      loadData();
    } catch (err) {
      console.error('Error approving auction:', err);
      setMessage({ type: 'error', text: 'Failed to process approval' });
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    if (!confirm('Are you sure you want to delete this auction?')) return;

    try {
      await api.deleteAuction(auctionId);
      setMessage({ type: 'success', text: 'Auction deleted successfully!' });
      loadData();
    } catch (err) {
      console.error('Error deleting auction:', err);
      setMessage({ type: 'error', text: 'Failed to delete auction' });
    }
  };

  const handleAuctionClick = (auction) => {
    setSelectedAuction(auction);
    setShowDetailsModal(true);
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
    loadData();
  };

  const statusCounts = getStatusCounts();
  const filteredUsers = getFilteredUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Representative Dashboard</h2>
        <Users className="w-8 h-8 text-blue-600" />
      </div>

      {message && (
        <Alert variant={message.type}>
          {message.text}
        </Alert>
      )}

      {/* Users Table */}
      <Card>
        <h3 className="text-xl font-bold mb-4">All Users</h3>
        
        {/* User Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users by username, email, or role..."
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {userSearchQuery && (
            <button
              onClick={clearUserSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Search Results Count */}
        {userSearchQuery && (
          <div className="text-sm text-gray-600 mb-3">
            Found {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} 
            {userSearchQuery && ` matching "${userSearchQuery}"`}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Username</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{user.username}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'rep' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'seller' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                    {userSearchQuery ? (
                      <>
                        No users found matching "{userSearchQuery}"
                        <button
                          onClick={clearUserSearch}
                          className="ml-2 text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Clear search
                        </button>
                      </>
                    ) : (
                      'No users found'
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Auctions Management */}
      <Card>
        <h3 className="text-xl font-bold mb-4">Manage Auctions</h3>
        
        {/* Auction Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search auctions by title, description, category, or seller..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={clearAuctionSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Search Results Count */}
        {searchQuery && (
          <div className="text-sm text-gray-600 mb-3">
            Found {filteredAuctions.length} auction{filteredAuctions.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        )}
        
        {/* Status Filter Tabs */}
        <div className="border-b border-gray-200 mb-4">
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
              Completed ({statusCounts.closed})
            </button>
          </div>
        </div>

        {/* Auctions List */}
        <div className="space-y-3">
          {filteredAuctions.length > 0 ? (
            filteredAuctions.map(auction => (
              <div
                key={auction.id}
                className="border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between p-4">
                  <div 
                    className="flex-1 cursor-pointer"
                    onClick={() => handleAuctionClick(auction)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{auction.title}</h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        auction.computedStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : auction.computedStatus === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {auction.computedStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {auction.category} - ${auction.currentPrice} - {auction.seller?.username || 'Unknown seller'}
                    </p>
                    {auction._count?.bids > 0 && (
                      <p className="text-xs text-blue-600 mt-1">{auction._count.bids} bids</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 ml-4">
                    {auction.computedStatus === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(auction);
                          }}
                          title="Edit auction"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApproveAuction(auction.id, true);
                          }}
                          title="Approve auction"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApproveAuction(auction.id, false);
                          }}
                          title="Reject auction"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAuction(auction.id);
                      }}
                      className="text-red-600 hover:text-red-800"
                      title="Delete auction"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              {searchQuery ? (
                <>
                  No auctions found matching "{searchQuery}"
                  <button
                    onClick={clearAuctionSearch}
                    className="ml-2 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Clear search
                  </button>
                </>
              ) : (
                `No ${statusFilter !== 'all' ? statusFilter : ''} auctions found`
              )}
            </p>
          )}
        </div>
      </Card>

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
        isRep={true}
      />
    </div>
  );
};

export default RepDashboard;