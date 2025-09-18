
import React, { useEffect, useState } from "react";
import { Play, Star, Download, Smartphone, TrendingUp } from "lucide-react";
import heroimg from "../../assets/hero-section-img.jpg";
import image1 from "../../assets/home_Create1.mp4";
import image2 from "../../assets/appareldevelopmentsoftware2.mp4";
import image3 from "../../assets/home_Scale3.mp4";
function SetUp() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-50 to-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        {/* <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div> */}
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto  px-4 sm:px-6  lg:px-8 pt-8 pb-16 ">
        {/* Badges */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
          <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-700 text-sm font-medium">
              Trusted by 3,200+ Vendors
            </span>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-full px-4 py-2 flex items-center gap-1">
            <Star className="w-4 h-4 text-orange-500 fill-current" />
            <span className="text-orange-700 text-sm font-medium">
              4.8/5 Rating
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Manage Your{" "}
                            <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Digi Warehouse
              </span>
              {/* <br /> */}
              <span className="text-gray-700"> — Anywhere,Anytime</span>
              {/* <br /> */}
              {/* <span className="text-gray-900"></span> */}
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Join thousands of successful vendors who've digitized their
              business. No technical knowledge required. Start selling online
              today!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Download Free App
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 hover:bg-gray-50">
                <Play className="w-5 h-5" />
                Watch 2-min Demo
              </button>
            </div>
          </div>

          {/* Right Column - Image Placeholder */}
          <div className="order-first lg:order-last">
            <div className="relative">
              {/* Placeholder for warehouse image */}
              {/* <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-xl">
                <div className="text-center p-8">
                  <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600 text-2xl">🏬</div>
                  </div>
                  <p className="text-gray-600 font-medium text-lg">Digital Warehouse</p>
                  <p className="text-gray-500 text-sm mt-2">Smart inventory management visualization</p>
                </div>
              </div> */}
              <div>
                <img src={heroimg} alt="here-img" />
              </div>

            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-gray-500 text-sm mb-6">
            Trusted by businesses across India
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                3,247+
              </div>
              <div className="text-gray-500 text-sm">Active Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ₹2.5Cr+
              </div>
              <div className="text-gray-500 text-sm">Revenue Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
              <div className="text-gray-500 text-sm">States Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Start Selling in 3 Simple Steps
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get your business online and start earning in minutes with our
              streamlined onboarding process.
            </p>
             <button className="bg-blue-600 mt-4 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
                <a href="/register">LOG IN</a>
              </button>
            
          </div>

          {/* Steps */}
          <div className="space-y-20">
            {/* Step 1: Setup */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-lg">
                  {/* <div className="text-center p-8">
                    <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-10 h-10 text-orange-600" />
                    </div>
                    <p className="text-orange-700 font-medium text-lg">Mobile Setup Interface</p>
                    <p className="text-orange-600 text-sm mt-2">Easy registration process</p>
                  </div> */}
                  <div>
                    <video
                      src={image1}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Setup</h3>
                </div>
                <p className="text-lg text-gray-600 mb-8">
                  Download and Register in 2 minutes Enter your mobile number,
                  verify OTP, and get started immediately.
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Quick
                    </div>
                    <div className="text-xs text-gray-500">Download</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Easy
                    </div>
                    <div className="text-xs text-gray-500">Registration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Instant
                    </div>
                    <div className="text-xs text-gray-500">Access</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Start Selling */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    Start Selling
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-8">
                  Add your products in 3 easy steps. Upload photos, set prices,
                  and start receiving orders instantly.
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Upload
                    </div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Manage
                    </div>
                    <div className="text-xs text-gray-500">Inventory</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Track
                    </div>
                    <div className="text-xs text-gray-500">Orders</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-lg">
                  {/* <div className="text-center p-8">
                    <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Download className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-blue-700 font-medium text-lg">Product Management</p>
                    <p className="text-blue-600 text-sm mt-2">Inventory tracking dashboard</p>
                  </div> */}
                  <div>
                     <video
                      src={image2}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Grow Business */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-lg">
                  {/* <div className="text-center p-8">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-10 h-10 text-green-600" />
                    </div>
                    <p className="text-green-700 font-medium text-lg">Business Analytics</p>
                    <p className="text-green-600 text-sm mt-2">Growth tracking interface</p>
                  </div> */}
                  <div>
                     <video
                      src={image3}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    Grow Business
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-8">
                  Track sales and scale up your business with detailed analytics
                  and insights.
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Sales
                    </div>
                    <div className="text-xs text-gray-500">Analytics</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Growth
                    </div>
                    <div className="text-xs text-gray-500">Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      Scale
                    </div>
                    <div className="text-xs text-gray-500">Business</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <p className="text-[35px] text-gray-600 mb-8">
              Start selling your products!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                Setup takes only 3 Steps
              </button> */}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetUp;
//old code

// import React, { useEffect, useState } from "react";
// import { Play, Star, Download, Smartphone, TrendingUp } from "lucide-react";
// import heroimg from "../../assets/hero-section-img.jpg";
// import image1 from "../../assets/home_Create1.mp4";
// import image2 from "../../assets/appareldevelopmentsoftware2.mp4";
// import image3 from "../../assets/home_Scale3.mp4";
// function SetUp() {
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const scrollPercent = (scrollTop / docHeight) * 100;
//       setScrollProgress(Math.min(scrollPercent, 100));
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
//       {/* Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
//         <div
//           className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ease-out"
//           style={{ width: `${scrollProgress}%` }}
//         ></div>
//       </div>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
//         {/* Badges */}
//         <div className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start">
//           <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2 flex items-center gap-2">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-green-700 text-sm font-medium">
//               Trusted by 3,200+ Vendors
//             </span>
//           </div>
//           <div className="bg-orange-50 border border-orange-200 rounded-full px-4 py-2 flex items-center gap-1">
//             <Star className="w-4 h-4 text-orange-500 fill-current" />
//             <span className="text-orange-700 text-sm font-medium">
//               4.8/5 Rating
//             </span>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left Column - Text Content */}
//           <div className="text-center lg:text-left">
//             <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//               Manage Your{" "}
//               <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
//                 Digi Warehouse
//               </span>
//               <br />
//               <span className="text-gray-700">—Anywhere,</span>
//               <br />
//               <span className="text-gray-900">Anytime</span>
//             </h1>

//             <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
//               Join thousands of successful vendors who've digitized their
//               business. No technical knowledge required. Start selling online
//               today!
//             </p>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
//                 Download Free App
//               </button>
//               <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 hover:bg-gray-50">
//                 <Play className="w-5 h-5" />
//                 Watch 2-min Demo
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Image Placeholder */}
//           <div className="order-first lg:order-last">
//             <div className="relative">
//               {/* Placeholder for warehouse image */}
//               {/* <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-xl">
//                 <div className="text-center p-8">
//                   <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <div className="text-blue-600 text-2xl">🏬</div>
//                   </div>
//                   <p className="text-gray-600 font-medium text-lg">Digital Warehouse</p>
//                   <p className="text-gray-500 text-sm mt-2">Smart inventory management visualization</p>
//                 </div>
//               </div> */}
//               <div>
//                 <img src={heroimg} alt="here-img" />
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="mt-20 text-center">
//           <p className="text-gray-500 text-sm mb-6">
//             Trusted by businesses across India
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-gray-900 mb-1">
//                 3,247+
//               </div>
//               <div className="text-gray-500 text-sm">Active Vendors</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-gray-900 mb-1">
//                 ₹2.5Cr+
//               </div>
//               <div className="text-gray-500 text-sm">Revenue Managed</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-gray-900 mb-1">15+</div>
//               <div className="text-gray-500 text-sm">States Covered</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Steps Section */}
//       <div className="bg-white py-20">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Section Header */}
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Start Selling in 3 Simple Steps
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Get your business online and start earning in minutes with our
//               streamlined onboarding process.
//             </p>
//           </div>

//           {/* Steps */}
//           <div className="space-y-20">
//             {/* Step 1: Setup */}
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div className="order-2 lg:order-1">
//                 <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-lg">
//                   {/* <div className="text-center p-8">
//                     <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Smartphone className="w-10 h-10 text-orange-600" />
//                     </div>
//                     <p className="text-orange-700 font-medium text-lg">Mobile Setup Interface</p>
//                     <p className="text-orange-600 text-sm mt-2">Easy registration process</p>
//                   </div> */}
//                   <div>
//                     <video
//                       src={image1}
//                       autoPlay
//                       loop
//                       muted
//                       playsInline
//                       className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3]"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="order-1 lg:order-2">
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
//                     1
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-900">Setup</h3>
//                 </div>
//                 <p className="text-lg text-gray-600 mb-8">
//                   Download and Register in 2 minutes Enter your mobile number,
//                   verify OTP, and get started immediately.
//                 </p>
//                 <div className="grid grid-cols-3 gap-6">
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 mb-1">
//                       Quick
//                     </div>
//                     <div className="text-xs text-gray-500">Download</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 mb-1">
//                       Easy
//                     </div>
//                     <div className="text-xs text-gray-500">Registration</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 mb-1">
//                       Instant
//                     </div>
//                     <div className="text-xs text-gray-500">Access</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Step 2: Start Selling */}
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div>
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
//                     2
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-900">
//                     Start Selling
//                   </h3>
//                 </div>
//                 <p className="text-lg text-gray-600 mb-8">
//                   Add your products in 3 easy steps. Upload photos, set prices,
//                   and start receiving orders instantly.
//                 </p>
//                 <div className="grid grid-cols-3 gap-6">
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 mb-1">
//                       Upload
//                     </div>
//                     <div className="text-xs text-gray-500">Products</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 mb-1">
//                       Manage
//                     </div>
//                     <div className="text-xs text-gray-500">Inventory</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 mb-1">
//                       Track
//                     </div>
//                     <div className="text-xs text-gray-500">Orders</div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-lg">
//                   {/* <div className="text-center p-8">
//                     <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Download className="w-10 h-10 text-blue-600" />
//                     </div>
//                     <p className="text-blue-700 font-medium text-lg">Product Management</p>
//                     <p className="text-blue-600 text-sm mt-2">Inventory tracking dashboard</p>
//                   </div> */}
//                   <div>
//                      <video
//                       src={image2}
//                       autoPlay
//                       loop
//                       muted
//                       playsInline
//                       className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3]"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Step 3: Grow Business */}
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div className="order-2 lg:order-1">
//                 <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl aspect-[4/3] flex items-center justify-center shadow-lg">
//                   {/* <div className="text-center p-8">
//                     <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <TrendingUp className="w-10 h-10 text-green-600" />
//                     </div>
//                     <p className="text-green-700 font-medium text-lg">Business Analytics</p>
//                     <p className="text-green-600 text-sm mt-2">Growth tracking interface</p>
//                   </div> */}
//                   <div>
//                      <video
//                       src={image3}
//                       autoPlay
//                       loop
//                       muted
//                       playsInline
//                       className="w-full h-full object-cover rounded-2xl shadow-lg aspect-[4/3]"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="order-1 lg:order-2">
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
//                     3
//                   </div>
//                   <h3 className="text-3xl font-bold text-gray-900">
//                     Grow Business
//                   </h3>
//                 </div>
//                 <p className="text-lg text-gray-600 mb-8">
//                   Track sales and scale up your business with detailed analytics
//                   and insights.
//                 </p>
//                 <div className="grid grid-cols-3 gap-6">
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 mb-1">
//                       Sales
//                     </div>
//                     <div className="text-xs text-gray-500">Analytics</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 mb-1">
//                       Growth
//                     </div>
//                     <div className="text-xs text-gray-500">Insights</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-sm font-semibold text-gray-900 mb-1">
//                       Scale
//                     </div>
//                     <div className="text-xs text-gray-500">Business</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* CTA Section */}
//           <div className="text-center mt-20">
//             <p className="text-lg text-gray-600 mb-8">
//               Start selling your products!
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-all duration-200">
//                 Setup takes only 3 Steps
//               </button>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105">
//                 <a href="/register">LOG IN</a>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SetUp;
