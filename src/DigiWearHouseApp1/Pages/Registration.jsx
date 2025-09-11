import React, { useState, useEffect } from "react";
import { useApp } from "../context/Context";
import digiLogoPoster from "../../assets/Digiware_logoPoster.png";
import digi_logo from "../../assets/digi_logo.png";
import { useNavigate } from "react-router-dom";


const DigiWarehouseRegistration = () => {
  const navigate = useNavigate();
  // const {
  //   currentUser,
  //   userData,
  //   registerUser,
  //   loginUser,
  //   checkUserExists,
  //   signOut,
  //   clearError,
  //   error: authError,
  //   setError,
  // } = useApp();
  // Add to your imports in DigiWarehouseRegistration.js
const {
  currentUser,
  userData,
  registerUser,
  loginUser,
  checkUserExists,
  signOut,
  clearError,
  error: authError,
  setError,
  sendOtp,
  verifyOtp,
  confirmationResult
} = useApp();

  // Auth States
  const [currentStep, setCurrentStep] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Login States
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  // Registration States
  const [registerData, setRegisterData] = useState({
    username: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  // KYC File States
  const [kycDetails, setKycDetails] = useState({
  panNumber: '',
  gstinNumber: '',
  aadharNumber: '',
});

// Add these new states after your existing states
const [otpData, setOtpData] = useState({
  otp: ['', '', '', '', '', ''],
  phoneNumber: '',
  isOtpSent: false,
  otpVerified: false,
  resendCount: 0,
  timer: 0
});

// Add timer effect
useEffect(() => {
  let interval = null;
  if (otpData.timer > 0) {
    interval = setInterval(() => {
      setOtpData(prev => ({ ...prev, timer: prev.timer - 1 }));
    }, 1000);
  }
  return () => clearInterval(interval);
}, [otpData.timer]);


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

  // Redirect if user is logged in
  useEffect(() => {
    if (currentUser && userData) {
      console.log("User is logged in:", userData);
      // Add navigation to dashboard here
        // navigate("/dashboard");
    }
  }, [currentUser, userData]);

  // Validation Functions
  const validateLoginForm = (data) => {
    const errors = {};
    if (!data.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.password.trim()) errors.password = "Password is required";
    return { isValid: Object.keys(errors).length === 0, errors };
  };

  const validateRegistrationForm = (data) => {
    const errors = {};
    if (!data.username.trim()) errors.username = "Username is required";
    if (!data.firstName.trim()) errors.firstName = "First name is required";
    if (!data.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Invalid email format";
    }
    if (!data.password.trim()) errors.password = "Password is required";
    else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
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

  const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

const validateGSTIN = (gstin) => {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
};

const validateAadhar = (aadhar) => {
  const aadharRegex = /^[0-9]{12}$/;
  return aadharRegex.test(aadhar);
};

// 3. Update validateKycDetails function (replace existing)
const validateKycDetails = () => {
  const errors = {};
  
  if (!kycDetails.panNumber.trim()) {
    errors.panNumber = "PAN number is required";
  } else if (!validatePAN(kycDetails.panNumber)) {
    errors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)";
  }
  
    if (kycDetails.gstinNumber.trim()) {
    if (!validateGSTIN(kycDetails.gstinNumber)) {
      errors.gstinNumber = "Invalid GSTIN format (15 characters)";
    }
  }
  
  if (!kycDetails.aadharNumber.trim()) {
    errors.aadharNumber = "Aadhar number is required";
  } else if (!validateAadhar(kycDetails.aadharNumber)) {
    errors.aadharNumber = "Invalid Aadhar format (12 digits)";
  }
  
  return { isValid: Object.keys(errors).length === 0, errors };
};

// Update the initializeRecaptcha function in your Context.js
const initializeRecaptcha = () => {
  try {
    // Check if container exists first
    const container = document.getElementById('recaptcha-container');
    if (!container) {
      throw new Error('reCAPTCHA container not found. Please ensure the OTP form is rendered first.');
    }

    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          setError('reCAPTCHA expired. Please try again.');
        }
      });
      setRecaptchaVerifier(verifier);
      return verifier;
    }
    return recaptchaVerifier;
  } catch (error) {
    console.error('Error initializing reCAPTCHA:', error);
    setError('Failed to initialize verification. Please try again.');
    throw error;
  }
};



  // Event Handlers
  const handleLogin = async () => {
    const validation = validateLoginForm(loginData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    clearError();
try {
  await loginUser(loginData.email, loginData.password);
  setSuccessMessage("Login successful!");
  // Add this line:
  navigate("/dashboard");
} catch (error) {
  setErrors({ general: error.message });
}
    finally {
      setIsLoading(false);
    }
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleShopInputChange = (e) => {
    const { name, value } = e.target;
    setShopData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBankInputChange = (e) => {
    const { name, value } = e.target;
    setBankData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

 // 4. Add KYC input change handler
const handleKycInputChange = (e) => {
  const { name, value } = e.target;
  
  // Auto-format inputs
  let formattedValue = value;
  if (name === 'panNumber' || name === 'gstinNumber') {
    formattedValue = value.toUpperCase();
  } else if (name === 'aadharNumber') {
    formattedValue = value.replace(/\D/g, ''); // Only allow digits
  }
  
  setKycDetails(prev => ({
    ...prev,
    [name]: formattedValue
  }));
  
  // Clear specific field error when user starts typing
  if (errors[name]) {
    setErrors(prev => ({
      ...prev,
      [name]: ""
    }));
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
      const { exists } = await checkUserExists(registerData.email);
      if (exists) {
        setErrors({ general: "User already exists with this email" });
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

// Update handleKycSubmit in your Registration component
const handleKycSubmit = async () => {
  const validation = validateKycDetails();

  if (!validation.isValid) {
    setErrors(validation.errors);
    return;
  }

  setErrors({});
  clearError();

  // First, move to OTP verification step to render the reCAPTCHA container
  setCurrentStep("otpVerification");
  setOtpData(prev => ({
    ...prev,
    phoneNumber: registerData.contactNumber,
    isOtpSent: false
  }));

  // Then send OTP after a brief delay to ensure DOM is ready
  setTimeout(async () => {
    setIsLoading(true);
    try {
      await sendOtp(registerData.contactNumber);
      
      setOtpData(prev => ({
        ...prev,
        isOtpSent: true,
        timer: 60
      }));
      
      setSuccessMessage(`OTP sent to +91${registerData.contactNumber}`);
      
    } catch (error) {
      setErrors({ general: error.message });
      // Go back to KYC step if OTP sending fails
      setCurrentStep("kyc");
    } finally {
      setIsLoading(false);
    }
  }, 500); // 500ms delay to ensure DOM is ready
};


  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
    // Implement Google Sign-In if needed
  };

  const navigateToRegister = () => {
    setCurrentStep("register");
    setErrors({});
    clearError();
  };

  const navigateToLogin = () => {
    setCurrentStep("login");
    setErrors({});
    clearError();
    setLoginData({ email: "", password: "" });
    setRegisterData({
      username: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
    });
    // setKycFiles({ licenseFront: null, aadharFront: null, aadharBack: null });
  };

  const goBack = () => {
    setErrors({});
    clearError();

    if (currentStep === "register") setCurrentStep("login");
    else if (currentStep === "shopDetails") setCurrentStep("register");
    else if (currentStep === "bankDetails") setCurrentStep("shopDetails");
    else if (currentStep === "kyc") setCurrentStep("bankDetails");
    else if (currentStep === "otpVerification") setCurrentStep("kyc");
  };

  // Send OTP function (you'll need to implement your SMS service)


// Handle OTP input change
const handleOtpChange = (index, value) => {
  if (value.length > 1) return;
  
  const newOtp = [...otpData.otp];
  newOtp[index] = value.replace(/[^0-9]/g, '');
  
  setOtpData(prev => ({ ...prev, otp: newOtp }));
  
  if (value && index < 5) {
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (nextInput) nextInput.focus();
  }
  
  if (errors.otp) {
    setErrors(prev => ({ ...prev, otp: '' }));
  }
};

// Handle OTP submission

const handleOtpSubmit = async () => {
  const otpString = otpData.otp.join('');
  
  if (otpString.length !== 6) {
    setErrors({ otp: 'Please enter complete 6-digit OTP' });
    return;
  }

  setIsLoading(true);
  setErrors({});

  try {
    await verifyOtp(otpString);
    await completeRegistration();
  } catch (error) {
    setErrors({ otp: error.message });
  } finally {
    setIsLoading(false);
  }
};

// Complete registration after OTP verification
const completeRegistration = async () => {
  try {
    const completeUserData = {
      username: registerData.username,
      firstName: registerData.firstName,
      contactNumber: registerData.contactNumber,
      shopDetails: shopData,
      bankDetails: bankData,
      kycDocuments: {
        panNumber: kycDetails.panNumber,
        gstinNumber: kycDetails.gstinNumber,
        aadharNumber: kycDetails.aadharNumber,
      },
      phoneVerified: true,
      registrationCompleted: true,
    };

    await registerUser(registerData.email, registerData.password, completeUserData);
    setSuccessMessage("Registration completed successfully!");
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
    
  } catch (error) {
    setErrors({ general: error.message });
  }
};

// Resend OTP
// Update handleResendOtp in your Registration component
const handleResendOtp = async () => {
  if (otpData.resendCount >= 3) {
    setErrors({ otp: 'Maximum resend attempts reached' });
    return;
  }

  if (otpData.timer > 0) {
    setErrors({ otp: `Please wait ${otpData.timer} seconds` });
    return;
  }

  setIsLoading(true);
  setErrors({});

  try {
    // Clear previous reCAPTCHA verifier
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
    
    await sendOtp(registerData.contactNumber);
    setOtpData(prev => ({
      ...prev,
      resendCount: prev.resendCount + 1,
      timer: 60,
      otp: ['', '', '', '', '', '']
    }));
    setSuccessMessage('OTP resent successfully');
  } catch (error) {
    setErrors({ otp: error.message });
  } finally {
    setIsLoading(false);
  }
};

const handleOtpKeyDown = (e, index) => {
  if (e.key === 'Backspace' && !otpData.otp[index] && index > 0) {
    const prevInput = document.getElementById(`otp-${index - 1}`);
    if (prevInput) {
      prevInput.focus();
      const newOtp = [...otpData.otp];
      newOtp[index - 1] = '';
      setOtpData(prev => ({ ...prev, otp: newOtp }));
    }
  }
};

  // Form Renderers
  const renderLoginForm = () => (
    <>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={loginData.email}
          onChange={handleLoginInputChange}
          placeholder="Enter your email"
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 ${
            errors.email ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-600 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleLoginInputChange}
          placeholder="Enter your password"
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 ${
            errors.password ? "border-red-300 bg-red-50" : "border-slate-200 bg-slate-50"
          }`}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="w-full cursor-pointer bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            Signing in...
          </div>
        ) : (
          "Sign In"
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
        className="w-full bg-white cursor-pointer hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-xl border border-slate-200 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Sign in with <span className="text-blue-600 font-semibold ">Google</span>
      </button>
    </>
  );

  const renderRegisterForm = () => (
    <>
      <div>
        <label className="block text-sm text-start font-medium text-slate-600 mb-2">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={handleRegisterInputChange}
          placeholder="Enter username"
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
            errors.username ? "border-red-300" : "border-slate-200"
          }`}
        />
        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-start text-slate-600 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={registerData.firstName}
            onChange={handleRegisterInputChange}
            placeholder="First name"
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
            placeholder="10-digit number"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
              errors.contactNumber ? "border-red-300" : "border-slate-200"
            }`}
          />
          {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={handleRegisterInputChange}
          placeholder="Enter your email"
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
            errors.email ? "border-red-300" : "border-slate-200"
          }`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleRegisterInputChange}
            placeholder="Min 6 characters"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
              errors.password ? "border-red-300" : "border-slate-200"
            }`}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterInputChange}
            placeholder="Re-enter password"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 text-slate-700 placeholder-slate-400 bg-slate-50 ${
              errors.confirmPassword ? "border-red-300" : "border-slate-200"
            }`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
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
          placeholder="Account Number"
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
          placeholder="Re-enter Account No"
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
          className="bg-cyan-600 cursor-pointer hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow"
        >
          Next 
        </button>
      </div>
    </>
  );

  const renderKycForm = () => (
  <>
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-700 mb-4">Upload Your Details</p>
      <p className="text-xs text-slate-500 mb-6">
        To complete your vendor verification, please provide the information for the following documents. 
        Ensure all details are clear and match your registered information.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2 text-start">PAN Number</label>
          <input
            type="text"
            name="panNumber"
            value={kycDetails.panNumber}
            onChange={handleKycInputChange}
            placeholder="CBTPT5939C"
            maxLength={10}
            className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
              errors.panNumber ? "border-red-300" : "border-slate-300"
            }`}
          />
          {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2 text-start">GSTIN Number</label>
          <input
            type="text"
            name="gstinNumber"
            value={kycDetails.gstinNumber}
            onChange={handleKycInputChange}
            placeholder="27ABCDE1234F1Z5"
            maxLength={15}
            className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
              errors.gstinNumber ? "border-red-300" : "border-slate-300"
            }`}
          />
          {errors.gstinNumber && <p className="text-red-500 text-xs mt-1">{errors.gstinNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2 text-start">Aadhar Number</label>
          <input
            type="text"
            name="aadharNumber"
            value={kycDetails.aadharNumber}
            onChange={handleKycInputChange}
            placeholder="9806 4765 5643"
            maxLength={12}
            pattern="[0-9]*"
            className={`w-full border-b py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-cyan-500 ${
              errors.aadharNumber ? "border-red-300" : "border-slate-300"
            }`}
          />
          {errors.aadharNumber && <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>}
        </div>
      </div>
    </div>

    <div className="flex justify-center mt-6">
      <button
        onClick={handleKycSubmit}
        disabled={isLoading}
        className="bg-cyan-600 cursor-pointer hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
            Next
          </div>
        ) : (
          "Next "
        )}
      </button>
    </div>
  </>
);

  const getFormTitle = () => {
    switch (currentStep) {
      case "login": return "Log in";
      case "register": return "Register";
      case "shopDetails": return "Shop details";
      case "bankDetails": return "Bank details";
      case "kyc": return "KYC Verification";
       case "otpVerification": return "Verify Phone Number";
      default: return "Log in";
    }
  };

  const getCurrentForm = () => {
    switch (currentStep) {
      case "login": return renderLoginForm();
      case "register": return renderRegisterForm();
      case "shopDetails": return renderShopDetailsForm();
      case "bankDetails": return renderBankDetailsForm();
      case "kyc": return renderKycForm();
      case "otpVerification": return renderOtpForm();
      default: return renderLoginForm();
    }
  };

  const showRegisterLink = () => {
    return currentStep === "login";
  };

  const showLoginLink = () => {
    return currentStep === "register" || currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc" || currentStep === "otpVerification";;
  };

const renderOtpForm = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h3 className="text-lg font-semibold text-slate-800">Phone Verification</h3>
      {!otpData.isOtpSent ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-500 border-t-transparent"></div>
          <p className="text-sm text-slate-600">
            Sending verification code to +91{otpData.phoneNumber}...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Enter the 6-digit code sent to +91{otpData.phoneNumber}
          </p>
          
          <div className="flex justify-center space-x-3">
            {otpData.otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                  errors.otp ? 'border-red-300' : 'border-slate-300'
                }`}
              />
            ))}
          </div>

          {errors.otp && (
            <p className="text-red-500 text-sm text-center">{errors.otp}</p>
          )}

          <div className="text-center">
            {otpData.timer > 0 ? (
              <p className="text-sm text-slate-500">
                Resend in {otpData.timer}s
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                disabled={otpData.resendCount >= 3}
                className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
              >
                Resend Code
              </button>
            )}
          </div>

          <button
            onClick={handleOtpSubmit}
            disabled={isLoading || otpData.otp.join('').length !== 6}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-xl disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify & Complete'}
          </button>
        </div>
      )}
    </div>

    {/* reCAPTCHA container */}
    <div id="recaptcha-container"></div>
  </div>
);

  return (
    <div className="flex w-screen overflow-hidden min-h-screen">
      {/* Left Section - Dynamic Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 sm:px-10 md:px-16 lg:px-20 mb-6 sm:mb-8 ml-0 lg:ml-24">
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
            <div className="text-center space-y-2 pt-3">
              {showRegisterLink() && (
                <p className="text-xs text-slate-500">
                  Don't have an account?
                  <button
                    onClick={navigateToRegister}
                    className="cursor-pointer text-cyan-600 hover:text-cyan-700 font-medium ml-1"
                  >
                    Register
                  </button>
                </p>
              )}

              {showLoginLink() && (
                <p className="text-xs text-slate-500">
                  Already have an account?
                  <button
                    onClick={navigateToLogin}
                    className="text-cyan-600 cursor-pointer hover:text-cyan-700 font-medium ml-1"
                  >
                    Log in
                  </button>
                </p>
              )}

              {(currentStep === "shopDetails" || currentStep === "bankDetails" || currentStep === "kyc") && (
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
        <div className="absolute inset-0 flex items-center justify-center">
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