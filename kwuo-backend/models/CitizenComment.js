
// models/CitizenComment.js
import mongoose from 'mongoose';

const citizenCommentSchema = new mongoose.Schema({
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
  },
  replies: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CitizenComment' 
  }]
}, { timestamps: true });

export default mongoose.model('CitizenComment', citizenCommentSchema);