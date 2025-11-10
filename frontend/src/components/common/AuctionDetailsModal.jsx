// import React, { useState, useEffect } from 'react';
// import { X, Loader } from 'lucide-react';
// import { Card } from './Card';
// import { Alert } from './Alert';
// import api from '../../services/api';

// const AuctionDetailsModal = ({ auction, isOpen, onClose }) => {
//   const [bids, setBids] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (isOpen && auction) {
//       loadBids();
//     }
//   }, [isOpen, auction]);

//   const loadBids = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const bidsData = await api.getAuctionBids(auction.id);
//       setBids(Array.isArray(bidsData) ? bidsData : []);
//     } catch (err) {
//       console.error('Error loading bids:', err);
//       setError('Failed to load bids');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen || !auction) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-start mb-4">
//           <div>
//             <h2 className="text-2xl font-bold">{auction.title}</h2>
//             <p className="text-gray-600 text-sm mt-1">{auction.description}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
//           <div>
//             <p className="text-gray-600 text-sm">Current Price</p>
//             <p className="text-2xl font-bold text-green-600">${auction.currentPrice}</p>
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Starting Price</p>
//             <p className="text-2xl font-bold">${auction.startingPrice}</p>
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Category</p>
//             <p className="font-medium">{auction.category || 'N/A'}</p>
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Status</p>
//             <p className={`font-medium ${auction.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
//               {auction.status}
//             </p>
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Ends</p>
//             <p className="font-medium">{new Date(auction.endsAt).toLocaleDateString()}</p>
//           </div>
//           <div>
//             <p className="text-gray-600 text-sm">Seller</p>
//             <p className="font-medium">{auction.seller?.username || 'Unknown'}</p>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-xl font-bold mb-4">Bids ({bids.length})</h3>
          
//           {error && (
//             <Alert variant="error" className="mb-4">
//               {error}
//             </Alert>
//           )}

//           {loading ? (
//             <div className="flex justify-center py-8">
//               <Loader className="w-6 h-6 animate-spin text-blue-600" />
//             </div>
//           ) : bids.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Bidder</th>
//                     <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Bid Amount</th>
//                     <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {bids.map((bid) => (
//                     <tr key={bid.id} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 text-sm font-medium">
//                         {bid.buyer?.username || 'Unknown'}
//                       </td>
//                       <td className="px-4 py-3 text-sm font-bold text-green-600">
//                         ${bid.bidAmount}
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-600">
//                         {new Date(bid.timestamp).toLocaleString()}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-center text-gray-500 py-8">No bids placed yet</p>
//           )}
//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
//           >
//             Close
//           </button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default AuctionDetailsModal;

import React, { useState, useEffect } from 'react';
import { X, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './Card';
import { Alert } from './Alert';
import api from '../../services/api';

const AuctionDetailsModal = ({ auction, isOpen, onClose }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen && auction) {
      // If auction already has bids, use them; otherwise fetch
      if (auction.bids && Array.isArray(auction.bids)) {
        setBids(auction.bids);
      } else {
        loadBids();
      }
      // Reset image index when modal opens
      setCurrentImageIndex(0);
    }
  }, [isOpen, auction]);

  const loadBids = async () => {
    setLoading(true);
    setError(null);
    try {
      const bidsData = await api.getAuctionBids(auction.id);
      setBids(Array.isArray(bidsData) ? bidsData : []);
    } catch (err) {
      console.error('Error loading bids:', err);
      setError('Failed to load bids');
    } finally {
      setLoading(false);
    }
  };

  const images = auction?.images || [];
  const hasImages = images.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen || !auction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">{auction.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{auction.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Image Carousel */}
        {hasImages ? (
          <div className="relative mb-6 bg-gray-100 rounded-lg overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={images[currentImageIndex].imageUrl}
                alt={`${auction.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      index === currentImageIndex
                        ? 'border-blue-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6 bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <p className="text-gray-500">No images available</p>
          </div>
        )}

        {/* Auction Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-gray-600 text-sm">Current Price</p>
            <p className="text-2xl font-bold text-green-600">${auction.currentPrice}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Starting Price</p>
            <p className="text-2xl font-bold">${auction.startingPrice}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Category</p>
            <p className="font-medium">{auction.category || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Status</p>
            <p className={`font-medium ${
              auction.status === 'active' ? 'text-green-600' : 
              auction.status === 'pending' ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {auction.status.toUpperCase()}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Ends</p>
            <p className="font-medium">{new Date(auction.endsAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Seller</p>
            <p className="font-medium">{auction.seller?.username || 'Unknown'}</p>
          </div>
        </div>

        {/* Bids Section */}
        <div>
          <h3 className="text-xl font-bold mb-4">Bids ({bids.length})</h3>
          
          {error && (
            <Alert variant="error" className="mb-4">
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-blue-600" />
            </div>
          ) : bids.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Bidder</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Bid Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bids.map((bid) => (
                    <tr key={bid.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">
                        {bid.buyer?.username || 'Unknown'}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600">
                        ${bid.bidAmount}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(bid.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No bids placed yet</p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AuctionDetailsModal;