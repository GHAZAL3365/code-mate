const connectToDB = require("../connectDB");
const express = require("express");


const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.js");
const profileRoutes = require("./routes/profile.js");
const requestRoutes = require("./routes/request.js");

require("dotenv").config();
const app = express();
const port = 3365;

app.use(express.json());
app.use(cookieParser());


app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", requestRoutes)


connectToDB().then(() => {
  app.listen(port, () => {
    console.log("server running on port number " + port);
  });
});
