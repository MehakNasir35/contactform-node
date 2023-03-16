const express = require('express');
const router = express.Router()

router.get('/users', function (req, res) {
    res.send('get request');
});

router.post('/user', function (req, res) {
    res.send('post request');
});

router.put('/user', function (req, res) {
    res.send('update request');
});

router.delete('/user', function (req, res) {
    res.send('delete request');
});

router.get('/user/:id', function (req, res) {
    res.send('get request with id');
});

module.exports = router;