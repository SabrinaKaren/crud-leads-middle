var express = require('express');
var router = express.Router();
var linkerBackend = require('../utils/linker-backend.js');
var endpoint = 'Endpoint';

router.post('/get-search-object', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(endpoint, '/opportunity/get-search-object', 'POST', req.headers.authorization, req.body, res);
    }
});

router.get('/get-by-id/:opportunityId', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(endpoint, '/opportunity/get-by-id/' + req.params.opportunityId, 'GET', req.headers.authorization, undefined, res);
    }
});

router.post('/save', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(endpoint, '/opportunity/save', 'POST', req.headers.authorization, req.body, res);
    }
});

router.delete('/delete/:opportunityId', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(endpoint, '/opportunity/delete/' + req.params.opportunityId, 'DELETE', req.headers.authorization, req.body, res);
    }
});

module.exports = router;