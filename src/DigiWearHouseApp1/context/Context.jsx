// // src/context/AppContext.jsx
// import React, { createContext, useContext, useEffect, useState } from 'react';

// // ✅ Create a single Context
// const AppContext = createContext();

// export const useApp = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useApp must be used within an AppProvider');
//   }
//   return context;
// };

// export const AppProvider = ({ children }) => {
//   /** -----------------------
//    * Product State
//    ------------------------ */
//   const [productData, setProductData] = useState({
//     title: '',
//     description: '',
//     productType: 'Ready to Wear',
//     chooseType: '',
//     dressType: '',
//     materialType: '',
//     designType: '',
//     price: '',
//     selectedSizes: ['XS'],
//     selectedColors: [],
//     units: {
//       S: 22,
//       M: 22,
//       L: 22,
//     },
//     images: [],
//   });

//   const updateProductData = (data) => {
//     setProductData((prev) => ({
//       ...prev,
//       ...data,
//     }));
//   };

//   /** -----------------------
//    * Auth State (mocked)
//    ------------------------ */
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(false); // start as false since no external service
//   const [error, setError] = useState(null);

//   // Mock: emulate auth state change
//   useEffect(() => {
//     // In real app: fetch current user from storage / API
//     setLoading(true);
//     const timer = setTimeout(() => {
//       setCurrentUser(null); // not logged in initially
//       setUserData(null);
//       setLoading(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   /** -----------------------
//    * Mock Auth Functions
//    ------------------------ */
//   const sendRegistrationOTP = async (phoneNumber) => {
//     console.log("Mock sendRegistrationOTP:", phoneNumber);
//     return true;
//   };

//   const sendLoginOTP = async (emailOrPhone) => {
//     console.log("Mock sendLoginOTP:", emailOrPhone);
//     return true;
//   };

//   const verifyRegistrationOTP = async (otp, data) => {
//     console.log("Mock verifyRegistrationOTP:", otp, data);
//     setCurrentUser({ id: "user123", phone: data?.phone || "0000000000" });
//     setUserData({ name: data?.name || "New User" });
//     return true;
//   };

//   const verifyLoginOTP = async (otp) => {
//     console.log("Mock verifyLoginOTP:", otp);
//     setCurrentUser({ id: "user123", email: "test@example.com" });
//     setUserData({ name: "Demo User" });
//     return true;
//   };

//   const checkUserExists = async (emailOrPhone) => {
//     console.log("Mock checkUserExists:", emailOrPhone);
//     return { exists: emailOrPhone === "test@example.com" };
//   };

//   const signOut = async () => {
//     console.log("Mock signOut");
//     setCurrentUser(null);
//     setUserData(null);
//     return true;
//   };

//   /** -----------------------
//    * Context Value
//    ------------------------ */
//   const value = {
//     /** Auth */
//     currentUser,
//     userData,
//     loading,
//     error,
//     setError,
//     clearError: () => setError(null),

//     sendRegistrationOTP,
//     sendLoginOTP,
//     verifyRegistrationOTP,
//     verifyLoginOTP,
//     checkUserExists,
//     signOut,
//     updateUserData: (newData) => setUserData((prev) => ({ ...prev, ...newData })),

//     /** Product */
//     productData,
//     updateProductData,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// import React from "react";
// import { createContext, useContext, useState, useEffect } from "react";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "../../../firebaseConfig"; // Adjust path if needed

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const auth = getAuth();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       setCurrentUser(user);
//       if (user) {
//         const userDoc = await getDoc(doc(db, "digiwebRegister", user.uid));
//         if (userDoc.exists()) {
//           setUserData(userDoc.data());
//         }
//       } else {
//         setUserData(null);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   const clearError = () => setError(null);

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//       size: "invisible",
//       callback: () => {},
//     });
//   };

//   const sendOTP = async (phone) => {
//     if (!window.recaptchaVerifier) {
//       setupRecaptcha();
//     }
//     const appVerifier = window.recaptchaVerifier;
//     const phoneNumber = phone.startsWith("+") ? phone : `+91${phone}`; // Assume India; adjust country code
//     return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//   };

//   const verifyOTP = async (confirmationResult, code) => {
//     return confirmationResult.confirm(code);
//   };

//   const checkUserExists = async (identifier) => {
//     const normalizedPhone = identifier.replace(/\D/g, ""); // Assume identifier is phone
//     const phoneDoc = await getDoc(doc(db, "phones", normalizedPhone));
//     return { exists: phoneDoc.exists() };
//   };

//   const sendLoginOTP = async (phone) => {
//     window.confirmationResult = await sendOTP(phone); // Store for verify
//   };

//   const verifyLoginOTP = async (code) => {
//     await verifyOTP(window.confirmationResult, code);
//     // User is signed in; useEffect will handle
//   };

//   const sendRegistrationOTP = async (phone) => {
//     window.confirmationResult = await sendOTP(phone);
//   };

//   const verifyRegistrationOTP = async (code, completeUserData) => {
//     const credential = await verifyOTP(window.confirmationResult, code);
//     const user = credential.user;
//     // Store in digiwebRegister collection
//     await setDoc(doc(db, "digiwebRegister", user.uid), completeUserData);
//     // Store phone mapping
//     const normalizedPhone = completeUserData.contactNumber.replace(/\D/g, "");
//     await setDoc(doc(db, "phones", normalizedPhone), { uid: user.uid });
//   };

//   const signOut = () => auth.signOut();

//   return (
//     <AppContext.Provider
//       value={{
//         currentUser,
//         userData,
//         sendRegistrationOTP,
//         sendLoginOTP,
//         verifyRegistrationOTP,
//         verifyLoginOTP,
//         checkUserExists,
//         signOut,
//         clearError,
//         error: error, // Renamed authError to error
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => useContext(AppContext);
// import React from "react";
// import { createContext, useContext, useState, useEffect } from "react";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db, storage } from "../../../firebaseConfig"; // Adjust path if needed

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const auth = getAuth();
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       setCurrentUser(user);
//       if (user) {
//         const userDoc = await getDoc(doc(db, "vendor_registrations", user.uid));
//         if (userDoc.exists()) {
//           setUserData(userDoc.data());
//         }
//       } else {
//         setUserData(null);
//       }
//     });
//     return unsubscribe;
//   }, []);

//   const clearError = () => setError(null);

//   const setupRecaptcha = () => {
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
//       size: "invisible",
//       callback: () => {},
//     });
//   };

//   const sendOTP = async (phone) => {
//     console.log("Sending OTP to:", phone);
//     if (!window.recaptchaVerifier) {
//       setupRecaptcha();
//     }
//     const appVerifier = window.recaptchaVerifier;
//     const phoneNumber = phone.startsWith("+") ? phone : `+91${phone}`; // Assume India; adjust country code
//     return signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//   };

//   const verifyOTP = async (confirmationResult, code) => {
//     return confirmationResult.confirm(code);
//   };

//   const checkUserExists = async (identifier) => {
//     const normalizedPhone = identifier.replace(/\D/g, "");
//     const phoneDoc = await getDoc(doc(db, "phones", normalizedPhone));
//     return { exists: phoneDoc.exists() };
//   };

//   const uploadKycFile = async (file, userId, fileName) => {
//     if (!file) throw new Error(`No ${fileName} file selected`);
    
//     const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
//     if (!allowedTypes.includes(file.type)) {
//       throw new Error(`${fileName} must be a PNG or JPEG image`);
//     }
    
//     if (file.size > 5 * 1024 * 1024) { // 5MB limit
//       throw new Error(`${fileName} must be less than 5MB`);
//     }

//     const storageRef = ref(storage, `kyc/${userId}/${fileName}`);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     return new Promise((resolve, reject) => {
//       uploadTask.on(
//         "state_changed",
//         null,
//         (error) => reject(error),
//         async () => {
//           const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//           resolve(downloadURL);
//         }
//       );
//     });
//   };

//   const sendLoginOTP = async (phone) => {
//     window.confirmationResult = await sendOTP(phone);
//   };

//   const verifyLoginOTP = async (code) => {
//     await verifyOTP(window.confirmationResult, code);
//     // User is signed in; useEffect will handle
//   };

//   const sendRegistrationOTP = async (phone) => {
//     window.confirmationResult = await sendOTP(phone);
//   };

//   const verifyRegistrationOTP = async (code, completeUserData) => {
//     const credential = await verifyOTP(window.confirmationResult, code);
//     const user = credential.user;
//     // Store in vendor_registrations collection with merge
//     await setDoc(doc(db, "vendor_registrations", user.uid), completeUserData, { merge: true });
//     // Store phone mapping
//     const normalizedPhone = completeUserData.contactNumber.replace(/\D/g, "");
//     await setDoc(doc(db, "phones", normalizedPhone), { uid: user.uid });
//   };

//   const signOut = () => auth.signOut();

//   return (
//     <AppContext.Provider
//       value={{
//         currentUser,
//         userData,
//         sendRegistrationOTP,
//         sendLoginOTP,
//         verifyRegistrationOTP,
//         verifyLoginOTP,
//         checkUserExists,
//         uploadKycFile,
//         signOut,
//         clearError,
//         error,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => useContext(AppContext);








































import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../firebaseConfig"; // Adjust path if needed

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
const [productData, setProductData] = useState({
    title: '',
    description: '',
    productType: 'Ready to Wear',
    chooseType: '',
    dressType: '',
    materialType: '',
    designType: '',
    price: '',
    selectedSizes: ['XS'],
    selectedColors: [],
    units: {
      S: 22,
      M: 22,
      L: 22,
    },
    images: [],
  });
  const updateProductData = (data) => {
    setProductData((prev) => ({
      ...prev,
      ...data,
    }));
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "vendor_registrations", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }
    });
    return unsubscribe;
  }, []);

  const clearError = () => setError(null);

  const setupRecaptcha = () => {
    try {
      // Ensure recaptcha-container exists in the DOM
      if (!document.getElementById("recaptcha-container")) {
        throw new Error("reCAPTCHA container not found in DOM");
      }
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          console.log("reCAPTCHA verified successfully");
        },
        "expired-callback": () => {
          setError("reCAPTCHA expired. Please try again.");
        },
        "error-callback": (error) => {
          setError(`reCAPTCHA error: ${error.message}`);
        },
      });
      window.recaptchaVerifier.render().catch((error) => {
        setError(`Failed to render reCAPTCHA: ${error.message}`);
      });
    } catch (error) {
      setError(`reCAPTCHA setup failed: ${error.message}`);
    }
  };

  const sendOTP = async (phone) => {
    console.log("Sending OTP to:", phone);
    // Validate phone number
    const normalizedPhone = phone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(normalizedPhone)) {
      throw new Error("Invalid phone number. Must be 10 digits.");
    }
    const phoneNumber = `+91${normalizedPhone}`; // Assume India; adjust country code

    if (!window.recaptchaVerifier) {
      setupRecaptcha();
    }
    const appVerifier = window.recaptchaVerifier;
    
    try {
      // Ensure reCAPTCHA is loaded
      await appVerifier.verify();
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      console.log("OTP sent successfully");
      return result;
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error.code === "auth/invalid-phone-number") {
        throw new Error("Invalid phone number format. Please enter a valid 10-digit number.");
      } else if (error.code === "auth/too-many-requests") {
        throw new Error("Too many attempts. Please wait a few minutes and try again.");
      } else if (error.code === "auth/missing-app-credential") {
        throw new Error("reCAPTCHA verification failed. Please try again.");
      } else {
        throw new Error(`Failed to send OTP: ${error.message}`);
      }
    }
  };

  const verifyOTP = async (confirmationResult, code) => {
    try {
      return await confirmationResult.confirm(code);
    } catch (error) {
      if (error.code === "auth/invalid-verification-code") {
        throw new Error("Invalid OTP. Please try again.");
      } else {
        throw new Error(`Failed to verify OTP: ${error.message}`);
      }
    }
  };

  const checkUserExists = async (identifier) => {
    const normalizedPhone = identifier.replace(/\D/g, "");
    if (!/^\d{10}$/.test(normalizedPhone)) {
      throw new Error("Invalid phone number for user check.");
    }
    const phoneDoc = await getDoc(doc(db, "phones", normalizedPhone));
    return { exists: phoneDoc.exists() };
  };

  const uploadKycFile = async (file, userId, fileName) => {
    if (!file) throw new Error(`No ${fileName} file selected`);
    
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`${fileName} must be a PNG or JPEG image`);
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      throw new Error(`${fileName} must be less than 5MB`);
    }

    const storageRef = ref(storage, `kyc/${userId}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const sendLoginOTP = async (phone) => {
    window.confirmationResult = await sendOTP(phone);
  };

  const verifyLoginOTP = async (code) => {
    await verifyOTP(window.confirmationResult, code);
    // User is signed in; useEffect will handle
  };

  const sendRegistrationOTP = async (phone) => {
    window.confirmationResult = await sendOTP(phone);
  };

  const verifyRegistrationOTP = async (code, completeUserData) => {
    const credential = await verifyOTP(window.confirmationResult, code);
    const user = credential.user;
    // Store in vendor_registrations collection with merge
    await setDoc(doc(db, "vendor_registrations", user.uid), completeUserData, { merge: true });
    // Store phone mapping
    const normalizedPhone = completeUserData.contactNumber.replace(/\D/g, "");
    await setDoc(doc(db, "phones", normalizedPhone), { uid: user.uid });
  };

  const signOut = () => auth.signOut();

  return (
    <AppContext.Provider
      value={{
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
        error,
        setError,
        // Add product data to context value
        productData,
        updateProductData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);