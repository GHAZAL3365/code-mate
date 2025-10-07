const express = require("express");

const app = express();
const port = 7777;

app.use("/hello", (req,res) => {
    // console.log("got a request on / route");
    res.send("Hello hello hello!")
   
})
 

app.use("/test", (req, res) => {
    res.send("<h1>I am heading 1 from a server to test can we send html data also</h1>")
})


app.listen(port, () => {
    console.log("server listen port numer " + port);

})