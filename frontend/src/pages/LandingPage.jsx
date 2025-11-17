// // import React from 'react';
// // import { Gavel, ShoppingCart, Tag, Shield, TrendingUp, Sparkles, Clock, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
// // import { Button } from '../components/common/Button';

// // const LandingPage = ({ onNavigate }) => {
// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
// //       {/* Navigation */}
// //       <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-lg border-b border-white/10 z-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-20">
// //             <div className="flex items-center gap-3">
// //               <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg">
// //                 <Gavel className="w-8 h-8 text-white" />
// //               </div>
// //               <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
// //                 AuctionHub
// //               </span>
// //             </div>
// //             <div className="flex gap-4">
// //               <button
// //                 onClick={() => onNavigate('login')}
// //                 className="px-6 py-3 text-white hover:text-purple-300 font-medium transition-all duration-300 hover:scale-105"
// //               >
// //                 Sign In
// //               </button>
// //               <button
// //                 onClick={() => onNavigate('register')}
// //                 className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:scale-105"
// //               >
// //                 Sign Up Free
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Hero Section */}
// //       <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center relative">
// //             {/* Animated background elements */}
// //             <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //               <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse"></div>
// //               <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
// //             </div>

// //             <div className="relative z-10">
// //               <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
// //                 <Sparkles className="w-5 h-5 text-yellow-400" />
// //                 <span className="text-white font-medium">Live Auctions Every Day</span>
// //               </div>
              
// //               <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
// //                 <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
// //                   Bid. Win.
// //                 </span>
// //                 <br />
// //                 <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
// //                   Treasure.
// //                 </span>
// //               </h1>
              
// //               <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
// //                 Join the most thrilling online auction experience. Discover rare finds, 
// //                 place winning bids, and sell your treasures to a global audience.
// //               </p>
              
// //               <div className="flex gap-6 justify-center flex-wrap mb-12">
// //                 <Button
// //                   onClick={() => onNavigate('register')}
// //                   className="px-10 py-5 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
// //                 >
// //                   Start Bidding Now
// //                   <ArrowRight className="w-5 h-5 ml-2 inline" />
// //                 </Button>
// //                 <button
// //                   onClick={() => onNavigate('login')}
// //                   className="px-10 py-5 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl hover:bg-white/20 font-medium transition-all duration-300 transform hover:scale-105"
// //                 >
// //                   Sign In
// //                 </button>
// //               </div>

// //               {/* Stats */}
// //               <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
// //                 <StatCard number="10k+" label="Active Users" />
// //                 <StatCard number="50k+" label="Items Sold" />
// //                 <StatCard number="98%" label="Satisfaction" />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Features Section */}
// //       <div className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-16">
// //             <h2 className="text-5xl font-bold text-white mb-4">
// //               Why Choose AuctionHub?
// //             </h2>
// //             <p className="text-xl text-gray-300">
// //               The ultimate platform for buyers and sellers
// //             </p>
// //           </div>
          
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //             <FeatureCard
// //               icon={<ShoppingCart className="w-10 h-10" />}
// //               title="Easy Bidding"
// //               description="Place bids instantly with our lightning-fast interface. Real-time updates keep you in the action."
// //               gradient="from-blue-500 to-cyan-500"
// //             />
// //             <FeatureCard
// //               icon={<Tag className="w-10 h-10" />}
// //               title="Sell Anything"
// //               description="List unlimited items and reach thousands of eager buyers from around the world."
// //               gradient="from-purple-500 to-pink-500"
// //             />
// //             <FeatureCard
// //               icon={<Shield className="w-10 h-10" />}
// //               title="100% Secure"
// //               description="Bank-level encryption protects every transaction. Your data is always safe with us."
// //               gradient="from-green-500 to-emerald-500"
// //             />
// //             <FeatureCard
// //               icon={<TrendingUp className="w-10 h-10" />}
// //               title="Live Tracking"
// //               description="Monitor all your bids in real-time. Never miss an opportunity with instant notifications."
// //               gradient="from-orange-500 to-red-500"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* How It Works Section */}
// //       <div className="py-20 px-4 sm:px-6 lg:px-8">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-16">
// //             <h2 className="text-5xl font-bold text-white mb-4">
// //               Get Started in 3 Simple Steps
// //             </h2>
// //           </div>
          
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             <StepCard
// //               number="1"
// //               icon={<Users className="w-12 h-12 text-purple-400" />}
// //               title="Create Account"
// //               description="Sign up for free in seconds. No credit card required to start exploring."
// //             />
// //             <StepCard
// //               number="2"
// //               icon={<Clock className="w-12 h-12 text-pink-400" />}
// //               title="Browse Auctions"
// //               description="Explore thousands of live auctions. Find exactly what you're looking for."
// //             />
// //             <StepCard
// //               number="3"
// //               icon={<Award className="w-12 h-12 text-yellow-400" />}
// //               title="Bid & Win"
// //               description="Place your bid and compete. Win amazing items at unbeatable prices."
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Benefits Section */}
// //       <div className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm">
// //         <div className="max-w-6xl mx-auto">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //             <div>
// //               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
// //                 Join Thousands of Happy Customers
// //               </h2>
// //               <p className="text-xl text-gray-300 mb-8">
// //                 Whether you're buying or selling, AuctionHub provides the perfect marketplace for all your needs.
// //               </p>
// //               <div className="space-y-4">
// //                 <BenefitItem text="No hidden fees or commissions" />
// //                 <BenefitItem text="24/7 customer support" />
// //                 <BenefitItem text="Verified seller badges" />
// //                 <BenefitItem text="Secure payment processing" />
// //                 <BenefitItem text="Mobile-friendly platform" />
// //               </div>
// //             </div>
// //             <div className="relative">
// //               <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 shadow-2xl">
// //                 <div className="text-center">
// //                   <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
// //                     <Gavel className="w-12 h-12 text-white" />
// //                   </div>
// //                   <h3 className="text-3xl font-bold text-white mb-4">Ready to Start?</h3>
// //                   <p className="text-gray-300 mb-6">
// //                     Create your free account today and get access to exclusive auctions.
// //                   </p>
// //                   <Button
// //                     onClick={() => onNavigate('register')}
// //                     className="w-full py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
// //                   >
// //                     Get Started Free
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* CTA Section */}
// //       <div className="py-20 px-4 sm:px-6 lg:px-8">
// //         <div className="max-w-5xl mx-auto">
// //           <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
// //             <div className="absolute inset-0 bg-black/20"></div>
// //             <div className="relative z-10">
// //               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
// //                 Don't Miss Out on Amazing Deals
// //               </h2>
// //               <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
// //                 Join our community today and discover why thousands choose AuctionHub for their auction needs.
// //               </p>
// //               <Button
// //                 onClick={() => onNavigate('register')}
// //                 className="px-12 py-5 text-lg bg-white text-purple-600 hover:bg-gray-100 shadow-xl transform hover:scale-105 transition-all duration-300"
// //               >
// //                 Create Free Account Now
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Footer */}
// //       <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-12">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="text-center">
// //             <div className="flex items-center justify-center gap-3 mb-4">
// //               <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
// //                 <Gavel className="w-6 h-6 text-white" />
// //               </div>
// //               <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
// //                 AuctionHub
// //               </span>
// //             </div>
// //             <p className="text-gray-400 mb-4">Your premier online auction destination</p>
// //             <p className="text-gray-500">&copy; 2024 AuctionHub. All rights reserved.</p>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // };

// // const StatCard = ({ number, label }) => {
// //   return (
// //     <div className="text-center">
// //       <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
// //         {number}
// //       </div>
// //       <div className="text-gray-300 font-medium">{label}</div>
// //     </div>
// //   );
// // };

// // const FeatureCard = ({ icon, title, description, gradient }) => {
// //   return (
// //     <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
// //       <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
// //         {React.cloneElement(icon, { className: 'w-10 h-10 text-white' })}
// //       </div>
// //       <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
// //       <p className="text-gray-300 leading-relaxed">{description}</p>
// //     </div>
// //   );
// // };

// // const StepCard = ({ number, icon, title, description }) => {
// //   return (
// //     <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all duration-300">
// //       <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
// //         {number}
// //       </div>
// //       <div className="mt-4 mb-6">{icon}</div>
// //       <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
// //       <p className="text-gray-300 leading-relaxed">{description}</p>
// //     </div>
// //   );
// // };

// // const BenefitItem = ({ text }) => {
// //   return (
// //     <div className="flex items-center gap-3">
// //       <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
// //       <span className="text-lg text-gray-200">{text}</span>
// //     </div>
// //   );
// // };

// // export default LandingPage;

// import React from 'react';
// import { Gavel, ShoppingCart, Tag, Shield, TrendingUp, Sparkles, Clock, Users, Award, ArrowRight, CheckCircle, Zap } from 'lucide-react';
// import { Button } from '../components/common/Button';

// const LandingPage = ({ onNavigate }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center gap-2">
//               <Gavel className="w-8 h-8 text-blue-600" />
//               <span className="text-2xl font-bold text-gray-900">Auction Platform</span>
//             </div>
//             <div className="flex gap-4">
//               <button
//                 onClick={() => onNavigate('login')}
//                 className="px-5 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
//               >
//                 Sign In
//               </button>
//               <button
//                 onClick={() => onNavigate('register')}
//                 className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-md hover:shadow-lg"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
//         <div className="text-center">
//           <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-5 py-2 mb-6">
//             <Sparkles className="w-5 h-5 text-blue-600" />
//             <span className="text-blue-800 font-medium text-sm">Trusted by 10,000+ Users</span>
//           </div>
          
//           <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
//             Discover Amazing Deals
//             <br />
//             <span className="text-blue-600">Win Big at Auctions</span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
//             Join the premier online auction platform. Buy unique items, sell your treasures, 
//             and connect with thousands of buyers and sellers worldwide.
//           </p>
          
//           <div className="flex gap-4 justify-center flex-wrap mb-12">
//             <Button
//               onClick={() => onNavigate('register')}
//               className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all"
//             >
//               Get Started Free
//               <ArrowRight className="w-5 h-5 ml-2 inline" />
//             </Button>
//             <button
//               onClick={() => onNavigate('login')}
//               className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 bg-white rounded-lg hover:bg-blue-50 font-medium transition-all shadow-md hover:shadow-lg"
//             >
//               Sign In
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
//             <StatCard number="10k+" label="Active Users" />
//             <StatCard number="50k+" label="Items Sold" />
//             <StatCard number="98%" label="Happy Customers" />
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="bg-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Why Choose Our Platform?
//             </h2>
//             <p className="text-xl text-gray-600">
//               Everything you need for a seamless auction experience
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <FeatureCard
//               icon={<ShoppingCart className="w-12 h-12 text-blue-600" />}
//               title="Easy Bidding"
//               description="Place bids instantly with our intuitive interface. Real-time updates keep you in the action."
//               color="blue"
//             />
//             <FeatureCard
//               icon={<Tag className="w-12 h-12 text-indigo-600" />}
//               title="Sell Anything"
//               description="List your items and reach thousands of potential buyers around the world."
//               color="indigo"
//             />
//             <FeatureCard
//               icon={<Shield className="w-12 h-12 text-green-600" />}
//               title="100% Secure"
//               description="Your transactions are protected with industry-leading security measures."
//               color="green"
//             />
//             <FeatureCard
//               icon={<TrendingUp className="w-12 h-12 text-purple-600" />}
//               title="Live Updates"
//               description="Monitor your bids in real-time. Never miss an opportunity with instant notifications."
//               color="purple"
//             />
//           </div>
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//               Get Started in 3 Simple Steps
//             </h2>
//             <p className="text-xl text-gray-600">
//               Start bidding and selling in minutes
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <StepCard
//               number="1"
//               icon={<Users className="w-12 h-12 text-blue-600" />}
//               title="Create Account"
//               description="Sign up for free in seconds. Choose to register as a buyer or seller to get started."
//             />
//             <StepCard
//               number="2"
//               icon={<Clock className="w-12 h-12 text-blue-600" />}
//               title="Browse Auctions"
//               description="Explore thousands of live auctions. Find exactly what you're looking for in various categories."
//             />
//             <StepCard
//               number="3"
//               icon={<Award className="w-12 h-12 text-blue-600" />}
//               title="Bid & Win"
//               description="Place your bid and compete. Win amazing items at unbeatable prices and grow your collection."
//             />
//           </div>
//         </div>
//       </div>

//       {/* Benefits Section */}
//       <div className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
//                 Join Thousands of Happy Customers
//               </h2>
//               <p className="text-xl text-gray-600 mb-8">
//                 Whether you're buying or selling, our platform provides the perfect marketplace for all your auction needs.
//               </p>
//               <div className="space-y-4">
//                 <BenefitItem text="No hidden fees or commissions" />
//                 <BenefitItem text="24/7 customer support team" />
//                 <BenefitItem text="Verified seller badges" />
//                 <BenefitItem text="Secure payment processing" />
//                 <BenefitItem text="Mobile-friendly platform" />
//                 <BenefitItem text="Real-time bid notifications" />
//               </div>
//             </div>
//             <div className="relative">
//               <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-8 shadow-xl">
//                 <div className="text-center">
//                   <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
//                     <Gavel className="w-10 h-10 text-white" />
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
//                   <p className="text-gray-600 mb-6 text-lg">
//                     Create your free account today and get access to exclusive auctions.
//                   </p>
//                   <Button
//                     onClick={() => onNavigate('register')}
//                     className="w-full py-4 text-lg shadow-lg hover:shadow-xl"
//                   >
//                     Create Free Account
//                   </Button>
//                   <p className="text-sm text-gray-500 mt-4">No credit card required</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Features Grid */}
//       <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Powerful Features for Everyone
//             </h2>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <MiniFeature icon={<Zap />} title="Lightning Fast" description="Instant bid placement and updates" />
//             <MiniFeature icon={<Shield />} title="Bank-Level Security" description="Your data is always protected" />
//             <MiniFeature icon={<Users />} title="Active Community" description="Join thousands of users" />
//             <MiniFeature icon={<Clock />} title="24/7 Available" description="Bid anytime, anywhere" />
//             <MiniFeature icon={<Award />} title="Quality Items" description="Verified products only" />
//             <MiniFeature icon={<TrendingUp />} title="Great Deals" description="Save up to 70% off retail" />
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="py-20 bg-white">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Don't Miss Out on Amazing Deals
//             </h2>
//             <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//               Join our community today and discover why thousands choose our platform for their auction needs.
//             </p>
//             <Button
//               onClick={() => onNavigate('register')}
//               className="px-10 py-4 text-lg bg-white text-blue-500 hover:bg-gray-10`0 shadow-xl"
//             >
//               Create Free Account Now
//             </Button>
//             <p className="text-blue-100 mt-4">Get started in less than 2 minutes</p>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-2 mb-4">
//               <Gavel className="w-6 h-6 text-blue-400" />
//               <span className="text-xl font-bold text-white">Auction Platform</span>
//             </div>
//             <p className="text-gray-400 mb-4">Your premier online auction destination</p>
//             <p className="text-gray-500 text-sm">&copy; 2024 Auction Platform. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const StatCard = ({ number, label }) => {
//   return (
//     <div className="text-center">
//       <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
//         {number}
//       </div>
//       <div className="text-gray-600 font-medium">{label}</div>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, description, color }) => {
//   const colorClasses = {
//     blue: 'bg-blue-50 group-hover:bg-blue-100',
//     indigo: 'bg-indigo-50 group-hover:bg-indigo-100',
//     green: 'bg-green-50 group-hover:bg-green-100',
//     purple: 'bg-purple-50 group-hover:bg-purple-100'
//   };

//   return (
//     <div className="group bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//       <div className={`inline-flex p-4 rounded-xl ${colorClasses[color]} mb-6 transition-colors duration-300`}>
//         {icon}
//       </div>
//       <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
//       <p className="text-gray-600 leading-relaxed">{description}</p>
//     </div>
//   );
// };

// const StepCard = ({ number, icon, title, description }) => {
//   return (
//     <div className="relative bg-white border border-blue-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
//       <div className="absolute -top-5 left-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
//         {number}
//       </div>
//       <div className="mt-4 mb-6">{icon}</div>
//       <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
//       <p className="text-gray-600 leading-relaxed">{description}</p>
//     </div>
//   );
// };

// const BenefitItem = ({ text }) => {
//   return (
//     <div className="flex items-center gap-3">
//       <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
//       <span className="text-lg text-gray-700">{text}</span>
//     </div>
//   );
// };

// const MiniFeature = ({ icon, title, description }) => {
//   return (
//     <div className="bg-white border border-blue-200 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
//       <div className="text-blue-600 mb-3">
//         {React.cloneElement(icon, { className: 'w-8 h-8' })}
//       </div>
//       <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
//       <p className="text-gray-600 text-sm">{description}</p>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { Gavel, ShoppingCart, Tag, Shield, TrendingUp, Sparkles, Clock, Users, Award, ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { Button } from '../components/common/Button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Gavel className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Auction Platform</span>
            </div>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-5 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 rounded-full px-5 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium text-sm">Trusted by 10,000+ Users</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Discover Amazing Deals
            <br />
            <span className="text-blue-600">Win Big at Auctions</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join the premier online auction platform. Buy unique items, sell your treasures, 
            and connect with thousands of buyers and sellers worldwide.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap mb-12">
            <Link to="/register">
              <Button className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Button>
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 bg-white rounded-lg hover:bg-blue-50 font-medium transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
            <StatCard number="10k+" label="Active Users" />
            <StatCard number="50k+" label="Items Sold" />
            <StatCard number="98%" label="Happy Customers" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for a seamless auction experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<ShoppingCart className="w-12 h-12 text-blue-600" />}
              title="Easy Bidding"
              description="Place bids instantly with our intuitive interface. Real-time updates keep you in the action."
              color="blue"
            />
            <FeatureCard
              icon={<Tag className="w-12 h-12 text-indigo-600" />}
              title="Sell Anything"
              description="List your items and reach thousands of potential buyers around the world."
              color="indigo"
            />
            <FeatureCard
              icon={<Shield className="w-12 h-12 text-green-600" />}
              title="100% Secure"
              description="Your transactions are protected with industry-leading security measures."
              color="green"
            />
            <FeatureCard
              icon={<TrendingUp className="w-12 h-12 text-purple-600" />}
              title="Live Updates"
              description="Monitor your bids in real-time. Never miss an opportunity with instant notifications."
              color="purple"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Start bidding and selling in minutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              icon={<Users className="w-12 h-12 text-blue-600" />}
              title="Create Account"
              description="Sign up for free in seconds. Choose to register as a buyer or seller to get started."
            />
            <StepCard
              number="2"
              icon={<Clock className="w-12 h-12 text-blue-600" />}
              title="Browse Auctions"
              description="Explore thousands of live auctions. Find exactly what you're looking for in various categories."
            />
            <StepCard
              number="3"
              icon={<Award className="w-12 h-12 text-blue-600" />}
              title="Bid & Win"
              description="Place your bid and compete. Win amazing items at unbeatable prices and grow your collection."
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Join Thousands of Happy Customers
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Whether you're buying or selling, our platform provides the perfect marketplace for all your auction needs.
              </p>
              <div className="space-y-4">
                <BenefitItem text="No hidden fees or commissions" />
                <BenefitItem text="24/7 customer support team" />
                <BenefitItem text="Verified seller badges" />
                <BenefitItem text="Secure payment processing" />
                <BenefitItem text="Mobile-friendly platform" />
                <BenefitItem text="Real-time bid notifications" />
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Gavel className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    Create your free account today and get access to exclusive auctions.
                  </p>
                  <Link to="/register">
                    <Button className="w-full py-4 text-lg shadow-lg hover:shadow-xl">
                      Create Free Account
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-500 mt-4">No credit card required</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Everyone
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MiniFeature icon={<Zap />} title="Lightning Fast" description="Instant bid placement and updates" />
            <MiniFeature icon={<Shield />} title="Bank-Level Security" description="Your data is always protected" />
            <MiniFeature icon={<Users />} title="Active Community" description="Join thousands of users" />
            <MiniFeature icon={<Clock />} title="24/7 Available" description="Bid anytime, anywhere" />
            <MiniFeature icon={<Award />} title="Quality Items" description="Verified products only" />
            <MiniFeature icon={<TrendingUp />} title="Great Deals" description="Save up to 70% off retail" />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Don't Miss Out on Amazing Deals
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join our community today and discover why thousands choose our platform for their auction needs.
            </p>
            <Link to="/register">
              <Button className="px-10 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
                Create Free Account Now
              </Button>
            </Link>
            <p className="text-blue-100 mt-4">Get started in less than 2 minutes</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Gavel className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">Auction Platform</span>
            </div>
            <p className="text-gray-400 mb-4">Your premier online auction destination</p>
            <p className="text-gray-500 text-sm">&copy; 2024 Auction Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatCard = ({ number, label }) => {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
        {number}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 group-hover:bg-blue-100',
    indigo: 'bg-indigo-50 group-hover:bg-indigo-100',
    green: 'bg-green-50 group-hover:bg-green-100',
    purple: 'bg-purple-50 group-hover:bg-purple-100'
  };

  return (
    <div className="group bg-white border border-gray-200 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`inline-flex p-4 rounded-xl ${colorClasses[color]} mb-6 transition-colors duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const StepCard = ({ number, icon, title, description }) => {
  return (
    <div className="relative bg-white border border-blue-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute -top-5 left-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
        {number}
      </div>
      <div className="mt-4 mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const BenefitItem = ({ text }) => {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
      <span className="text-lg text-gray-700">{text}</span>
    </div>
  );
};

const MiniFeature = ({ icon, title, description }) => {
  return (
    <div className="bg-white border border-blue-200 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
      <div className="text-blue-600 mb-3">
        {React.cloneElement(icon, { className: 'w-8 h-8' })}
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default LandingPage;