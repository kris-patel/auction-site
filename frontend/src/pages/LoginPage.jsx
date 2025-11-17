// import React, { useState } from 'react';
// import { Gavel } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { Alert } from '../components/common/Alert';
// import { Button } from '../components/common/Button';
// import { Input } from '../components/common/Input';
// import { Card } from '../components/common/Card';
// import api from '../services/api';

// const LoginPage = ({ onNavigate }) => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await api.login(email, password);
//       const { user, token } = res.data; 
//       login(user, token);

//       if (user.role === "buyer") {
//         onNavigate("buyer");
//       } else if (user.role === "seller") {
//         onNavigate("seller");
//       } else {
//         onNavigate("login"); // fallback
//       }

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <div className="text-center mb-6">
//           <Gavel className="w-12 h-12 text-blue-600 mx-auto mb-2" />
//           <h1 className="text-2xl font-bold text-gray-900">Auction Platform</h1>
//           <p className="text-gray-600">Sign in to your account</p>
//         </div>

//         {error && (
//           <Alert variant="error" className="mb-4">
//             {error}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input
//             label="Email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <Input
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? 'Signing in...' : 'Sign In'}
//           </Button>
//         </form>

//         <div className="mt-4 text-center">
//           <button
//             onClick={() => onNavigate('register')}
//             className="text-blue-600 hover:underline text-sm"
//           >
//             Don't have an account? Register
//           </button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gavel } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/common/Alert';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card } from '../components/common/Card';
import api from '../services/api';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.login(email, password);
      const { user, token } = res.data; 
      login(user, token);
      // Navigation happens automatically in AuthContext
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <Gavel className="w-12 h-12 text-blue-600 mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">Auction Platform</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-blue-600 hover:underline text-sm"
          >
            Don't have an account? Register
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

export default LoginPage;