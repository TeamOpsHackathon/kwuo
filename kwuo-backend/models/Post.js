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



// 

import mongoose from 'mongoose';

const attachmentSchema = new mongoose.Schema({
  url: { type: String, required: true },
  filename: { type: String, required: true },
  mimetype: { 
    type: String, 
    required: true,
    enum: ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4']
  },
  size: { 
    type: Number, 
    required: true,
    max: 50 * 1024 * 1024 // 50MB
  }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  attachments: [attachmentSchema],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  role: {
    type: String,
    enum: ['citizen', 'official'],
    required: true
  },
  approvals: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  citizenComments: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CitizenComment'  // Now properly referenced
  }],
  officialComments: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'OfficialComment'  // Now properly referenced
  }]
}, { timestamps: true });


export default mongoose.model('Post', postSchema);