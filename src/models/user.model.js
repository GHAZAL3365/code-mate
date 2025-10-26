const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
    },

    lastName: {
      maxLength: 50,
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      maxLength: 100,
    },

    age: {
      type: Number,
      min: 5,
    },

    gender: {
      type: String,
      enum: ["female", "male", "others"],
    },
    photoURL: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/042/332/098/non_2x/default-avatar-profile-icon-grey-photo-placeholder-female-no-photo-images-for-unfilled-user-profile-greyscale-illustration-for-socail-media-web-vector.jpg",
    },
    skills: [String],
    about: {
      type: String,
      default: "I am a Full Stack MERN Developer.",
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function() {
 
  const token = await jwt.sign({ _id: this._id }, "CodeMate@3365$.1", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.comparePassword = function (passwordInputByUser) {
 return bcrypt.compare( passwordInputByUser, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;
