// src/features/auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../utils/auth";
import toast from "react-hot-toast";
import KwuoLoader from "../../components/KwuoLoader";
import AuthLayout from "../../layout/AuthLayout";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate async signup (you can replace this with real API)
    setTimeout(() => {
      const result = signup(email, password);
      setIsLoading(false);

      if (result.success) {
        toast.success("Sign up successful!");
        navigate("/home");
      } else {
        toast.error(result.message);
      }
    }, 1000); // 1 second delay for demo
  };

  return (
    <AuthLayout
      title="Create your account"
      footerText="Already have an account?"
      footerLink="Log in"
      footerHref="/login"
    >
      {isLoading ? (
        <KwuoLoader size="small" text="Signing you in..." />
      ) : (
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
