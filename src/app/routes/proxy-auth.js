var express = require('express');
var router = express.Router();
var linkerBackend = require('../utils/linker-backend.js');
var restEndpoint = 'RESTEndpoint';

router.post('/login', function (req, res) {
    if (req.body.userName && req.body.password) {
        linkerBackend.connectInBackend(restEndpoint, '/auth/login', 'POST', undefined, req.body, res);
    } else {
        res.status(400).send();
    }
});

module.exports = router;