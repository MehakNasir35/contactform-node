const express = require("express")
const jwt = require("jsonwebtoken");
const cors = require('cors')
const bodyParser = require('body-parser')
const cookiesParser = require("cookie-parser");

const users = require("./users")

const app = express()
const port = 5000

const corsOptions = {
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookiesParser());

app.use(bodyParser.json({ type: ["application/json"] }));

const secretKey = "secretKey";

app.post("/login", async (req, res) => {

    const user = {
        password: req.body.password,
        email: req.body.email,
    };

    jwt.sign(user, secretKey, { maxAge: 360000 }, (er, token) => {
        if (er)
            res.send("Cannot Login");

        res.cookie('jwt', token)
        res.send("User Logged In");
    });

});

const verifyToken = (req, res, next) => {
console.log(req)
    const authcookie = req.cookies.jwt
    console.log(req.cookies)

    if (!authcookie) {
        res.status(401).send("Invalid Token");
    }

    jwt.verify(authcookie, secretKey, (err, authData) => {
        console.log(err)
        if (err) {
            res.status(401).send("Invalid Token")
        } else {
            req.authData = authData
            next();
        }
    });
};

app.use(verifyToken)
app.use(users)

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});