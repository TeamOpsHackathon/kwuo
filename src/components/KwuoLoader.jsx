import React from "react";
import { motion } from "framer-motion";

const KwuoLoader = ({ size = "medium", text = "Loading..." }) => {
  // Size configurations
  const sizeConfig = {
    small: {
      container: "w-12 h-12",
      leaf: "w-6 h-6",
      text: "text-xs mt-2",
    },
    medium: {
      container: "w-16 h-16",
      leaf: "w-8 h-8",
      text: "text-sm mt-3",
    },
    large: {
      container: "w-24 h-24",
      leaf: "w-12 h-12",
      text: "text-base mt-4",
    },
  };

  const selectedSize = sizeConfig[size] || sizeConfig.medium;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${selectedSize.container}`}>
        {/* Central circle */}
        <motion.div
          className="absolute bg-green-500 rounded-full opacity-80"
          style={{ width: "50%", height: "50%", top: "25%", left: "25%" }}
          animate={{
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating leaf */}
        <motion.div
          className={`absolute ${selectedSize.leaf}`}
          style={{ top: 0, left: "calc(50% - 1.5rem)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full fill-green-600">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
          </svg>
        </motion.div>
      </div>

      {text && (
        <motion.p
          className={`text-green-700 font-medium ${selectedSize.text}`}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default KwuoLoader;
