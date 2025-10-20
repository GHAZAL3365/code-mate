const mongoose = require("mongoose");




const connectToDB = async () => {
  try{
     await mongoose.connect(process.env.MONGO_URL, {
      serverSelectionTimeoutMS: 5000
     })

     console.log("connected to database-> Code-mate")
  }catch(err) {
     console.error("can't connect to database", err.message);
     console.log("full error message", err)
  }
}

module.exports = connectToDB;