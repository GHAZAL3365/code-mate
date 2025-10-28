const express = require("express");
const { userAuth } = require("../middlewares/userAuth.js");

const requestRoutes = express.Router();

requestRoutes.post("/sendConnectionRequest", userAuth, async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).send(user.firstName + "sent a connection request ");
  } catch (err) {
    return res.status(400).send("Error  " + err.message);
  }
});
module.exports = requestRoutes;