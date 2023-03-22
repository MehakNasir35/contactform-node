const express = require("express")
const jwt = require("jsonwebtoken");
const cors = require('cors')
const bodyParser = require('body-parser')
const cookiesParser = require("cookie-parser");

const users = require("./users")

const app = express()
const port = 5000

app.use(cors())
app.use(cookiesParser())

app.use(bodyParser.json({ type: ["application/json", "application/csp-report"] }));

const secretKey = "secretKey";

app.get("/login", async (req, res) => {
    const user = {
        username: "mn",
        password: "12345",
        email: "mehak@gmail.com",
    };

    jwt.sign(user, secretKey, { expiresIn: "400s" }, (er, token) => {
        if(er)
        res.send("Cannot Login");
        
        res.cookie("jwt", token);
        res.send("User Logged In");
    });
});

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (!token) {
        res.status(401).send("Invalid Token");
    }

    jwt.verify(token, secretKey, (err, authData) => {
        if (err) {
            res.status(401).send("Invalid Token");
        } else {
            req.authData = authData;
            next();
        }
    });
};

app.use(verifyToken)
app.use(users)

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});