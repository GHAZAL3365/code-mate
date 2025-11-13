const express = require("express");
const { userAuth } = require("../middlewares/userAuth.js");
const ConnectionRequests = require("../models/connectionRequests.model.js");

const User = require("../models/user.model.js");

const requestRoutes = express.Router();

requestRoutes.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res, next) => {
    try {
      const fromUserId = req.loggedInUser._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).json({
          message: "Please sent a request to a valid user",
        });
      }

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type" + status,
        });
      }

      // preventing duplicate connection requests
      const existingConnectionRequest = await ConnectionRequests.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res.status(200).json({
          message: "You already sent a connection request",
        });
      }

      const request = new ConnectionRequests({
        fromUserId,
        toUserId,
        status,
      });

      // if (status === "ignored") {
      //   return res.status(200).json({
      //     message: "connection request is ignored",
      //   });
      // }

      const savedRequest = await request.save();

      const connectionRequestMessage =
        status === "ignored"
          ? "Connection request ignored"
          : `${req.loggedInUser.firstName} sent a connection request`;

      return res.status(201).json({
        message: connectionRequestMessage,
        data: savedRequest,
      });
    } catch (err) {
      console.log("ERROR!!!!!!", err.message)
      return res.status(400).send("Error  " + err.message);
    }
  }
);
module.exports = requestRoutes;
