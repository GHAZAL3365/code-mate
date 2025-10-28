const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    // reading a token from cookies if user

    const { token } = req.cookies;
    if (!token) {
      throw new Error("Authentication token is missing. Please login again");
    } else {
      const decodedData = await jwt.verify(token, "CodeMate@3365$.1");

      const { _id } = decodedData;

      const user = await User.findById(_id);

      if (!user) {
        throw new Error("User is not found");
      } else {
        req.user = user;
      }

      next();
    }
  } catch (err) {
    return res.status(400).send("Error! " + err.message);
  }
};

module.exports = {
  userAuth,
};
