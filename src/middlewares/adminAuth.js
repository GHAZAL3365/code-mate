const adminAuth = (req, res, next) => {
    console.log("admin middleware");
    const auth = true;
    if(!auth) {
        res.send("you are not authorized")
    }

    else {
        next();
    }
}

module.exports = adminAuth;