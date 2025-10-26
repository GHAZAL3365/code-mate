const connectToDB = require("../connectDB");
const express = require("express");
const User = require("./models/user.model.js");
const { validationForSignup } = require("./utills/validator.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/userAuth.js");

require("dotenv").config();
const app = express();
const port = 3365;

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      skills,
      photoURL,
    } = req.body;

    validationForSignup(firstName, email, password, skills, age);

    const hashedPassword = await bcypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      skills,
      photoURL,
    });

    await newUser.save();
    res.status(201).send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("Validation Failed!!!" + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Please enter valid Email or Password");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Email or Password is incorrect");
    } else {
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        return res.status(400).send("Email or Password is incorrect");
      } else {
        const token = await user.getJWT();

        res.cookie("token", token);
        return res.status(200).send("You are logged in successfully!!!");
      }
    }
  } catch (err) {
    res.status(500).send(err.message || "Soemthing Went Wrong!!!");
  }
});

//GET - Feed

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // don't pass anyting-> gives all documents from the User Collection
    if (users.length === 0) {
      res.status(404).send("No Data Found!");
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//Get - User by fineOne by Email Id, without parameters

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      return res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send(err.message || "Something Went Wrong");
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).send(user.firstName + "sent a connection request ");
  } catch (err) {
    return res.status(400).send("Error  " + err.message);
  }
});

app.get("/getUserById", async (req, res) => {
  console.log("getUser By Id");
  try {
    const user = await User.findById({ _id: "68f624fa698026ee6922a8c6" });
    console.log(user, "user get by id coming or not");
    if (!user) {
      res.status(404).send("User Not Found !");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send(err.message || "Something Went Wrong");
  }
});

app.delete("/deleteUser", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      res.status(404).send("User Not Found!");
    } else {
      res.status(200).send(user);
    }

    console.log(user);
  } catch (err) {
    res.status(500).send(err.message || "Something Went Wrong");
  }
});

// PUT or PATCH — both are fine (PUT usually for full update, PATCH for partial)
app.patch("/updateUserById", async (req, res) => {
  try {
    const userId = req.body.userId;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      upsert: false,
    });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});

connectToDB().then(() => {
  app.listen(port, () => {
    console.log("server running on port number " + port);
  });
});
