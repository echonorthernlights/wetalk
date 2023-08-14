import express from "express";
import dotenv from "dotenv";

import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";

import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send(`API running ...`);
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT} ...`);
  });
};

start();
