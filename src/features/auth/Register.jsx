// import React, { useState, useRef } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [isLogin, setIsLogin] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//   });

//   // Toast helper
//   const showToast = (msg, type = "info") => {
//     if (type === "success") {
//       toast.success(msg, { position: "top-center", theme: "colored" });
//     } else if (type === "error") {
//       toast.error(msg, { position: "top-center", theme: "colored" });
//     } else {
//       toast.info(msg, { position: "top-center", theme: "colored" });
//     }
//   };

//   // Form input handler
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isLogin && formData.password !== formData.confirmPassword) {
//       showToast("Passwords do not match.", "error");
//       return;
//     }

//     setLoading(true);

//     try {
//       if (isLogin) {
//         // Login API call
//         const response = await axios.post(
//           "https://kwuo.onrender.com/api/auth/login",
//           {
//             phone: formData.phone,
//             password: formData.password,
//           }
//         );
//         if (response.status === 200) {
//           showToast("Login successful!", "success");
//           navigate("/home");
//         }
//       } else {
//         // Register API call
//         const response = await axios.post(
//           "https://kwuo.onrender.com/api/auth/register",
//           {
//             email: formData.email,
//             phone: formData.phone,
//             password: formData.password,
//           }
//         );
//         if (response.status === 201 || response.status === 200) {
//           showToast("Account created successfully! Please log in.", "success");
//           setIsLogin(true);
//           setFormData({
//             username: "",
//             email: "",
//             phone: "",
//             password: "",
//             confirmPassword: "",
//           });
//         }
//       }
//     } catch (error) {
//       if (error.response?.data?.message) {
//         showToast(error.response.data.message, "error");
//       } else {
//         showToast("Something went wrong. Please try again.", "error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleAuthMode = () => {
//     setIsLogin((prev) => !prev);
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
//         theme="colored"
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//       />
//       <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md relative overflow-hidden">
//         {/* Background shapes */}
//         <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-50 animate-pulse"></div>
//         <div
//           className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-100 rounded-full opacity-50 animate-pulse"
//           style={{ animationDuration: "6s" }}
//         ></div>

//         {/* Header with toggle */}
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold text-green-700">
//             Kwuo<span className="text-green-500">🌿</span>
//           </h1>
//           <div
//             className="bg-green-50 rounded-full p-1 flex items-center cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 select-none"
//             onClick={toggleAuthMode}
//             role="switch"
//             aria-checked={isLogin}
//             tabIndex={0}
//             onKeyDown={(e) => e.key === "Enter" && toggleAuthMode()}
//           >
//             <div className="relative flex">
//               <div
//                 className={`absolute h-full rounded-full bg-green-600 transition-all duration-300 ${
//                   isLogin ? "w-1/2 translate-x-full" : "w-1/2 translate-x-0"
//                 }`}
//               />
//               <div
//                 className={`py-2 px-6 rounded-full cursor-pointer text-sm font-medium z-10 transition-colors duration-300 min-w-16 text-center ${
//                   !isLogin ? "text-white" : "text-green-700"
//                 }`}
//               >
//                 Sign Up
//               </div>
//               <div
//                 className={`py-2 px-6 rounded-full cursor-pointer text-sm font-medium z-10 transition-colors duration-300 min-w-16 text-center ${
//                   isLogin ? "text-white" : "text-green-700"
//                 }`}
//               >
//                 Log In
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {!isLogin && (
//             <input
//               name="username"
//               type="text"
//               placeholder="Username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//               autoComplete="username"
//             />
//           )}

//           {!isLogin && (
//             <input
//               name="email"
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//               autoComplete="email"
//             />
//           )}

//           <input
//             name="phone"
//             type="tel"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//             autoComplete="tel"
//           />

//           <input
//             name="password"
//             type="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             minLength={6}
//             className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//             autoComplete={isLogin ? "current-password" : "new-password"}
//           />

//           {!isLogin && (
//             <input
//               name="confirmPassword"
//               type="password"
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               required
//               minLength={6}
//               className="w-full px-4 py-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//               autoComplete="new-password"
//             />
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded-lg text-white font-semibold ${
//               loading
//                 ? "bg-green-300 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             } transition-colors duration-300`}
//           >
//             {loading
//               ? isLogin
//                 ? "Logging in..."
//                 : "Registering..."
//               : isLogin
//               ? "Log In"
//               : "Sign Up"}
//           </button>
//         </form>

//         <p className="mt-4 text-center text-sm text-green-700">
//           {isLogin ? (
//             <>
//               Don't have an account?{" "}
//               <button
//                 onClick={toggleAuthMode}
//                 className="font-semibold underline cursor-pointer"
//                 type="button"
//               >
//                 Sign Up
//               </button>
//             </>
//           ) : (
//             <>
//               Already have an account?{" "}
//               <button
//                 onClick={toggleAuthMode}
//                 className="font-semibold underline cursor-pointer"
//                 type="button"
//               >
//                 Log In
//               </button>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

// /=============================================================================

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
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!isLogin && formData.password !== formData.confirmPassword) {
  //     showToast("Passwords do not match.", "error");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     if (isLogin) {
  //       // Login API call
  //       const response = await axios.post(
  //         "https://kwuo.onrender.com/api/auth/login",
  //         {
  //           phone: formData.phone,
  //           password: formData.password,
  //         }
  //       );
  //       if (response.status === 200) {
  //         showToast("Login successful!", "success");
  //         navigate("/home");
  //       }
  //     } else {
  //       // Register API call
  //       const response = await axios.post(
  //         "https://kwuo.onrender.com/api/auth/register",
  //         {
  //           email: formData.email,
  //           phone: formData.phone,
  //           password: formData.password,
  //         }
  //       );
  //       if (response.status === 201 || response.status === 200) {
  //         showToast("Account created successfully! Please log in.", "success");
  //         setIsLogin(true);
  //         setFormData({
  //           username: "",
  //           email: "",
  //           phone: "",
  //           password: "",
  //           confirmPassword: "",
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     if (error.response?.data?.message) {
  //       showToast(error.response.data.message, "error");
  //     } else {
  //       showToast("Something went wrong. Please try again.", "error");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
        <div>
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
        </div>
        {/* Form */}
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
