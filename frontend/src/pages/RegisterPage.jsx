import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/common/Alert';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Card } from '../components/common/Card';
import api from '../services/api';

const RegisterPage = ({ onNavigate }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'buyer'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // const { user, token } = await api.register(formData);
      // console.log(user, token);
      // login(user, token);

      const res = await api.register(formData);
      console.log("REGISTER RESPONSE:", res);

      const user = res?.user || res?.data?.user || res?.data?.userData;
      const token = res?.token || res?.data?.token || res?.accessToken;

      if (!user || !token) {
        throw new Error("Invalid registration response");
      }

      login(user, token);


      if (user.role === "buyer") {
        onNavigate("buyer");
      } else if (user.role === "seller") {
        onNavigate("seller");
      } else {
        onNavigate("login"); // fallback
      }


    } catch (err) {
      setError(err.message);
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate('login')}
            className="text-blue-600 hover:underline text-sm"
          >
            Already have an account? Sign in
          </button>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;