// import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema({
//   user: { type: String, required: true },
//   text: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const postSchema = new mongoose.Schema({
//   content: { type: String, required: true },
//   author: { type: String, required: true },
//   likes: { type: [String], default: [] }, // store user IDs
//   comments: [commentSchema],
//   shares: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now },
// });

// const Post = mongoose.model("Post", postSchema);
// export default Post;

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    shares: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
