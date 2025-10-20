const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    email: {
     type: String,
    },

    age: {
        type: Number
    },
    
    gender: {
        type: String,
        enum: ["female", "male", "others"]
    }
})


const User = mongoose.model("User", userSchema);

module.exports = User;