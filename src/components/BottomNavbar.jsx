import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react"; // ✅ Import Lucide icons

import CreatePostModal from "../post/CreatePostModal";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

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
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        <PlusCircle className={`${iconClass} `} />

        {showModal && (
          <CreatePostModal closeModal={() => setShowModal(false)} />
        )}
      </button>

      <button onClick={() => navigate("/notifications")}>
        <Bell className={iconClass} />
      </button>
      <button onClick={() => navigate("/dashboard")}>
        <User className={iconClass} />
      </button>
    </motion.div>
  );
};

export default BottomNavbar;
