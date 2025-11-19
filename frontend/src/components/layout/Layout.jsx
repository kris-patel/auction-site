// // // import React from 'react';
// // // import { Gavel, LogOut } from 'lucide-react';
// // // import { useAuth } from '../../context/AuthContext';
// // // import { Button } from '../common/Button';

// // // const Layout = ({ children }) => {
// // //   const { user, logout } = useAuth();

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <nav className="bg-white shadow-sm border-b">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="flex justify-between items-center h-16">
// // //             <div className="flex items-center gap-3">
// // //               <Gavel className="w-8 h-8 text-blue-600" />
// // //               <div>
// // //                 <h1 className="text-xl font-bold text-gray-900">Auction Platform</h1>
// // //                 <p className="text-xs text-gray-600">{user?.role?.toUpperCase()}</p>
// // //               </div>
// // //             </div>
// // //             <div className="flex items-center gap-4">
// // //               <span className="text-sm text-gray-600">{user?.username}</span>
// // //               <Button onClick={logout} variant="secondary" className="flex items-center gap-2">
// // //                 <LogOut className="w-4 h-4" />
// // //                 Logout
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </nav>
// // //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         {children}
// // //       </main>
// // //     </div>
// // //   );
// // // };

// // // export default Layout;

// // import React from 'react';
// // import { LogOut, User } from 'lucide-react';
// // import { useAuth } from '../../context/AuthContext';
// // import Avatar from '../common/Avatar';

// // const Layout = ({ children }) => {
// //   const { user, logout } = useAuth();

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white shadow-sm border-b border-gray-200">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             {/* Logo/Title */}
// //             <div className="flex items-center">
// //               <h1 className="text-2xl font-bold text-blue-600">Auction Platform</h1>
// //             </div>

// //             {/* User Info & Logout */}
// //             <div className="flex items-center gap-4">
// //               {user && (
// //                 <>
// //                   {/* User Profile Section */}
// //                   <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
// //                     <Avatar 
// //                       src={user.profileImage} 
// //                       name={user.username} 
// //                       size="md"
// //                     />
// //                     <div className="hidden sm:block">
// //                       <p className="text-sm font-medium text-gray-900">{user.username}</p>
// //                       <p className="text-xs text-gray-500 capitalize">{user.role}</p>
// //                     </div>
// //                   </div>

// //                   {/* Logout Button */}
// //                   <button
// //                     onClick={logout}
// //                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// //                   >
// //                     <LogOut className="w-4 h-4" />
// //                     <span className="hidden sm:inline">Logout</span>
// //                   </button>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {children}
// //       </main>
// //     </div>
// //   );
// // };

// // export default Layout;

// import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import { LogOut } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import Avatar from '../common/Avatar';

// const Layout = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo/Title */}
//             <div className="flex items-center">
//               <h1 className="text-2xl font-bold text-blue-600">Auction Platform</h1>
//             </div>

//             {/* User Info & Logout */}
//             <div className="flex items-center gap-4">
//               {user && (
//                 <>
//                   {/* User Profile Section */}
//                   <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
//                     <Avatar 
//                       src={user.profileImage} 
//                       name={user.username} 
//                       size="md"
//                     />
//                     <div className="hidden sm:block">
//                       <p className="text-sm font-medium text-gray-900">{user.username}</p>
//                       <p className="text-xs text-gray-500 capitalize">{user.role}</p>
//                     </div>
//                   </div>

//                   {/* Logout Button */}
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span className="hidden sm:inline">Logout</span>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content - Renders child routes */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import ProfileModal from '../common/ProfileModal';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Auction Platform</h1>
            </div>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              {user && (
                <>
                  {/* User Profile Section - Clickable */}
                  <div 
                    onClick={handleProfileClick}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Avatar 
                      src={user.profileImage} 
                      name={user.username} 
                      size="md"
                    />
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{user.username}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Renders child routes */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};

export default Layout;