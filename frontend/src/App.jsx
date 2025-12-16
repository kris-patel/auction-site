/**
 * ============================================
 * App.jsx
 * ============================================
 * Main application component
 * Configures routing and role-based access control
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Gavel } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BuyerDashboard from './components/dashboard/BuyerDashboard';
import SellerDashboard from './components/dashboard/SellerDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import RepDashboard from './components/dashboard/RepDashboard';

/**
 * Protected Route wrapper
 * Redirects to login if not authenticated
 * Checks role permissions if specified
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
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
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/**
 * Public Route wrapper
 * Redirects to dashboard if already logged in
 */
const PublicRoute = ({ children }) => {
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

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

/**
 * Dashboard router
 * Redirects to role-specific dashboard based on user role
 */
const DashboardRouter = () => {
  const { user } = useAuth();

  const roleRoutes = {
    buyer: '/dashboard/buyer',
    seller: '/dashboard/seller',
    admin: '/dashboard/admin',
    rep: '/dashboard/rep'
  };

  const redirectPath = roleRoutes[user?.role] || '/dashboard/buyer';
  return <Navigate to={redirectPath} replace />;
};

const App = () => {
  const { loading } = useAuth();

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

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Auto-redirect to role-specific dashboard */}
        <Route index element={<DashboardRouter />} />
        
        {/* Role-specific dashboard routes */}
        <Route 
          path="buyer" 
          element={
            <ProtectedRoute allowedRoles={['buyer']}>
              <BuyerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="seller" 
          element={
            <ProtectedRoute allowedRoles={['seller']}>
              <SellerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="admin" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="rep" 
          element={
            <ProtectedRoute allowedRoles={['rep']}>
              <RepDashboard />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;