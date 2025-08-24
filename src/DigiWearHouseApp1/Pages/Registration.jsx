// import React, { useState, useEffect } from "react";
// import { useApp } from "../context/Context";
// import digiLogoPoster from "../../assets/Digiware_logoPoster.png";
// import digi_logo from "../../assets/digi_logo.png";

// const DigiWarehouseRegistration = () => {
//   const {
//     currentUser,
//     userData,
//     sendRegistrationOTP,
//     sendLoginOTP,
//     verifyRegistrationOTP,
//     verifyLoginOTP,
//     checkUserExists,
//     signOut,
//     clearError,
//     error: authError
//   } = useApp();

//   // Auth States
//   const [currentStep, setCurrentStep] = useState("login");
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   // Login States
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "",""]);
  
//   // KYC OTP States
//   const [kycOtp, setKycOtp] = useState(["", "", "", "", "",""]);

//   // Registration States
//   const [registerData, setRegisterData] = useState({
//     username: "",
//     firstName: "",
//     contactNumber: "",
//   });

//   // Shop Details States
//   const [shopData, setShopData] = useState({
//     shopName: "",
//     shopAddress: "",
//     city: "",
//     state: "",
//     pincode: ""
//   });

//   // Bank Details States
//   const [bankData, setBankData] = useState({
//     accountHolder: "",
//     accountNumber: "",
//     reAccountNumber: "",
//     ifscCode: "",
//     bankName: "",
//     branchName: ""
//   });

//   // Clear messages after 5 seconds
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(""), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   useEffect(() => {
//     if (authError) {
//       const timer = setTimeout(() => clearError(), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [authError, clearError]);

//   // Redirect if user is logged in
//   useEffect(() => {
//     if (currentUser && userData) {
//       // Redirect to dashboard or main app
//       console.log("User is logged in:", userData);
//       // You can navigate to dashboard here
//     }
//   }, [currentUser, userData]);

//   // Event Handlers
//   const handleGetOtp = async () => {
//     if (!email.trim()) {
//       setErrors({ email: "Email or phone number is required" });
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       // Check if it's for login (user exists) or registration
//       const { exists } = await checkUserExists(email);
      
//       if (exists) {
//         // User exists, send login OTP
//         await sendLoginOTP(email);
//         setCurrentStep("otp");
//         setSuccessMessage("OTP sent successfully for login");
//       } else {
//         // User doesn't exist, need to register
//         setSuccessMessage("Please complete registration first");
//         setCurrentStep("register");
//       }
//     } catch (error) {
//       setErrors({ general: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
      
//       if (value && index < 4) {
//         const nextInput = document.getElementById(otp-`${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleKycOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newKycOtp = [...kycOtp];
//       newKycOtp[index] = value;
//       setKycOtp(newKycOtp);
      
//       if (value && index < 4) {
//         const nextInput = document.getElementById(kyc-otp-`${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleContinue = async () => {
//     const otpCode = otp.join("");
    
//     if (!validateOTP(otpCode)) {
//       setErrors({ otp: "Please enter a valid 5-digit OTP" });
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       await verifyLoginOTP(otpCode);
//       setSuccessMessage("Login successful!");
//       // Navigation will happen automatically via useEffect
//     } catch (error) {
//       setErrors({ otp: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKycOtpVerify = async () => {
//     const otpCode = kycOtp.join("");
    
//     if (!validateOTP(otpCode)) {
//       setErrors({ kycOtp: "Please enter a valid 5-digit OTP" });
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       const completeUserData = {
//         ...registerData,
//         shopDetails: shopData,
//         bankDetails: bankData
//       };

//       await verifyRegistrationOTP(otpCode, completeUserData);
//       setSuccessMessage("Registration completed successfully!");
//       // Navigation will happen automatically via useEffect
//     } catch (error) {
//       setErrors({ kycOtp: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegisterInputChange = (e) => {
//     const { name, value } = e.target;
//     setRegisterData(prev => ({ ...prev, [name]: value }));
//     // Clear specific field error
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleShopInputChange = (e) => {
//     const { name, value } = e.target;
//     setShopData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleBankInputChange = (e) => {
//     const { name, value } = e.target;
//     setBankData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleRegisterSubmit = async () => {
//     const validation = validateRegistrationForm(registerData);
    
//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       // Check if user already exists
//       const { exists } = await checkUserExists(registerData.contactNumber);
//       if (exists) {
//         setErrors({ general: "User already exists with this phone number" });
//         return;
//       }

//       // Send registration OTP
//       await sendRegistrationOTP(registerData.contactNumber);
//       setCurrentStep("shopDetails");
//       setSuccessMessage("Please complete your profile details");
//     } catch (error) {
//       setErrors({ general: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleShopDetailsSubmit = () => {
//     const validation = validateShopDetails(shopData);
    
//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setCurrentStep("bankDetails");
//   };

//   const handleBankDetailsSubmit = () => {
//     const validation = validateBankDetails(bankData);
    
//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setCurrentStep("kyc");
//   };

//   const handleKycSubmit = async () => {
//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       // In a real app, you would upload KYC documents here
//       console.log("KYC Documents would be uploaded here");
      
//       setCurrentStep("kycOtp");
//       setSuccessMessage("KYC documents submitted. Please verify OTP to complete registration.");
//     } catch (error) {
//       setErrors({ general: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = () => {
//     console.log("Google Sign-In clicked");
//     // Implement Google Sign-In if needed
//   };

//   const navigateToRegister = () => {
//     setCurrentStep("register");
//     setErrors({});
//     clearError();
//   };

//   const navigateToLogin = () => {
//     setCurrentStep("login");
//     setErrors({});
//     clearError();
//     setOtp(["", "", "", "", ""]);
//     setKycOtp(["", "", "", "", ""]);
//   };

//   const goBack = () => {
//     setErrors({});
//     clearError();
    
//     if (currentStep === "otp") setCurrentStep("login");
//     else if (currentStep === "register") setCurrentStep("login");
//     else if (currentStep === "shopDetails") setCurrentStep("register");
//     else if (currentStep === "bankDetails") setCurrentStep("shopDetails");
//     else if (currentStep === "kyc") setCurrentStep("bankDetails");
//     else if (currentStep === "kycOtp") setCurrentStep("kyc");
//   };

//   // Form Renderers
//   const renderLoginForm = () => (
//     <>
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
//           Enter your Email address or Mobile number
//         </label>
//         <input
//           type="text"
//           id="email"
//           value={email}
//           onChange={(e) => {
//             setEmail(e.target.value);
//             if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
//           }}
//           placeholder="Email Address or mobile number"
//           className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 ${
//             errors.email ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
//           }`}
//         />
//         {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//       </div>

//       <button
//         onClick={handleGetOtp}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Checking...
//           </div>
//         ) : (
//           "Get Otp"
//         )}
//       </button>

//       <div className="relative my-6">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-slate-200"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-4 bg-white text-slate-500">or</span>
//         </div>
//       </div>

//       <button
//         onClick={handleGoogleSignIn}
//         className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
//       >
//         <svg className="w-5 h-5" viewBox="0 0 24 24">
//           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//         </svg>
//         Sign in with <span className="text-blue-600 font-semibold">G</span>
//       </button>
//     </>
//   );

//   const renderOtpForm = () => (
//     <>
//       <div>
//         <label className="block text-sm font-medium text-slate-600 mb-2">
//           Enter your Email address or Mobile number
//         </label>
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 bg-slate-50"
//           disabled
//         />
//       </div>

//       <div className="space-y-4">
//         <p className="text-sm text-slate-600">We've sent an OTP to your Mobile</p>
        
//         <div className="flex justify-center space-x-3">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={otp-`${index}`}
//               type="text"
//               value={digit}
//               onChange={(e) => handleOtpChange(index, e.target.value)}
//               className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
//                 errors.otp ? "border-red-300" : "border-slate-300"
//               }`}
//               maxLength="1"
//             />
//           ))}
//         </div>
        
//         {errors.otp && <p className="text-red-500 text-xs text-center">{errors.otp}</p>}

//         <div className="text-center">
//           <button 
//             onClick={handleGetOtp}
//             disabled={isLoading}
//             className="text-sm text-slate-600"
//           >
//             I didn't receive a code. <span className="text-cyan-600 font-semibold hover:underline">Resend</span>
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={handleContinue}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Verifying...
//           </div>
//         ) : (
//           "Continue"
//         )}
//       </button>
//     </>
//   );

//   const renderRegisterForm = () => (
//     <>
//       <div>
//         <label className="block text-sm text-start font-medium text-slate-600 mb-2">
//           Enter your username or email address
//         </label>
//         <input
//           type="text"
//           name="username"
//           value={registerData.username}
//           onChange={handleRegisterInputChange}
//           placeholder="Username or email address"
//           className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
//             errors.username ? "border-red-300" : "border-slate-200"
//           }`}
//         />
//         {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-start text-slate-600 mb-2">User name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={registerData.firstName}
//             onChange={handleRegisterInputChange}
//             placeholder="User name"
//             className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
//               errors.firstName ? "border-red-300" : "border-slate-200"
//             }`}
//           />
//           {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-start text-slate-600 mb-2">Contact Number</label>
//           <input
//             type="tel"
//             name="contactNumber"
//             value={registerData.contactNumber}
//             onChange={handleRegisterInputChange}
//             placeholder="Contact Number"
//             className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
//               errors.contactNumber ? "border-red-300" : "border-slate-200"
//             }`}
//           />
//           {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
//         </div>
//       </div>

//       <button
//         onClick={handleRegisterSubmit}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Processing...
//           </div>
//         ) : (
//           "Continue"
//         )}
//       </button>
//     </>
//   );

//   const renderShopDetailsForm = () => (
//     <>
//       <div>
//         <input
//           type="text"
//           name="shopName"
//           value={shopData.shopName}
//           onChange={handleShopInputChange}
//           placeholder="Shop Name"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.shopName ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.shopName && <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="shopAddress"
//           value={shopData.shopAddress}
//           onChange={handleShopInputChange}
//           placeholder="Shop Address"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.shopAddress ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.shopAddress && <p className="text-red-500 text-xs mt-1">{errors.shopAddress}</p>}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <input
//             type="text"
//             name="city"
//             value={shopData.city}
//             onChange={handleShopInputChange}
//             placeholder="City"
//             className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//               errors.city ? "border-red-300" : "border-slate-300"
//             }`}
//           />
//           {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//         </div>
//         <div>
//           <input
//             type="text"
//             name="state"
//             value={shopData.state}
//             onChange={handleShopInputChange}
//             placeholder="State"
//             className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//               errors.state ? "border-red-300" : "border-slate-300"
//             }`}
//           />
//           {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//         </div>
//       </div>

//       <div>
//         <input
//           type="text"
//           name="pincode"
//           value={shopData.pincode}
//           onChange={handleShopInputChange}
//           placeholder="Pin Code"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.pincode ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={handleShopDetailsSubmit}
//           className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow"
//         >
//           Next →
//         </button>
//       </div>
//     </>
//   );

//   const renderBankDetailsForm = () => (
//     <>
//       <div>
//         <select
//           name="bankName"
//           value={bankData.bankName}
//           onChange={handleBankInputChange}
//           className={`w-full border-b py-3 text-slate-700 focus:outline-none focus:border-cyan-500 ${
//             errors.bankName ? "border-red-300" : "border-slate-300"
//           }`}
//         >
//           <option value="">Select Bank</option>
//           <option value="sbi">State Bank of India</option>
//           <option value="hdfc">HDFC Bank</option>
//           <option value="icici">ICICI Bank</option>
//           <option value="axis">Axis Bank</option>
//           <option value="pnb">Punjab National Bank</option>
//         </select>
//         {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="branchName"
//           value={bankData.branchName}
//           onChange={handleBankInputChange}
//           placeholder="Enter Branch Name"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.branchName ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.branchName && <p className="text-red-500 text-xs mt-1">{errors.branchName}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="accountHolder"
//           value={bankData.accountHolder}
//           onChange={handleBankInputChange}
//           placeholder="Enter Account Holder Name"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.accountHolder ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="accountNumber"
//           value={bankData.accountNumber}
//           onChange={handleBankInputChange}
//           placeholder="e.g. 1234 5678 980"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.accountNumber ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="reAccountNumber"
//           value={bankData.reAccountNumber}
//           onChange={handleBankInputChange}
//           placeholder="Re-enter e.g. 1234 5678 980"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.reAccountNumber ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.reAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.reAccountNumber}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="ifscCode"
//           value={bankData.ifscCode}
//           onChange={handleBankInputChange}
//           placeholder="IFSC Code"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.ifscCode ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={handleBankDetailsSubmit}
//           className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow"
//         >
//           Next →
//         </button>
//       </div>
//     </>
//   );

//   const renderKycForm = () => (
//     <>
//       <div className="space-y-4">
//         <p className="text-sm font-medium text-slate-700 mb-4">Upload Your KYC Documents</p>
        
//         <div className="space-y-4">
//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all cursor-pointer">
//             <p className="text-sm text-slate-600 mb-2">License Front</p>
//             <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-all">
//               Choose File
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all cursor-pointer">
//             <p className="text-sm text-slate-600 mb-2">Upload Front Aadhar Card</p>
//             <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-all">
//               Choose File
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all cursor-pointer">
//             <p className="text-sm text-slate-600 mb-2">Upload Back Aadhar Card</p>
//             <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-all">
//               Choose File
//             </button>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={handleKycSubmit}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Processing...
//           </div>
//         ) : (
//           "Submit & Get OTP"
//         )}
//       </button>
//     </>
//   );

//   const renderKycOtpForm = () => (
//     <>
//       <div>
//         <label className="block text-sm font-medium text-slate-600 mb-2">
//           Mobile Number
//         </label>
//         <input
//           type="text"
//           value={registerData.contactNumber}
//           readOnly
//           className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
//         />
//       </div>

//       <div className="space-y-4">
//         <p className="text-sm text-slate-600">We've sent a verification OTP to complete your registration</p>
        
//         <div className="flex justify-center space-x-3">
//           {kycOtp.map((digit, index) => (
//             <input
//               key={index}
//               id={kyc-otp-`${index}`}
//               type="text"
//               value={digit}
//               onChange={(e) => handleKycOtpChange(index, e.target.value)}
//               className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
//                 errors.kycOtp ? "border-red-300" : "border-slate-300"
//               }`}
//               maxLength="1"
//             />
//           ))}
//         </div>
        
//         {errors.kycOtp && <p className="text-red-500 text-xs text-center">{errors.kycOtp}</p>}

//         <div className="text-center">
//           <button 
//             onClick={handleKycSubmit}
//             disabled={isLoading}
//             className="text-sm text-slate-600"
//           >
//             I didn't receive a code. <span className="text-cyan-600 font-semibold hover:underline">Resend</span>
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={handleKycOtpVerify}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Verifying...
//           </div>
//         ) : (
//           "Verify & Complete Registration"
//         )}
//       </button>
//     </>
//   );

//   const getFormTitle = () => {
//     switch (currentStep) {
//       case "login": return "Log in";
//       case "otp": return "Log in";
//       case "register": return "Register";
//       case "shopDetails": return "Shop details";
//       case "bankDetails": return "Bank details";
//       case "kyc": return "KYC Verification";
//       case "kycOtp": return "Verify Registration";
//       default: return "Log in";
//     }
//   };

//   const getCurrentForm = () => {
//     switch (currentStep) {
//       case "login": return renderLoginForm();
//       case "otp": return renderOtpForm();
//       case "register": return renderRegisterForm();
//       case "shopDetails": return renderShopDetailsForm();
//       case "bankDetails": return renderBankDetailsForm();
//       case "kyc": return renderKycForm();
//       case "kycOtp": return renderKycOtpForm();
//       default: return renderLoginForm();
//     }
//   };

//   const showRegisterLink = () => {
//     return currentStep === "login" || currentStep === "otp";
//   };

//   const showLoginLink = () => {
//     return currentStep === "register" || currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc" || currentStep === "kycOtp";
//   };

//   return (
//     <div className="flex w-screen overflow-hidden min-h-screen">
//       {/* Hidden reCAPTCHA container */}
//       <div id="recaptcha-container"></div>
      
//       {/* Left Section - Dynamic Form */}
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

//           {/* Dynamic Form Card */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 min-h-[500px] flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 {getFormTitle()}
//               </h2>

//               {/* Success Message */}
//               {successMessage && (
//                 <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                   <p className="text-green-700 text-sm">{successMessage}</p>
//                 </div>
//               )}

//               {/* Error Message */}
//               {(authError || errors.general) && (
//                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-700 text-sm">{authError || errors.general}</p>
//                 </div>
//               )}

//               <div className="space-y-6">
//                 {getCurrentForm()}
//               </div>
//             </div>

//             {/* Footer Links */}
//             <div className="text-center space-y-2">
//               {showRegisterLink() && (
//                 <p className="text-xs text-slate-500">
//                   Don't have an account?
//                   <button
//                     onClick={navigateToRegister}
//                     className="text-cyan-600 hover:text-cyan-700 font-medium ml-1"
//                   >
//                     Register
//                   </button>
//                 </p>
//               )}
              
//               {showLoginLink() && (
//                 <p className="text-xs text-slate-500">
//                   Already have Account?
//                   <button
//                     onClick={navigateToLogin}
//                     className="text-cyan-600 hover:text-cyan-700 font-medium ml-1"
//                   >
//                     Log in
//                   </button>
//                 </p>
//               )}

//               {(currentStep === "otp" || currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc" || currentStep === "kycOtp") && (
//                 <button
//                   onClick={goBack}
//                   className="text-xs text-slate-500 hover:text-slate-700"
//                 >
//                   ← Back
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
//         <div className="absolute pt-10 flex items-center">
//           <div className="rounded-2xl overflow-hidden shadow-2xl w-[602px]">
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

// export default DigiWarehouseRegistration;


// import React, { useState, useEffect } from "react";
// import { useApp } from "../context/Context"; // Update path to AppContext.js
// import digiLogoPoster from "../../assets/Digiware_logoPoster.png";
// import digi_logo from "../../assets/digi_logo.png";

// const DigiWarehouseRegistration = () => {
//   const {
//     currentUser,
//     userData,
//     sendRegistrationOTP,
//     sendLoginOTP,
//     verifyRegistrationOTP,
//     verifyLoginOTP,
//     checkUserExists,
//     signOut,
//     clearError,
//     error: authError,
//   } = useApp();

//   // Auth States
//   const [currentStep, setCurrentStep] = useState("login");
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");

//   // Login States
//   const [phone, setPhone] = useState(""); // Renamed from email to phone for clarity
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);

//   // KYC OTP States
//   const [kycOtp, setKycOtp] = useState(["", "", "", "", "", ""]);

//   // Registration States
//   const [registerData, setRegisterData] = useState({
//     username: "",
//     firstName: "",
//     contactNumber: "",
//   });

//   // Shop Details States
//   const [shopData, setShopData] = useState({
//     shopName: "",
//     shopAddress: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   // Bank Details States
//   const [bankData, setBankData] = useState({
//     accountHolder: "",
//     accountNumber: "",
//     reAccountNumber: "",
//     ifscCode: "",
//     bankName: "",
//     branchName: "",
//   });

//   // Clear messages after 5 seconds
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(""), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   useEffect(() => {
//     if (authError) {
//       const timer = setTimeout(() => clearError(), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [authError, clearError]);

//   // Redirect if user is logged in
//   useEffect(() => {
//     if (currentUser && userData) {
//       // Redirect to dashboard or main app
//       console.log("User is logged in:", userData);
//       // You can navigate to dashboard here (e.g., using react-router)
//     }
//   }, [currentUser, userData]);

//   // Validation Functions (Added these)
//   const validateOTP = (otpCode) => {
//     return otpCode.length === 6 && /^\d{6}$/.test(otpCode);
//   };

//   const validateRegistrationForm = (data) => {
//     const errors = {};
//     if (!data.username.trim()) errors.username = "Username is required";
//     if (!data.firstName.trim()) errors.firstName = "First name is required";
//     if (!data.contactNumber || !/^\d{10}$/.test(data.contactNumber)) {
//       errors.contactNumber = "Valid 10-digit mobile number is required";
//     }
//     return { isValid: Object.keys(errors).length === 0, errors };
//   };

//   const validateShopDetails = (data) => {
//     const errors = {};
//     if (!data.shopName.trim()) errors.shopName = "Shop name is required";
//     if (!data.shopAddress.trim()) errors.shopAddress = "Shop address is required";
//     if (!data.city.trim()) errors.city = "City is required";
//     if (!data.state.trim()) errors.state = "State is required";
//     if (!data.pincode || !/^\d{6}$/.test(data.pincode)) {
//       errors.pincode = "Valid 6-digit pincode is required";
//     }
//     return { isValid: Object.keys(errors).length === 0, errors };
//   };

//   const validateBankDetails = (data) => {
//     const errors = {};
//     if (!data.bankName) errors.bankName = "Bank name is required";
//     if (!data.branchName.trim()) errors.branchName = "Branch name is required";
//     if (!data.accountHolder.trim()) errors.accountHolder = "Account holder name is required";
//     if (!data.accountNumber || !/^\d+$/.test(data.accountNumber)) {
//       errors.accountNumber = "Valid account number is required";
//     }
//     if (data.accountNumber !== data.reAccountNumber) {
//       errors.reAccountNumber = "Account numbers do not match";
//     }
//     if (!data.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifscCode)) {
//       errors.ifscCode = "Valid IFSC code is required";
//     }
//     return { isValid: Object.keys(errors).length === 0, errors };
//   };

//   // Event Handlers
//   const handleGetOtp = async () => {
//     if (!phone.trim() || !/^\d{10}$/.test(phone)) {
//       setErrors({ phone: "Valid 10-digit mobile number is required" });
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       const { exists } = await checkUserExists(phone);

//       if (exists) {
//         await sendLoginOTP(phone);
//         setCurrentStep("otp");
//         setSuccessMessage("OTP sent successfully for login");
//       } else {
//         setSuccessMessage("Please complete registration first");
//         setCurrentStep("register");
//       }
//     } catch (error) {
//       setErrors({ general: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value && index < 5) { // Fixed from <4 to <5 for 6 digits
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleKycOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newKycOtp = [...kycOtp];
//       newKycOtp[index] = value;
//       setKycOtp(newKycOtp);

//       if (value && index < 5) { // Fixed from <4 to <5
//         const nextInput = document.getElementById(`kyc-otp-${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleContinue = async () => {
//     const otpCode = otp.join("");

//     if (!validateOTP(otpCode)) {
//       setErrors({ otp: "Please enter a valid 6-digit OTP" }); // Fixed from 5 to 6
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       await verifyLoginOTP(otpCode);
//       setSuccessMessage("Login successful!");
//     } catch (error) {
//       setErrors({ otp: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKycOtpVerify = async () => {
//     const otpCode = kycOtp.join("");

//     if (!validateOTP(otpCode)) {
//       setErrors({ kycOtp: "Please enter a valid 6-digit OTP" }); // Fixed from 5 to 6
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       const completeUserData = {
//         ...registerData,
//         shopDetails: shopData,
//         bankDetails: bankData,
//       };

//       await verifyRegistrationOTP(otpCode, completeUserData);
//       setSuccessMessage("Registration completed successfully!");
//     } catch (error) {
//       setErrors({ kycOtp: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegisterInputChange = (e) => {
//     const { name, value } = e.target;
//     setRegisterData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleShopInputChange = (e) => {
//     const { name, value } = e.target;
//     setShopData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleBankInputChange = (e) => {
//     const { name, value } = e.target;
//     setBankData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleRegisterSubmit = async () => {
//     const validation = validateRegistrationForm(registerData);

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       const { exists } = await checkUserExists(registerData.contactNumber);
//       if (exists) {
//         setErrors({ general: "User already exists with this phone number" });
//         return;
//       }
//       setCurrentStep("shopDetails");
//       setSuccessMessage("Please complete your profile details");
//     } catch (error) {
//       setErrors({ general: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleShopDetailsSubmit = () => {
//     const validation = validateShopDetails(shopData);

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setCurrentStep("bankDetails");
//   };

//   const handleBankDetailsSubmit = () => {
//     const validation = validateBankDetails(bankData);

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setCurrentStep("kyc");
//   };

//   const handleKycSubmit = async () => {
//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       // In a real app, upload KYC documents here (e.g., to Firebase Storage)
//       console.log("KYC Documents would be uploaded here");

//       await sendRegistrationOTP(registerData.contactNumber); // Moved here from handleRegisterSubmit
//       setCurrentStep("kycOtp");
//       setSuccessMessage("OTP sent. Please verify to complete registration.");
//     } catch (error) {
//       setErrors({ general: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = () => {
//     console.log("Google Sign-In clicked");
//     // Implement Google Sign-In if needed (using signInWithPopup)
//   };

//   const navigateToRegister = () => {
//     setCurrentStep("register");
//     setErrors({});
//     clearError();
//   };

//   const navigateToLogin = () => {
//     setCurrentStep("login");
//     setErrors({});
//     clearError();
//     setOtp(["", "", "", "", "", ""]);
//     setKycOtp(["", "", "", "", "", ""]);
//   };

//   const goBack = () => {
//     setErrors({});
//     clearError();

//     if (currentStep === "otp") setCurrentStep("login");
//     else if (currentStep === "register") setCurrentStep("login");
//     else if (currentStep === "shopDetails") setCurrentStep("register");
//     else if (currentStep === "bankDetails") setCurrentStep("shopDetails");
//     else if (currentStep === "kyc") setCurrentStep("bankDetails");
//     else if (currentStep === "kycOtp") setCurrentStep("kyc");
//   };

//   // Form Renderers (Updated labels and IDs)
//   const renderLoginForm = () => (
//     <>
//       <div>
//         <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-2">
//           Enter your Mobile number
//         </label>
//         <input
//           type="tel"
//           id="phone"
//           value={phone}
//           onChange={(e) => {
//             setPhone(e.target.value);
//             if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
//           }}
//           placeholder="Mobile number (10 digits)"
//           className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 ${
//             errors.phone ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
//           }`}
//         />
//         {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//       </div>

//       <button
//         onClick={handleGetOtp}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Checking...
//           </div>
//         ) : (
//           "Get OTP"
//         )}
//       </button>

//       <div className="relative my-6">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-slate-200"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-4 bg-white text-slate-500">or</span>
//         </div>
//       </div>

//       <button
//         onClick={handleGoogleSignIn}
//         className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
//       >
//         <svg className="w-5 h-5" viewBox="0 0 24 24">
//           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//         </svg>
//         Sign in with <span className="text-blue-600 font-semibold">G</span>oogle
//       </button>
//     </>
//   );

//   const renderOtpForm = () => (
//     <>
//       <div>
//         <label className="block text-sm font-medium text-slate-600 mb-2">
//           Mobile Number
//         </label>
//         <input
//           type="tel"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 bg-slate-50"
//           disabled
//         />
//       </div>

//       <div className="space-y-4">
//         <p className="text-sm text-slate-600">We've sent an OTP to your mobile</p>
        
//         <div className="flex justify-center space-x-3">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               value={digit}
//               onChange={(e) => handleOtpChange(index, e.target.value)}
//               className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
//                 errors.otp ? "border-red-300" : "border-slate-300"
//               }`}
//               maxLength="1"
//             />
//           ))}
//         </div>
        
//         {errors.otp && <p className="text-red-500 text-xs text-center">{errors.otp}</p>}

//         <div className="text-center">
//           <button 
//             onClick={handleGetOtp}
//             disabled={isLoading}
//             className="text-sm text-slate-600"
//           >
//             I didn't receive a code. <span className="text-cyan-600 font-semibold hover:underline">Resend</span>
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={handleContinue}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Verifying...
//           </div>
//         ) : (
//           "Continue"
//         )}
//       </button>
//     </>
//   );

//   // ... (The rest of the render functions remain unchanged, except for ID fixes in OTP inputs if needed)

//   const renderRegisterForm = () => (
//     <>
//       <div>
//         <label className="block text-sm text-start font-medium text-slate-600 mb-2">
//           Enter your username or email address
//         </label>
//         <input
//           type="text"
//           name="username"
//           value={registerData.username}
//           onChange={handleRegisterInputChange}
//           placeholder="Username or email address"
//           className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
//             errors.username ? "border-red-300" : "border-slate-200"
//           }`}
//         />
//         {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-start text-slate-600 mb-2">User name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={registerData.firstName}
//             onChange={handleRegisterInputChange}
//             placeholder="User name"
//             className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
//               errors.firstName ? "border-red-300" : "border-slate-200"
//             }`}
//           />
//           {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-start text-slate-600 mb-2">Contact Number</label>
//           <input
//             type="tel"
//             name="contactNumber"
//             value={registerData.contactNumber}
//             onChange={handleRegisterInputChange}
//             placeholder="Contact Number"
//             className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
//               errors.contactNumber ? "border-red-300" : "border-slate-200"
//             }`}
//           />
//           {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
//         </div>
//       </div>

//       <button
//         onClick={handleRegisterSubmit}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Processing...
//           </div>
//         ) : (
//           "Continue"
//         )}
//       </button>
//     </>
//   );

//   const renderShopDetailsForm = () => (
//     <>
//       <div>
//         <input
//           type="text"
//           name="shopName"
//           value={shopData.shopName}
//           onChange={handleShopInputChange}
//           placeholder="Shop Name"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.shopName ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.shopName && <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="shopAddress"
//           value={shopData.shopAddress}
//           onChange={handleShopInputChange}
//           placeholder="Shop Address"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.shopAddress ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.shopAddress && <p className="text-red-500 text-xs mt-1">{errors.shopAddress}</p>}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <input
//             type="text"
//             name="city"
//             value={shopData.city}
//             onChange={handleShopInputChange}
//             placeholder="City"
//             className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//               errors.city ? "border-red-300" : "border-slate-300"
//             }`}
//           />
//           {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//         </div>
//         <div>
//           <input
//             type="text"
//             name="state"
//             value={shopData.state}
//             onChange={handleShopInputChange}
//             placeholder="State"
//             className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//               errors.state ? "border-red-300" : "border-slate-300"
//             }`}
//           />
//           {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//         </div>
//       </div>

//       <div>
//         <input
//           type="text"
//           name="pincode"
//           value={shopData.pincode}
//           onChange={handleShopInputChange}
//           placeholder="Pin Code"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.pincode ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={handleShopDetailsSubmit}
//           className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow"
//         >
//           Next →
//         </button>
//       </div>
//     </>
//   );

//   const renderBankDetailsForm = () => (
//     <>
//       <div>
//         <select
//           name="bankName"
//           value={bankData.bankName}
//           onChange={handleBankInputChange}
//           className={`w-full border-b py-3 text-slate-700 focus:outline-none focus:border-cyan-500 ${
//             errors.bankName ? "border-red-300" : "border-slate-300"
//           }`}
//         >
//           <option value="">Select Bank</option>
//           <option value="sbi">State Bank of India</option>
//           <option value="hdfc">HDFC Bank</option>
//           <option value="icici">ICICI Bank</option>
//           <option value="axis">Axis Bank</option>
//           <option value="pnb">Punjab National Bank</option>
//         </select>
//         {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="branchName"
//           value={bankData.branchName}
//           onChange={handleBankInputChange}
//           placeholder="Enter Branch Name"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.branchName ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.branchName && <p className="text-red-500 text-xs mt-1">{errors.branchName}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="accountHolder"
//           value={bankData.accountHolder}
//           onChange={handleBankInputChange}
//           placeholder="Enter Account Holder Name"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.accountHolder ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="accountNumber"
//           value={bankData.accountNumber}
//           onChange={handleBankInputChange}
//           placeholder="e.g. 1234 5678 980"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.accountNumber ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="reAccountNumber"
//           value={bankData.reAccountNumber}
//           onChange={handleBankInputChange}
//           placeholder="Re-enter e.g. 1234 5678 980"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.reAccountNumber ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.reAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.reAccountNumber}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="ifscCode"
//           value={bankData.ifscCode}
//           onChange={handleBankInputChange}
//           placeholder="IFSC Code"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.ifscCode ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={handleBankDetailsSubmit}
//           className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow"
//         >
//           Next →
//         </button>
//       </div>
//     </>
//   );

//   const renderKycForm = () => (
//     <>
//       <div className="space-y-4">
//         <p className="text-sm font-medium text-slate-700 mb-4">Upload Your KYC Documents</p>
        
//         <div className="space-y-4">
//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all cursor-pointer">
//             <p className="text-sm text-slate-600 mb-2">License Front</p>
//             <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-all">
//               Choose File
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all cursor-pointer">
//             <p className="text-sm text-slate-600 mb-2">Upload Front Aadhar Card</p>
//             <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-all">
//               Choose File
//             </button>
//           </div>

//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all cursor-pointer">
//             <p className="text-sm text-slate-600 mb-2">Upload Back Aadhar Card</p>
//             <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-all">
//               Choose File
//             </button>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={handleKycSubmit}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Processing...
//           </div>
//         ) : (
//           "Submit & Get OTP"
//         )}
//       </button>
//     </>
//   );

//   const renderKycOtpForm = () => (
//     <>
//       <div>
//         <label className="block text-sm font-medium text-slate-600 mb-2">
//           Mobile Number
//         </label>
//         <input
//           type="text"
//           value={registerData.contactNumber}
//           readOnly
//           className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
//         />
//       </div>

//       <div className="space-y-4">
//         <p className="text-sm text-slate-600">We've sent a verification OTP to complete your registration</p>
        
//         <div className="flex justify-center space-x-3">
//           {kycOtp.map((digit, index) => (
//             <input
//               key={index}
//               id={`kyc-otp-${index}`}
//               type="text"
//               value={digit}
//               onChange={(e) => handleKycOtpChange(index, e.target.value)}
//               className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
//                 errors.kycOtp ? "border-red-300" : "border-slate-300"
//               }`}
//               maxLength="1"
//             />
//           ))}
//         </div>
        
//         {errors.kycOtp && <p className="text-red-500 text-xs text-center">{errors.kycOtp}</p>}

//         <div className="text-center">
//           <button 
//             onClick={handleKycSubmit}
//             disabled={isLoading}
//             className="text-sm text-slate-600"
//           >
//             I didn't receive a code. <span className="text-cyan-600 font-semibold hover:underline">Resend</span>
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={handleKycOtpVerify}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Verifying...
//           </div>
//         ) : (
//           "Verify & Complete Registration"
//         )}
//       </button>
//     </>
//   );

//   const getFormTitle = () => {
//     switch (currentStep) {
//       case "login": return "Log in";
//       case "otp": return "Log in";
//       case "register": return "Register";
//       case "shopDetails": return "Shop details";
//       case "bankDetails": return "Bank details";
//       case "kyc": return "KYC Verification";
//       case "kycOtp": return "Verify Registration";
//       default: return "Log in";
//     }
//   };

//   const getCurrentForm = () => {
//     switch (currentStep) {
//       case "login": return renderLoginForm();
//       case "otp": return renderOtpForm();
//       case "register": return renderRegisterForm();
//       case "shopDetails": return renderShopDetailsForm();
//       case "bankDetails": return renderBankDetailsForm();
//       case "kyc": return renderKycForm();
//       case "kycOtp": return renderKycOtpForm();
//       default: return renderLoginForm();
//     }
//   };

//   const showRegisterLink = () => {
//     return currentStep === "login" || currentStep === "otp";
//   };

//   const showLoginLink = () => {
//     return currentStep === "register" || currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc" || currentStep === "kycOtp";
//   };

//   return (
//     <div className="flex w-screen overflow-hidden min-h-screen">
//       {/* Hidden reCAPTCHA container */}
//       <div id="recaptcha-container"></div>
      
//       {/* Left Section - Dynamic Form */}
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

//           {/* Dynamic Form Card */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 min-h-[500px] flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 {getFormTitle()}
//               </h2>

//               {/* Success Message */}
//               {successMessage && (
//                 <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                   <p className="text-green-700 text-sm">{successMessage}</p>
//                 </div>
//               )}

//               {/* Error Message */}
//               {(authError || errors.general) && (
//                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-700 text-sm">{authError || errors.general}</p>
//                 </div>
//               )}

//               <div className="space-y-6">
//                 {getCurrentForm()}
//               </div>
//             </div>

//             {/* Footer Links */}
//             <div className="text-center space-y-2">
//               {showRegisterLink() && (
//                 <p className="text-xs text-slate-500">
//                   Don't have an account?
//                   <button
//                     onClick={navigateToRegister}
//                     className="text-cyan-600 hover:text-cyan-700 font-medium ml-1"
//                   >
//                     Register
//                   </button>
//                 </p>
//               )}
              
//               {showLoginLink() && (
//                 <p className="text-xs text-slate-500">
//                   Already have Account?
//                   <button
//                     onClick={navigateToLogin}
//                     className="text-cyan-600 hover:text-cyan-700 font-medium ml-1"
//                   >
//                     Log in
//                   </button>
//                 </p>
//               )}

//               {(currentStep === "otp" || currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc" || currentStep === "kycOtp") && (
//                 <button
//                   onClick={goBack}
//                   className="text-xs text-slate-500 hover:text-slate-700"
//                 >
//                   ← Back
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
//         <div className="absolute pt-10 flex items-center">
//           <div className="rounded-2xl overflow-hidden shadow-2xl w-[602px]">
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

// export default DigiWarehouseRegistration;

// import React, { useState, useEffect } from "react";
// import { useApp } from "../context/Context"; // Update path to AppContext.js
// import digiLogoPoster from "../../assets/Digiware_logoPoster.png";
// import digi_logo from "../../assets/digi_logo.png";

// const DigiWarehouseRegistration = () => {
//   const {
//     currentUser,
//     userData,
//     sendRegistrationOTP,
//     sendLoginOTP,
//     verifyRegistrationOTP,
//     verifyLoginOTP,
//     checkUserExists,
//     uploadKycFile,
//     signOut,
//     clearError,
//     error: authError,
//   } = useApp();

//   // Auth States
//   const [currentStep, setCurrentStep] = useState("login");
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState("");
//   const [resendAvailable, setResendAvailable] = useState(true); // For resend OTP cooldown
//   const [resendCountdown, setResendCountdown] = useState(0); // Countdown timer

//   // Login States
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);

//   // KYC OTP States
//   const [kycOtp, setKycOtp] = useState(["", "", "", "", "", ""]);

//   // KYC File States
//   const [kycFiles, setKycFiles] = useState({
//     licenseFront: null,
//     aadharFront: null,
//     aadharBack: null,
//   });

//   // Registration States
//   const [registerData, setRegisterData] = useState({
//     username: "",
//     firstName: "",
//     contactNumber: "",
//   });

//   // Shop Details States
//   const [shopData, setShopData] = useState({
//     shopName: "",
//     shopAddress: "",
//     city: "",
//     state: "",
//     pincode: "",
//   });

//   // Bank Details States
//   const [bankData, setBankData] = useState({
//     accountHolder: "",
//     accountNumber: "",
//     reAccountNumber: "",
//     ifscCode: "",
//     bankName: "",
//     branchName: "",
//   });

//   // Clear messages after 5 seconds
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(""), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   useEffect(() => {
//     if (authError) {
//       const timer = setTimeout(() => clearError(), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [authError, clearError]);

//   // Handle resend countdown
//   useEffect(() => {
//     let timer;
//     if (resendCountdown > 0) {
//       timer = setInterval(() => {
//         setResendCountdown((prev) => {
//           if (prev <= 1) {
//             setResendAvailable(true);
//             return 0;
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [resendCountdown]);

//   // Redirect if user is logged in
//   useEffect(() => {
//     if (currentUser && userData) {
//       console.log("User is logged in:", userData);
//       // Add navigation to dashboard here (e.g., using react-router)
//     }
//   }, [currentUser, userData]);

//   // Validation Functions
//   const validateOTP = (otpCode) => {
//     return otpCode.length === 6 && /^\d{6}$/.test(otpCode);
//   };

//   const validateRegistrationForm = (data) => {
//     const errors = {};
//     if (!data.username.trim()) errors.username = "Username is required";
//     if (!data.firstName.trim()) errors.firstName = "First name is required";
//     if (!data.contactNumber || !/^\d{10}$/.test(data.contactNumber)) {
//       errors.contactNumber = "Valid 10-digit mobile number is required";
//     }
//     return { isValid: Object.keys(errors).length === 0, errors };
//   };

//   const validateShopDetails = (data) => {
//     const errors = {};
//     if (!data.shopName.trim()) errors.shopName = "Shop name is required";
//     if (!data.shopAddress.trim()) errors.shopAddress = "Shop address is required";
//     if (!data.city.trim()) errors.city = "City is required";
//     if (!data.state.trim()) errors.state = "State is required";
//     if (!data.pincode || !/^\d{6}$/.test(data.pincode)) {
//       errors.pincode = "Valid 6-digit pincode is required";
//     }
//     return { isValid: Object.keys(errors).length === 0, errors };
//   };

//   const validateBankDetails = (data) => {
//     const errors = {};
//     if (!data.bankName) errors.bankName = "Bank name is required";
//     if (!data.branchName.trim()) errors.branchName = "Branch name is required";
//     if (!data.accountHolder.trim()) errors.accountHolder = "Account holder name is required";
//     if (!data.accountNumber || !/^\d+$/.test(data.accountNumber)) {
//       errors.accountNumber = "Valid account number is required";
//     }
//     if (data.accountNumber !== data.reAccountNumber) {
//       errors.reAccountNumber = "Account numbers do not match";
//     }
//     if (!data.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifscCode)) {
//       errors.ifscCode = "Valid IFSC code is required";
//     }
//     return { isValid: Object.keys(errors).length === 0, errors };
//   };

//   const validateKycFiles = () => {
//     const errors = {};
//     if (!kycFiles.licenseFront) errors.licenseFront = "License Front is required";
//     if (!kycFiles.aadharFront) errors.aadharFront = "Aadhar Front is required";
//     if (!kycFiles.aadharBack) errors.aadharBack = "Aadhar Back is required";
//     return { isValid: Object.keys(errors).length === 0, errors };
//   };

//   // Event Handlers
//   const handleGetOtp = async () => {
//     if (!phone.trim() || !/^\d{10}$/.test(phone)) {
//       setErrors({ phone: "Valid 10-digit mobile number is required" });
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       const { exists } = await checkUserExists(phone);

//       if (exists) {
//         await sendLoginOTP(phone);
//         setCurrentStep("otp");
//         setSuccessMessage("OTP sent successfully for login");
//         setResendCountdown(30); // Start 30s cooldown
//         setResendAvailable(false);
//       } else {
//         setSuccessMessage("Please complete registration first");
//         setCurrentStep("register");
//       }
//     } catch (error) {
//       if (error.code === "auth/too-many-requests") {
//         setErrors({ general: "Too many attempts. Please wait a few minutes and try again." });
//       } else {
//         setErrors({ general: error.message });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);

//       if (value && index < 5) {
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleKycOtpChange = (index, value) => {
//     if (value.length <= 1 && /^\d*$/.test(value)) {
//       const newKycOtp = [...kycOtp];
//       newKycOtp[index] = value;
//       setKycOtp(newKycOtp);

//       if (value && index < 5) {
//         const nextInput = document.getElementById(`kyc-otp-${index + 1}`);
//         if (nextInput) nextInput.focus();
//       }
//     }
//   };

//   const handleKycFileChange = (e, fileType) => {
//     const file = e.target.files[0];
//     setKycFiles((prev) => ({ ...prev, [fileType]: file }));
//     if (errors[fileType]) {
//       setErrors((prev) => ({ ...prev, [fileType]: "" }));
//     }
//   };

//   const handleContinue = async () => {
//     const otpCode = otp.join("");

//     if (!validateOTP(otpCode)) {
//       setErrors({ otp: "Please enter a valid 6-digit OTP" });
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       await verifyLoginOTP(otpCode);
//       setSuccessMessage("Login successful!");
//     } catch (error) {
//       if (error.code === "auth/too-many-requests") {
//         setErrors({ otp: "Too many attempts. Please wait a few minutes and try again." });
//       } else {
//         setErrors({ otp: error.message });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKycOtpVerify = async () => {
//     const otpCode = kycOtp.join("");

//     if (!validateOTP(otpCode)) {
//       setErrors({ kycOtp: "Please enter a valid 6-digit OTP" });
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       const completeUserData = {
//         ...registerData,
//         shopDetails: shopData,
//         bankDetails: bankData,
//         kycDocuments: window.kycDocumentUrls || {}, // Include KYC URLs
//       };

//       await verifyRegistrationOTP(otpCode, completeUserData);
//       setSuccessMessage("Registration completed successfully!");
//       // Clear KYC files and URLs after successful registration
//       setKycFiles({ licenseFront: null, aadharFront: null, aadharBack: null });
//       delete window.kycDocumentUrls;
//     } catch (error) {
//       if (error.code === "auth/too-many-requests") {
//         setErrors({ kycOtp: "Too many attempts. Please wait a few minutes and try again." });
//       } else {
//         setErrors({ kycOtp: error.message });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleRegisterInputChange = (e) => {
//     const { name, value } = e.target;
//     setRegisterData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleShopInputChange = (e) => {
//     const { name, value } = e.target;
//     setShopData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleBankInputChange = (e) => {
//     const { name, value } = e.target;
//     setBankData((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleRegisterSubmit = async () => {
//     const validation = validateRegistrationForm(registerData);

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       const { exists } = await checkUserExists(registerData.contactNumber);
//       if (exists) {
//         setErrors({ general: "User already exists with this phone number" });
//         return;
//       }
//       setCurrentStep("shopDetails");
//       setSuccessMessage("Please complete your profile details");
//     } catch (error) {
//       setErrors({ general: error.message });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleShopDetailsSubmit = () => {
//     const validation = validateShopDetails(shopData);

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setCurrentStep("bankDetails");
//   };

//   const handleBankDetailsSubmit = () => {
//     const validation = validateBankDetails(bankData);

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setCurrentStep("kyc");
//   };

//   const handleKycSubmit = async () => {
//     const validation = validateKycFiles();

//     if (!validation.isValid) {
//       setErrors(validation.errors);
//       return;
//     }

//     setIsLoading(true);
//     setErrors({});
//     clearError();

//     try {
//       // Use a temporary userId (phone number) for storage path before auth
//       const tempUserId = registerData.contactNumber.replace(/\D/g, "");
      
//       // Upload files to Firebase Storage
//       const kycDocumentUrls = {
//         licenseFrontUrl: await uploadKycFile(kycFiles.licenseFront, tempUserId, "license_front"),
//         aadharFrontUrl: await uploadKycFile(kycFiles.aadharFront, tempUserId, "aadhar_front"),
//         aadharBackUrl: await uploadKycFile(kycFiles.aadharBack, tempUserId, "aadhar_back"),
//       };

//       // Store URLs temporarily in window object
//       window.kycDocumentUrls = kycDocumentUrls;

//       await sendRegistrationOTP(registerData.contactNumber);
//       setCurrentStep("kycOtp");
//       setSuccessMessage("KYC documents uploaded. OTP sent to complete registration.");
//       setResendCountdown(30); // Start 30s cooldown
//       setResendAvailable(false);
//     } catch (error) {
//       if (error.code === "auth/too-many-requests") {
//         setErrors({ general: "Too many attempts. Please wait a few minutes and try again." });
//       } else {
//         setErrors({ general: error.message });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleSignIn = () => {
//     console.log("Google Sign-In clicked");
//     // Implement Google Sign-In if needed
//   };

//   const navigateToRegister = () => {
//     setCurrentStep("register");
//     setErrors({});
//     clearError();
//     delete window.kycDocumentUrls; // Clear stale URLs
//   };

//   const navigateToLogin = () => {
//     setCurrentStep("login");
//     setErrors({});
//     clearError();
//     setOtp(["", "", "", "", "", ""]);
//     setKycOtp(["", "", "", "", "", ""]);
//     setKycFiles({ licenseFront: null, aadharFront: null, aadharBack: null });
//     delete window.kycDocumentUrls; // Clear stale URLs
//   };

//   const goBack = () => {
//     setErrors({});
//     clearError();
//     delete window.kycDocumentUrls; // Clear stale URLs

//     if (currentStep === "otp") setCurrentStep("login");
//     else if (currentStep === "register") setCurrentStep("login");
//     else if (currentStep === "shopDetails") setCurrentStep("register");
//     else if (currentStep === "bankDetails") setCurrentStep("shopDetails");
//     else if (currentStep === "kyc") setCurrentStep("bankDetails");
//     else if (currentStep === "kycOtp") setCurrentStep("kyc");
//   };

//   // Form Renderers
//   const renderLoginForm = () => (
//     <>
//       <div>
//         <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-2">
//           Enter your Mobile number
//         </label>
//         <input
//           type="tel"
//           id="phone"
//           value={phone}
//           onChange={(e) => {
//             setPhone(e.target.value);
//             if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
//           }}
//           placeholder="Mobile number (10 digits)"
//           className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 ${
//             errors.phone ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
//           }`}
//         />
//         {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
//       </div>

//       <button
//         onClick={handleGetOtp}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Checking...
//           </div>
//         ) : (
//           "Get OTP"
//         )}
//       </button>

//       <div className="relative my-6">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-slate-200"></div>
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-4 bg-white text-slate-500">or</span>
//         </div>
//       </div>

//       <button
//         onClick={handleGoogleSignIn}
//         className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
//       >
//         <svg className="w-5 h-5" viewBox="0 0 24 24">
//           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//         </svg>
//         Sign in with <span className="text-blue-600 font-semibold">G</span>oogle
//       </button>
//     </>
//   );

//   const renderOtpForm = () => (
//     <>
//       <div>
//         <label className="block text-sm font-medium text-slate-600 mb-2">
//           Mobile Number
//         </label>
//         <input
//           type="tel"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 bg-slate-50"
//           disabled
//         />
//       </div>

//       <div className="space-y-4">
//         <p className="text-sm text-slate-600">We've sent an OTP to your mobile</p>
        
//         <div className="flex justify-center space-x-3">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               id={`otp-${index}`}
//               type="text"
//               value={digit}
//               onChange={(e) => handleOtpChange(index, e.target.value)}
//               className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
//                 errors.otp ? "border-red-300" : "border-slate-300"
//               }`}
//               maxLength="1"
//             />
//           ))}
//         </div>
        
//         {errors.otp && <p className="text-red-500 text-xs text-center">{errors.otp}</p>}

//         <div className="text-center">
//           <button 
//             onClick={handleGetOtp}
//             disabled={isLoading || !resendAvailable}
//             className={`text-sm text-slate-600 ${
//               !resendAvailable ? "opacity-50 cursor-not-allowed" : "hover:underline"
//             }`}
//           >
//             I didn't receive a code.{" "}
//             <span className="text-cyan-600 font-semibold">
//               {resendAvailable ? "Resend" : `Resend in ${resendCountdown}s`}
//             </span>
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={handleContinue}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Verifying...
//           </div>
//         ) : (
//           "Continue"
//         )}
//       </button>
//     </>
//   );

//   const renderRegisterForm = () => (
//     <>
//       <div>
//         <label className="block text-sm text-start font-medium text-slate-600 mb-2">
//           Enter your username or email address
//         </label>
//         <input
//           type="text"
//           name="username"
//           value={registerData.username}
//           onChange={handleRegisterInputChange}
//           placeholder="Username or email address"
//           className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
//             errors.username ? "border-red-300" : "border-slate-200"
//           }`}
//         />
//         {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium text-start text-slate-600 mb-2">User name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={registerData.firstName}
//             onChange={handleRegisterInputChange}
//             placeholder="User name"
//             className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
//               errors.firstName ? "border-red-300" : "border-slate-200"
//             }`}
//           />
//           {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-start text-slate-600 mb-2">Contact Number</label>
//           <input
//             type="tel"
//             name="contactNumber"
//             value={registerData.contactNumber}
//             onChange={handleRegisterInputChange}
//             placeholder="Contact Number"
//             className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
//               errors.contactNumber ? "border-red-300" : "border-slate-200"
//             }`}
//           />
//           {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
//         </div>
//       </div>

//       <button
//         onClick={handleRegisterSubmit}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Processing...
//           </div>
//         ) : (
//           "Continue"
//         )}
//       </button>
//     </>
//   );

//   const renderShopDetailsForm = () => (
//     <>
//       <div>
//         <input
//           type="text"
//           name="shopName"
//           value={shopData.shopName}
//           onChange={handleShopInputChange}
//           placeholder="Shop Name"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.shopName ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.shopName && <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="shopAddress"
//           value={shopData.shopAddress}
//           onChange={handleShopInputChange}
//           placeholder="Shop Address"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.shopAddress ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.shopAddress && <p className="text-red-500 text-xs mt-1">{errors.shopAddress}</p>}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <input
//             type="text"
//             name="city"
//             value={shopData.city}
//             onChange={handleShopInputChange}
//             placeholder="City"
//             className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//               errors.city ? "border-red-300" : "border-slate-300"
//             }`}
//           />
//           {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
//         </div>
//         <div>
//           <input
//             type="text"
//             name="state"
//             value={shopData.state}
//             onChange={handleShopInputChange}
//             placeholder="State"
//             className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//               errors.state ? "border-red-300" : "border-slate-300"
//             }`}
//           />
//           {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
//         </div>
//       </div>

//       <div>
//         <input
//           type="text"
//           name="pincode"
//           value={shopData.pincode}
//           onChange={handleShopInputChange}
//           placeholder="Pin Code"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.pincode ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={handleShopDetailsSubmit}
//           className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow"
//         >
//           Next →
//         </button>
//       </div>
//     </>
//   );

//   const renderBankDetailsForm = () => (
//     <>
//       <div>
//         <select
//           name="bankName"
//           value={bankData.bankName}
//           onChange={handleBankInputChange}
//           className={`w-full border-b py-3 text-slate-700 focus:outline-none focus:border-cyan-500 ${
//             errors.bankName ? "border-red-300" : "border-slate-300"
//           }`}
//         >
//           <option value="">Select Bank</option>
//           <option value="sbi">State Bank of India</option>
//           <option value="hdfc">HDFC Bank</option>
//           <option value="icici">ICICI Bank</option>
//           <option value="axis">Axis Bank</option>
//           <option value="pnb">Punjab National Bank</option>
//         </select>
//         {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="branchName"
//           value={bankData.branchName}
//           onChange={handleBankInputChange}
//           placeholder="Enter Branch Name"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.branchName ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.branchName && <p className="text-red-500 text-xs mt-1">{errors.branchName}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="accountHolder"
//           value={bankData.accountHolder}
//           onChange={handleBankInputChange}
//           placeholder="Enter Account Holder Name"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.accountHolder ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="accountNumber"
//           value={bankData.accountNumber}
//           onChange={handleBankInputChange}
//           placeholder="e.g. 1234 5678 980"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.accountNumber ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="reAccountNumber"
//           value={bankData.reAccountNumber}
//           onChange={handleBankInputChange}
//           placeholder="Re-enter e.g. 1234 5678 980"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.reAccountNumber ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.reAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.reAccountNumber}</p>}
//       </div>

//       <div>
//         <input
//           type="text"
//           name="ifscCode"
//           value={bankData.ifscCode}
//           onChange={handleBankInputChange}
//           placeholder="IFSC Code"
//           className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
//             errors.ifscCode ? "border-red-300" : "border-slate-300"
//           }`}
//         />
//         {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           onClick={handleBankDetailsSubmit}
//           className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow"
//         >
//           Next →
//         </button>
//       </div>
//     </>
//   );

//   const renderKycForm = () => (
//     <>
//       <div className="space-y-4">
//         <p className="text-sm font-medium text-slate-700 mb-4">Upload Your KYC Documents</p>
        
//         <div className="space-y-4">
//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all">
//             <label className="text-sm text-slate-600 mb-2 block">License Front (PNG/JPEG, max 5MB)</label>
//             <input
//               type="file"
//               accept="image/png,image/jpeg"
//               onChange={(e) => handleKycFileChange(e, "licenseFront")}
//               className="text-sm text-slate-600"
//             />
//             {kycFiles.licenseFront && (
//               <p className="text-sm text-slate-500 mt-2">Selected: {kycFiles.licenseFront.name}</p>
//             )}
//             {errors.licenseFront && <p className="text-red-500 text-xs mt-1">{errors.licenseFront}</p>}
//           </div>

//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all">
//             <label className="text-sm text-slate-600 mb-2 block">Aadhar Front (PNG/JPEG, max 5MB)</label>
//             <input
//               type="file"
//               accept="image/png,image/jpeg"
//               onChange={(e) => handleKycFileChange(e, "aadharFront")}
//               className="text-sm text-slate-600"
//             />
//             {kycFiles.aadharFront && (
//               <p className="text-sm text-slate-500 mt-2">Selected: {kycFiles.aadharFront.name}</p>
//             )}
//             {errors.aadharFront && <p className="text-red-500 text-xs mt-1">{errors.aadharFront}</p>}
//           </div>

//           <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all">
//             <label className="text-sm text-slate-600 mb-2 block">Aadhar Back (PNG/JPEG, max 5MB)</label>
//             <input
//               type="file"
//               accept="image/png,image/jpeg"
//               onChange={(e) => handleKycFileChange(e, "aadharBack")}
//               className="text-sm text-slate-600"
//             />
//             {kycFiles.aadharBack && (
//               <p className="text-sm text-slate-500 mt-2">Selected: {kycFiles.aadharBack.name}</p>
//             )}
//             {errors.aadharBack && <p className="text-red-500 text-xs mt-1">{errors.aadharBack}</p>}
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={handleKycSubmit}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Uploading...
//           </div>
//         ) : (
//           "Upload & Get OTP"
//         )}
//       </button>
//     </>
//   );

//   const renderKycOtpForm = () => (
//     <>
//       <div>
//         <label className="block text-sm font-medium text-slate-600 mb-2">
//           Mobile Number
//         </label>
//         <input
//           type="text"
//           value={registerData.contactNumber}
//           readOnly
//           className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
//         />
//       </div>

//       <div className="space-y-4">
//         <p className="text-sm text-slate-600">We've sent a verification OTP to complete your registration</p>
        
//         <div className="flex justify-center space-x-3">
//           {kycOtp.map((digit, index) => (
//             <input
//               key={index}
//               id={`kyc-otp-${index}`}
//               type="text"
//               value={digit}
//               onChange={(e) => handleKycOtpChange(index, e.target.value)}
//               className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
//                 errors.kycOtp ? "border-red-300" : "border-slate-300"
//               }`}
//               maxLength="1"
//             />
//           ))}
//         </div>
        
//         {errors.kycOtp && <p className="text-red-500 text-xs text-center">{errors.kycOtp}</p>}

//         <div className="text-center">
//           <button 
//             onClick={handleKycSubmit}
//             disabled={isLoading || !resendAvailable}
//             className={`text-sm text-slate-600 ${
//               !resendAvailable ? "opacity-50 cursor-not-allowed" : "hover:underline"
//             }`}
//           >
//             I didn't receive a code.{" "}
//             <span className="text-cyan-600 font-semibold">
//               {resendAvailable ? "Resend" : `Resend in ${resendCountdown}s`}
//             </span>
//           </button>
//         </div>
//       </div>

//       <button
//         onClick={handleKycOtpVerify}
//         disabled={isLoading}
//         className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center">
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
//             Verifying...
//           </div>
//         ) : (
//           "Verify & Complete Registration"
//         )}
//       </button>
//     </>
//   );

//   const getFormTitle = () => {
//     switch (currentStep) {
//       case "login": return "Log in";
//       case "otp": return "Log in";
//       case "register": return "Register";
//       case "shopDetails": return "Shop details";
//       case "bankDetails": return "Bank details";
//       case "kyc": return "KYC Verification";
//       case "kycOtp": return "Verify Registration";
//       default: return "Log in";
//     }
//   };

//   const getCurrentForm = () => {
//     switch (currentStep) {
//       case "login": return renderLoginForm();
//       case "otp": return renderOtpForm();
//       case "register": return renderRegisterForm();
//       case "shopDetails": return renderShopDetailsForm();
//       case "bankDetails": return renderBankDetailsForm();
//       case "kyc": return renderKycForm();
//       case "kycOtp": return renderKycOtpForm();
//       default: return renderLoginForm();
//     }
//   };

//   const showRegisterLink = () => {
//     return currentStep === "login" || currentStep === "otp";
//   };

//   const showLoginLink = () => {
//     return currentStep === "register" || currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc" || currentStep === "kycOtp";
//   };

//   return (
//     <div className="flex w-screen overflow-hidden min-h-screen">
//       {/* Hidden reCAPTCHA container */}
//       <div id="recaptcha-container"></div>
      
//       {/* Left Section - Dynamic Form */}
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

//           {/* Dynamic Form Card */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 min-h-[500px] flex flex-col justify-between">
//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 mb-6">
//                 {getFormTitle()}
//               </h2>

//               {/* Success Message */}
//               {successMessage && (
//                 <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//                   <p className="text-green-700 text-sm">{successMessage}</p>
//                 </div>
//               )}

//               {/* Error Message */}
//               {(authError || errors.general) && (
//                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-700 text-sm">{authError || errors.general}</p>
//                 </div>
//               )}

//               <div className="space-y-6">
//                 {getCurrentForm()}
//               </div>
//             </div>

//             {/* Footer Links */}
//             <div className="text-center space-y-2">
//               {showRegisterLink() && (
//                 <p className="text-xs text-slate-500">
//                   Don't have an account?
//                   <button
//                     onClick={navigateToRegister}
//                     className="text-cyan-600 hover:text-cyan-700 font-medium ml-1"
//                   >
//                     Register
//                   </button>
//                 </p>
//               )}
              
//               {showLoginLink() && (
//                 <p className="text-xs text-slate-500">
//                   Already have Account?
//                   <button
//                     onClick={navigateToLogin}
//                     className="text-cyan-600 hover:text-cyan-700 font-medium ml-1"
//                   >
//                     Log in
//                   </button>
//                 </p>
//               )}

//               {(currentStep === "otp" || currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc" || currentStep === "kycOtp") && (
//                 <button
//                   onClick={goBack}
//                   className="text-xs text-slate-500 hover:text-slate-700"
//                 >
//                   ← Back
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
//         <div className="absolute pt-10 flex items-center">
//           <div className="rounded-2xl overflow-hidden shadow-2xl w-[602px]">
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

// export default DigiWarehouseRegistration;





























import React, { useState, useEffect } from "react";
import { useApp } from "../context/Context"; // Update path to AppContext.js
import digiLogoPoster from "../../assets/Digiware_logoPoster.png";
import digi_logo from "../../assets/digi_logo.png";

const DigiWarehouseRegistration = () => {
  const {
    currentUser,
    userData,
    sendRegistrationOTP,
    sendLoginOTP,
    verifyRegistrationOTP,
    verifyLoginOTP,
    checkUserExists,
    uploadKycFile,
    signOut,
    clearError,
    error: authError,
    setError,
  } = useApp();

  // Auth States
  const [currentStep, setCurrentStep] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [resendAvailable, setResendAvailable] = useState(true);
  const [resendCountdown, setResendCountdown] = useState(0);

  // Login States
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // KYC OTP States
  const [kycOtp, setKycOtp] = useState(["", "", "", "", "", ""]);

  // KYC File States
  const [kycFiles, setKycFiles] = useState({
    licenseFront: null,
    aadharFront: null,
    aadharBack: null,
  });

  // Registration States
  const [registerData, setRegisterData] = useState({
    username: "",
    firstName: "",
    contactNumber: "",
  });

  // Shop Details States
  const [shopData, setShopData] = useState({
    shopName: "",
    shopAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Bank Details States
  const [bankData, setBankData] = useState({
    accountHolder: "",
    accountNumber: "",
    reAccountNumber: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
  });

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(timer);
    }
  }, [authError, clearError]);

  // Handle resend countdown
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setResendAvailable(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  // Redirect if user is logged in
  useEffect(() => {
    if (currentUser && userData) {
      console.log("User is logged in:", userData);
      // Add navigation to dashboard here (e.g., using react-router)
    }
  }, [currentUser, userData]);

  // Validation Functions
  const validateOTP = (otpCode) => {
    return otpCode.length === 6 && /^\d{6}$/.test(otpCode);
  };

  const validateRegistrationForm = (data) => {
    const errors = {};
    if (!data.username.trim()) errors.username = "Username is required";
    if (!data.firstName.trim()) errors.firstName = "First name is required";
    if (!data.contactNumber || !/^\d{10}$/.test(data.contactNumber)) {
      errors.contactNumber = "Valid 10-digit mobile number is required";
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const validateShopDetails = (data) => {
    const errors = {};
    if (!data.shopName.trim()) errors.shopName = "Shop name is required";
    if (!data.shopAddress.trim()) errors.shopAddress = "Shop address is required";
    if (!data.city.trim()) errors.city = "City is required";
    if (!data.state.trim()) errors.state = "State is required";
    if (!data.pincode || !/^\d{6}$/.test(data.pincode)) {
      errors.pincode = "Valid 6-digit pincode is required";
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const validateBankDetails = (data) => {
    const errors = {};
    if (!data.bankName) errors.bankName = "Bank name is required";
    if (!data.branchName.trim()) errors.branchName = "Branch name is required";
    if (!data.accountHolder.trim()) errors.accountHolder = "Account holder name is required";
    if (!data.accountNumber || !/^\d+$/.test(data.accountNumber)) {
      errors.accountNumber = "Valid account number is required";
    }
    if (data.accountNumber !== data.reAccountNumber) {
      errors.reAccountNumber = "Account numbers do not match";
    }
    if (!data.ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(data.ifscCode)) {
      errors.ifscCode = "Valid IFSC code is required";
    }
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const validateKycFiles = () => {
    const errors = {};
    if (!kycFiles.licenseFront) errors.licenseFront = "License Front is required";
    if (!kycFiles.aadharFront) errors.aadharFront = "Aadhar Front is required";
    if (!kycFiles.aadharBack) errors.aadharBack = "Aadhar Back is required";
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  // Event Handlers
  const handleGetOtp = async () => {
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      setErrors({ phone: "Valid 10-digit mobile number is required" });
      return;
    }

    setIsLoading(true);
    setErrors({});
    clearError();

    try {
      const { exists } = await checkUserExists(phone);

      if (exists) {
        await sendLoginOTP(phone);
        setCurrentStep("otp");
        setSuccessMessage("OTP sent successfully for login");
        setResendCountdown(30);
        setResendAvailable(false);
      } else {
        setSuccessMessage("Please complete registration first");
        setCurrentStep("register");
      }
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKycOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newKycOtp = [...kycOtp];
      newKycOtp[index] = value;
      setKycOtp(newKycOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`kyc-otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKycFileChange = (e, fileType) => {
    const file = e.target.files[0];
    setKycFiles((prev) => ({ ...prev, [fileType]: file }));
    if (errors[fileType]) {
      setErrors((prev) => ({ ...prev, [fileType]: "" }));
    }
  };

  const handleContinue = async () => {
    const otpCode = otp.join("");

    if (!validateOTP(otpCode)) {
      setErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setIsLoading(true);
    setErrors({});
    clearError();

    try {
      await verifyLoginOTP(otpCode);
      setSuccessMessage("Login successful!");
    } catch (error) {
      setErrors({ otp: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKycOtpVerify = async () => {
    const otpCode = kycOtp.join("");

    if (!validateOTP(otpCode)) {
      setErrors({ kycOtp: "Please enter a valid 6-digit OTP" });
      return;
    }

    setIsLoading(true);
    setErrors({});
    clearError();

    try {
      const completeUserData = {
        ...registerData,
        shopDetails: shopData,
        bankDetails: bankData,
        kycDocuments: window.kycDocumentUrls || {},
      };

      await verifyRegistrationOTP(otpCode, completeUserData);
      setSuccessMessage("Registration completed successfully!");
      setKycFiles({ licenseFront: null, aadharFront: null, aadharBack: null });
      delete window.kycDocumentUrls;
    } catch (error) {
      setErrors({ kycOtp: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleShopInputChange = (e) => {
    const { name, value } = e.target;
    setShopData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBankInputChange = (e) => {
    const { name, value } = e.target;
    setBankData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRegisterSubmit = async () => {
    const validation = validateRegistrationForm(registerData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    clearError();

    try {
      const { exists } = await checkUserExists(registerData.contactNumber);
      if (exists) {
        setErrors({ general: "User already exists with this phone number" });
        return;
      }
      setCurrentStep("shopDetails");
      setSuccessMessage("Please complete your profile details");
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShopDetailsSubmit = () => {
    const validation = validateShopDetails(shopData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setCurrentStep("bankDetails");
  };

  const handleBankDetailsSubmit = () => {
    const validation = validateBankDetails(bankData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setCurrentStep("kyc");
  };

  const handleKycSubmit = async () => {
    const validation = validateKycFiles();

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    clearError();

    try {
      const tempUserId = registerData.contactNumber.replace(/\D/g, "");
      
      const kycDocumentUrls = {
        licenseFrontUrl: await uploadKycFile(kycFiles.licenseFront, tempUserId, "license_front"),
        aadharFrontUrl: await uploadKycFile(kycFiles.aadharFront, tempUserId, "aadhar_front"),
        aadharBackUrl: await uploadKycFile(kycFiles.aadharBack, tempUserId, "aadhar_back"),
      };

      window.kycDocumentUrls = kycDocumentUrls;

      await sendRegistrationOTP(registerData.contactNumber);
      setCurrentStep("kycOtp");
      setSuccessMessage("KYC documents uploaded. OTP sent to complete registration.");
      setResendCountdown(30);
      setResendAvailable(false);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
    // Implement Google Sign-In if needed
  };

  const navigateToRegister = () => {
    setCurrentStep("register");
    setErrors({});
    clearError();
    delete window.kycDocumentUrls;
  };

  const navigateToLogin = () => {
    setCurrentStep("login");
    setErrors({});
    clearError();
    setOtp(["", "", "", "", "", ""]);
    setKycOtp(["", "", "", "", "", ""]);
    setKycFiles({ licenseFront: null, aadharFront: null, aadharBack: null });
    delete window.kycDocumentUrls;
  };

  const goBack = () => {
    setErrors({});
    clearError();
    delete window.kycDocumentUrls;

    if (currentStep === "otp") setCurrentStep("login");
    else if (currentStep === "register") setCurrentStep("login");
    else if (currentStep === "shopDetails") setCurrentStep("register");
    else if (currentStep === "bankDetails") setCurrentStep("shopDetails");
    else if (currentStep === "kyc") setCurrentStep("bankDetails");
    else if (currentStep === "kycOtp") setCurrentStep("kyc");
  };

  // Form Renderers
  const renderLoginForm = () => (
    <>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-2">
          Enter your Mobile number
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
          }}
          placeholder="Mobile number (10 digits)"
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 ${
            errors.phone ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
          }`}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
      </div>

      <button
        onClick={handleGetOtp}
        disabled={isLoading}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Checking...
          </div>
        ) : (
          "Get OTP"
        )}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-slate-500">or</span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Sign in with <span className="text-blue-600 font-semibold">G</span>oogle
      </button>
    </>
  );

  const renderOtpForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Mobile Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 bg-slate-50"
          disabled
        />
      </div>

      <div className="space-y-4">
        <p className="text-sm text-slate-600">We've sent an OTP to your mobile</p>
        
        <div className="flex justify-center space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
                errors.otp ? "border-red-300" : "border-slate-300"
              }`}
              maxLength="1"
            />
          ))}
        </div>
        
        {errors.otp && <p className="text-red-500 text-xs text-center">{errors.otp}</p>}

        <div className="text-center">
          <button 
            onClick={handleGetOtp}
            disabled={isLoading || !resendAvailable}
            className={`text-sm text-slate-600 ${
              !resendAvailable ? "opacity-50 cursor-not-allowed" : "hover:underline"
            }`}
          >
            I didn't receive a code.{" "}
            <span className="text-cyan-600 font-semibold">
              {resendAvailable ? "Resend" : `Resend in ${resendCountdown}s`}
            </span>
          </button>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={isLoading}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Verifying...
          </div>
        ) : (
          "Continue"
        )}
      </button>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <div>
        <label className="block text-sm text-start font-medium text-slate-600 mb-2">
          Enter your username or email address
        </label>
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={handleRegisterInputChange}
          placeholder="Username or email address"
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
            errors.username ? "border-red-300" : "border-slate-200"
          }`}
        />
        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-start text-slate-600 mb-2">User name</label>
          <input
            type="text"
            name="firstName"
            value={registerData.firstName}
            onChange={handleRegisterInputChange}
            placeholder="User name"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
              errors.firstName ? "border-red-300" : "border-slate-200"
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-start text-slate-600 mb-2">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={registerData.contactNumber}
            onChange={handleRegisterInputChange}
            placeholder="Contact Number"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
              errors.contactNumber ? "border-red-300" : "border-slate-200"
            }`}
          />
          {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
        </div>
      </div>

      <button
        onClick={handleRegisterSubmit}
        disabled={isLoading}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Processing...
          </div>
        ) : (
          "Continue"
        )}
      </button>
    </>
  );

  const renderShopDetailsForm = () => (
    <>
      <div>
        <input
          type="text"
          name="shopName"
          value={shopData.shopName}
          onChange={handleShopInputChange}
          placeholder="Shop Name"
          className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
            errors.shopName ? "border-red-300" : "border-slate-300"
          }`}
        />
        {errors.shopName && <p className="text-red-500 text-xs mt-1">{errors.shopName}</p>}
      </div>

      <div>
        <input
          type="text"
          name="shopAddress"
          value={shopData.shopAddress}
          onChange={handleShopInputChange}
          placeholder="Shop Address"
          className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
            errors.shopAddress ? "border-red-300" : "border-slate-300"
          }`}
        />
        {errors.shopAddress && <p className="text-red-500 text-xs mt-1">{errors.shopAddress}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="city"
            value={shopData.city}
            onChange={handleShopInputChange}
            placeholder="City"
            className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
              errors.city ? "border-red-300" : "border-slate-300"
            }`}
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
        <div>
          <input
            type="text"
            name="state"
            value={shopData.state}
            onChange={handleShopInputChange}
            placeholder="State"
            className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
              errors.state ? "border-red-300" : "border-slate-300"
            }`}
          />
          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
        </div>
      </div>

      <div>
        <input
          type="text"
          name="pincode"
          value={shopData.pincode}
          onChange={handleShopInputChange}
          placeholder="Pin Code"
          className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
            errors.pincode ? "border-red-300" : "border-slate-300"
          }`}
        />
        {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleShopDetailsSubmit}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow"
        >
          Next →
        </button>
      </div>
    </>
  );

  const renderBankDetailsForm = () => (
    <>
      <div>
        <select
          name="bankName"
          value={bankData.bankName}
          onChange={handleBankInputChange}
          className={`w-full border-b py-3 text-slate-700 focus:outline-none focus:border-cyan-500 ${
            errors.bankName ? "border-red-300" : "border-slate-300"
          }`}
        >
          <option value="">Select Bank</option>
          <option value="sbi">State Bank of India</option>
          <option value="hdfc">HDFC Bank</option>
          <option value="icici">ICICI Bank</option>
          <option value="axis">Axis Bank</option>
          <option value="pnb">Punjab National Bank</option>
        </select>
        {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
      </div>

      <div>
        <input
          type="text"
          name="branchName"
          value={bankData.branchName}
          onChange={handleBankInputChange}
          placeholder="Enter Branch Name"
          className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
            errors.branchName ? "border-red-300" : "border-slate-300"
          }`}
        />
        {errors.branchName && <p className="text-red-500 text-xs mt-1">{errors.branchName}</p>}
      </div>

      <div>
        <input
          type="text"
          name="accountHolder"
          value={bankData.accountHolder}
          onChange={handleBankInputChange}
          placeholder="Enter Account Holder Name"
          className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
            errors.accountHolder ? "border-red-300" : "border-slate-300"
          }`}
        />
        {errors.accountHolder && <p className="text-red-500 text-xs mt-1">{errors.accountHolder}</p>}
      </div>

      <div>
        <input
          type="text"
          name="accountNumber"
          value={bankData.accountNumber}
          onChange={handleBankInputChange}
          placeholder="e.g. 1234 5678 980"
          className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
            errors.accountNumber ? "border-red-300" : "border-slate-300"
          }`}
        />
        {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
      </div>

      <div>
        <input
          type="text"
          name="reAccountNumber"
          value={bankData.reAccountNumber}
          onChange={handleBankInputChange}
          placeholder="Re-enter e.g. 1234 5678 980"
          className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
            errors.reAccountNumber ? "border-red-300" : "border-slate-300"
          }`}
        />
        {errors.reAccountNumber && <p className="text-red-500 text-xs mt-1">{errors.reAccountNumber}</p>}
      </div>

      <div>
        <input
          type="text"
          name="ifscCode"
          value={bankData.ifscCode}
          onChange={handleBankInputChange}
          placeholder="IFSC Code"
          className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
            errors.ifscCode ? "border-red-300" : "border-slate-300"
          }`}
        />
        {errors.ifscCode && <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleBankDetailsSubmit}
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow"
        >
          Next →
        </button>
      </div>
    </>
  );

  const renderKycForm = () => (
    <>
      <div className="space-y-4">
        <p className="text-sm font-medium text-slate-700 mb-4">Upload Your KYC Documents</p>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all">
            <label className="text-sm text-slate-600 mb-2 block">License Front (PNG/JPEG, max 5MB)</label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => handleKycFileChange(e, "licenseFront")}
              className="text-sm text-slate-600"
            />
            {kycFiles.licenseFront && (
              <p className="text-sm text-slate-500 mt-2">Selected: {kycFiles.licenseFront.name}</p>
            )}
            {errors.licenseFront && <p className="text-red-500 text-xs mt-1">{errors.licenseFront}</p>}
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all">
            <label className="text-sm text-slate-600 mb-2 block">Aadhar Front (PNG/JPEG, max 5MB)</label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => handleKycFileChange(e, "aadharFront")}
              className="text-sm text-slate-600"
            />
            {kycFiles.aadharFront && (
              <p className="text-sm text-slate-500 mt-2">Selected: {kycFiles.aadharFront.name}</p>
            )}
            {errors.aadharFront && <p className="text-red-500 text-xs mt-1">{errors.aadharFront}</p>}
          </div>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-cyan-500 transition-all">
            <label className="text-sm text-slate-600 mb-2 block">Aadhar Back (PNG/JPEG, max 5MB)</label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => handleKycFileChange(e, "aadharBack")}
              className="text-sm text-slate-600"
            />
            {kycFiles.aadharBack && (
              <p className="text-sm text-slate-500 mt-2">Selected: {kycFiles.aadharBack.name}</p>
            )}
            {errors.aadharBack && <p className="text-red-500 text-xs mt-1">{errors.aadharBack}</p>}
          </div>
        </div>
      </div>

      <button
        onClick={handleKycSubmit}
        disabled={isLoading}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Uploading...
          </div>
        ) : (
          "Upload & Get OTP"
        )}
      </button>
    </>
  );

  const renderKycOtpForm = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">
          Mobile Number
        </label>
        <input
          type="text"
          value={registerData.contactNumber}
          readOnly
          className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-700"
        />
      </div>

      <div className="space-y-4">
        <p className="text-sm text-slate-600">We've sent a verification OTP to complete your registration</p>
        
        <div className="flex justify-center space-x-3">
          {kycOtp.map((digit, index) => (
            <input
              key={index}
              id={`kyc-otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleKycOtpChange(index, e.target.value)}
              className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all ${
                errors.kycOtp ? "border-red-300" : "border-slate-300"
              }`}
              maxLength="1"
            />
          ))}
        </div>
        
        {errors.kycOtp && <p className="text-red-500 text-xs text-center">{errors.kycOtp}</p>}

        <div className="text-center">
          <button 
            onClick={handleKycSubmit}
            disabled={isLoading || !resendAvailable}
            className={`text-sm text-slate-600 ${
              !resendAvailable ? "opacity-50 cursor-not-allowed" : "hover:underline"
            }`}
          >
            I didn't receive a code.{" "}
            <span className="text-cyan-600 font-semibold">
              {resendAvailable ? "Resend" : `Resend in ${resendCountdown}s`}
            </span>
          </button>
        </div>
      </div>

      <button
        onClick={handleKycOtpVerify}
        disabled={isLoading}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Verifying...
          </div>
        ) : (
          "Verify & Complete Registration"
        )}
      </button>
    </>
  );

  const getFormTitle = () => {
    switch (currentStep) {
      case "login": return "Log in";
      case "otp": return "Log in";
      case "register": return "Register";
      case "shopDetails": return "Shop details";
      case "bankDetails": return "Bank details";
      case "kyc": return "KYC Verification";
      case "kycOtp": return "Verify Registration";
      default: return "Log in";
    }
  };

  const getCurrentForm = () => {
    switch (currentStep) {
      case "login": return renderLoginForm();
      case "otp": return renderOtpForm();
      case "register": return renderRegisterForm();
      case "shopDetails": return renderShopDetailsForm();
      case "bankDetails": return renderBankDetailsForm();
      case "kyc": return renderKycForm();
      case "kycOtp": return renderKycOtpForm();
      default: return renderLoginForm();
    }
  };

  const showRegisterLink = () => {
    return currentStep === "login" || currentStep === "otp";
  };

  const showLoginLink = () => {
    return currentStep === "register" || currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc" || currentStep === "kycOtp";
  };

  return (
    <div className="flex w-screen overflow-hidden min-h-screen">
      {/* Hidden reCAPTCHA container - Moved to top-level to ensure it's always rendered */}
      <div id="recaptcha-container" style={{ display: "none" }}></div>
      
      {/* Left Section - Dynamic Form */}
      <div className="flex-1 flex items-center justify-center bg-white 
                      px-6 sm:px-10 md:px-16 lg:px-20 
                      mb-6 sm:mb-8 ml-0 lg:ml-24">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-md">
          {/* Logo */}
          <div className="text-center mb-6 sm:mb-8 lg:mr-64">
            <img
              src={digi_logo}
              alt="DIGI WAREHOUSE Logo"
              className="mx-auto h-12 sm:h-16 object-contain"
            />
          </div>

          {/* Dynamic Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 min-h-[500px] flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">
                {getFormTitle()}
              </h2>

              {/* Success Message */}
              {successMessage && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm">{successMessage}</p>
                </div>
              )}

              {/* Error Message */}
              {(authError || errors.general) && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{authError || errors.general}</p>
                </div>
              )}

              <div className="space-y-6">
                {getCurrentForm()}
              </div>
            </div>

            {/* Footer Links */}
            <div className="text-center space-y-2">
              {showRegisterLink() && (
                <p className="text-xs text-slate-500">
                  Don't have an account?
                  <button
                    onClick={navigateToRegister}
                    className="text-cyan-600 hover:text-cyan-700 font-medium ml-1"
                  >
                    Register
                  </button>
                </p>
              )}
              
              {showLoginLink() && (
                <p className="text-xs text-slate-500">
                  Already have Account?
                  <button
                    onClick={navigateToLogin}
                    className="text-cyan-600 hover:text-cyan-700 font-medium ml-1"
                  >
                    Log in
                  </button>
                </p>
              )}

              {(currentStep === "otp" || currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc" || currentStep === "kycOtp") && (
                <button
                  onClick={goBack}
                  className="text-xs text-slate-500 hover:text-slate-700"
                >
                  ← Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Poster (hidden on mobile) */}
      <div className="hidden md:flex flex-2 relative">
        {/* Split Backgrounds */}
        <div className="w-1/2 bg-white"></div>
        <div className="w-1/2 bg-[#95CDE2] relative"></div>

        {/* Center Image */}
        <div className="absolute pt-10 flex items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl w-[602px]">
            <img
              src={digiLogoPoster}
              alt="Clothing Store Interior"
              className="w-full h-[552px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigiWarehouseRegistration;