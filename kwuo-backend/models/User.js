// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", UserSchema);
// export default User;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['citizen', 'official', 'business'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  // Conditional fields based on role
  organization: {
    type: String,
    required: function() { return this.role !== 'citizen'; }
  },
  position: {
    type: String,
    required: function() { return this.role === 'official'; }
  }
}, { timestamps: true });

// Password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
