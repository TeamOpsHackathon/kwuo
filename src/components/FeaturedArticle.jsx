import React from "react";
import { motion } from "framer-motion";

const FeaturedArticle = () => {
  return (
    <motion.div
      className="relative px-4 py-2"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPJ2eLrzNsVxKyeE0JpDj_g9obRVeXONSdEQ&s"
        alt="Featured"
        className="w-full h-60 object-cover rounded-xl"
      />
      <div className="absolute bottom-6 left-6 text-white max-w-xs background-black">
        <p className="text-sm opacity-80">15-05-2025 · 3 min read</p>
        <h2 className="text-lg font-bold leading-snug background-black">
          Gov. Otti appoints new VC for Abia var...
        </h2>
        <button className="mt-2 text-sm underline">Learn More</button>
      </div>
    </motion.div>
  );
};

export default FeaturedArticle;
