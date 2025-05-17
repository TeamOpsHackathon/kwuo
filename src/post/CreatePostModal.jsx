import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePost } from "../utils/postAPI";
import { toast } from "react-hot-toast";
import {
  PhotoIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const CreatePostModal = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [textContent, setTextContent] = useState("");
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const navigate = useNavigate();

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      textContent,
      imgSrc: mediaPreview || "https://via.placeholder.com/300x150",
      time: "Just now",
      author: "Test User",
    };

    savePost(newPost); // Should support uploading the file in a real API
    toast.success("Post created!");
    closeModal();
    navigate("/home");
  };

  const renderPreview = () => {
    if (!mediaPreview) return null;
    const isVideo = mediaFile?.type?.startsWith("video");

    return (
      <div className="relative mt-2">
        {isVideo ? (
          <video src={mediaPreview} controls className="w-full rounded" />
        ) : (
          <img src={mediaPreview} alt="preview" className="w-full rounded" />
        )}
        <button
          onClick={() => {
            setMediaFile(null);
            setMediaPreview(null);
          }}
          className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative shadow-lg overflow-y-auto max-h-[90vh]">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Create Post</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 text-black rounded w-full"
          />

          <textarea
            placeholder="What do you want to talk about?"
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className="border p-2 rounded w-full min-h-[100px] text-black resize-none"
            required
          />

          {renderPreview()}

          <div className="flex items-center gap-4 mt-2">
            {/* Image Upload */}
            <label className="cursor-pointer flex items-center gap-1 text-blue-600 hover:underline">
              <PhotoIcon className="w-5 h-5" />
              <span>Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleMediaChange}
                hidden
              />
            </label>

            {/* Video Upload */}
            <label className="cursor-pointer flex items-center gap-1 text-purple-600 hover:underline">
              <VideoCameraIcon className="w-5 h-5" />
              <span>Video</span>
              <input
                type="file"
                accept="video/*"
                onChange={handleMediaChange}
                hidden
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
