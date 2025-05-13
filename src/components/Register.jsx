import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    phone: "",
    username: "",
    pin: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add backend connection or validation here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
          Welcome to Kwuo🌿
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              pattern="[0-9]{10,15}"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 08012345678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">
              6-digit PIN
            </label>
            <input
              type="password"
              name="pin"
              pattern="\d{6}"
              maxLength="6"
              required
              value={formData.pin}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500"
              placeholder="Enter a 6-digit PIN"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
