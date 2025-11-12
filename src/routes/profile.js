const express = require("express");

const { userAuth } = require("../middlewares/userAuth.js");
const { validateDataForEditProfile } = require("../utills/validator.js");

const profileRoutes = express.Router();

profileRoutes.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.loggedInUser;
    if (!user) {
      return res.status(404).send("User Not Found");
    } else {
      return res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send(err.message || "Something Went Wrong");
  }
});

profileRoutes.patch("/profile/edit", userAuth, async (req, res) => {
  //valdidate data which is come from req.body
  try {
    const isAllowedToEdit = validateDataForEditProfile(req);
    if (!isAllowedToEdit) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this field",
      });
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = profileRoutes;
