// import React, { useState, useRef, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Mock array-based "database"
// const mockUsers = [
//   {
//     id: 1,
//     username: "fletcher",
//     // phone: "08012345678",
//     email: "mmcvanamy0@e-recht24.de",
//     password: "password123",
//     // pin: "123456",
//   },
//   {
//     id: 2,
//     username: "clarice",
//     // phone: "08087654321",
//     email: "charrild1@dion.ne.jp",
//     password: "testpass",
//     // pin: "654321",
//   },
// ];

// // Google Icon SVG component
// const GoogleIcon = () => (
//   <svg
//     width="18"
//     height="18"
//     viewBox="0 0 18 18"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
//       fill="#4285F4"
//     />
//     <path
//       d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
//       fill="#34A853"
//     />
//     <path
//       d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
//       fill="#FBBC05"
//     />
//     <path
//       d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
//       fill="#EA4335"
//     />
//   </svg>
// );

// const Register = () => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [stage, setStage] = useState(1);
//   const [codeSent, setCodeSent] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [codeDigits, setCodeDigits] = useState(Array(6).fill(""));
//   const inputRefs = useRef(Array(6).fill(null));
//   const navigate = useNavigate();

//   // Local state for mock users (so changes persist in-session)
//   const [users, setUsers] = useState([...mockUsers]);

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     phone: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // React Toastify Toaster
//   const showToast = (msg, type = "info") => {
//     if (type === "success") {
//       toast.success(msg, { position: "top-center", theme: "colored" });
//     } else if (type === "error") {
//       toast.error(msg, { position: "top-center", theme: "colored" });
//     } else if (type === "info") {
//       toast.info(msg, { position: "top-center", theme: "colored" });
//     } else {
//       toast(msg, { position: "top-center", theme: "colored" });
//     }
//   };

//   // DUMMY CREATION OF ACCOUNT
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (isLogin) {
//   //     // Login logic: match email/phone and pin
//   //     const user = users.find(
//   //       (u) =>
//   //         (u.email === formData.email || u.username === formData.username) &&
//   //         u.password === formData.password
//   //     );
//   //     if (user) {
//   //       showToast("Login successful!", "success");

//   //       // Add your post-login logic here
//   //       navigate("/home");
//   //     } else {
//   //       showToast("Invalid credentials. Please try again.", "error");
//   //     }
//   //   } else {
//   //     if (stage === 2) {
//   //       // Registration logic: check for duplicates
//   //       const exists = users.some(
//   //         (u) =>
//   //           u.username === formData.username ||
//   //           // u.phone === formData.phone ||
//   //           u.email === formData.email
//   //       );
//   //       if (exists) {
//   //         showToast(
//   //           "User already exists with this username, phone, or email.",
//   //           "error"
//   //         );
//   //         return;
//   //       }
//   //       if (formData.password !== formData.confirmPassword) {
//   //         showToast("Passwords do not match.", "error");
//   //         return;
//   //       }
//   //       // Add new user to mock "database"

//   //       const newUser = {
//   //         id: users.length + 1,
//   //         username: formData.username,
//   //         email: formData.email,
//   //         password: formData.password,
//   //       };

//   //       setUsers([...users, newUser]);
//   //       showToast("Account created successfully!", "success");

//   //       // Reset form
//   //       setIsLogin(true);
//   //       setStage(1);
//   //       // setCodeSent(
//   //       setFormData({
//   //         username: "",
//   //         email: "",
//   //         password: "",
//   //         confirmPassword: "",
//   //       });
//   //       // );
//   //     }
//   //     showToast("Account created successfully!", "success");
//   //     navigate("/home");
//   //   }
//   // };

//   // REAL MANAGEMENT OF ACCOUTN

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // console.log(formData);
//     setLoading(true);

//     try {
//       if (isLogin) {
//         // console.log("login create acount clicked");
//         // Login logic
//         const response = await axios.post(
//           "https://kwuo.onrender.com/api/auth/login",
//           {
//             // email: formData.email,
//             password: formData.password,
//             phone: formData.phone,
//           }
//         );

//         if (response.status === 200) {
//           showToast("Login successful!", "success");
//           navigate("/home");
//         }
//       } else {
//         if (stage === 2) {
//           // Registration logic
//           if (formData.password !== formData.confirmPassword) {
//             showToast("Passwords do not match.", "error");
//             return;
//           }

//           const response = await axios.post(
//             "https://kwuo.onrender.com/api/auth/register",
//             {
//               email: formData.email,
//               password: formData.password,
//               phone: formData.phone,
//             }
//           );

//           if (response.status === 201 || response.status === 200) {
//             showToast(
//               "Account created successfully, proceed to login!",
//               "success"
//             );
//             setIsLogin(true);
//             setStage(1);
//             setFormData({
//               username: "",
//               email: "",
//               password: "",
//               confirmPassword: "",
//             });
//             navigate("/home");
//           }
//         }
//       }
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         showToast(error.response.data.message, "error");
//       } else {
//         showToast("Something went wrong. Please try again.", "error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startCountdown = () => {
//     let seconds = 30;
//     setCountdown(seconds);
//     const interval = setInterval(() => {
//       seconds -= 1;
//       setCountdown(seconds);
//       if (seconds === 0) clearInterval(interval);
//     }, 1000);
//   };

//   // const handleSendCode = () => {
//   //   setCodeSent(true);
//   //   startCountdown();
//   //   showToast("Verification code sent (mocked: 123456)", "info");
//   //   // In a real app, you'd send a code here
//   // };

//   // const handleCodeChange = (e, index) => {
//   //   const value = e.target.value.replace(/\D/g, "");
//   //   const newDigits = [...codeDigits];
//   //   newDigits[index] = value;
//   //   setCodeDigits(newDigits);

//   //   if (value && index < 5) inputRefs.current[index + 1].focus();
//   //   if (index === 5 && value) handleVerifyCode(newDigits.join(""));
//   // };

//   // const handleVerifyCode = (code) => {
//   //   // For mock, accept only "123456"
//   //   if (code === "123456") {
//   //     setFormData((prev) => ({ ...prev, pin: code }));
//   //     setStage(2);
//   //     showToast("Code verified!", "success");
//   //   } else {
//   //     showToast("Invalid verification code.", "error");
//   //     setCodeDigits(Array(6).fill(""));
//   //   }
//   // };

//   const toggleRef = useRef(null);

//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//     setStage(1);
//     // setCodeSent(false);
//     setFormData({
//       username: "",
//       email: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">
//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//       <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden">
//         <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-50 animate-pulse"></div>
//         <div
//           className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-100 rounded-full opacity-50 animate-pulse"
//           style={{ animationDuration: "6s" }}
//         ></div>

//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center space-x-2">
//             <span className="text-3xl font-bold text-green-700">
//               Kwuo<span className="text-green-500">🌿</span>
//             </span>
//           </div>
//           <div
//             ref={toggleRef}
//             className="bg-green-50 rounded-full p-1 flex items-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 select-none"
//             onClick={toggleAuthMode}
//             role="switch"
//             aria-checked={isLogin}
//             tabIndex={0}
//           >
//             <div className="relative flex">
//               <div
//                 className={`absolute h-full rounded-full bg-green-600 transition-all duration-300 ${
//                   isLogin ? "w-1/2 translate-x-full" : "w-1/2 translate-x-0"
//                 }`}
//               ></div>
//               <div
//                 className={`py-2 px-4 rounded-full cursor-pointer text-sm font-medium z-10 transition-colors duration-300 min-w-16 text-center ${
//                   !isLogin ? "text-white" : "text-green-700"
//                 }`}
//               >
//                 Sign Up
//               </div>
//               <div
//                 className={`py-2 px-4 rounded-full cursor-pointer text-sm font-medium z-10 transition-colors duration-300 min-w-16 text-center ${
//                   isLogin ? "text-white" : "text-green-700"
//                 }`}
//               >
//                 Log In
//               </div>
//             </div>
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold text-green-800 mb-2">
//           {isLogin ? "Welcome Back!" : "Create Your Account"}
//         </h2>
//         <p className="text-green-600 mb-6 text-sm">
//           {isLogin
//             ? "Sign in to continue your journey"
//             : "Join Kwuo today and get started"}
//         </p>

//         <button
//           onClick={() => {
//             showToast("Google sign in (mocked)", "info");
//             navigate("/home");
//           }}
//           className="w-full bg-white text-gray-700 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition shadow-md flex items-center justify-center space-x-3"
//         >
//           <GoogleIcon />
//           <span className="font-medium cursor-pointer">
//             Continue with Google
//           </span>
//         </button>

//         <div className="flex items-center my-6">
//           <div className="flex-grow border-t border-green-200"></div>
//           <span className="flex-shrink mx-4 text-green-600 text-sm">or</span>
//           <div className="flex-grow border-t border-green-200"></div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* signup section */}
//           {!isLogin && (
//             // <>
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-green-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 pl-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/50"
//                 placeholder="Enter email Address"
//               />
//             </div>
//           )}
//           {stage === 1 && (
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-green-700">
//                 Phone Number
//               </label>
//               <div className="flex gap-2">
//                 <input
//                   type="tel"
//                   name="phone"
//                   required
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="w-full p-3 pl-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/50"
//                   placeholder="e.g. 08012345678"
//                 />
//               </div>
//             </div>
//           )}
//           {/* {!isLogin && codeSent && stage === 1 && (
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-green-700">
//                 Verification Code
//               </label>
//               <div className="flex gap-2">
//                 {codeDigits.map((digit, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     inputMode="numeric"
//                     maxLength="1"
//                     value={digit}
//                     onChange={(e) => handleCodeChange(e, index)}
//                     className="w-12 p-3 text-center border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/50"
//                     ref={(el) => (inputRefs.current[index] = el)}
//                   />
//                 ))}
//               </div>
//             </div>
//           )} */}

//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-green-700">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               required
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full p-3 pl-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/50"
//               placeholder="Enter your password"
//             />
//           </div>
//           <div className="space-y-1">
//             <label className="block text-sm font-medium text-green-700">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               name="confirmPassword"
//               required
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="w-full p-3 pl-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/50"
//               placeholder="Confirm your password"
//             />
//           </div>

//           {/* Login Section */}
//           {isLogin && (
//             <>
//               <div className="space-y-1">
//                 <label className="block text-sm font-medium text-green-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full p-3 pl-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/50"
//                   placeholder="Enter email"
//                 />
//               </div>
//               <div className="space-y-1">
//                 <div className="flex justify-between items-center">
//                   <label className="block text-sm font-medium text-green-700">
//                     Password
//                   </label>
//                 </div>
//                 <input
//                   type="password"
//                   name="password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full p-3 pl-4 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent bg-green-50/50"
//                   placeholder="Enter your password"
//                   maxLength={6}
//                 />
//                 <button
//                   type="button"
//                   // onClick={} handles forgotten password here
//                   className="text-sm mt-3 text-green-600 hover:text-green-800"
//                 >
//                   Forgotten Password ?
//                 </button>
//               </div>
//             </>
//           )}
//           <button
//             type="submit"
//             disabled={loading}
//             // className="..."
//             className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center justify-center space-x-2 mt-8"
//           >
//             <span className="font-medium">
//               {/* {isLogin ? "Log In" : "Create Account"} */}
//               {loading
//                 ? "Processing..."
//                 : isLogin
//                 ? "Log In"
//                 : "Create Account"}
//             </span>
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-green-700 text-sm">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <button
//               type="button"
//               onClick={toggleAuthMode}
//               className="text-green-600 font-medium hover:text-green-800 ml-1"
//             >
//               {isLogin ? "Sign Up" : "Log In"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Register;

///=============================================================================

import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Google Icon SVG component
const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </svg>
);

const Register = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Toast helper
  const showToast = (msg, type = "info") => {
    if (type === "success") {
      toast.success(msg, { position: "top-center", theme: "colored" });
    } else if (type === "error") {
      toast.error(msg, { position: "top-center", theme: "colored" });
    } else {
      toast.info(msg, { position: "top-center", theme: "colored" });
    }
  };

  // Form input handler
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        // Login API call
        const response = await axios.post(
          "https://kwuo.onrender.com/api/auth/login",
          {
            phone: formData.phone,
            password: formData.password,
          }
        );
        if (response.status === 200) {
          showToast("Login successful!", "success");
          navigate("/home");
        }
      } else {
        // Register API call
        const response = await axios.post(
          "https://kwuo.onrender.com/api/auth/register",
          {
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          }
        );
        if (response.status === 201 || response.status === 200) {
          showToast("Account created successfully! Please log in.", "success");
          setIsLogin(true);
          setFormData({
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });
        }
      }
    } catch (error) {
      if (error.response?.data?.message) {
        showToast(error.response.data.message, "error");
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="colored"
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden">
        {/* Background shapes */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-50 animate-pulse"></div>
        <div
          className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-100 rounded-full opacity-50 animate-pulse"
          style={{ animationDuration: "6s" }}
        ></div>
        {/* Header with toggle */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-green-700">
            Kwuo<span className="text-green-500">🌿</span>
          </h1>
          <div
            className="bg-green-50 rounded-full p-1 flex items-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 select-none"
            onClick={toggleAuthMode}
            role="switch"
            aria-checked={isLogin}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && toggleAuthMode()}
          >
            <div className="relative flex">
              <div
                className={`absolute h-full rounded-full bg-green-600 transition-all duration-300 ${
                  isLogin ? "w-1/2 translate-x-full" : "w-1/2 translate-x-0"
                }`}
              />
              <div
                className={`py-2 px-6 rounded-full cursor-pointer text-sm font-medium z-10 transition-colors duration-300 min-w-16 text-center ${
                  !isLogin ? "text-white" : "text-green-700"
                }`}
              >
                Sign Up
              </div>
              <div
                className={`py-2 px-6 rounded-full cursor-pointer text-sm font-medium z-10 transition-colors duration-300 min-w-16 text-center ${
                  isLogin ? "text-white" : "text-green-700"
                }`}
              >
                Log In
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          {isLogin ? "Welcome Back!" : "Create Your Account"}
        </h2>
        <p className="text-green-600 mb-6 text-sm">
          {isLogin
            ? "Sign in to continue your journey"
            : "Join Kwuo today and get started"}
        </p>
        <button
          onClick={() => {
            showToast("Google sign in (mocked)", "info");
            navigate("/home");
          }}
          className="w-full bg-white text-gray-700 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition shadow-md flex items-center justify-center space-x-3"
        >
          <GoogleIcon />
          <span className="font-medium cursor-pointer">
            Continue with Google
          </span>
        </button>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-green-200"></div>
          <span className="flex-shrink mx-4 text-green-600 text-sm">or</span>
          <div className="flex-grow border-t border-green-200"></div>
        </div>
        {/* /Form //{" "} */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              autoComplete="username"
            />
          )}
          {!isLogin && (
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              autoComplete="email"
            />
          )}
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            autoComplete="tel"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          {!isLogin && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              autoComplete="new-password"
            />
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } transition-colors duration-300`}
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Registering..."
              : isLogin
              ? "Log In"
              : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-green-700">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="font-semibold underline cursor-pointer"
                type="button"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleAuthMode}
                className="font-semibold underline cursor-pointer"
                type="button"
              >
                Log In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Register;
