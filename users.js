const express = require('express')
const router = express.Router()
var fs = require("fs");

router.get('/users', function (req, res) {
    fs.readFile('data.json', function (err, data) {

        if (err) {
            return console.error(err);
        } else {
            //send data to response
            res.end(data)
        }

    });
});

router.post('/user', function (req, res) {
    var data = fs.readFileSync('data.json');
    //convert to json format
    var jsonData = JSON.parse(data);
    jsonData.push(req.body);
    //data type must be of string type or buffer 
    var newData = JSON.stringify(jsonData);
    // add new data to file
    fs.writeFile('data.json', newData, 'utf8', function (err) {
        if (err) throw err;
        // If no error
        res.end(newData)
    });
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
    var data = fs.readFileSync('data.json');
    //convert to json format
    var jsonData = JSON.parse(data);
    //find user with id
    var result = jsonData.find(jsonData => jsonData.id == req.params.id);
    res.end(JSON.stringify(result))
});

module.exports = router