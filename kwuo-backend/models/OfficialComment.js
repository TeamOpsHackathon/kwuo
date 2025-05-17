// models/OfficialComment.js
import mongoose from 'mongoose';

const officialCommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  post: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 
  }
  // No replies field!
}, { timestamps: true });

export default mongoose.model('OfficialComment', officialCommentSchema);
