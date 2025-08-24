// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from 'react';


// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const unsubscribe = AuthService.onAuthStateChanged(async (user) => {
//       try {
//         if (user) {
//           setCurrentUser(user);
//           // Fetch user data from database
//           const data = await getUserByUID(user.uid);
//           setUserData(data);
//         } else {
//           setCurrentUser(null);
//           setUserData(null);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     });

//     return unsubscribe;
//   }, []);

//   const value = {
//     currentUser,
//     userData,
//     loading,
//     error,
//     setError,
//     clearError: () => setError(null),
    
//     // Auth methods
//     sendRegistrationOTP: (phoneNumber) => AuthService.sendRegistrationOTP(phoneNumber),
//     sendLoginOTP: (emailOrPhone) => AuthService.sendLoginOTP(emailOrPhone),
//     verifyRegistrationOTP: (otp, userData) => AuthService.verifyRegistrationOTP(otp, userData),
//     verifyLoginOTP: (otp) => AuthService.verifyLoginOTP(otp),
//     checkUserExists: (emailOrPhone) => AuthService.checkUserExists(emailOrPhone),
//     signOut: () => AuthService.signOut(),
    
//     // Update user data locally
//     updateUserData: (newData) => setUserData(prev => ({ ...prev, ...newData }))
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

