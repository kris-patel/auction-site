// // import React, { useState } from 'react';
// // import { Gavel } from 'lucide-react';
// // import { useAuth } from './context/AuthContext';
// // import Layout from './components/layout/Layout';
// // import LoginPage from './pages/LoginPage';
// // import RegisterPage from './pages/RegisterPage';
// // import BuyerDashboard from './components/dashboard/BuyerDashboard';
// // import SellerDashboard from './components/dashboard/SellerDashboard';
// // import AdminDashboard from './components/dashboard/AdminDashboard';
// // import RepDashboard from './components/dashboard/RepDashboard';

// // const App = () => {
// //   const [page, setPage] = useState('login');
// //   const { user, loading } = useAuth();

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <Gavel className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
// //           <p className="text-gray-600">Loading...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!user) {
// //     if (page === 'register') {
// //       return <RegisterPage onNavigate={setPage} />;
// //     }
// //     return <LoginPage onNavigate={setPage} />;
// //   }

// //   return (
// //     <Layout>
// //       {user.role === 'buyer' && <BuyerDashboard />}
// //       {user.role === 'seller' && <SellerDashboard />}
// //       {user.role === 'admin' && <AdminDashboard />}
// //       {user.role === 'rep' && <RepDashboard />}
// //     </Layout>
// //   );
// // };

// // export default App;

// import React, { useState } from 'react';
// import { Gavel } from 'lucide-react';
// import { useAuth } from './context/AuthContext';
// import Layout from './components/layout/Layout';
// import LandingPage from './pages/LandingPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import BuyerDashboard from './components/dashboard/BuyerDashboard';
// import SellerDashboard from './components/dashboard/SellerDashboard';
// import AdminDashboard from './components/dashboard/AdminDashboard';
// import RepDashboard from './components/dashboard/RepDashboard';

// const App = () => {
//   const [page, setPage] = useState('landing'); // Changed from 'login' to 'landing'
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <Gavel className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // If user is not logged in, show public pages
//   if (!user) {
//     if (page === 'register') {
//       return <RegisterPage onNavigate={setPage} />;
//     }
//     if (page === 'login') {
//       return <LoginPage onNavigate={setPage} />;
//     }
//     // Default to landing page
//     return <LandingPage onNavigate={setPage} />;
//   }

//   // If user is logged in, show their dashboard
//   return (
//     <Layout>
//       {user.role === 'buyer' && <BuyerDashboard />}
//       {user.role === 'seller' && <SellerDashboard />}
//       {user.role === 'admin' && <AdminDashboard />}
//       {user.role === 'rep' && <RepDashboard />}
//     </Layout>
//   );
// };

// export default App;

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

// Protected Route wrapper component
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

// Public Route wrapper - redirects to dashboard if already logged in
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

// Dashboard router - redirects to role-specific dashboard
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
        {/* Default dashboard redirect based on role */}
        <Route index element={<DashboardRouter />} />
        
        {/* Role-specific dashboards */}
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