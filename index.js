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