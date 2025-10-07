const express = require("express");

const app = express();
const port = 7777;



app.get("/profile/:id", (req, res ) => {
    console.log(req.params.id);
    res.send({
        name: "Ghazala Shameem",
        email: "email353example.com"
    });
})

app.post("/profile", (req, res) => {
    res.send({
        name: "This is post request",
        email: "postexample.com"})
})

app.delete("/profile", (req, res) => {
    res.send({
        name: "This is delete request",
        email: "deleteexample.com"})
})




app.use("/test", (req, res) => {
    res.send("<h1>I am heading 1 from a server to test can we send html data also</h1>")
})



app.listen(port, () => {
    console.log("server listen port numer " + port);

})