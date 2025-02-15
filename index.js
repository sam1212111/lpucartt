
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const router = require("./routes/qart/index")
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const app = express()



// const mongoose = require('');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err))






app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
passport.use("jwt",jwtStrategy)
app.use("/verse",router)

app.get("/",(req,res)=>{
    res.send("Hello welcome to Cart Project")
})
app.listen(config.port,()=>{
    console.log("listening to port 8082")
})