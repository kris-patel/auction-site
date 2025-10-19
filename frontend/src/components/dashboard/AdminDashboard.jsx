import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Trash2 } from 'lucide-react';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import api from '../../services/api';

const AdminDashboard = () => {
  const [view, setView] = useState('users');
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  // const loadUsers = async () => {
  //   try {
  //     const data = await api.getUsers();
  //     setUsers(data);
  //   } catch (err) {
  //     setMessage({ type: 'error', text: 'Failed to load users' });
  //   }
  // };
  const loadUsers = async () => {
    try {
      const data = await api.getUsers();
      console.log("Fetched users:", data);

      setUsers(Array.isArray(data) ? data : data?.users || []);
    } catch (err) {
      console.error("Error loading users:", err);
      setMessage({ type: 'error', text: 'Failed to load users' });
    }
  };

  const handleCreateRep = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.createRep(formData);
      setMessage({ type: 'success', text: 'Representative created successfully!' });
      setFormData({ username: '', email: '', password: '' });
      loadUsers();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.deleteUser(userId);
      setMessage({ type: 'success', text: 'User deleted successfully!' });
      loadUsers();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete user' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <div className="flex gap-2">
          <Button
            variant={view === 'users' ? 'primary' : 'outline'}
            onClick={() => setView('users')}
          >
            <Users className="w-4 h-4 mr-2" />
            Users
          </Button>
          <Button
            variant={view === 'create' ? 'primary' : 'outline'}
            onClick={() => setView('create')}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Create Rep
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
          <h3 className="text-xl font-bold mb-4">Create Customer Representative</h3>
          <form onSubmit={handleCreateRep} className="space-y-4">
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Representative'}
            </Button>
          </form>
        </Card>
      ) : (
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
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
                    <td className="px-4 py-3 text-sm">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;