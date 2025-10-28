// creating routes

const express = require("express");
const { validationForSignup } = require("../utills/validator.js");
const User = require("../models/user.model.js");

const authRoutes = express.Router();
const bcypt = require("bcrypt");


authRoutes.post("/signup", async (req, res) => {
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

authRoutes.post("/login", async (req, res) => {
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


module.exports = authRoutes;