import React, { useState, useEffect } from 'react';
import { List, Plus, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Card } from '../common/Card';
import api from '../../services/api';

const SellerDashboard = () => {
  const [view, setView] = useState('list');
  const [auctions, setAuctions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    startingPrice: '',
    endsAt: ''
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (view === 'list') loadAuctions();
  }, [view]);

  const loadAuctions = async () => {
    try {
      const data = await api.getMyAuctions(user.id);
      setAuctions(data);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load auctions' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.createAuction({
        ...formData,
        sellerId: user.id,
        startingPrice: parseFloat(formData.startingPrice)
      });
      setMessage({ type: 'success', text: 'Auction created successfully!' });
      setFormData({
        title: '',
        description: '',
        category: 'Electronics',
        startingPrice: '',
        endsAt: ''
      });
      setTimeout(() => setView('list'), 1500);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to create auction' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
        <div className="flex gap-2">
          <Button
            variant={view === 'list' ? 'primary' : 'outline'}
            onClick={() => setView('list')}
          >
            <List className="w-4 h-4 mr-2" />
            My Auctions
          </Button>
          <Button
            variant={view === 'create' ? 'primary' : 'outline'}
            onClick={() => setView('create')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create
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
              type="date"
              value={formData.endsAt}
              onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Auction'}
            </Button>
          </form>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {auctions.map(auction => (
            <Card key={auction.id}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{auction.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  auction.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {auction.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{auction.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Price:</span>
                  <span className="font-bold text-green-600">${auction.currentPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{auction.category}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {view === 'list' && auctions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No auctions created yet</p>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;