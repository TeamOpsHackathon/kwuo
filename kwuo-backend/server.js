import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/postRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 3000;
// const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/kwuo";

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}
`);
});
