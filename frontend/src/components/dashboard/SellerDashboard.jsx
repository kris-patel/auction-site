// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import { List, Plus, Package } from 'lucide-react';
// // // // // // // // import { useAuth } from '../../context/AuthContext';
// // // // // // // // import { Alert } from '../common/Alert';
// // // // // // // // import { Button } from '../common/Button';
// // // // // // // // import { Input } from '../common/Input';
// // // // // // // // import { Select } from '../common/Select';
// // // // // // // // import { Card } from '../common/Card';
// // // // // // // // import api from '../../services/api';

// // // // // // // // const SellerDashboard = () => {
// // // // // // // //   const [view, setView] = useState('list');
// // // // // // // //   const [auctions, setAuctions] = useState([]);
// // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // //     title: '',
// // // // // // // //     description: '',
// // // // // // // //     category: 'Electronics',
// // // // // // // //     startingPrice: '',
// // // // // // // //     endsAt: ''
// // // // // // // //   });
// // // // // // // //   const [message, setMessage] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // //   const { user } = useAuth();

  

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (view === 'list') loadAuctions();
// // // // // // // //   }, [view]);

// // // // // // // //   const loadAuctions = async () => {
// // // // // // // //     try {
// // // // // // // //       const data = await api.getMyAuctions(user.id);
// // // // // // // //       setAuctions(data);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage({ type: 'error', text: 'Failed to load auctions' });
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSubmit = async (e) => {
// // // // // // // //     e.preventDefault();
// // // // // // // //     setLoading(true);
// // // // // // // //     setMessage(null);

// // // // // // // //     try {
// // // // // // // //       await api.createAuction({
// // // // // // // //         ...formData,
// // // // // // // //         sellerId: user.id,
// // // // // // // //         startingPrice: parseFloat(formData.startingPrice)
// // // // // // // //       });
// // // // // // // //       setMessage({ type: 'success', text: 'Auction created successfully!' });
// // // // // // // //       setFormData({
// // // // // // // //         title: '',
// // // // // // // //         description: '',
// // // // // // // //         category: 'Electronics',
// // // // // // // //         startingPrice: '',
// // // // // // // //         endsAt: ''
// // // // // // // //       });
// // // // // // // //       setTimeout(() => setView('list'), 1500);
// // // // // // // //     } catch (err) {
// // // // // // // //       setMessage({ type: 'error', text: 'Failed to create auction' });
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="space-y-6">
// // // // // // // //       <div className="flex items-center justify-between">
// // // // // // // //         <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
// // // // // // // //         <div className="flex gap-2">
// // // // // // // //           <Button
// // // // // // // //             variant={view === 'list' ? 'primary' : 'outline'}
// // // // // // // //             onClick={() => setView('list')}
// // // // // // // //           >
// // // // // // // //             <List className="w-4 h-4 mr-2" />
// // // // // // // //             My Auctions
// // // // // // // //           </Button>
// // // // // // // //           <Button
// // // // // // // //             variant={view === 'create' ? 'primary' : 'outline'}
// // // // // // // //             onClick={() => setView('create')}
// // // // // // // //           >
// // // // // // // //             <Plus className="w-4 h-4 mr-2" />
// // // // // // // //             Create
// // // // // // // //           </Button>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {message && (
// // // // // // // //         <Alert variant={message.type}>
// // // // // // // //           {message.text}
// // // // // // // //         </Alert>
// // // // // // // //       )}

// // // // // // // //       {view === 'create' ? (
// // // // // // // //         <Card>
// // // // // // // //           <h3 className="text-xl font-bold mb-4">Create New Auction</h3>
// // // // // // // //           <form onSubmit={handleSubmit} className="space-y-4">
// // // // // // // //             <Input
// // // // // // // //               label="Title"
// // // // // // // //               value={formData.title}
// // // // // // // //               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //             <div className="space-y-1">
// // // // // // // //               <label className="block text-sm font-medium text-gray-700">Description</label>
// // // // // // // //               <textarea
// // // // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // // // // // //                 rows="4"
// // // // // // // //                 value={formData.description}
// // // // // // // //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // // // // // // //                 required
// // // // // // // //               />
// // // // // // // //             </div>
// // // // // // // //             <Select
// // // // // // // //               label="Category"
// // // // // // // //               value={formData.category}
// // // // // // // //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // // // // // // //               options={[
// // // // // // // //                 { value: 'Electronics', label: 'Electronics' },
// // // // // // // //                 { value: 'Fashion', label: 'Fashion' },
// // // // // // // //                 { value: 'Home', label: 'Home & Garden' },
// // // // // // // //                 { value: 'Sports', label: 'Sports' },
// // // // // // // //                 { value: 'Other', label: 'Other' }
// // // // // // // //               ]}
// // // // // // // //             />
// // // // // // // //             <Input
// // // // // // // //               label="Starting Price"
// // // // // // // //               type="number"
// // // // // // // //               step="0.01"
// // // // // // // //               value={formData.startingPrice}
// // // // // // // //               onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //             <Input
// // // // // // // //               label="End Date"
// // // // // // // //               type="date"
// // // // // // // //               value={formData.endsAt}
// // // // // // // //               onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
// // // // // // // //               required
// // // // // // // //             />
// // // // // // // //             <Button type="submit" disabled={loading}>
// // // // // // // //               {loading ? 'Creating...' : 'Create Auction'}
// // // // // // // //             </Button>
// // // // // // // //           </form>
// // // // // // // //         </Card>
// // // // // // // //       ) : (
// // // // // // // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // // // // // // //           {auctions.map(auction => (
// // // // // // // //             <Card key={auction.id}>
// // // // // // // //               <div className="flex justify-between items-start mb-2">
// // // // // // // //                 <h3 className="font-bold text-lg">{auction.title}</h3>
// // // // // // // //                 <span className={`px-2 py-1 rounded text-xs font-medium ${
// // // // // // // //                   auction.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
// // // // // // // //                 }`}>
// // // // // // // //                   {auction.status}
// // // // // // // //                 </span>
// // // // // // // //               </div>
// // // // // // // //               <p className="text-gray-600 text-sm mb-3">{auction.description}</p>
// // // // // // // //               <div className="space-y-2">
// // // // // // // //                 <div className="flex justify-between text-sm">
// // // // // // // //                   <span className="text-gray-600">Current Price:</span>
// // // // // // // //                   <span className="font-bold text-green-600">${auction.currentPrice}</span>
// // // // // // // //                 </div>
// // // // // // // //                 <div className="flex justify-between text-sm">
// // // // // // // //                   <span className="text-gray-600">Category:</span>
// // // // // // // //                   <span className="font-medium">{auction.category}</span>
// // // // // // // //                 </div>
// // // // // // // //               </div>
// // // // // // // //             </Card>
// // // // // // // //           ))}
// // // // // // // //         </div>
// // // // // // // //       )}

// // // // // // // //       {view === 'list' && auctions.length === 0 && (
// // // // // // // //         <div className="text-center py-12 text-gray-500">
// // // // // // // //           <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
// // // // // // // //           <p>No auctions created yet</p>
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default SellerDashboard;

// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { List, Plus, Package } from 'lucide-react';
// // // // // // // import { useAuth } from '../../context/AuthContext';
// // // // // // // import { Alert } from '../common/Alert';
// // // // // // // import { Button } from '../common/Button';
// // // // // // // import { Input } from '../common/Input';
// // // // // // // import { Select } from '../common/Select';
// // // // // // // import { Card } from '../common/Card';
// // // // // // // import api from '../../services/api';

// // // // // // // const SellerDashboard = () => {
// // // // // // //   const [view, setView] = useState('list');
// // // // // // //   const [auctions, setAuctions] = useState([]);
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     title: '',
// // // // // // //     description: '',
// // // // // // //     category: 'Electronics',
// // // // // // //     startingPrice: '',
// // // // // // //     endsAt: ''
// // // // // // //   });
// // // // // // //   const [message, setMessage] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const { user } = useAuth();

// // // // // // //   useEffect(() => {
// // // // // // //     if (view === 'list') loadAuctions();
// // // // // // //   }, [view]);

// // // // // // //   const loadAuctions = async () => {
// // // // // // //     try {
// // // // // // //       const data = await api.getMyAuctions();
// // // // // // //       setAuctions(Array.isArray(data) ? data : []);
// // // // // // //     } catch (err) {
// // // // // // //       console.error('Error loading auctions:', err);
// // // // // // //       setMessage({ type: 'error', text: 'Failed to load auctions' });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSubmit = async (e) => {
// // // // // // //     e.preventDefault();
// // // // // // //     setLoading(true);
// // // // // // //     setMessage(null);

// // // // // // //     try {
// // // // // // //       await api.createAuction({
// // // // // // //         ...formData,
// // // // // // //         startingPrice: parseFloat(formData.startingPrice)
// // // // // // //       });
// // // // // // //       setMessage({ type: 'success', text: 'Auction created successfully!' });
// // // // // // //       setFormData({
// // // // // // //         title: '',
// // // // // // //         description: '',
// // // // // // //         category: 'Electronics',
// // // // // // //         startingPrice: '',
// // // // // // //         endsAt: ''
// // // // // // //       });
// // // // // // //       setTimeout(() => setView('list'), 1500);
// // // // // // //     } catch (err) {
// // // // // // //       console.error('Error creating auction:', err);
// // // // // // //       setMessage({ type: 'error', text: 'Failed to create auction' });
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="space-y-6">
// // // // // // //       <div className="flex items-center justify-between">
// // // // // // //         <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
// // // // // // //         <div className="flex gap-2">
// // // // // // //           <Button
// // // // // // //             variant={view === 'list' ? 'primary' : 'outline'}
// // // // // // //             onClick={() => setView('list')}
// // // // // // //           >
// // // // // // //             <List className="w-4 h-4 mr-2" />
// // // // // // //             My Auctions
// // // // // // //           </Button>
// // // // // // //           <Button
// // // // // // //             variant={view === 'create' ? 'primary' : 'outline'}
// // // // // // //             onClick={() => setView('create')}
// // // // // // //           >
// // // // // // //             <Plus className="w-4 h-4 mr-2" />
// // // // // // //             Create
// // // // // // //           </Button>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {message && (
// // // // // // //         <Alert variant={message.type}>
// // // // // // //           {message.text}
// // // // // // //         </Alert>
// // // // // // //       )}

// // // // // // //       {view === 'create' ? (
// // // // // // //         <Card>
// // // // // // //           <h3 className="text-xl font-bold mb-4">Create New Auction</h3>
// // // // // // //           <form onSubmit={handleSubmit} className="space-y-4">
// // // // // // //             <Input
// // // // // // //               label="Title"
// // // // // // //               value={formData.title}
// // // // // // //               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// // // // // // //               required
// // // // // // //             />
// // // // // // //             <div className="space-y-1">
// // // // // // //               <label className="block text-sm font-medium text-gray-700">Description</label>
// // // // // // //               <textarea
// // // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // // // // //                 rows="4"
// // // // // // //                 value={formData.description}
// // // // // // //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // // // // // //                 required
// // // // // // //               />
// // // // // // //             </div>
// // // // // // //             <Select
// // // // // // //               label="Category"
// // // // // // //               value={formData.category}
// // // // // // //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // // // // // //               options={[
// // // // // // //                 { value: 'Electronics', label: 'Electronics' },
// // // // // // //                 { value: 'Fashion', label: 'Fashion' },
// // // // // // //                 { value: 'Home', label: 'Home & Garden' },
// // // // // // //                 { value: 'Sports', label: 'Sports' },
// // // // // // //                 { value: 'Other', label: 'Other' }
// // // // // // //               ]}
// // // // // // //             />
// // // // // // //             <Input
// // // // // // //               label="Starting Price"
// // // // // // //               type="number"
// // // // // // //               step="0.01"
// // // // // // //               value={formData.startingPrice}
// // // // // // //               onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
// // // // // // //               required
// // // // // // //             />
// // // // // // //             <Input
// // // // // // //               label="End Date"
// // // // // // //               type="date"
// // // // // // //               value={formData.endsAt}
// // // // // // //               onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
// // // // // // //               required
// // // // // // //             />
// // // // // // //             <Button type="submit" disabled={loading}>
// // // // // // //               {loading ? 'Creating...' : 'Create Auction'}
// // // // // // //             </Button>
// // // // // // //           </form>
// // // // // // //         </Card>
// // // // // // //       ) : (
// // // // // // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // // // // // //           {auctions.length > 0 ? (
// // // // // // //             auctions.map(auction => (
// // // // // // //               <Card key={auction.id}>
// // // // // // //                 <div className="flex justify-between items-start mb-2">
// // // // // // //                   <h3 className="font-bold text-lg">{auction.title}</h3>
// // // // // // //                   <span className={`px-2 py-1 rounded text-xs font-medium ${
// // // // // // //                     auction.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
// // // // // // //                   }`}>
// // // // // // //                     {auction.status}
// // // // // // //                   </span>
// // // // // // //                 </div>
// // // // // // //                 <p className="text-gray-600 text-sm mb-3">{auction.description}</p>
// // // // // // //                 <div className="space-y-2">
// // // // // // //                   <div className="flex justify-between text-sm">
// // // // // // //                     <span className="text-gray-600">Current Price:</span>
// // // // // // //                     <span className="font-bold text-green-600">${auction.currentPrice}</span>
// // // // // // //                   </div>
// // // // // // //                   <div className="flex justify-between text-sm">
// // // // // // //                     <span className="text-gray-600">Category:</span>
// // // // // // //                     <span className="font-medium">{auction.category || 'N/A'}</span>
// // // // // // //                   </div>
// // // // // // //                   <div className="flex justify-between text-sm">
// // // // // // //                     <span className="text-gray-600">Ends:</span>
// // // // // // //                     <span className="font-medium">{new Date(auction.endsAt).toLocaleDateString()}</span>
// // // // // // //                   </div>
// // // // // // //                   {auction.bids && auction.bids.length > 0 && (
// // // // // // //                     <div className="flex justify-between text-sm">
// // // // // // //                       <span className="text-gray-600">Total Bids:</span>
// // // // // // //                       <span className="font-medium">{auction.bids.length}</span>
// // // // // // //                     </div>
// // // // // // //                   )}
// // // // // // //                 </div>
// // // // // // //               </Card>
// // // // // // //             ))
// // // // // // //           ) : (
// // // // // // //             <div className="col-span-full text-center py-12 text-gray-500">
// // // // // // //               <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
// // // // // // //               <p>No auctions created yet</p>
// // // // // // //             </div>
// // // // // // //           )}
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default SellerDashboard;

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { List, Plus, Package, Clock } from 'lucide-react';
// // // // // // import { useAuth } from '../../context/AuthContext';
// // // // // // import { Alert } from '../common/Alert';
// // // // // // import { Button } from '../common/Button';
// // // // // // import { Input } from '../common/Input';
// // // // // // import { Select } from '../common/Select';
// // // // // // import { Card } from '../common/Card';
// // // // // // import api from '../../services/api';

// // // // // // const SellerDashboard = () => {
// // // // // //   const [view, setView] = useState('list');
// // // // // //   const [auctions, setAuctions] = useState([]);
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     title: '',
// // // // // //     description: '',
// // // // // //     category: 'Electronics',
// // // // // //     startingPrice: '',
// // // // // //     endsAt: ''
// // // // // //   });
// // // // // //   const [message, setMessage] = useState(null);
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const { user } = useAuth();

// // // // // //   useEffect(() => {
// // // // // //     if (view === 'list') loadAuctions();
// // // // // //   }, [view]);

// // // // // //   const loadAuctions = async () => {
// // // // // //     try {
// // // // // //       const data = await api.getMyAuctions();
// // // // // //       const auctionsWithUpdatedStatus = Array.isArray(data) ? data.map(auction => {
// // // // // //         const now = new Date();
// // // // // //         const endDate = new Date(auction.endsAt);
// // // // // //         const isExpired = endDate <= now;
        
// // // // // //         return {
// // // // // //           ...auction,
// // // // // //           status: isExpired ? 'closed' : auction.status,
// // // // // //           isExpired
// // // // // //         };
// // // // // //       }) : [];
      
// // // // // //       setAuctions(auctionsWithUpdatedStatus);
// // // // // //     } catch (err) {
// // // // // //       console.error('Error loading auctions:', err);
// // // // // //       setMessage({ type: 'error', text: 'Failed to load auctions' });
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSubmit = async (e) => {
// // // // // //     e.preventDefault();
// // // // // //     setLoading(true);
// // // // // //     setMessage(null);

// // // // // //     try {
// // // // // //       await api.createAuction({
// // // // // //         ...formData,
// // // // // //         startingPrice: parseFloat(formData.startingPrice)
// // // // // //       });
// // // // // //       setMessage({ type: 'success', text: 'Auction created successfully!' });
// // // // // //       setFormData({
// // // // // //         title: '',
// // // // // //         description: '',
// // // // // //         category: 'Electronics',
// // // // // //         startingPrice: '',
// // // // // //         endsAt: ''
// // // // // //       });
// // // // // //       setTimeout(() => setView('list'), 1500);
// // // // // //     } catch (err) {
// // // // // //       console.error('Error creating auction:', err);
// // // // // //       setMessage({ type: 'error', text: 'Failed to create auction' });
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Helper function to check time remaining
// // // // // //   const getTimeRemaining = (endsAt) => {
// // // // // //     const now = new Date();
// // // // // //     const endDate = new Date(endsAt);
// // // // // //     const diffMs = endDate - now;
    
// // // // // //     if (diffMs <= 0) return 'Ended';
    
// // // // // //     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
// // // // // //     const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
// // // // // //     if (diffDays > 0) return `${diffDays}d ${diffHours}h remaining`;
// // // // // //     return `${diffHours}h remaining`;
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="space-y-6">
// // // // // //       <div className="flex items-center justify-between">
// // // // // //         <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
// // // // // //         <div className="flex gap-2">
// // // // // //           <Button
// // // // // //             variant={view === 'list' ? 'primary' : 'outline'}
// // // // // //             onClick={() => setView('list')}
// // // // // //           >
// // // // // //             <List className="w-4 h-4 mr-2" />
// // // // // //             My Auctions
// // // // // //           </Button>
// // // // // //           <Button
// // // // // //             variant={view === 'create' ? 'primary' : 'outline'}
// // // // // //             onClick={() => setView('create')}
// // // // // //           >
// // // // // //             <Plus className="w-4 h-4 mr-2" />
// // // // // //             Create
// // // // // //           </Button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {message && (
// // // // // //         <Alert variant={message.type}>
// // // // // //           {message.text}
// // // // // //         </Alert>
// // // // // //       )}

// // // // // //       {view === 'create' ? (
// // // // // //         <Card>
// // // // // //           <h3 className="text-xl font-bold mb-4">Create New Auction</h3>
// // // // // //           <form onSubmit={handleSubmit} className="space-y-4">
// // // // // //             <Input
// // // // // //               label="Title"
// // // // // //               value={formData.title}
// // // // // //               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// // // // // //               required
// // // // // //             />
// // // // // //             <div className="space-y-1">
// // // // // //               <label className="block text-sm font-medium text-gray-700">Description</label>
// // // // // //               <textarea
// // // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // // // //                 rows="4"
// // // // // //                 value={formData.description}
// // // // // //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // // // // //                 required
// // // // // //               />
// // // // // //             </div>
// // // // // //             <Select
// // // // // //               label="Category"
// // // // // //               value={formData.category}
// // // // // //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // // // // //               options={[
// // // // // //                 { value: 'Electronics', label: 'Electronics' },
// // // // // //                 { value: 'Fashion', label: 'Fashion' },
// // // // // //                 { value: 'Home', label: 'Home & Garden' },
// // // // // //                 { value: 'Sports', label: 'Sports' },
// // // // // //                 { value: 'Other', label: 'Other' }
// // // // // //               ]}
// // // // // //             />
// // // // // //             <Input
// // // // // //               label="Starting Price"
// // // // // //               type="number"
// // // // // //               step="0.01"
// // // // // //               value={formData.startingPrice}
// // // // // //               onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
// // // // // //               required
// // // // // //             />
// // // // // //             <Input
// // // // // //               label="End Date"
// // // // // //               type="date"
// // // // // //               value={formData.endsAt}
// // // // // //               onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
// // // // // //               required
// // // // // //             />
// // // // // //             <Button type="submit" disabled={loading}>
// // // // // //               {loading ? 'Creating...' : 'Create Auction'}
// // // // // //             </Button>
// // // // // //           </form>
// // // // // //         </Card>
// // // // // //       ) : (
// // // // // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // // // // //           {auctions.length > 0 ? (
// // // // // //             auctions.map(auction => (
// // // // // //               <Card key={auction.id} className={auction.isExpired ? 'opacity-75' : ''}>
// // // // // //                 <div className="flex justify-between items-start mb-2">
// // // // // //                   <h3 className="font-bold text-lg">{auction.title}</h3>
// // // // // //                   <span className={`px-2 py-1 rounded text-xs font-medium ${
// // // // // //                     auction.isExpired
// // // // // //                       ? 'bg-red-100 text-red-800'
// // // // // //                       : auction.status === 'active'
// // // // // //                       ? 'bg-green-100 text-green-800'
// // // // // //                       : 'bg-gray-100 text-gray-800'
// // // // // //                   }`}>
// // // // // //                     {auction.isExpired ? 'Expired' : auction.status}
// // // // // //                   </span>
// // // // // //                 </div>
// // // // // //                 <p className="text-gray-600 text-sm mb-3">{auction.description}</p>
// // // // // //                 <div className="space-y-2">
// // // // // //                   <div className="flex justify-between text-sm">
// // // // // //                     <span className="text-gray-600">Current Price:</span>
// // // // // //                     <span className="font-bold text-green-600">${auction.currentPrice}</span>
// // // // // //                   </div>
// // // // // //                   <div className="flex justify-between text-sm">
// // // // // //                     <span className="text-gray-600">Category:</span>
// // // // // //                     <span className="font-medium">{auction.category || 'N/A'}</span>
// // // // // //                   </div>
// // // // // //                   <div className="flex justify-between text-sm items-center">
// // // // // //                     <span className="text-gray-600 flex items-center gap-1">
// // // // // //                       <Clock className="w-3 h-3" />
// // // // // //                       Time:
// // // // // //                     </span>
// // // // // //                     <span className={`font-medium ${auction.isExpired ? 'text-red-600' : 'text-blue-600'}`}>
// // // // // //                       {getTimeRemaining(auction.endsAt)}
// // // // // //                     </span>
// // // // // //                   </div>
// // // // // //                   {auction.bids && auction.bids.length > 0 && (
// // // // // //                     <div className="flex justify-between text-sm">
// // // // // //                       <span className="text-gray-600">Total Bids:</span>
// // // // // //                       <span className="font-medium">{auction.bids.length}</span>
// // // // // //                     </div>
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //               </Card>
// // // // // //             ))
// // // // // //           ) : (
// // // // // //             <div className="col-span-full text-center py-12 text-gray-500">
// // // // // //               <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
// // // // // //               <p>No auctions created yet</p>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default SellerDashboard;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { List, Plus, Package, Clock } from 'lucide-react';
// // // // // import { useAuth } from '../../context/AuthContext';
// // // // // import { Alert } from '../common/Alert';
// // // // // import { Button } from '../common/Button';
// // // // // import { Input } from '../common/Input';
// // // // // import { Select } from '../common/Select';
// // // // // import { Card } from '../common/Card';
// // // // // import AuctionDetailsModal from '../common/AuctionDetailsModal';
// // // // // import api from '../../services/api';

// // // // // const SellerDashboard = () => {
// // // // //   const [view, setView] = useState('list');
// // // // //   const [auctions, setAuctions] = useState([]);
// // // // //   const [selectedAuction, setSelectedAuction] = useState(null);
// // // // //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// // // // //   const [formData, setFormData] = useState({
// // // // //     title: '',
// // // // //     description: '',
// // // // //     category: 'Electronics',
// // // // //     startingPrice: '',
// // // // //     endsAt: ''
// // // // //   });
// // // // //   const [message, setMessage] = useState(null);
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const { user } = useAuth();

// // // // //   useEffect(() => {
// // // // //     if (view === 'list') loadAuctions();
// // // // //   }, [view]);

// // // // //   const loadAuctions = async () => {
// // // // //     try {
// // // // //       const data = await api.getMyAuctions();
// // // // //       const auctionsWithUpdatedStatus = Array.isArray(data) ? data.map(auction => {
// // // // //         const now = new Date();
// // // // //         const endDate = new Date(auction.endsAt);
// // // // //         const isExpired = endDate <= now;
        
// // // // //         return {
// // // // //           ...auction,
// // // // //           status: isExpired ? 'closed' : auction.status,
// // // // //           isExpired
// // // // //         };
// // // // //       }) : [];
      
// // // // //       setAuctions(auctionsWithUpdatedStatus);
// // // // //     } catch (err) {
// // // // //       console.error('Error loading auctions:', err);
// // // // //       setMessage({ type: 'error', text: 'Failed to load auctions' });
// // // // //     }
// // // // //   };

// // // // //   const handleSubmit = async (e) => {
// // // // //     e.preventDefault();
// // // // //     setLoading(true);
// // // // //     setMessage(null);

// // // // //     try {
// // // // //       await api.createAuction({
// // // // //         ...formData,
// // // // //         startingPrice: parseFloat(formData.startingPrice)
// // // // //       });
// // // // //       setMessage({ type: 'success', text: 'Auction created successfully!' });
// // // // //       setFormData({
// // // // //         title: '',
// // // // //         description: '',
// // // // //         category: 'Electronics',
// // // // //         startingPrice: '',
// // // // //         endsAt: ''
// // // // //       });
// // // // //       setTimeout(() => setView('list'), 1500);
// // // // //     } catch (err) {
// // // // //       console.error('Error creating auction:', err);
// // // // //       setMessage({ type: 'error', text: 'Failed to create auction' });
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const getTimeRemaining = (endsAt) => {
// // // // //     const now = new Date();
// // // // //     const endDate = new Date(endsAt);
// // // // //     const diffMs = endDate - now;
    
// // // // //     if (diffMs <= 0) return 'Ended';
    
// // // // //     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
// // // // //     const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
// // // // //     if (diffDays > 0) return `${diffDays}d ${diffHours}h remaining`;
// // // // //     return `${diffHours}h remaining`;
// // // // //   };

// // // // //   const handleAuctionClick = (auction) => {
// // // // //     setSelectedAuction(auction);
// // // // //     setShowDetailsModal(true);
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-6">
// // // // //       <div className="flex items-center justify-between">
// // // // //         <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
// // // // //         <div className="flex gap-2">
// // // // //           <Button
// // // // //             variant={view === 'list' ? 'primary' : 'outline'}
// // // // //             onClick={() => setView('list')}
// // // // //           >
// // // // //             <List className="w-4 h-4 mr-2" />
// // // // //             My Auctions
// // // // //           </Button>
// // // // //           <Button
// // // // //             variant={view === 'create' ? 'primary' : 'outline'}
// // // // //             onClick={() => setView('create')}
// // // // //           >
// // // // //             <Plus className="w-4 h-4 mr-2" />
// // // // //             Create
// // // // //           </Button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {message && (
// // // // //         <Alert variant={message.type}>
// // // // //           {message.text}
// // // // //         </Alert>
// // // // //       )}

// // // // //       {view === 'create' ? (
// // // // //         <Card>
// // // // //           <h3 className="text-xl font-bold mb-4">Create New Auction</h3>
// // // // //           <form onSubmit={handleSubmit} className="space-y-4">
// // // // //             <Input
// // // // //               label="Title"
// // // // //               value={formData.title}
// // // // //               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// // // // //               required
// // // // //             />
// // // // //             <div className="space-y-1">
// // // // //               <label className="block text-sm font-medium text-gray-700">Description</label>
// // // // //               <textarea
// // // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // // //                 rows="4"
// // // // //                 value={formData.description}
// // // // //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // // // //                 required
// // // // //               />
// // // // //             </div>
// // // // //             <Select
// // // // //               label="Category"
// // // // //               value={formData.category}
// // // // //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // // // //               options={[
// // // // //                 { value: 'Electronics', label: 'Electronics' },
// // // // //                 { value: 'Fashion', label: 'Fashion' },
// // // // //                 { value: 'Home', label: 'Home & Garden' },
// // // // //                 { value: 'Sports', label: 'Sports' },
// // // // //                 { value: 'Other', label: 'Other' }
// // // // //               ]}
// // // // //             />
// // // // //             <Input
// // // // //               label="Starting Price"
// // // // //               type="number"
// // // // //               step="0.01"
// // // // //               value={formData.startingPrice}
// // // // //               onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
// // // // //               required
// // // // //             />
// // // // //             <Input
// // // // //               label="End Date"
// // // // //               type="date"
// // // // //               value={formData.endsAt}
// // // // //               onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
// // // // //               required
// // // // //             />
// // // // //             <Button type="submit" disabled={loading}>
// // // // //               {loading ? 'Creating...' : 'Create Auction'}
// // // // //             </Button>
// // // // //           </form>
// // // // //         </Card>
// // // // //       ) : (
// // // // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // // // //           {auctions.length > 0 ? (
// // // // //             auctions.map(auction => (
// // // // //               <Card
// // // // //                 key={auction.id}
// // // // //                 className={`cursor-pointer hover:shadow-lg transition-all ${auction.isExpired ? 'opacity-75' : ''}`}
// // // // //                 onClick={() => handleAuctionClick(auction)}
// // // // //               >
// // // // //                 <div className="flex justify-between items-start mb-2">
// // // // //                   <h3 className="font-bold text-lg">{auction.title}</h3>
// // // // //                   <span className={`px-2 py-1 rounded text-xs font-medium ${
// // // // //                     auction.isExpired
// // // // //                       ? 'bg-red-100 text-red-800'
// // // // //                       : auction.status === 'active'
// // // // //                       ? 'bg-green-100 text-green-800'
// // // // //                       : 'bg-gray-100 text-gray-800'
// // // // //                   }`}>
// // // // //                     {auction.isExpired ? 'Expired' : auction.status}
// // // // //                   </span>
// // // // //                 </div>
// // // // //                 <p className="text-gray-600 text-sm mb-3">{auction.description}</p>
// // // // //                 <div className="space-y-2">
// // // // //                   <div className="flex justify-between text-sm">
// // // // //                     <span className="text-gray-600">Current Price:</span>
// // // // //                     <span className="font-bold text-green-600">${auction.currentPrice}</span>
// // // // //                   </div>
// // // // //                   <div className="flex justify-between text-sm">
// // // // //                     <span className="text-gray-600">Category:</span>
// // // // //                     <span className="font-medium">{auction.category || 'N/A'}</span>
// // // // //                   </div>
// // // // //                   <div className="flex justify-between text-sm items-center">
// // // // //                     <span className="text-gray-600 flex items-center gap-1">
// // // // //                       <Clock className="w-3 h-3" />
// // // // //                       Time:
// // // // //                     </span>
// // // // //                     <span className={`font-medium ${auction.isExpired ? 'text-red-600' : 'text-blue-600'}`}>
// // // // //                       {getTimeRemaining(auction.endsAt)}
// // // // //                     </span>
// // // // //                   </div>
// // // // //                   {auction.bids && auction.bids.length > 0 && (
// // // // //                     <div className="flex justify-between text-sm">
// // // // //                       <span className="text-gray-600">Total Bids:</span>
// // // // //                       <span className="font-medium text-blue-600">{auction.bids.length}</span>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </div>
// // // // //               </Card>
// // // // //             ))
// // // // //           ) : (
// // // // //             <div className="col-span-full text-center py-12 text-gray-500">
// // // // //               <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
// // // // //               <p>No auctions created yet</p>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>
// // // // //       )}

// // // // //       <AuctionDetailsModal
// // // // //         auction={selectedAuction}
// // // // //         isOpen={showDetailsModal}
// // // // //         onClose={() => {
// // // // //           setShowDetailsModal(false);
// // // // //           setSelectedAuction(null);
// // // // //         }}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SellerDashboard;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { List, Plus, Package, Clock } from 'lucide-react';

// // // // const SellerDashboard = () => {
// // // //   const [view, setView] = useState('list');
// // // //   const [auctions, setAuctions] = useState([]);
// // // //   const [selectedAuction, setSelectedAuction] = useState(null);
// // // //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// // // //   const [formData, setFormData] = useState({
// // // //     title: '',
// // // //     description: '',
// // // //     category: 'Electronics',
// // // //     startingPrice: '',
// // // //     endsAt: ''
// // // //   });
// // // //   const [auctionImages, setAuctionImages] = useState([]);
// // // //   const [imagePreviews, setImagePreviews] = useState([]);
// // // //   const [message, setMessage] = useState(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   useEffect(() => {
// // // //     if (view === 'list') loadAuctions();
// // // //   }, [view]);

// // // //   const loadAuctions = async () => {
// // // //     // Simulated data - replace with actual API call
// // // //     const sampleData = [
// // // //       {
// // // //         id: '1',
// // // //         title: 'Vintage Camera',
// // // //         description: 'Classic 35mm film camera in excellent condition',
// // // //         category: 'Electronics',
// // // //         startingPrice: 150,
// // // //         currentPrice: 200,
// // // //         endsAt: new Date(Date.now() + 86400000 * 3).toISOString(),
// // // //         status: 'active',
// // // //         images: [],
// // // //         _count: { bids: 5 }
// // // //       }
// // // //     ];
// // // //     setAuctions(sampleData);
// // // //   };

// // // //   const handleImageSelect = (e) => {
// // // //     const files = Array.from(e.target.files);
// // // //     if (files.length > 5) {
// // // //       setMessage({ type: 'error', text: 'Maximum 5 images allowed' });
// // // //       return;
// // // //     }

// // // //     setAuctionImages(files);
// // // //     const previews = files.map(file => URL.createObjectURL(file));
// // // //     setImagePreviews(previews);
// // // //   };

// // // //   const removeImage = (index) => {
// // // //     setAuctionImages(prev => prev.filter((_, i) => i !== index));
// // // //     setImagePreviews(prev => prev.filter((_, i) => i !== index));
// // // //   };

// // // //   // const handleSubmit = (e) => {
// // // //   //   e.preventDefault();
// // // //   //   setLoading(true);
// // // //   //   setMessage(null);

// // // //   //   // Simulate API call
// // // //   //   setTimeout(() => {
// // // //   //     setMessage({ type: 'success', text: 'Auction created successfully!' });
// // // //   //     setFormData({
// // // //   //       title: '',
// // // //   //       description: '',
// // // //   //       category: 'Electronics',
// // // //   //       startingPrice: '',
// // // //   //       endsAt: ''
// // // //   //     });
// // // //   //     setAuctionImages([]);
// // // //   //     setImagePreviews([]);
// // // //   //     setLoading(false);
// // // //   //     setTimeout(() => setView('list'), 1500);
// // // //   //   }, 1000);
// // // //   // };

// // // //   const handleSubmit = async (e) => {
// // // //   e.preventDefault();
// // // //   setLoading(true);
// // // //   setMessage(null);

// // // //   try {
// // // //     console.log('Creating auction with data:', formData);
// // // //     console.log('Images to upload:', auctionImages);

// // // //     // Create auction first
// // // //     const response = await api.createAuction({
// // // //       ...formData,
// // // //       startingPrice: parseFloat(formData.startingPrice)
// // // //     });
    
// // // //     console.log('Auction creation response:', response);
    
// // // //     const newAuction = response.auction;
    
// // // //     if (!newAuction || !newAuction.id) {
// // // //       throw new Error('Failed to get auction ID from response');
// // // //     }

// // // //     console.log('New auction ID:', newAuction.id);
    
// // // //     // Upload images if any were selected
// // // //     if (auctionImages.length > 0) {
// // // //       console.log('Uploading images for auction:', newAuction.id);
// // // //       const uploadResponse = await api.uploadAuctionImages(newAuction.id, auctionImages);
// // // //       console.log('Image upload response:', uploadResponse);
// // // //     }
    
// // // //     setMessage({ type: 'success', text: 'Auction created successfully!' });
// // // //     setFormData({
// // // //       title: '',
// // // //       description: '',
// // // //       category: 'Electronics',
// // // //       startingPrice: '',
// // // //       endsAt: ''
// // // //     });
// // // //     setAuctionImages([]);
    
// // // //     setTimeout(() => {
// // // //       setView('list');
// // // //       loadAuctions(); // Reload auctions
// // // //     }, 1500);
// // // //   } catch (err) {
// // // //     console.error('Error creating auction:', err);
// // // //     console.error('Error details:', err.response?.data);
// // // //     setMessage({ 
// // // //       type: 'error', 
// // // //       text: err.response?.data?.error || err.message || 'Failed to create auction' 
// // // //     });
// // // //   } finally {
// // // //     setLoading(false);
// // // //   }
// // // // };

// // // //   const getTimeRemaining = (endsAt) => {
// // // //     const now = new Date();
// // // //     const endDate = new Date(endsAt);
// // // //     const diffMs = endDate - now;
    
// // // //     if (diffMs <= 0) return 'Ended';
    
// // // //     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
// // // //     const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
// // // //     if (diffDays > 0) return `${diffDays}d ${diffHours}h`;
// // // //     return `${diffHours}h`;
// // // //   };

// // // //   return (
// // // //     <div className="space-y-6 p-6">
// // // //       {/* Header */}
// // // //       <div className="flex items-center justify-between">
// // // //         <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
// // // //         <div className="flex gap-2">
// // // //           <button
// // // //             onClick={() => setView('list')}
// // // //             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
// // // //               view === 'list'
// // // //                 ? 'bg-blue-600 text-white'
// // // //                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// // // //             }`}
// // // //           >
// // // //             <List className="w-4 h-4 inline mr-2" />
// // // //             My Auctions
// // // //           </button>
// // // //           <button
// // // //             onClick={() => setView('create')}
// // // //             className={`px-4 py-2 rounded-lg font-medium transition-colors ${
// // // //               view === 'create'
// // // //                 ? 'bg-blue-600 text-white'
// // // //                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
// // // //             }`}
// // // //           >
// // // //             <Plus className="w-4 h-4 inline mr-2" />
// // // //             Create
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Messages */}
// // // //       {message && (
// // // //         <div
// // // //           className={`p-4 rounded-lg ${
// // // //             message.type === 'success'
// // // //               ? 'bg-green-100 text-green-800'
// // // //               : 'bg-red-100 text-red-800'
// // // //           }`}
// // // //         >
// // // //           {message.text}
// // // //         </div>
// // // //       )}

// // // //       {/* Create Form */}
// // // //       {view === 'create' ? (
// // // //         <div className="bg-white p-6 rounded-lg shadow">
// // // //           <h3 className="text-xl font-bold mb-4">Create New Auction</h3>
// // // //           <div className="space-y-4">
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Title
// // // //               </label>
// // // //               <input
// // // //                 type="text"
// // // //                 value={formData.title}
// // // //                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Description
// // // //               </label>
// // // //               <textarea
// // // //                 value={formData.description}
// // // //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // // //                 rows="4"
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Category
// // // //               </label>
// // // //               <select
// // // //                 value={formData.category}
// // // //                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //               >
// // // //                 <option value="Electronics">Electronics</option>
// // // //                 <option value="Fashion">Fashion</option>
// // // //                 <option value="Home">Home & Garden</option>
// // // //                 <option value="Sports">Sports</option>
// // // //                 <option value="Other">Other</option>
// // // //               </select>
// // // //             </div>

// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Starting Price
// // // //               </label>
// // // //               <input
// // // //                 type="number"
// // // //                 step="0.01"
// // // //                 value={formData.startingPrice}
// // // //                 onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 End Date
// // // //               </label>
// // // //               <input
// // // //                 type="date"
// // // //                 value={formData.endsAt}
// // // //                 onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             {/* Image Upload */}
// // // //             <div>
// // // //               <label className="block text-sm font-medium text-gray-700 mb-1">
// // // //                 Auction Images (Max 5)
// // // //               </label>
// // // //               <input
// // // //                 type="file"
// // // //                 accept="image/*"
// // // //                 multiple
// // // //                 onChange={handleImageSelect}
// // // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
// // // //               />
              
// // // //               {imagePreviews.length > 0 && (
// // // //                 <div className="grid grid-cols-5 gap-2 mt-3">
// // // //                   {imagePreviews.map((preview, index) => (
// // // //                     <div key={index} className="relative group">
// // // //                       <img
// // // //                         src={preview}
// // // //                         alt={`Preview ${index + 1}`}
// // // //                         className="w-full h-24 object-cover rounded border-2 border-blue-300"
// // // //                       />
// // // //                       <button
// // // //                         type="button"
// // // //                         onClick={() => removeImage(index)}
// // // //                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
// // // //                       >
// // // //                         ×
// // // //                       </button>
// // // //                     </div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </div>

// // // //             <button
// // // //               onClick={handleSubmit}
// // // //               disabled={loading}
// // // //               className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
// // // //             >
// // // //               {loading ? 'Creating...' : 'Create Auction'}
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       ) : (
// // // //         /* Auctions List */
// // // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // // //           {auctions.length > 0 ? (
// // // //             auctions.map(auction => (
// // // //               <div
// // // //                 key={auction.id}
// // // //                 className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
// // // //               >
// // // //                 <div className="flex justify-between items-start mb-2">
// // // //                   <h3 className="font-bold text-lg">{auction.title}</h3>
// // // //                   <span className={`px-2 py-1 rounded text-xs font-medium ${
// // // //                     auction.status === 'active'
// // // //                       ? 'bg-green-100 text-green-800'
// // // //                       : 'bg-yellow-100 text-yellow-800'
// // // //                   }`}>
// // // //                     {auction.status}
// // // //                   </span>
// // // //                 </div>
// // // //                 <p className="text-gray-600 text-sm mb-3">{auction.description}</p>
// // // //                 <div className="space-y-2">
// // // //                   <div className="flex justify-between text-sm">
// // // //                     <span className="text-gray-600">Current Price:</span>
// // // //                     <span className="font-bold text-green-600">${auction.currentPrice}</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between text-sm">
// // // //                     <span className="text-gray-600">Category:</span>
// // // //                     <span className="font-medium">{auction.category}</span>
// // // //                   </div>
// // // //                   <div className="flex justify-between text-sm items-center">
// // // //                     <span className="text-gray-600 flex items-center gap-1">
// // // //                       <Clock className="w-3 h-3" />
// // // //                       Time:
// // // //                     </span>
// // // //                     <span className="font-medium text-blue-600">
// // // //                       {getTimeRemaining(auction.endsAt)}
// // // //                     </span>
// // // //                   </div>
// // // //                   {auction._count?.bids > 0 && (
// // // //                     <div className="flex justify-between text-sm">
// // // //                       <span className="text-gray-600">Total Bids:</span>
// // // //                       <span className="font-medium text-blue-600">{auction._count.bids}</span>
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //               </div>
// // // //             ))
// // // //           ) : (
// // // //             <div className="col-span-full text-center py-12 text-gray-500">
// // // //               <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
// // // //               <p>No auctions created yet</p>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default SellerDashboard;

// // // import React, { useState, useEffect } from 'react';
// // // import { List, Plus, Package, Clock } from 'lucide-react';
// // // import { useAuth } from '../../context/AuthContext';
// // // import { Alert } from '../common/Alert';
// // // import { Button } from '../common/Button';
// // // import { Input } from '../common/Input';
// // // import { Select } from '../common/Select';
// // // import { Card } from '../common/Card';
// // // import AuctionDetailsModal from '../common/AuctionDetailsModal';
// // // import api from '../../services/api';  // ← THIS IMPORT IS CRITICAL

// // // const SellerDashboard = () => {
// // //   const [view, setView] = useState('list');
// // //   const [auctions, setAuctions] = useState([]);
// // //   const [selectedAuction, setSelectedAuction] = useState(null);
// // //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     title: '',
// // //     description: '',
// // //     category: 'Electronics',
// // //     startingPrice: '',
// // //     endsAt: ''
// // //   });
// // //   const [auctionImages, setAuctionImages] = useState([]);
// // //   const [imagePreviews, setImagePreviews] = useState([]);
// // //   const [message, setMessage] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const { user } = useAuth();

// // //   useEffect(() => {
// // //     if (view === 'list') loadAuctions();
// // //   }, [view]);

// // //   const loadAuctions = async () => {
// // //     try {
// // //       const data = await api.getMyAuctions();
// // //       const auctionsWithUpdatedStatus = Array.isArray(data) ? data.map(auction => {
// // //         const now = new Date();
// // //         const endDate = new Date(auction.endsAt);
// // //         const isExpired = endDate <= now;
        
// // //         return {
// // //           ...auction,
// // //           status: isExpired ? 'closed' : auction.status,
// // //           isExpired
// // //         };
// // //       }) : [];
      
// // //       setAuctions(auctionsWithUpdatedStatus);
// // //     } catch (err) {
// // //       console.error('Error loading auctions:', err);
// // //       setMessage({ type: 'error', text: 'Failed to load auctions' });
// // //     }
// // //   };

// // //   const handleImageSelect = (e) => {
// // //     const files = Array.from(e.target.files);
    
// // //     if (files.length > 5) {
// // //       setMessage({ type: 'error', text: 'Maximum 5 images allowed' });
// // //       return;
// // //     }

// // //     // Validate files
// // //     const validFiles = [];
// // //     for (const file of files) {
// // //       if (!file.type.startsWith('image/')) {
// // //         setMessage({ type: 'error', text: 'Only image files are allowed' });
// // //         continue;
// // //       }
// // //       if (file.size > 5 * 1024 * 1024) {
// // //         setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
// // //         continue;
// // //       }
// // //       validFiles.push(file);
// // //     }

// // //     if (validFiles.length === 0) return;

// // //     setAuctionImages(validFiles);
    
// // //     // Create previews
// // //     const previews = validFiles.map(file => URL.createObjectURL(file));
// // //     setImagePreviews(previews);
// // //     setMessage(null);
// // //   };

// // //   const removeImage = (index) => {
// // //     setAuctionImages(prev => prev.filter((_, i) => i !== index));
// // //     setImagePreviews(prev => prev.filter((_, i) => i !== index));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setMessage(null);

// // //     try {
// // //       console.log('Creating auction with data:', formData);
// // //       console.log('Images to upload:', auctionImages);

// // //       // Create auction first
// // //       const response = await api.createAuction({
// // //         ...formData,
// // //         startingPrice: parseFloat(formData.startingPrice)
// // //       });
      
// // //       console.log('Auction creation response:', response);
      
// // //       const newAuction = response.auction;
      
// // //       if (!newAuction || !newAuction.id) {
// // //         throw new Error('Failed to get auction ID from response');
// // //       }

// // //       console.log('New auction ID:', newAuction.id);
      
// // //       // Upload images if any were selected
// // //       if (auctionImages.length > 0) {
// // //         console.log('Uploading images for auction:', newAuction.id);
// // //         const uploadResponse = await api.uploadAuctionImages(newAuction.id, auctionImages);
// // //         console.log('Image upload response:', uploadResponse);
// // //       }
      
// // //       setMessage({ type: 'success', text: 'Auction created successfully!' });
// // //       setFormData({
// // //         title: '',
// // //         description: '',
// // //         category: 'Electronics',
// // //         startingPrice: '',
// // //         endsAt: ''
// // //       });
// // //       setAuctionImages([]);
// // //       setImagePreviews([]);
      
// // //       setTimeout(() => {
// // //         setView('list');
// // //         loadAuctions();
// // //       }, 1500);
// // //     } catch (err) {
// // //       console.error('Error creating auction:', err);
// // //       console.error('Error details:', err.response?.data);
// // //       setMessage({ 
// // //         type: 'error', 
// // //         text: err.response?.data?.error || err.message || 'Failed to create auction' 
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const getTimeRemaining = (endsAt) => {
// // //     const now = new Date();
// // //     const endDate = new Date(endsAt);
// // //     const diffMs = endDate - now;
    
// // //     if (diffMs <= 0) return 'Ended';
    
// // //     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
// // //     const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
// // //     if (diffDays > 0) return `${diffDays}d ${diffHours}h remaining`;
// // //     return `${diffHours}h remaining`;
// // //   };

// // //   const handleAuctionClick = (auction) => {
// // //     setSelectedAuction(auction);
// // //     setShowDetailsModal(true);
// // //   };

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="flex items-center justify-between">
// // //         <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
// // //         <div className="flex gap-2">
// // //           <Button
// // //             variant={view === 'list' ? 'primary' : 'outline'}
// // //             onClick={() => setView('list')}
// // //           >
// // //             <List className="w-4 h-4 mr-2" />
// // //             My Auctions
// // //           </Button>
// // //           <Button
// // //             variant={view === 'create' ? 'primary' : 'outline'}
// // //             onClick={() => setView('create')}
// // //           >
// // //             <Plus className="w-4 h-4 mr-2" />
// // //             Create
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       {message && (
// // //         <Alert variant={message.type}>
// // //           {message.text}
// // //         </Alert>
// // //       )}

// // //       {view === 'create' ? (
// // //         <Card>
// // //           <h3 className="text-xl font-bold mb-4">Create New Auction</h3>
// // //           <div className="space-y-4">
// // //             <Input
// // //               label="Title"
// // //               value={formData.title}
// // //               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// // //               required
// // //             />
            
// // //             <div className="space-y-1">
// // //               <label className="block text-sm font-medium text-gray-700">Description</label>
// // //               <textarea
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //                 rows="4"
// // //                 value={formData.description}
// // //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // //                 required
// // //               />
// // //             </div>
            
// // //             <Select
// // //               label="Category"
// // //               value={formData.category}
// // //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// // //               options={[
// // //                 { value: 'Electronics', label: 'Electronics' },
// // //                 { value: 'Fashion', label: 'Fashion' },
// // //                 { value: 'Home', label: 'Home & Garden' },
// // //                 { value: 'Sports', label: 'Sports' },
// // //                 { value: 'Other', label: 'Other' }
// // //               ]}
// // //             />
            
// // //             <Input
// // //               label="Starting Price"
// // //               type="number"
// // //               step="0.01"
// // //               value={formData.startingPrice}
// // //               onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
// // //               required
// // //             />
            
// // //             <Input
// // //               label="End Date"
// // //               type="date"
// // //               value={formData.endsAt}
// // //               onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
// // //               required
// // //             />
            
// // //             {/* Image Upload Section */}
// // //             <div className="space-y-2">
// // //               <label className="block text-sm font-medium text-gray-700">
// // //                 Auction Images (Optional - Max 5)
// // //               </label>
// // //               <input
// // //                 type="file"
// // //                 accept="image/*"
// // //                 multiple
// // //                 onChange={handleImageSelect}
// // //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// // //               />
              
// // //               {imagePreviews.length > 0 && (
// // //                 <div className="grid grid-cols-5 gap-2 mt-3">
// // //                   {imagePreviews.map((preview, index) => (
// // //                     <div key={index} className="relative group">
// // //                       <img
// // //                         src={preview}
// // //                         alt={`Preview ${index + 1}`}
// // //                         className="w-full h-24 object-cover rounded border-2 border-blue-300"
// // //                       />
// // //                       <button
// // //                         type="button"
// // //                         onClick={() => removeImage(index)}
// // //                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
// // //                       >
// // //                         ×
// // //                       </button>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
              
// // //               {auctionImages.length > 0 && (
// // //                 <p className="text-sm text-green-600">
// // //                   {auctionImages.length} image{auctionImages.length > 1 ? 's' : ''} selected
// // //                 </p>
// // //               )}
// // //             </div>

// // //             <Button 
// // //               onClick={handleSubmit} 
// // //               disabled={loading}
// // //               className="w-full"
// // //             >
// // //               {loading ? 'Creating...' : 'Create Auction'}
// // //             </Button>
// // //           </div>
// // //         </Card>
// // //       ) : (
// // //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // //           {auctions.length > 0 ? (
// // //             auctions.map(auction => (
// // //               <Card
// // //                 key={auction.id}
// // //                 className={`cursor-pointer hover:shadow-lg transition-all ${auction.isExpired ? 'opacity-75' : ''}`}
// // //                 onClick={() => handleAuctionClick(auction)}
// // //               >
// // //                 {/* Display primary image if available */}
// // //                 {auction.images && auction.images.length > 0 && (
// // //                   <img
// // //                     src={auction.images[0].imageUrl}
// // //                     alt={auction.title}
// // //                     className="w-full h-48 object-cover rounded-t-lg mb-3 -mt-4 -mx-4"
// // //                   />
// // //                 )}
                
// // //                 <div className="flex justify-between items-start mb-2">
// // //                   <h3 className="font-bold text-lg">{auction.title}</h3>
// // //                   <span className={`px-2 py-1 rounded text-xs font-medium ${
// // //                     auction.isExpired
// // //                       ? 'bg-red-100 text-red-800'
// // //                       : auction.status === 'active'
// // //                       ? 'bg-green-100 text-green-800'
// // //                       : 'bg-yellow-100 text-yellow-800'
// // //                   }`}>
// // //                     {auction.isExpired ? 'Expired' : auction.status}
// // //                   </span>
// // //                 </div>
                
// // //                 <p className="text-gray-600 text-sm mb-3 line-clamp-2">{auction.description}</p>
                
// // //                 <div className="space-y-2">
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Current Price:</span>
// // //                     <span className="font-bold text-green-600">${auction.currentPrice}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm">
// // //                     <span className="text-gray-600">Category:</span>
// // //                     <span className="font-medium">{auction.category || 'N/A'}</span>
// // //                   </div>
// // //                   <div className="flex justify-between text-sm items-center">
// // //                     <span className="text-gray-600 flex items-center gap-1">
// // //                       <Clock className="w-3 h-3" />
// // //                       Time:
// // //                     </span>
// // //                     <span className={`font-medium ${auction.isExpired ? 'text-red-600' : 'text-blue-600'}`}>
// // //                       {getTimeRemaining(auction.endsAt)}
// // //                     </span>
// // //                   </div>
// // //                   {auction._count?.bids > 0 && (
// // //                     <div className="flex justify-between text-sm">
// // //                       <span className="text-gray-600">Total Bids:</span>
// // //                       <span className="font-medium text-blue-600">{auction._count.bids}</span>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               </Card>
// // //             ))
// // //           ) : (
// // //             <div className="col-span-full text-center py-12 text-gray-500">
// // //               <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
// // //               <p>No auctions created yet</p>
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}

// // //       <AuctionDetailsModal
// // //         auction={selectedAuction}
// // //         isOpen={showDetailsModal}
// // //         onClose={() => {
// // //           setShowDetailsModal(false);
// // //           setSelectedAuction(null);
// // //         }}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default SellerDashboard;

// // import React, { useState, useEffect } from 'react';
// // import { List, Plus, Package } from 'lucide-react';
// // import { useAuth } from '../../context/AuthContext';
// // import { Alert } from '../common/Alert';
// // import { Button } from '../common/Button';
// // import { Input } from '../common/Input';
// // import { Select } from '../common/Select';
// // import { Card } from '../common/Card';
// // import AuctionDetailsModal from '../common/AuctionDetailsModal';
// // import AuctionCard from '../common/AuctionCard';
// // import api from '../../services/api';

// // const SellerDashboard = () => {
// //   const [view, setView] = useState('list');
// //   const [auctions, setAuctions] = useState([]);

// //   // const [active, setActive] = useState([]);
// //   // const [pending, setPending] = useState([]);
// //   // const [completed, setCompleted] = useState([]);

// //   const [selectedAuction, setSelectedAuction] = useState(null);
// //   const [showDetailsModal, setShowDetailsModal] = useState(false);
// //   const [loadingDetails, setLoadingDetails] = useState(false);
// //   const [formData, setFormData] = useState({
// //     title: '',
// //     description: '',
// //     category: 'Electronics',
// //     startingPrice: '',
// //     endsAt: ''
// //   });
// //   const [auctionImages, setAuctionImages] = useState([]);
// //   const [imagePreviews, setImagePreviews] = useState([]);
// //   const [message, setMessage] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const { user } = useAuth();

// //   useEffect(() => {
// //     if (view === 'list') loadAuctions();
// //   }, [view]);

// //   const loadAuctions = async () => {
// //     try {
// //       const data = await api.getMyAuctions();
// //       const auctionsWithUpdatedStatus = Array.isArray(data) ? data.map(auction => {
// //         const now = new Date();
// //         const endDate = new Date(auction.endsAt);
// //         const isExpired = endDate <= now;
        
// //         return {
// //           ...auction,
// //           status: isExpired ? 'closed' : auction.status,
// //           isExpired
// //         };
// //       }) : [];
      
// //       setAuctions(auctionsWithUpdatedStatus);
// //     } catch (err) {
// //       console.error('Error loading auctions:', err);
// //       setMessage({ type: 'error', text: 'Failed to load auctions' });
// //     }
// //   };

  

// //   const handleImageSelect = (e) => {
// //     const files = Array.from(e.target.files);
    
// //     if (files.length > 5) {
// //       setMessage({ type: 'error', text: 'Maximum 5 images allowed' });
// //       return;
// //     }

// //     // Validate files
// //     const validFiles = [];
// //     for (const file of files) {
// //       if (!file.type.startsWith('image/')) {
// //         setMessage({ type: 'error', text: 'Only image files are allowed' });
// //         continue;
// //       }
// //       if (file.size > 5 * 1024 * 1024) {
// //         setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
// //         continue;
// //       }
// //       validFiles.push(file);
// //     }

// //     if (validFiles.length === 0) return;

// //     setAuctionImages(validFiles);
    
// //     // Create previews
// //     const previews = validFiles.map(file => URL.createObjectURL(file));
// //     setImagePreviews(previews);
// //     setMessage(null);
// //   };

// //   const removeImage = (index) => {
// //     setAuctionImages(prev => prev.filter((_, i) => i !== index));
// //     setImagePreviews(prev => {
// //       // Revoke URL to prevent memory leaks
// //       URL.revokeObjectURL(prev[index]);
// //       return prev.filter((_, i) => i !== index);
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage(null);

// //     try {
// //       console.log('Creating auction with data:', formData);
// //       console.log('Images to upload:', auctionImages);

// //       // Create auction first
// //       const response = await api.createAuction({
// //         ...formData,
// //         startingPrice: parseFloat(formData.startingPrice)
// //       });
      
// //       console.log('Auction creation response:', response);
      
// //       const newAuction = response.auction;
      
// //       if (!newAuction || !newAuction.id) {
// //         throw new Error('Failed to get auction ID from response');
// //       }

// //       console.log('New auction ID:', newAuction.id);
      
// //       // Upload images if any were selected
// //       if (auctionImages.length > 0) {
// //         console.log('Uploading images for auction:', newAuction.id);
// //         const uploadResponse = await api.uploadAuctionImages(newAuction.id, auctionImages);
// //         console.log('Image upload response:', uploadResponse);
// //       }
      
// //       setMessage({ type: 'success', text: 'Auction created successfully and pending approval!' });
// //       setFormData({
// //         title: '',
// //         description: '',
// //         category: 'Electronics',
// //         startingPrice: '',
// //         endsAt: ''
// //       });
// //       setAuctionImages([]);
// //       // Revoke all preview URLs
// //       imagePreviews.forEach(url => URL.revokeObjectURL(url));
// //       setImagePreviews([]);
      
// //       setTimeout(() => {
// //         setView('list');
// //         loadAuctions();
// //       }, 1500);
// //     } catch (err) {
// //       console.error('Error creating auction:', err);
// //       console.error('Error details:', err.response?.data);
// //       setMessage({ 
// //         type: 'error', 
// //         text: err.response?.data?.error || err.message || 'Failed to create auction' 
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleViewDetails = async (auction) => {
// //     setLoadingDetails(true);
// //     try {
// //       // Fetch full auction details with all images and bids
// //       const fullAuction = await api.getAuctionDetail(auction.id);
// //       setSelectedAuction(fullAuction);
// //       setShowDetailsModal(true);
// //     } catch (err) {
// //       console.error('Error loading auction details:', err);
// //       setMessage({ type: 'error', text: 'Failed to load auction details' });
// //     } finally {
// //       setLoadingDetails(false);
// //     }
// //   };

// //   const handleEdit = (auction) => {
// //     // TODO: Implement edit functionality
// //     console.log('Edit auction:', auction);
// //     setMessage({ type: 'info', text: 'Edit functionality coming soon!' });
// //   };

// //   const handleDelete = async (auction) => {
// //     if (!window.confirm(`Are you sure you want to delete "${auction.title}"?`)) {
// //       return;
// //     }

// //     try {
// //       await api.deleteAuction(auction.id);
// //       setMessage({ type: 'success', text: 'Auction deleted successfully!' });
// //       loadAuctions();
// //     } catch (err) {
// //       console.error('Error deleting auction:', err);
// //       setMessage({ 
// //         type: 'error', 
// //         text: err.response?.data?.error || 'Failed to delete auction' 
// //       });
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
// //         <div className="flex gap-2">
// //           <Button
// //             variant={view === 'list' ? 'primary' : 'outline'}
// //             onClick={() => setView('list')}
// //           >
// //             <List className="w-4 h-4 mr-2" />
// //             My Auctions
// //           </Button>
// //           <Button
// //             variant={view === 'create' ? 'primary' : 'outline'}
// //             onClick={() => setView('create')}
// //           >
// //             <Plus className="w-4 h-4 mr-2" />
// //             Create
// //           </Button>
// //         </div>
// //       </div>

// //       {message && (
// //         <Alert variant={message.type}>
// //           {message.text}
// //         </Alert>
// //       )}

// //       {view === 'create' ? (
// //         <Card>
// //           <h3 className="text-xl font-bold mb-4">Create New Auction</h3>
// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <Input
// //               label="Title"
// //               value={formData.title}
// //               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //               required
// //             />
            
// //             <div className="space-y-1">
// //               <label className="block text-sm font-medium text-gray-700">Description</label>
// //               <textarea
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 rows="4"
// //                 value={formData.description}
// //                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                 required
// //               />
// //             </div>
            
// //             <Select
// //               label="Category"
// //               value={formData.category}
// //               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// //               options={[
// //                 { value: 'Electronics', label: 'Electronics' },
// //                 { value: 'Fashion', label: 'Fashion' },
// //                 { value: 'Home', label: 'Home & Garden' },
// //                 { value: 'Sports', label: 'Sports' },
// //                 { value: 'Other', label: 'Other' }
// //               ]}
// //             />
            
// //             <Input
// //               label="Starting Price"
// //               type="number"
// //               step="0.01"
// //               value={formData.startingPrice}
// //               onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
// //               required
// //             />
            
// //             <Input
// //               label="End Date"
// //               type="date"
// //               value={formData.endsAt}
// //               onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
// //               min={new Date().toISOString().split('T')[0]}
// //               required
// //             />
            
// //             {/* Image Upload Section */}
// //             <div className="space-y-2">
// //               <label className="block text-sm font-medium text-gray-700">
// //                 Auction Images (Optional - Max 5)
// //               </label>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 multiple
// //                 onChange={handleImageSelect}
// //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //               />
              
// //               {imagePreviews.length > 0 && (
// //                 <div className="grid grid-cols-5 gap-2 mt-3">
// //                   {imagePreviews.map((preview, index) => (
// //                     <div key={index} className="relative group">
// //                       <img
// //                         src={preview}
// //                         alt={`Preview ${index + 1}`}
// //                         className="w-full h-24 object-cover rounded border-2 border-blue-300"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => removeImage(index)}
// //                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
// //                       >
// //                         ×
// //                       </button>
// //                       {index === 0 && (
// //                         <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
// //                           Primary
// //                         </span>
// //                       )}
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
              
// //               {auctionImages.length > 0 && (
// //                 <p className="text-sm text-green-600">
// //                   {auctionImages.length} image{auctionImages.length > 1 ? 's' : ''} selected (First image will be primary)
// //                 </p>
// //               )}
// //             </div>

// //             <Button 
// //               type="submit"
// //               disabled={loading}
// //               className="w-full"
// //             >
// //               {loading ? 'Creating...' : 'Create Auction'}
// //             </Button>
// //           </form>
// //         </Card>
// //       ) : (
// //         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //           {auctions.length > 0 ? (
// //             auctions.map(auction => (
// //               <AuctionCard
// //                 key={auction.id}
// //                 auction={auction}
// //                 onViewDetails={handleViewDetails}
// //                 onEdit={handleEdit}
// //                 onDelete={handleDelete}
// //                 showBidButton={false}
// //                 showEditButton={auction.status === 'pending'}
// //                 showDeleteButton={auction.status === 'pending' || (auction.bids?.length === 0 && auction._count?.bids === 0)}
// //                 isLoading={loadingDetails}
// //               />
// //             ))
// //           ) : (
// //             <div className="col-span-full text-center py-12 text-gray-500">
// //               <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
// //               <p>No auctions created yet</p>
// //               <p className="text-sm mt-2">Click "Create" to list your first item</p>
// //             </div>
// //           )}
// //         </div>
// //       )}

// //       <AuctionDetailsModal
// //         auction={selectedAuction}
// //         isOpen={showDetailsModal}
// //         onClose={() => {
// //           setShowDetailsModal(false);
// //           setSelectedAuction(null);
// //         }}
// //       />
// //     </div>
// //   );
// // };

// // export default SellerDashboard;

// import React, { useState, useEffect } from 'react';
// import { List, Plus, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { Alert } from '../common/Alert';
// import { Button } from '../common/Button';
// import { Input } from '../common/Input';
// import { Select } from '../common/Select';
// import { Card } from '../common/Card';
// import AuctionDetailsModal from '../common/AuctionDetailsModal';
// import AuctionCard from '../common/AuctionCard';
// import api from '../../services/api';

// const SellerDashboard = () => {
//   const [view, setView] = useState('list');
//   const [statusFilter, setStatusFilter] = useState('all'); // all, pending, active, completed
//   const [auctions, setAuctions] = useState([]);
//   const [filteredAuctions, setFilteredAuctions] = useState([]);
//   const [selectedAuction, setSelectedAuction] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: 'Electronics',
//     startingPrice: '',
//     endsAt: ''
//   });
//   const [auctionImages, setAuctionImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [message, setMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (view === 'list') loadAuctions();
//   }, [view]);

//   useEffect(() => {
//     filterAuctions();
//   }, [auctions, statusFilter]);

//   const loadAuctions = async () => {
//     try {
//       const data = await api.getMyAuctions();
//       const auctionsWithUpdatedStatus = Array.isArray(data) ? data.map(auction => {
//         const now = new Date();
//         const endDate = new Date(auction.endsAt);
//         const isExpired = endDate <= now;
        
//         return {
//           ...auction,
//           computedStatus: isExpired && auction.status === 'active' ? 'completed' : auction.status,
//           isExpired
//         };
//       }) : [];
      
//       setAuctions(auctionsWithUpdatedStatus);
//     } catch (err) {
//       console.error('Error loading auctions:', err);
//       setMessage({ type: 'error', text: 'Failed to load auctions' });
//     }
//   };

//   const filterAuctions = () => {
//     if (statusFilter === 'all') {
//       setFilteredAuctions(auctions);
//     } else {
//       const filtered = auctions.filter(auction => auction.computedStatus === statusFilter);
//       setFilteredAuctions(filtered);
//     }
//   };

//   const getStatusCounts = () => {
//     return {
//       all: auctions.length,
//       pending: auctions.filter(a => a.computedStatus === 'pending').length,
//       active: auctions.filter(a => a.computedStatus === 'active').length,
//       completed: auctions.filter(a => a.computedStatus === 'completed' || a.computedStatus === 'closed').length
//     };
//   };

//   const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);
    
//     if (files.length > 5) {
//       setMessage({ type: 'error', text: 'Maximum 5 images allowed' });
//       return;
//     }

//     const validFiles = [];
//     for (const file of files) {
//       if (!file.type.startsWith('image/')) {
//         setMessage({ type: 'error', text: 'Only image files are allowed' });
//         continue;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
//         continue;
//       }
//       validFiles.push(file);
//     }

//     if (validFiles.length === 0) return;

//     setAuctionImages(validFiles);
//     const previews = validFiles.map(file => URL.createObjectURL(file));
//     setImagePreviews(previews);
//     setMessage(null);
//   };

//   const removeImage = (index) => {
//     setAuctionImages(prev => prev.filter((_, i) => i !== index));
//     setImagePreviews(prev => {
//       URL.revokeObjectURL(prev[index]);
//       return prev.filter((_, i) => i !== index);
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       const response = await api.createAuction({
//         ...formData,
//         startingPrice: parseFloat(formData.startingPrice)
//       });
      
//       const newAuction = response.auction;
      
//       if (!newAuction || !newAuction.id) {
//         throw new Error('Failed to get auction ID from response');
//       }
      
//       if (auctionImages.length > 0) {
//         await api.uploadAuctionImages(newAuction.id, auctionImages);
//       }
      
//       setMessage({ type: 'success', text: 'Auction created successfully and pending approval!' });
//       setFormData({
//         title: '',
//         description: '',
//         category: 'Electronics',
//         startingPrice: '',
//         endsAt: ''
//       });
//       setAuctionImages([]);
//       imagePreviews.forEach(url => URL.revokeObjectURL(url));
//       setImagePreviews([]);
      
//       setTimeout(() => {
//         setView('list');
//         loadAuctions();
//       }, 1500);
//     } catch (err) {
//       console.error('Error creating auction:', err);
//       setMessage({ 
//         type: 'error', 
//         text: err.response?.data?.error || err.message || 'Failed to create auction' 
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewDetails = async (auction) => {
//     setLoadingDetails(true);
//     try {
//       const fullAuction = await api.getAuctionDetail(auction.id);
//       setSelectedAuction(fullAuction);
//       setShowDetailsModal(true);
//     } catch (err) {
//       console.error('Error loading auction details:', err);
//       setMessage({ type: 'error', text: 'Failed to load auction details' });
//     } finally {
//       setLoadingDetails(false);
//     }
//   };

//   const handleEdit = (auction) => {
//     console.log('Edit auction:', auction);
//     setMessage({ type: 'info', text: 'Edit functionality coming soon!' });
//   };

//   const handleDelete = async (auction) => {
//     if (!window.confirm(`Are you sure you want to delete "${auction.title}"?`)) {
//       return;
//     }

//     try {
//       await api.deleteAuction(auction.id);
//       setMessage({ type: 'success', text: 'Auction deleted successfully!' });
//       loadAuctions();
//     } catch (err) {
//       console.error('Error deleting auction:', err);
//       setMessage({ 
//         type: 'error', 
//         text: err.response?.data?.error || 'Failed to delete auction' 
//       });
//     }
//   };

//   const statusCounts = getStatusCounts();

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Seller Dashboard</h2>
//         <div className="flex gap-2">
//           <Button
//             variant={view === 'list' ? 'primary' : 'outline'}
//             onClick={() => setView('list')}
//           >
//             <List className="w-4 h-4 mr-2" />
//             My Auctions
//           </Button>
//           <Button
//             variant={view === 'create' ? 'primary' : 'outline'}
//             onClick={() => setView('create')}
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Create
//           </Button>
//         </div>
//       </div>

//       {message && (
//         <Alert variant={message.type}>
//           {message.text}
//         </Alert>
//       )}

//       {view === 'create' ? (
//         <Card>
//           <h3 className="text-xl font-bold mb-4">Create New Auction</h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Input
//               label="Title"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               required
//             />
            
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Description</label>
//               <textarea
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 rows="4"
//                 value={formData.description}
//                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                 required
//               />
//             </div>
            
//             <Select
//               label="Category"
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               options={[
//                 { value: 'Electronics', label: 'Electronics' },
//                 { value: 'Fashion', label: 'Fashion' },
//                 { value: 'Home', label: 'Home & Garden' },
//                 { value: 'Sports', label: 'Sports' },
//                 { value: 'Other', label: 'Other' }
//               ]}
//             />
            
//             <Input
//               label="Starting Price"
//               type="number"
//               step="0.01"
//               value={formData.startingPrice}
//               onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
//               required
//             />
            
//             <Input
//               label="End Date"
//               type="date"
//               value={formData.endsAt}
//               onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
//               min={new Date().toISOString().split('T')[0]}
//               required
//             />
            
//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Auction Images (Optional - Max 5)
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageSelect}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
              
//               {imagePreviews.length > 0 && (
//                 <div className="grid grid-cols-5 gap-2 mt-3">
//                   {imagePreviews.map((preview, index) => (
//                     <div key={index} className="relative group">
//                       <img
//                         src={preview}
//                         alt={`Preview ${index + 1}`}
//                         className="w-full h-24 object-cover rounded border-2 border-blue-300"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
//                       >
//                         ×
//                       </button>
//                       {index === 0 && (
//                         <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
//                           Primary
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
              
//               {auctionImages.length > 0 && (
//                 <p className="text-sm text-green-600">
//                   {auctionImages.length} image{auctionImages.length > 1 ? 's' : ''} selected (First image will be primary)
//                 </p>
//               )}
//             </div>

//             <Button 
//               type="submit"
//               disabled={loading}
//               className="w-full"
//             >
//               {loading ? 'Creating...' : 'Create Auction'}
//             </Button>
//           </form>
//         </Card>
//       ) : (
//         <>
//           {/* Status Filter Tabs */}
//           <div className="border-b border-gray-200">
//             <div className="flex space-x-8">
//               <button
//                 onClick={() => setStatusFilter('all')}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
//                   statusFilter === 'all'
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 All ({statusCounts.all})
//               </button>
//               <button
//                 onClick={() => setStatusFilter('pending')}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
//                   statusFilter === 'pending'
//                     ? 'border-yellow-500 text-yellow-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Clock className="w-4 h-4" />
//                 Pending ({statusCounts.pending})
//               </button>
//               <button
//                 onClick={() => setStatusFilter('active')}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
//                   statusFilter === 'active'
//                     ? 'border-green-500 text-green-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <CheckCircle className="w-4 h-4" />
//                 Active ({statusCounts.active})
//               </button>
//               <button
//                 onClick={() => setStatusFilter('completed')}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
//                   statusFilter === 'completed'
//                     ? 'border-gray-500 text-gray-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <XCircle className="w-4 h-4" />
//                 Completed ({statusCounts.completed})
//               </button>
//             </div>
//           </div>

//           {/* Auctions Grid */}
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {filteredAuctions.length > 0 ? (
//               filteredAuctions.map(auction => (
//                 <AuctionCard
//                   key={auction.id}
//                   auction={auction}
//                   onViewDetails={handleViewDetails}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                   showBidButton={false}
//                   showEditButton={auction.status === 'pending'}
//                   showDeleteButton={auction.status === 'pending' || (auction.bids?.length === 0 && auction._count?.bids === 0)}
//                   isLoading={loadingDetails}
//                 />
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12 text-gray-500">
//                 <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
//                 <p>No {statusFilter !== 'all' ? statusFilter : ''} auctions found</p>
//                 <p className="text-sm mt-2">
//                   {statusFilter === 'all' && "Click 'Create' to list your first item"}
//                 </p>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       <AuctionDetailsModal
//         auction={selectedAuction}
//         isOpen={showDetailsModal}
//         onClose={() => {
//           setShowDetailsModal(false);
//           setSelectedAuction(null);
//         }}
//       />
//     </div>
//   );
// };

// export default SellerDashboard;

import React, { useState, useEffect } from 'react';
import { List, Plus, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Card } from '../common/Card';
import AuctionDetailsModal from '../common/AuctionDetailsModal';
import AuctionEditModal from '../common/AuctionEditModal';
import AuctionCard from '../common/AuctionCard';
import api from '../../services/api';

const SellerDashboard = () => {
  const [view, setView] = useState('list');
  const [statusFilter, setStatusFilter] = useState('all');
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    startingPrice: '',
    endsAt: ''
  });
  const [auctionImages, setAuctionImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (view === 'list') loadAuctions();
  }, [view]);

  useEffect(() => {
    filterAuctions();
  }, [auctions, statusFilter]);

  const loadAuctions = async () => {
    try {
      const data = await api.getMyAuctions();
      const auctionsWithUpdatedStatus = Array.isArray(data) ? data.map(auction => {
        const now = new Date();
        const endDate = new Date(auction.endsAt);
        const isExpired = endDate <= now;
        
        return {
          ...auction,
          computedStatus: isExpired && auction.status === 'active' ? 'completed' : auction.status,
          isExpired
        };
      }) : [];
      
      setAuctions(auctionsWithUpdatedStatus);
    } catch (err) {
      console.error('Error loading auctions:', err);
      setMessage({ type: 'error', text: 'Failed to load auctions' });
    }
  };

  const filterAuctions = () => {
    if (statusFilter === 'all') {
      setFilteredAuctions(auctions);
    } else {
      const filtered = auctions.filter(auction => auction.computedStatus === statusFilter);
      setFilteredAuctions(filtered);
    }
  };

  const getStatusCounts = () => {
    return {
      all: auctions.length,
      pending: auctions.filter(a => a.computedStatus === 'pending').length,
      active: auctions.filter(a => a.computedStatus === 'active').length,
      completed: auctions.filter(a => a.computedStatus === 'completed' || a.computedStatus === 'closed').length
    };
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 5) {
      setMessage({ type: 'error', text: 'Maximum 5 images allowed' });
      return;
    }

    const validFiles = [];
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Only image files are allowed' });
        continue;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size must be less than 5MB' });
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setAuctionImages(validFiles);
    const previews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
    setMessage(null);
  };

  const removeImage = (index) => {
    setAuctionImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await api.createAuction({
        ...formData,
        startingPrice: parseFloat(formData.startingPrice)
      });
      
      const newAuction = response.auction;
      
      if (!newAuction || !newAuction.id) {
        throw new Error('Failed to get auction ID from response');
      }
      
      if (auctionImages.length > 0) {
        await api.uploadAuctionImages(newAuction.id, auctionImages);
      }
      
      setMessage({ type: 'success', text: 'Auction created successfully and pending approval!' });
      setFormData({
        title: '',
        description: '',
        category: 'Electronics',
        startingPrice: '',
        endsAt: ''
      });
      setAuctionImages([]);
      imagePreviews.forEach(url => URL.revokeObjectURL(url));
      setImagePreviews([]);
      
      setTimeout(() => {
        setView('list');
        loadAuctions();
      }, 1500);
    } catch (err) {
      console.error('Error creating auction:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || err.message || 'Failed to create auction' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (auction) => {
    setLoadingDetails(true);
    try {
      const fullAuction = await api.getAuctionDetail(auction.id);
      setSelectedAuction(fullAuction);
      setShowDetailsModal(true);
    } catch (err) {
      console.error('Error loading auction details:', err);
      setMessage({ type: 'error', text: 'Failed to load auction details' });
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleEdit = async (auction) => {
    try {
      // Fetch full auction details if needed
      const fullAuction = await api.getAuctionDetail(auction.id);
      setSelectedAuction(fullAuction);
      setShowEditModal(true);
    } catch (err) {
      console.error('Error loading auction for edit:', err);
      setMessage({ type: 'error', text: 'Failed to load auction details' });
    }
  };

  const handleEditSuccess = () => {
    setMessage({ type: 'success', text: 'Auction updated successfully!' });
    loadAuctions();
  };

  const handleDelete = async (auction) => {
    if (!window.confirm(`Are you sure you want to delete "${auction.title}"?`)) {
      return;
    }

    try {
      await api.deleteAuction(auction.id);
      setMessage({ type: 'success', text: 'Auction deleted successfully!' });
      loadAuctions();
    } catch (err) {
      console.error('Error deleting auction:', err);
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.error || 'Failed to delete auction' 
      });
    }
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
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
              min={new Date().toISOString().split('T')[0]}
              required
            />
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Auction Images (Optional - Max 5)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded border-2 border-blue-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold"
                      >
                        ×
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {auctionImages.length > 0 && (
                <p className="text-sm text-green-600">
                  {auctionImages.length} image{auctionImages.length > 1 ? 's' : ''} selected (First image will be primary)
                </p>
              )}
            </div>

            <Button 
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Creating...' : 'Create Auction'}
            </Button>
          </form>
        </Card>
      ) : (
        <>
          {/* Status Filter Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setStatusFilter('all')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  statusFilter === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All ({statusCounts.all})
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  statusFilter === 'pending'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Clock className="w-4 h-4" />
                Pending ({statusCounts.pending})
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  statusFilter === 'active'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Active ({statusCounts.active})
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  statusFilter === 'completed'
                    ? 'border-gray-500 text-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <XCircle className="w-4 h-4" />
                Completed ({statusCounts.completed})
              </button>
            </div>
          </div>

          {/* Auctions Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAuctions.length > 0 ? (
              filteredAuctions.map(auction => (
                <AuctionCard
                  key={auction.id}
                  auction={auction}
                  onViewDetails={handleViewDetails}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showBidButton={false}
                  showEditButton={auction.status === 'pending'}
                  showDeleteButton={auction.status === 'pending' || (auction.bids?.length === 0 && auction._count?.bids === 0)}
                  isLoading={loadingDetails}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No {statusFilter !== 'all' ? statusFilter : ''} auctions found</p>
                <p className="text-sm mt-2">
                  {statusFilter === 'all' && "Click 'Create' to list your first item"}
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <AuctionDetailsModal
        auction={selectedAuction}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedAuction(null);
        }}
      />

      <AuctionEditModal
        auction={selectedAuction}
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedAuction(null);
        }}
        onSuccess={handleEditSuccess}
        isRep={false}
      />
    </div>
  );
};

export default SellerDashboard;