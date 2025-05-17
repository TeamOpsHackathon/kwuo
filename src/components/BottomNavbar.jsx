import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react"; // ✅ Import Lucide icons

const BottomNavbar = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleAddPost = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file for post:", file);
      navigate("/create-post", { state: { file } });
    }
  };

  const iconClass = "w-6 h-6";

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 z-50 shadow-sm"
    >
      <button onClick={() => navigate("/home")}>
        <Home className={iconClass} />
      </button>
      <button onClick={() => navigate("/search")}>
        <Search className={iconClass} />
      </button>
      <button onClick={handleAddPost}>
        <PlusCircle className={`${iconClass} text-green-600`} />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button onClick={() => navigate("/notifications")}>
        <Bell className={iconClass} />
      </button>
      <button onClick={() => navigate("/profile")}>
        <User className={iconClass} />
      </button>
    </motion.div>
  );
};

export default BottomNavbar;
