import React, { useState } from "react";
import { motion } from "framer-motion";

const TopTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("feed");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab); // Notify parent if callback exists
  };

  return (
    <motion.div
      className="flex justify-around items-center py-4 border-b"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <button
        onClick={() => handleTabClick("your-post")}
        className={`font-semibold ${
          activeTab === "your-post"
            ? "text-green-700 font-bold border-b-2 border-green-700 pb-1"
            : "text-gray-400"
        }`}
      >
        Your Post
      </button>
      <button
        onClick={() => handleTabClick("feed")}
        className={`font-semibold ${
          activeTab === "feed"
            ? "text-green-700 font-bold border-b-2 border-green-700 pb-1"
            : "text-gray-400"
        }`}
      >
        Feed
      </button>
    </motion.div>
  );
};

export default TopTabs;
