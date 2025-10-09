const userAuth = (req, res, next) => {
    console.log("user middleware");
    const auth = true;
    if(!auth) {
        res.send("you are not authorized")
    }
    else {
        next();
    }
}

module.exports = userAuth;