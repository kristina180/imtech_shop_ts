import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./router/index.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

const start = async () => {
  try {
    mongoose
      .connect(process.env.DB_URL)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error("MongoDB error:", err));
    app.listen(PORT, () => console.log(`Server started on POST = ${PORT}`));
  } catch (e) {
    console.log(e.message);
  }
};

start();
