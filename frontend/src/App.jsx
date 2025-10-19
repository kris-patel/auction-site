import React, { useState } from 'react';
import { Gavel } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BuyerDashboard from './components/dashboard/BuyerDashboard';
import SellerDashboard from './components/dashboard/SellerDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import RepDashboard from './components/dashboard/RepDashboard';

const App = () => {
  const [page, setPage] = useState('login');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Gavel className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (page === 'register') {
      return <RegisterPage onNavigate={setPage} />;
    }
    return <LoginPage onNavigate={setPage} />;
  }

  return (
    <Layout>
      {user.role === 'buyer' && <BuyerDashboard />}
      {user.role === 'seller' && <SellerDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'rep' && <RepDashboard />}
    </Layout>
  );
};

export default App;