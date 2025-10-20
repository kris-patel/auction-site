// import React, { useState, useEffect } from 'react';
// import { Gavel } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { Alert } from '../common/Alert';
// import { Button } from '../common/Button';
// import { Input } from '../common/Input';
// import { Card } from '../common/Card';
// import api from '../../services/api';

// const BuyerDashboard = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [selectedAuction, setSelectedAuction] = useState(null);
//   const [bidAmount, setBidAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     loadAuctions();
//   }, []);

//   const loadAuctions = async () => {
//     try {
//       const res = await api.getAuctions();       
//       setAuctions(res.data?.auctions || []);     
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Failed to load auctions' });
//     }
//   };

//   const handlePlaceBid = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       await api.placeBid(selectedAuction.id, user.id, parseFloat(bidAmount));
//       setMessage({ type: 'success', text: 'Bid placed successfully!' });
//       setSelectedAuction(null);
//       setBidAmount('');
//       loadAuctions();
//     } catch (err) {
//       setMessage({ type: 'error', text: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Active Auctions</h2>
//         <Gavel className="w-8 h-8 text-blue-600" />
//       </div>

//       {message && (
//         <Alert variant={message.type}>
//           {message.text}
//         </Alert>
//       )}

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//         {auctions.map(auction => (
//           <Card key={auction.id} className="hover:shadow-lg transition-shadow">
//             <h3 className="font-bold text-lg mb-2">{auction.title}</h3>
//             <p className="text-gray-600 text-sm mb-3">{auction.description}</p>
//             <div className="space-y-2 mb-4">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Current Price:</span>
//                 <span className="font-bold text-green-600">${auction.currentPrice}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Category:</span>
//                 <span className="font-medium">{auction.category}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-600">Ends:</span>
//                 <span className="font-medium">{new Date(auction.endsAt).toLocaleDateString()}</span>
//               </div>
//             </div>
//             <Button
//               onClick={() => setSelectedAuction(auction)}
//               variant="outline"
//               className="w-full"
//             >
//               <Gavel className="w-4 h-4 mr-2" />
//               Place Bid
//             </Button>
//           </Card>
//         ))}
//       </div>

//       {auctions.length === 0 && (
//         <div className="text-center py-12 text-gray-500">
//           <Gavel className="w-16 h-16 mx-auto mb-4 opacity-50" />
//           <p>No active auctions available</p>
//         </div>
//       )}

//       {selectedAuction && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4">Place Bid</h3>
//             <div className="mb-4 p-4 bg-gray-50 rounded">
//               <p className="font-semibold">{selectedAuction.title}</p>
//               <p className="text-sm text-gray-600">Current Price: ${selectedAuction.currentPrice}</p>
//             </div>
//             <form onSubmit={handlePlaceBid} className="space-y-4">
//               <Input
//                 label="Your Bid Amount"
//                 type="number"
//                 step="0.01"
//                 min={selectedAuction.currentPrice + 0.01}
//                 value={bidAmount}
//                 onChange={(e) => setBidAmount(e.target.value)}
//                 required
//               />
//               <div className="flex gap-2">
//                 <Button type="submit" disabled={loading} className="flex-1">
//                   {loading ? 'Placing...' : 'Place Bid'}
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="secondary"
//                   onClick={() => {
//                     setSelectedAuction(null);
//                     setBidAmount('');
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </form>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyerDashboard;

import React, { useState, useEffect } from 'react';
import { Gavel } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import api from '../../services/api';

const BuyerDashboard = () => {
  const [auctions, setAuctions] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    loadAuctions();
  }, []);

  const loadAuctions = async () => {
    try {
      const auctionsData = await api.getAuctions();
      setAuctions(Array.isArray(auctionsData) ? auctionsData : []);
    } catch (err) {
      console.error('Error loading auctions:', err);
      setMessage({ type: 'error', text: 'Failed to load auctions' });
    }
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.placeBid(selectedAuction.id, parseFloat(bidAmount));
      setMessage({ type: 'success', text: 'Bid placed successfully!' });
      setSelectedAuction(null);
      setBidAmount('');
      loadAuctions();
    } catch (err) {
      console.error('Error placing bid:', err);
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to place bid' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Active Auctions</h2>
        <Gavel className="w-8 h-8 text-blue-600" />
      </div>

      {message && (
        <Alert variant={message.type}>
          {message.text}
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {auctions.length > 0 ? (
          auctions.map(auction => (
            <Card key={auction.id} className="hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-2">{auction.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{auction.description}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Price:</span>
                  <span className="font-bold text-green-600">${auction.currentPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{auction.category || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Seller:</span>
                  <span className="font-medium">{auction.seller?.username || 'Unknown'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Ends:</span>
                  <span className="font-medium">{new Date(auction.endsAt).toLocaleDateString()}</span>
                </div>
                {auction.bids && auction.bids.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Bids:</span>
                    <span className="font-medium">{auction.bids.length}</span>
                  </div>
                )}
              </div>
              <Button
                onClick={() => setSelectedAuction(auction)}
                variant="outline"
                className="w-full"
              >
                <Gavel className="w-4 h-4 mr-2" />
                Place Bid
              </Button>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <Gavel className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No active auctions available</p>
          </div>
        )}
      </div>

      {selectedAuction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Place Bid</h3>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="font-semibold">{selectedAuction.title}</p>
              <p className="text-sm text-gray-600">Current Price: ${selectedAuction.currentPrice}</p>
            </div>
            <form onSubmit={handlePlaceBid} className="space-y-4">
              <Input
                label="Your Bid Amount"
                type="number"
                step="0.01"
                min={selectedAuction.currentPrice + 0.01}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                required
              />
              <div className="flex gap-2">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? 'Placing...' : 'Place Bid'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setSelectedAuction(null);
                    setBidAmount('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;