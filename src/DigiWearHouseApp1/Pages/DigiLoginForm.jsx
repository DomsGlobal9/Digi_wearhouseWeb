// import React, { useState } from "react";
// import digiLogoPoster from "../assets/Digiware_logoPoster.png";
// import digi_logo from "../assets/digi_logo.png";

// const DigiWarehouseLogin = () => {
//   const [email, setEmail] = useState("8032470270");
//   const [otp, setOtp] = useState(["2", "5", "0", "1", "7"]);
//   const [showOtpForm, setShowOtpForm] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleGetOtp = () => {
//     if (!email) {
//       setErrors({ email: "Email is required" });
//       return;
//     }
//     setIsLoading(true);
//     setTimeout(() => {
//       console.log("OTP sent to:", email);
//       setShowOtpForm(true);
//       setIsLoading(false);
//       setErrors({});
//     }, 1500);
//   };

//   const handleOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       // Auto focus next input
//       if (value && index < 4) {
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleContinue = () => {
//     console.log("Continue with OTP:", otp.join(""));
//     // Handle OTP verification logic here
//   };

//   const handleResendOtp = () => {
//     console.log("Resend OTP");
//   };

//   const handleGoogleSignIn = () => {
//     console.log("Google Sign-In clicked");
//   };

//   const handleBackToLogin = () => {
//     setShowOtpForm(false);
//     setErrors({});
//   };

//   return (
//     <div className="flex w-screen overflow-hidden min-h-screen">
//       {/* Left Section - Login/OTP Form */}
//       <div className="flex-1 flex items-center justify-center bg-white 
//                       px-6 sm:px-10 md:px-16 lg:px-20 
//                       mb-6 sm:mb-8 ml-0 lg:ml-24">
//         <div className="w-full max-w-sm sm:max-w-md lg:max-w-md">
//           {/* Logo */}
//           <div className="text-center mb-6 sm:mb-8 lg:mr-64">
//             <img
//               src={digi_logo}
//               alt="DIGI WAREHOUSE Logo"
//               className="mx-auto h-12 sm:h-16 object-contain"
//             />
//           </div>

//           {/* Login/OTP Card */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 min-h-[500px] flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 {showOtpForm ? "Log in" : "Log in"}
//               </h2>

//               <div className="space-y-6">
//                 {!showOtpForm ? (
//                   // Login Form
//                   <>
//                     {/* Email Field */}
//                     <div>
//                       <label
//                         htmlFor="email"
//                         className="block text-sm font-medium text-slate-600 mb-2"
//                       >
//                         Enter your Email address or Mobile number
//                       </label>
//                       <input
//                         type="text"
//                         id="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="Email Address or mobile number"
//                         className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 ${
//                           errors.email
//                             ? "border-red-300 bg-red-50"
//                             : "border-slate-200 bg-slate-50"
//                         }`}
//                       />
//                       {errors.email && (
//                         <p className="text-red-500 text-xs mt-1">
//                           {errors.email}
//                         </p>
//                       )}
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                       onClick={handleGetOtp}
//                       disabled={isLoading}
//                       className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {isLoading ? (
//                         <div className="flex items-center justify-center">
//                           <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//                           Sending OTP...
//                         </div>
//                       ) : (
//                         "Get Otp"
//                       )}
//                     </button>

//                     {/* Divider */}
//                     <div className="relative my-6">
//                       <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-slate-200"></div>
//                       </div>
//                       <div className="relative flex justify-center text-sm">
//                         <span className="px-4 bg-white text-slate-500">or</span>
//                       </div>
//                     </div>

//                     {/* Google Sign In */}
//                     <button
//                       onClick={handleGoogleSignIn}
//                       className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
//                     >
//                       <svg className="w-5 h-5" viewBox="0 0 24 24">
//                         <path
//                           fill="#4285F4"
//                           d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                         />
//                         <path
//                           fill="#34A853"
//                           d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                         />
//                         <path
//                           fill="#FBBC05"
//                           d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                         />
//                         <path
//                           fill="#EA4335"
//                           d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                         />
//                       </svg>
//                       Sign in with{" "}
//                       <span className="text-blue-600 font-semibold">G</span>
//                     </button>
//                   </>
//                 ) : (
//                   // OTP Form
//                   <>
//                     {/* Phone Number Display */}
//                     <div>
//                       <label className="block text-sm font-medium text-slate-600 mb-2">
//                         Enter your Email address or Mobile number
//                       </label>
//                       <input
//                         type="text"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 bg-slate-50"
//                       />
//                     </div>

//                     {/* OTP Section */}
//                     <div className="space-y-4">
//                       <p className="text-sm text-slate-600">
//                         We've sent an OTP to your Mobile
//                       </p>

//                       {/* OTP Input Boxes */}
//                       <div className="flex justify-center space-x-3">
//                         {otp.map((digit, index) => (
//                           <input
//                             key={index}
//                             id={`otp-${index}`}
//                             type="text"
//                             value={digit}
//                             onChange={(e) =>
//                               handleOtpChange(index, e.target.value)
//                             }
//                             className="w-12 h-12 text-center text-xl font-bold border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
//                             maxLength="1"
//                           />
//                         ))}
//                       </div>

//                       {/* Resend Link */}
//                       <div className="text-center">
//                         <button
//                           onClick={handleResendOtp}
//                           className="text-sm text-slate-600"
//                         >
//                           I didn't receive a code.{" "}
//                           <span className="text-cyan-600 font-semibold hover:underline">
//                             Resend
//                           </span>
//                         </button>
//                       </div>
//                     </div>

//                     {/* Continue Button */}
//                     <button
//                       onClick={handleContinue}
//                       className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
//                     >
//                       Continue
//                     </button>

//                     {/* Google Sign In */}
//                     <button
//                       onClick={handleGoogleSignIn}
//                       className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
//                     >
//                       <svg className="w-5 h-5" viewBox="0 0 24 24">
//                         <path
//                           fill="#4285F4"
//                           d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                         />
//                         <path
//                           fill="#34A853"
//                           d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                         />
//                         <path
//                           fill="#FBBC05"
//                           d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                         />
//                         <path
//                           fill="#EA4335"
//                           d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                         />
//                       </svg>
//                       Sign in with{" "}
//                       <span className="text-blue-600 font-semibold">G</span>
//                     </button>
//                   </>
//                 )}

//                 {/* Error */}
//                 {errors.general && (
//                   <p className="text-red-500 text-sm text-center">
//                     {errors.general}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Footer Links */}
//             <div className="text-center space-y-2">
//               <p className="text-xs text-slate-500">
//                 Don't have an account?
//                 <a
//                   href="#"
//                   className="text-cyan-600 hover:text-cyan-700 font-medium ml-1"
//                 >
//                   Register
//                 </a>
//               </p>
//               {showOtpForm && (
//                 <button
//                   onClick={handleBackToLogin}
//                   className="text-xs text-slate-500 hover:text-slate-700"
//                 >
//                   ← Back to login
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Section - Poster (hidden on mobile) */}
//       <div className="hidden md:flex flex-2 relative">
//         {/* Split Backgrounds */}
//         <div className="w-1/2 bg-white"></div>
//         <div className="w-1/2 bg-[#95CDE2] relative"></div>

//         {/* Center Image */}
//         <div className="absolute pt-10 flex items-center ">
//           <div className="rounded-2xl overflow-hidden shadow-2xl 
//                           w-[602px] ">
//             <img
//               src={digiLogoPoster}
//               alt="Clothing Store Interior"
//               className="w-full h-[552px] object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DigiWarehouseLogin;
