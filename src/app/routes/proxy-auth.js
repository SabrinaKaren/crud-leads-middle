var express = require('express');
var router = express.Router();
var linkerBackend = require('../utils/linker-backend.js');
var endpoint = 'Endpoint';

router.post('/login', function (req, res) {
    if (req.body.userName && req.body.password) {
        linkerBackend.connectInBackend(endpoint, '/auth/login', 'POST', undefined, req.body, res);
    } else {
        res.status(400).send();
    }
});

router.post('/new-user', function (req, res) {
    if (req.body.userName && req.body.password) {
        linkerBackend.connectInBackend(endpoint, '/auth/new-user', 'POST', undefined, req.body, res);
    } else {
        res.status(400).send();
    }
});

module.exports = router;
