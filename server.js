const express = require("express")
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
app.use(express.static('public'))
const users = require("./users")
const port = 5000

app.use(cors())
app.use(bodyParser.json({ type: ["application/json", "application/csp-report"] }));
app.use(users)

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});