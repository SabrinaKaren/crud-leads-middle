var express = require('express');
var router = express.Router();
var linkerBackend = require('../utils/linker-backend.js');
var restEndpoint = 'RESTEndpoint';

router.get('/get-by-id/:leadId', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(restEndpoint, '/lead/get-by-id/' + req.params.leadId, 'GET', req.headers.authorization, undefined, res);
    }
});

module.exports = router;