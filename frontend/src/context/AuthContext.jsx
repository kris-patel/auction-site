// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   const token = localStorage.getItem('token');
//   //   const userData = localStorage.getItem('user');
//   //   if (token && userData) {
//   //     setUser(JSON.parse(userData));
//   //   }
//   //   setLoading(false);
//   // }, []);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');

//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//       } catch (e) {
//         console.warn("Invalid user data in localStorage, clearing it.");
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//       }
//     }

//     setLoading(false);
//   }, []);


//   // const login = (userData, token) => {
//   //   localStorage.setItem('token', token);
//   //   localStorage.setItem('user', JSON.stringify(userData));
//   //   setUser(userData);
//   // };

//   const login = (userData, token) => {
//       if (!userData || !token) {
//         console.error("Invalid login data", { userData, token });
//         return;
//       }
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);
//     };


//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   const value = {
//     user,
//     login,
//     logout,
//     loading,
//     isAuthenticated: !!user
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.warn("Invalid user data in localStorage, clearing it.");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }

    setLoading(false);
  }, []);

  const login = (userData, token) => {
    if (!userData || !token) {
      console.error("Invalid login data", { userData, token });
      return;
    }
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    // Navigate to dashboard after successful login
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};