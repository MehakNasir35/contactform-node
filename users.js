const express = require('express')
const router = express.Router()
var fs = require("fs");

const { user } = require('./models/userSchema');

router.get('/users', async function (req, res) {

    const data = await user.find()
    console.log("userdata", data)
    res.json(data)

});

router.post('/user', async function (req, res) {
    const newUser = req.body
    console.log(newUser)
     user.create(newUser)
    res.send('Added Successfully!')
});

router.put('/user', function (req, res) {
    var data = fs.readFileSync('data.json');
    //convert to json format
    var jsonData = JSON.parse(data);

    user = jsonData.find(jsonData => jsonData.id == req.body.id)

    jsonData[jsonData.indexOf(user)] = req.body

    var newData = JSON.stringify(jsonData);

    fs.writeFile('data.json', newData, 'utf8', function (err) {
        if (err) throw err;
        // If no error
        res.end(newData)
    });

});

router.delete('/user/:id', function (req, res) {
    var data = fs.readFileSync('data.json');
    //convert to json format
    var jsonData = JSON.parse(data);
    var result = jsonData.filter(jsonData => jsonData.id != req.params.id);
    var newData = JSON.stringify(result);

    fs.writeFile('data.json', newData, 'utf8', function (err) {
        if (err) throw err;
        // If no error
        res.end(newData)
    });
});

router.get('/user/:id', function (req, res) {
    console.log(req.params.id)
    const selectUser = user.findById(req.params.id);
    console.log(selectUser)
    res.json(selectUser)
});

module.exports = router