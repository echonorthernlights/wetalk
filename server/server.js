import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";

import connectDB from "./config/connectDB.js";

import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send(`API running ...`);
});

//Middleware
app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT} ...`);
  });
};

start();
