const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();

app.listen(4000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});




mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3002"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);
