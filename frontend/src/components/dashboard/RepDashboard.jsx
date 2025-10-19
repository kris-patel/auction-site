import React, { useState, useEffect } from 'react';
import { Users, Trash2 } from 'lucide-react';
import { Alert } from '../common/Alert';
import { Card } from '../common/Card';
import api from '../../services/api';

const RepDashboard = () => {
  const [users, setUsers] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, auctionsData] = await Promise.all([
        api.getUsers(),
        api.getAuctions()
      ]);
      setUsers(usersData);
      setAuctions(auctionsData);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load data' });
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    if (!confirm('Are you sure you want to delete this auction?')) return;

    try {
      await api.deleteAuction(auctionId);
      setMessage({ type: 'success', text: 'Auction deleted successfully!' });
      loadData();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete auction' });
    }
  };

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

      <Card>
        <h3 className="text-xl font-bold mb-4">All Users</h3>
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
              {users.map(user => (
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
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h3 className="text-xl font-bold mb-4">Manage Auctions</h3>
        <div className="space-y-3">
          {auctions.map(auction => (
            <div key={auction.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-semibold">{auction.title}</h4>
                <p className="text-sm text-gray-600">{auction.category} - ${auction.currentPrice}</p>
              </div>
              <button
                onClick={() => handleDeleteAuction(auction.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RepDashboard;