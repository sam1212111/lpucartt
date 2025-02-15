require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const router = require("./routes/qart/index");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const cors = require("cors");

const app = express();

app.use(cors()); 

// const allowedOrigins = [
//   "http://localhost:5173", // Local frontend
//   "https://yourfrontend.com" 
// ];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// API Routes
app.use("/verse", router);

// Root endpoint
app.get("/", (req, res) => {
    res.send("Hello welcome to Cart Project");
});

// Start server
app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});