import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, MessageCircle } from "lucide-react";

const NewsCard = ({ title, imgSrc, time, author, index }) => {
  const [approved, setApproved] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const handleApproved = () => {
    setApproved((prev) => !prev);
  };

  const handleCommentToggle = () => {
    setShowCommentBox((prev) => !prev);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      alert(`Comment submitted: ${comment}`);
      setComment("");
      setShowCommentBox(false);
    }
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-xl p-3 w-64 mx-2"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <img
        src={imgSrc}
        alt="news"
        className="h-28 w-full object-cover rounded-md"
      />
      <p className="text-xs text-gray-500 mt-2">
        By {author} · {time}
      </p>
      <h3 className="font-semibold text-sm mt-1">{title}</h3>
      <p className="text-xs text-green-700 underline mt-1">Read More</p>

      <div className="flex justify-between mt-3 text-xs text-gray-600">
        <button
          onClick={handleApproved}
          className={`flex items-center gap-1 transition-colors ${
            approved ? "text-green-600 font-semibold" : "hover:text-green-500"
          }`}
        >
          <ThumbsUp size={16} />
          Like
        </button>
        <button
          onClick={handleCommentToggle}
          className="flex items-center gap-1 hover:text-blue-500 transition-colors"
        >
          <MessageCircle size={16} />
          Comment
        </button>
      </div>

      <AnimatePresence>
        {showCommentBox && (
          <motion.div
            className="mt-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <textarea
              className="w-full border rounded-md p-2 text-sm mt-1"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-md"
            >
              Post Comment
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NewsCard;
