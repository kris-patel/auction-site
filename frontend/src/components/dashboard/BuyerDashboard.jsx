// import React, { useState, useEffect } from 'react';
// import { Gavel, Clock, CheckCircle, TrendingUp, Award, AlertCircle } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { Alert } from '../common/Alert';
// import { Button } from '../common/Button';
// import { Input } from '../common/Input';
// import { Card } from '../common/Card';
// import AuctionDetailsModal from '../common/AuctionDetailsModal';
// import AuctionCard from '../common/AuctionCard';
// import api from '../../services/api';

// const BuyerDashboard = () => {
//   const [activeTab, setActiveTab] = useState('browse'); // browse, my-bids
//   const [statusFilter, setStatusFilter] = useState('active'); // active or completed
//   const [auctions, setAuctions] = useState([]);
//   const [myBids, setMyBids] = useState([]);
//   const [selectedAuction, setSelectedAuction] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [showBidModal, setShowBidModal] = useState(false);
//   const [bidAmount, setBidAmount] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [loadingDetails, setLoadingDetails] = useState(false);
//   const [message, setMessage] = useState(null);
//   const { user } = useAuth();

//   useEffect(() => {
//     if (activeTab === 'browse') {
//       loadAuctions();
//     } else if (activeTab === 'my-bids') {
//       loadMyBids();
//     }
//   }, [statusFilter, activeTab]);

//   const loadAuctions = async () => {
//     try {
//       const auctionsData = await api.getAuctions(statusFilter);
//       setAuctions(Array.isArray(auctionsData) ? auctionsData : []);
//     } catch (err) {
//       console.error('Error loading auctions:', err);
//       setMessage({ type: 'error', text: 'Failed to load auctions' });
//     }
//   };

//   const loadMyBids = async () => {
//     setLoading(true);
//     try {
//       const bidsData = await api.getMyBids();
//       console.log('My bids data:', bidsData);
//       setMyBids(Array.isArray(bidsData) ? bidsData : []);
//     } catch (err) {
//       console.error('Error loading bids:', err);
//       setMessage({ type: 'error', text: 'Failed to load your bids' });
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

//   const handlePlaceBidClick = (auction) => {
//     setSelectedAuction(auction);
//     setShowBidModal(true);
//     setBidAmount('');
//   };

//   const handlePlaceBid = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       await api.placeBid(selectedAuction.id, parseFloat(bidAmount));
//       setMessage({ type: 'success', text: 'Bid placed successfully!' });
//       setShowBidModal(false);
//       setSelectedAuction(null);
//       setBidAmount('');
//       loadAuctions();
//       if (activeTab === 'my-bids') {
//         loadMyBids();
//       }
//     } catch (err) {
//       console.error('Error placing bid:', err);
//       setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to place bid' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Determine bid status
//   const getBidStatus = (bid) => {
//     const isActive = bid.auction.status === 'active';
//     const isEnded = new Date() > new Date(bid.auction.endsAt);
//     const isWinning = bid.bidAmount >= bid.auction.currentPrice;

//     if (!isActive || isEnded) {
//       return {
//         label: isWinning ? 'Won' : 'Lost',
//         color: isWinning ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50',
//         icon: isWinning ? Award : AlertCircle
//       };
//     }

//     return {
//       label: isWinning ? 'Winning' : 'Outbid',
//       color: isWinning ? 'text-blue-600 bg-blue-50' : 'text-yellow-600 bg-yellow-50',
//       icon: isWinning ? TrendingUp : AlertCircle
//     };
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h2>
//         <Gavel className="w-8 h-8 text-blue-600" />
//       </div>

//       {message && (
//         <Alert variant={message.type}>
//           {message.text}
//         </Alert>
//       )}

//       {/* Main Tabs */}
//       <div className="border-b border-gray-200">
//         <div className="flex space-x-8">
//           <button
//             onClick={() => setActiveTab('browse')}
//             className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
//               activeTab === 'browse'
//                 ? 'border-blue-500 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <Gavel className="w-4 h-4" />
//             Browse Auctions
//           </button>
//           <button
//             onClick={() => setActiveTab('my-bids')}
//             className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
//               activeTab === 'my-bids'
//                 ? 'border-blue-500 text-blue-600'
//                 : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//             }`}
//           >
//             <TrendingUp className="w-4 h-4" />
//             My Bids
//             {myBids.length > 0 && (
//               <span className="ml-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
//                 {myBids.length}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Browse Auctions Tab */}
//       {activeTab === 'browse' && (
//         <>
//           {/* Status Filter Tabs */}
//           <div className="border-b border-gray-200">
//             <div className="flex space-x-8">
//               <button
//                 onClick={() => setStatusFilter('active')}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
//                   statusFilter === 'active'
//                     ? 'border-green-500 text-green-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <Clock className="w-4 h-4" />
//                 Active Auctions
//               </button>
//               <button
//                 onClick={() => setStatusFilter('completed')}
//                 className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
//                   statusFilter === 'completed'
//                     ? 'border-gray-500 text-gray-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 <CheckCircle className="w-4 h-4" />
//                 Completed Auctions
//               </button>
//             </div>
//           </div>

//           {/* Auctions Grid */}
//           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//             {auctions.length > 0 ? (
//               auctions.map(auction => (
//                 <AuctionCard
//                   key={auction.id}
//                   auction={auction}
//                   onViewDetails={handleViewDetails}
//                   onPlaceBid={statusFilter === 'active' ? handlePlaceBidClick : null}
//                   showBidButton={statusFilter === 'active'}
//                   isLoading={loadingDetails}
//                 />
//               ))
//             ) : (
//               <div className="col-span-full text-center py-12 text-gray-500">
//                 <Gavel className="w-16 h-16 mx-auto mb-4 opacity-50" />
//                 <p>No {statusFilter} auctions available</p>
//               </div>
//             )}
//           </div>
//         </>
//       )}

//       {/* My Bids Tab */}
//       {activeTab === 'my-bids' && (
//         <div className="space-y-4">
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//               <p className="mt-4 text-gray-600">Loading your bids...</p>
//             </div>
//           ) : myBids.length > 0 ? (
//             <div className="space-y-3">
//               {myBids.map((bid) => {
//                 const status = getBidStatus(bid);
//                 const StatusIcon = status.icon;

//                 return (
//                   <Card key={bid.id} className="hover:shadow-md transition-shadow">
//                     <div className="flex items-start justify-between gap-4">
//                       {/* Left: Auction Info */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between mb-2">
//                           <div className="flex-1">
//                             <h3 className="font-semibold text-lg text-gray-900 mb-1">
//                               {bid.auction.title}
//                             </h3>
//                             <p className="text-sm text-gray-600">
//                               Seller: {bid.auction.seller.username}
//                             </p>
//                           </div>
//                           {/* Status Badge */}
//                           <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
//                             <StatusIcon className="w-3 h-3" />
//                             {status.label}
//                           </span>
//                         </div>

//                         {/* Bid Details Grid */}
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-100">
//                           <div>
//                             <p className="text-xs text-gray-500">Your Bid</p>
//                             <p className="text-sm font-bold text-blue-600">
//                               ${bid.bidAmount.toFixed(2)}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Current Price</p>
//                             <p className="text-sm font-semibold text-gray-900">
//                               ${bid.auction.currentPrice.toFixed(2)}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Bid Time</p>
//                             <p className="text-sm text-gray-700">
//                               {new Date(bid.timestamp).toLocaleDateString()}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500">Auction Ends</p>
//                             <p className="text-sm text-gray-700">
//                               {new Date(bid.auction.endsAt).toLocaleDateString()}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right: Action Button */}
//                       <div className="flex flex-col gap-2">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleViewDetails(bid.auction)}
//                         >
//                           View Details
//                         </Button>
//                         {bid.auction.status === 'active' && new Date() < new Date(bid.auction.endsAt) && (
//                           <Button
//                             size="sm"
//                             onClick={() => handlePlaceBidClick(bid.auction)}
//                           >
//                             Bid Again
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   </Card>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-12 text-gray-500">
//               <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
//               <p className="text-lg font-medium mb-2">No Bids Yet</p>
//               <p className="text-sm mb-4">Start bidding on auctions to see your bid history here</p>
//               <Button onClick={() => setActiveTab('browse')}>
//                 Browse Auctions
//               </Button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Auction Details Modal */}
//       <AuctionDetailsModal
//         auction={selectedAuction}
//         isOpen={showDetailsModal}
//         onClose={() => {
//           setShowDetailsModal(false);
//           setSelectedAuction(null);
//         }}
//       />

//       {/* Bid Placement Modal */}
//       {showBidModal && selectedAuction && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <Card className="w-full max-w-md">
//             <h3 className="text-xl font-bold mb-4">Place Bid</h3>
//             <div className="mb-4 p-4 bg-gray-50 rounded">
//               <p className="font-semibold">{selectedAuction.title}</p>
//               <p className="text-sm text-gray-600">Current Price: ${selectedAuction.currentPrice}</p>
//               <p className="text-xs text-gray-500 mt-1">
//                 Minimum bid: ${(selectedAuction.currentPrice + 0.01).toFixed(2)}
//               </p>
//             </div>
//             <form onSubmit={handlePlaceBid} className="space-y-4">
//               <Input
//                 label="Your Bid Amount"
//                 type="number"
//                 step="0.01"
//                 min={selectedAuction.currentPrice + 0.01}
//                 value={bidAmount}
//                 onChange={(e) => setBidAmount(e.target.value)}
//                 placeholder={`Minimum $${(selectedAuction.currentPrice + 0.01).toFixed(2)}`}
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
//                     setShowBidModal(false);
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
import { Gavel, Clock, CheckCircle, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import AuctionDetailsModal from '../common/AuctionDetailsModal';
import AuctionCard from '../common/AuctionCard';
import api from '../../services/api';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('browse'); // browse, my-bids
  // const [statusFilter, setStatusFilter] = useState('active'); // active or completed - COMMENTED: Only show active auctions now
  const [auctions, setAuctions] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [message, setMessage] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (activeTab === 'browse') {
      loadAuctions();
    } else if (activeTab === 'my-bids') {
      loadMyBids();
    }
  }, [activeTab]); // Removed statusFilter dependency - only loading active auctions now

  const loadAuctions = async () => {
    try {
      // Only load active auctions
      const auctionsData = await api.getAuctions('active');
      setAuctions(Array.isArray(auctionsData) ? auctionsData : []);
    } catch (err) {
      console.error('Error loading auctions:', err);
      setMessage({ type: 'error', text: 'Failed to load auctions' });
    }
  };

  const loadMyBids = async () => {
    setLoading(true);
    try {
      const bidsData = await api.getMyBids();
      console.log('My bids data:', bidsData);
      setMyBids(Array.isArray(bidsData) ? bidsData : []);
    } catch (err) {
      console.error('Error loading bids:', err);
      setMessage({ type: 'error', text: 'Failed to load your bids' });
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

  const handlePlaceBidClick = (auction) => {
    setSelectedAuction(auction);
    setShowBidModal(true);
    setBidAmount('');
  };

  const handlePlaceBid = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.placeBid(selectedAuction.id, parseFloat(bidAmount));
      setMessage({ type: 'success', text: 'Bid placed successfully!' });
      setShowBidModal(false);
      setSelectedAuction(null);
      setBidAmount('');
      loadAuctions();
      if (activeTab === 'my-bids') {
        loadMyBids();
      }
    } catch (err) {
      console.error('Error placing bid:', err);
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to place bid' });
    } finally {
      setLoading(false);
    }
  };

  // Determine bid status
  const getBidStatus = (bid) => {
    const isActive = bid.auction.status === 'active';
    const isEnded = new Date() > new Date(bid.auction.endsAt);
    const isWinning = bid.bidAmount >= bid.auction.currentPrice;

    if (!isActive || isEnded) {
      return {
        label: isWinning ? 'Won' : 'Lost',
        color: isWinning ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50',
        icon: isWinning ? Award : AlertCircle
      };
    }

    return {
      label: isWinning ? 'Winning' : 'Outbid',
      color: isWinning ? 'text-blue-600 bg-blue-50' : 'text-yellow-600 bg-yellow-50',
      icon: isWinning ? TrendingUp : AlertCircle
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h2>
        <Gavel className="w-8 h-8 text-blue-600" />
      </div>

      {message && (
        <Alert variant={message.type}>
          {message.text}
        </Alert>
      )}

      {/* Main Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('browse')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'browse'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Gavel className="w-4 h-4" />
            Browse Auctions
          </button>
          <button
            onClick={() => setActiveTab('my-bids')}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
              activeTab === 'my-bids'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            My Bids
            {myBids.length > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                {myBids.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Browse Auctions Tab */}
      {activeTab === 'browse' && (
        <>
          {/* Status Filter Tabs - COMMENTED OUT: Only showing active auctions now
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setStatusFilter('active')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  statusFilter === 'active'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Clock className="w-4 h-4" />
                Active Auctions
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  statusFilter === 'completed'
                    ? 'border-gray-500 text-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                Completed Auctions
              </button>
            </div>
          </div>
          */}

          {/* Auctions Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {auctions.length > 0 ? (
              auctions.map(auction => (
                <AuctionCard
                  key={auction.id}
                  auction={auction}
                  onViewDetails={handleViewDetails}
                  onPlaceBid={handlePlaceBidClick}
                  showBidButton={true}
                  isLoading={loadingDetails}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <Gavel className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No active auctions available</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* My Bids Tab */}
      {activeTab === 'my-bids' && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your bids...</p>
            </div>
          ) : myBids.length > 0 ? (
            <div className="space-y-3">
              {myBids.map((bid) => {
                const status = getBidStatus(bid);
                const StatusIcon = status.icon;

                return (
                  <Card key={bid.id} className="hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Auction Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 mb-1">
                              {bid.auction.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Seller: {bid.auction.seller.username}
                            </p>
                          </div>
                          {/* Status Badge */}
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>

                        {/* Bid Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-gray-100">
                          <div>
                            <p className="text-xs text-gray-500">Your Bid</p>
                            <p className="text-sm font-bold text-blue-600">
                              ${bid.bidAmount.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Current Price</p>
                            <p className="text-sm font-semibold text-gray-900">
                              ${bid.auction.currentPrice.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Bid Time</p>
                            <p className="text-sm text-gray-700">
                              {new Date(bid.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Auction Ends</p>
                            <p className="text-sm text-gray-700">
                              {new Date(bid.auction.endsAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Action Button */}
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(bid.auction)}
                        >
                          View Details
                        </Button>
                        {bid.auction.status === 'active' && new Date() < new Date(bid.auction.endsAt) && (
                          <Button
                            size="sm"
                            onClick={() => handlePlaceBidClick(bid.auction)}
                          >
                            Bid Again
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No Bids Yet</p>
              <p className="text-sm mb-4">Start bidding on auctions to see your bid history here</p>
              <Button onClick={() => setActiveTab('browse')}>
                Browse Auctions
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Auction Details Modal */}
      <AuctionDetailsModal
        auction={selectedAuction}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedAuction(null);
        }}
      />

      {/* Bid Placement Modal */}
      {showBidModal && selectedAuction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Place Bid</h3>
            <div className="mb-4 p-4 bg-gray-50 rounded">
              <p className="font-semibold">{selectedAuction.title}</p>
              <p className="text-sm text-gray-600">Current Price: ${selectedAuction.currentPrice}</p>
              <p className="text-xs text-gray-500 mt-1">
                Minimum bid: ${(selectedAuction.currentPrice + 0.01).toFixed(2)}
              </p>
            </div>
            <form onSubmit={handlePlaceBid} className="space-y-4">
              <Input
                label="Your Bid Amount"
                type="number"
                step="0.01"
                min={selectedAuction.currentPrice + 0.01}
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder={`Minimum $${(selectedAuction.currentPrice + 0.01).toFixed(2)}`}
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
                    setShowBidModal(false);
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