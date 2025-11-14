// ERROR WADO CODE CHE

// import React from 'react';
// import { Gavel, Edit, Trash2 } from 'lucide-react';
// import { Card } from './Card';
// import { Button } from './Button';

// const AuctionCard = ({ 
//   auction, 
//   onViewDetails, 
//   onPlaceBid, 
//   onEdit,
//   onDelete,
//   showBidButton = true,
//   showEditButton = false,
//   showDeleteButton = false,
//   isLoading = false 
// }) => {
//   const truncateText = (text, maxLength = 80) => {
//     if (!text) return '';
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'active':
//         return 'text-green-600';
//       case 'pending':
//         return 'text-yellow-600';
//       case 'closed':
//         return 'text-red-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   const getStatusBadge = (status) => {
//     const color = getStatusColor(status);
//     return (
//       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//         status?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' :
//         status?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
//         'bg-red-100 text-red-700'
//       }`}>
//         {status?.toUpperCase() || 'UNKNOWN'}
//       </span>
//     );
//   };

//   return (
//     <Card 
//       className="hover:shadow-lg hover:scale-[1.02] transition-all flex flex-col h-full cursor-pointer group"
//       onClick={() => {
//         console.log("Card clicked! Auction details:", auction);
//         onViewDetails(auction)
//         }
//     }
//     >
//       {/* Auction Image - Fixed height */}
//       <div className="mb-3 -mx-6 -mt-6 h-48 bg-gray-100 rounded-t-lg overflow-hidden flex-shrink-0 relative">
//         {auction.images && auction.images.length > 0 ? (
//           <>
//             <img
//               src={auction.images[0].imageUrl}
//               alt={auction.title}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//             />
//             {/* Click to view overlay on hover */}
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
//               <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
//                 Click to view details
//               </span>
//             </div>
//           </>
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
//             <Gavel className="w-12 h-12" />
//             <span className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
//               Click to view details
//             </span>
//           </div>
//         )}
//         {/* Status Badge Overlay */}
//         <div className="absolute top-2 right-2">
//           {getStatusBadge(auction.status)}
//         </div>
//       </div>

//       {/* Content - Flex grow to fill space */}
//       <div className="flex flex-col flex-grow">
//         <h3 className="font-bold text-lg mb-2 line-clamp-1" title={auction.title}>
//           {auction.title}
//         </h3>
//         <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden" title={auction.description}>
//           {truncateText(auction.description, 80)}
//         </p>
        
//         <div className="space-y-2 mb-4 flex-grow">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Current Price:</span>
//             <span className="font-bold text-green-600">${auction.currentPrice}</span>
//           </div>
//           {auction.startingPrice && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Starting Price:</span>
//               <span className="font-medium">${auction.startingPrice}</span>
//             </div>
//           )}
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Category:</span>
//             <span className="font-medium">{auction.category || 'N/A'}</span>
//           </div>
//           {auction.seller && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Seller:</span>
//               <span className="font-medium">{auction.seller.username || 'Unknown'}</span>
//             </div>
//           )}
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Ends:</span>
//             <span className="font-medium">{new Date(auction.endsAt).toLocaleDateString()}</span>
//           </div>
//           {(auction.bids?.length >= 0) && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Total Bids:</span>
//               <span className="font-medium">{auction.bids?.length || auction._count?.bids || 0}</span>
//             </div>
//           )}
//         </div>

//         {/* Action Buttons - At bottom */}
//         <div className="flex gap-2 mt-auto">
//           {/* Place Bid Button - For buyers */}
//           {showBidButton && (
//             <Button
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click
//                 onPlaceBid(auction);
//               }}
//               className="flex-1"
//               disabled={auction.status !== 'active'}
//             >
//               <Gavel className="w-4 h-4 mr-2" />
//               Place Bid
//             </Button>
//           )}

//           {/* Edit Button - For sellers */}
//           {showEditButton && (
//             <Button
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click
//                 onEdit(auction);
//               }}
//               variant="outline"
//               className="flex-1"
//             >
//               <Edit className="w-4 h-4 mr-2" />
//               Edit
//             </Button>
//           )}

//           {/* Delete Button - For sellers */}
//           {showDeleteButton && (
//             <Button
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click
//                 onDelete(auction);
//               }}
//               variant="danger"
//               className="flex-1"
//             >
//               <Trash2 className="w-4 h-4 mr-2" />
//               Delete
//             </Button>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default AuctionCard;


// ---------------------------------------------------------------------------

// import React from 'react';
// import { Gavel, Eye, Edit, Trash2 } from 'lucide-react';
// import { Card } from './Card';
// import { Button } from './Button';

// const AuctionCard = ({ 
//   auction, 
//   onViewDetails, 
//   onPlaceBid, 
//   onEdit,
//   onDelete,
//   showBidButton = true,
//   showEditButton = false,
//   showDeleteButton = false,
//   isLoading = false 
// }) => {
//   const truncateText = (text, maxLength = 80) => {
//     if (!text) return '';
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'active':
//         return 'text-green-600';
//       case 'pending':
//         return 'text-yellow-600';
//       case 'closed':
//         return 'text-red-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   const getStatusBadge = (status) => {
//     const color = getStatusColor(status);
//     return (
//       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//         status?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' :
//         status?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
//         'bg-red-100 text-red-700'
//       }`}>
//         {status?.toUpperCase() || 'UNKNOWN'}
//       </span>
//     );
//   };

//   return (
//     <Card className="hover:shadow-lg transition-shadow flex flex-col h-full">
//       {/* Auction Image - Fixed height */}
//       <div className="mb-3 -mx-6 -mt-6 h-48 bg-gray-100 rounded-t-lg overflow-hidden flex-shrink-0 relative">
//         {auction.images && auction.images.length > 0 ? (
//           <img
//             src={auction.images[0].imageUrl}
//             alt={auction.title}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center text-gray-400">
//             <Gavel className="w-12 h-12" />
//           </div>
//         )}
//         {/* Status Badge Overlay */}
//         <div className="absolute top-2 right-2">
//           {getStatusBadge(auction.status)}
//         </div>
//       </div>

//       {/* Content - Flex grow to fill space */}
//       <div className="flex flex-col flex-grow">
//         <h3 className="font-bold text-lg mb-2 line-clamp-1" title={auction.title}>
//           {auction.title}
//         </h3>
//         <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden" title={auction.description}>
//           {truncateText(auction.description, 80)}
//         </p>
        
//         <div className="space-y-2 mb-4 flex-grow">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Current Price:</span>
//             <span className="font-bold text-green-600">${auction.currentPrice}</span>
//           </div>
//           {auction.startingPrice && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Starting Price:</span>
//               <span className="font-medium">${auction.startingPrice}</span>
//             </div>
//           )}
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Category:</span>
//             <span className="font-medium">{auction.category || 'N/A'}</span>
//           </div>
//           {auction.seller && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Seller:</span>
//               <span className="font-medium">{auction.seller.username || 'Unknown'}</span>
//             </div>
//           )}
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Ends:</span>
//             <span className="font-medium">{new Date(auction.endsAt).toLocaleDateString()}</span>
//           </div>
//           {(auction.bids?.length > 0 || auction._count?.bids > 0) && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Total Bids:</span>
//               <span className="font-medium">{auction.bids?.length || auction._count?.bids || 0}</span>
//             </div>
//           )}
//         </div>

//         {/* Action Buttons - At bottom */}
//         <div className="flex gap-2 mt-auto">
//           {/* View Details Button - Always shown */}
//           <Button
//             onClick={() => onViewDetails(auction)}
//             variant="outline"
//             className="flex-1"
//             disabled={isLoading}
//           >
//             <Eye className="w-4 h-4 mr-2" />
//             View Details
//           </Button>

//           {/* Place Bid Button - For buyers */}
//           {showBidButton && (
//             <Button
//               onClick={() => onPlaceBid(auction)}
//               className="flex-1"
//               disabled={auction.status !== 'active'}
//             >
//               <Gavel className="w-4 h-4 mr-2" />
//               Place Bid
//             </Button>
//           )}

//           {/* Edit Button - For sellers */}
//           {showEditButton && (
//             <Button
//               onClick={() => onEdit(auction)}
//               variant="outline"
//               className="flex-1"
//             >
//               <Edit className="w-4 h-4 mr-2" />
//               Edit
//             </Button>
//           )}

//           {/* Delete Button - For sellers */}
//           {showDeleteButton && (
//             <Button
//               onClick={() => onDelete(auction)}
//               variant="danger"
//               className="flex-1"
//             >
//               <Trash2 className="w-4 h-4 mr-2" />
//               Delete
//             </Button>
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default AuctionCard;

// ->>>>> this works


// import React from 'react';
// import { Gavel, Edit, Trash2 } from 'lucide-react';
// import { Card } from './Card';
// import { Button } from './Button';

// const AuctionCard = ({ 
//   auction, 
//   onViewDetails, 
//   onPlaceBid, 
//   onEdit,
//   onDelete,
//   showBidButton = true,
//   showEditButton = false,
//   showDeleteButton = false,
//   isLoading = false 
// }) => {
//   const truncateText = (text, maxLength = 80) => {
//     if (!text) return '';
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + '...';
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'active':
//         return 'text-green-600';
//       case 'pending':
//         return 'text-yellow-600';
//       case 'closed':
//         return 'text-red-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   const getStatusBadge = (status) => {
//     const color = getStatusColor(status);
//     return (
//       <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
//         status?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' :
//         status?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
//         'bg-red-100 text-red-700'
//       }`}>
//         {status?.toUpperCase() || 'UNKNOWN'}
//       </span>
//     );
//   };

//   const handleCardClick = () => {
//     console.log("Card clicked! Auction details:", auction);
//     onViewDetails(auction);
//   };

//   return (
//     <div 
//       className="hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group"
//       onClick={handleCardClick}
//     >
//       <Card className="flex flex-col h-full">
//       {/* Auction Image - Fixed height */}
//       <div className="mb-3 -mx-6 -mt-6 h-48 bg-gray-100 rounded-t-lg overflow-hidden flex-shrink-0 relative">
//         {auction.images && auction.images.length > 0 ? (
//           <>
//             <img
//               src={auction.images[0].imageUrl}
//               alt={auction.title}
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//             />
//             {/* Click to view overlay on hover */}
//             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
//               <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
//                 Click to view details
//               </span>
//             </div>
//           </>
//         ) : (
//           <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
//             <Gavel className="w-12 h-12" />
//             <span className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
//               Click to view details
//             </span>
//           </div>
//         )}
//         {/* Status Badge Overlay */}
//         <div className="absolute top-2 right-2">
//           {getStatusBadge(auction.status)}
//         </div>
//       </div>

//       {/* Content - Flex grow to fill space */}
//       <div className="flex flex-col flex-grow">
//         <h3 className="font-bold text-lg mb-2 line-clamp-1" title={auction.title}>
//           {auction.title}
//         </h3>
//         <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden" title={auction.description}>
//           {truncateText(auction.description, 80)}
//         </p>
        
//         <div className="space-y-2 mb-4 flex-grow">
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Current Price:</span>
//             <span className="font-bold text-green-600">${auction.currentPrice}</span>
//           </div>
//           {auction.startingPrice && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Starting Price:</span>
//               <span className="font-medium">${auction.startingPrice}</span>
//             </div>
//           )}
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Category:</span>
//             <span className="font-medium">{auction.category || 'N/A'}</span>
//           </div>
//           {auction.seller && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Seller:</span>
//               <span className="font-medium">{auction.seller.username || 'Unknown'}</span>
//             </div>
//           )}
//           <div className="flex justify-between text-sm">
//             <span className="text-gray-600">Ends:</span>
//             <span className="font-medium">{new Date(auction.endsAt).toLocaleDateString()}</span>
//           </div>
//           {(auction.bids?.length >= 0 || auction._count?.bids >= 0) && (
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Total Bids:</span>
//               <span className="font-medium">{auction.bids?.length || auction._count?.bids || 0}</span>
//             </div>
//           )}
//         </div>

//         {/* Action Buttons - At bottom */}
//         <div className="flex gap-2 mt-auto">
//           {/* Place Bid Button - For buyers */}
//           {showBidButton && (
//             <Button
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click
//                 onPlaceBid(auction);
//               }}
//               className="flex-1"
//               disabled={auction.status !== 'active'}
//             >
//               <Gavel className="w-4 h-4 mr-2" />
//               Place Bid
//             </Button>
//           )}

//           {/* Edit Button - For sellers */}
//           {showEditButton && (
//             <Button
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click
//                 onEdit(auction);
//               }}
//               variant="outline"
//               className="flex-1"
//             >
//               <Edit className="w-4 h-4 mr-2" />
//               Edit
//             </Button>
//           )}

//           {/* Delete Button - For sellers */}
//           {showDeleteButton && (
//             <Button
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent card click
//                 onDelete(auction);
//               }}
//               variant="danger"
//               className="flex-1"
//             >
//               <Trash2 className="w-4 h-4 mr-2" />
//               Delete
//             </Button>
//           )}
//         </div>
//       </div>
//       </Card>
//     </div>
//   );
// };

// export default AuctionCard;


import React from 'react';
import { Gavel, Edit, Trash2, XCircle } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

const AuctionCard = ({ 
  auction, 
  onViewDetails, 
  onPlaceBid, 
  onEdit,
  onDelete,
  onClose,
  showBidButton = true,
  showEditButton = false,
  showDeleteButton = false,
  showCloseButton = false,
  isLoading = false 
}) => {
  const truncateText = (text, maxLength = 80) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'closed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    const color = getStatusColor(status);
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        status?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' :
        status?.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
        'bg-red-100 text-red-700'
      }`}>
        {status?.toUpperCase() || 'UNKNOWN'}
      </span>
    );
  };

  const handleCardClick = () => {
    console.log("Card clicked! Auction details:", auction);
    onViewDetails(auction);
  };

  return (
    <div 
      className="hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group"
      onClick={handleCardClick}
    >
      <Card className="flex flex-col h-full">
      {/* Auction Image - Fixed height */}
      <div className="mb-3 -mx-6 -mt-6 h-48 bg-gray-100 rounded-t-lg overflow-hidden flex-shrink-0 relative">
        {auction.images && auction.images.length > 0 ? (
          <>
            <img
              src={auction.images[0].imageUrl}
              alt={auction.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            {/* Click to view overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
              <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view details
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <Gavel className="w-12 h-12" />
            <span className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view details
            </span>
          </div>
        )}
        {/* Status Badge Overlay */}
        <div className="absolute top-2 right-2">
          {getStatusBadge(auction.status)}
        </div>
      </div>

      {/* Content - Flex grow to fill space */}
      <div className="flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-2 line-clamp-1" title={auction.title}>
          {auction.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3 h-10 overflow-hidden" title={auction.description}>
          {truncateText(auction.description, 80)}
        </p>
        
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Current Price:</span>
            <span className="font-bold text-green-600">${auction.currentPrice}</span>
          </div>
          {auction.startingPrice && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Starting Price:</span>
              <span className="font-medium">${auction.startingPrice}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{auction.category || 'N/A'}</span>
          </div>
          {auction.seller && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Seller:</span>
              <span className="font-medium">{auction.seller.username || 'Unknown'}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Ends:</span>
            <span className="font-medium">{new Date(auction.endsAt).toLocaleDateString()}</span>
          </div>
          {(auction.bids?.length >= 0 || auction._count?.bids >= 0) && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Bids:</span>
              <span className="font-medium">{auction.bids?.length || auction._count?.bids || 0}</span>
            </div>
          )}
        </div>

        {/* Action Buttons - At bottom */}
        <div className="flex gap-2 mt-auto">
          {/* Place Bid Button - For buyers */}
          {showBidButton && (
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onPlaceBid(auction);
              }}
              className="flex-1"
              disabled={auction.status !== 'active'}
            >
              <div className='flex justify-center'>
                {/* <Gavel className="w-4 h-4 mr-2" /> */}
                <div>
                  Place bid
                </div>
              </div>
            </Button>
          )}

          {/* Edit Button - For sellers */}
          {showEditButton && (
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onEdit(auction);
              }}
              variant="outline"
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}

          {/* Close Auction Button - For sellers with active auctions */}
          {showCloseButton && auction.status === 'active' && (
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onClose(auction);
              }}
              variant="danger"
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Close
            </Button>
          )}

          {/* Delete Button - For sellers */}
          {showDeleteButton && (
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                onDelete(auction);
              }}
              variant="danger"
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </div>
      </Card>
    </div>
  );
};

export default AuctionCard;