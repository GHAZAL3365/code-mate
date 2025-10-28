const express = require("express");

const { userAuth } = require("../middlewares/userAuth.js");


const profileRoutes = express.Router()

profileRoutes.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).send("User Not Found");
    } else {
      return res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send(err.message || "Something Went Wrong");
  }
});

module.exports = profileRoutes;