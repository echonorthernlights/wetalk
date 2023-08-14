import express from "express";
import dotenv from "dotenv";

import connectDB from "./config/connectDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

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
