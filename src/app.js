const express = require("express");
const adminAuth = require("./middlewares/adminAuth");
const userAuth = require("./middlewares/userAuth");
const app = express();
const port = 7777;


app.use("/admin", adminAuth );


app.get("/admin/getAllData", ( req, res, next) => {
    res.send("all data sent")
});

app.get("/user", userAuth, (req, res, next) => {
    res.send("you got a user details");
})


  




app.listen(port, () => {
    console.log("server listen port numer " + port);

})