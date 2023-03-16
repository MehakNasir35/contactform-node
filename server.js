const express = require("express");
const app = express()
const users = require("./users")
const port = 5000;
app.use(users);

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});