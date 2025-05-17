import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePost } from "../utils/postAPI";
import { toast } from "react-hot-toast";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      imgSrc: imgSrc || "https://via.placeholder.com/300x150",
      time: "Just now",
      author: "Test User",
    };
    savePost(newPost);
    toast.success("Post created!");
    navigate("/home");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={imgSrc}
          onChange={(e) => setImgSrc(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
