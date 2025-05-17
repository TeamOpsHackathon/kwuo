import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/postRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// //this was connected out by Chiazam
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/kwuo";
// //Connect to the database
// connectDB();

app.use(cors());
app.use(bodyParser.json());
//take care of submittin raw JSON
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}
`);
});



//Update these codes tomorrow
/**
 * import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 */
