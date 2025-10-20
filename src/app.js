const connectToDB = require("../connectDB");
const express = require("express");
const User = require("./user.model.js")


require("dotenv").config();
const app = express();
const port = 3365;

app.use(express.json())

app.post("/signup", async (req, res) => {

    const newUser = new User(req.body)

 try{
     await  newUser.save();
  res.status(201).send("User Added Successfully!")
 }
 catch(err) {
    res.status(400).send("error", err.message)
    console.log("error", err.message)
 }
})

//GET - Feed

app.get("/feed", (req, res) => {
   
})


connectToDB().then(() => {
 app.listen(port, () => {
  console.log("server running on port number " + port)
 })
})