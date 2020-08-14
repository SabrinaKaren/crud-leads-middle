var express = require('express');
var router = express.Router();
var linkerBackend = require('../utils/linker-backend.js');
var endpoint = 'Endpoint';

router.get('/get-by-name/:name', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(endpoint, '/lead/get-by-name/' + req.params.name, 'GET', req.headers.authorization, undefined, res);
    }
});

router.get('/get-by-id/:leadId', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(endpoint, '/lead/get-by-id/' + req.params.leadId, 'GET', req.headers.authorization, undefined, res);
    }
});

router.post('/save', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(endpoint, '/lead/save', 'POST', req.headers.authorization, req.body, res);
    }
});

router.delete('/delete/:leadId', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(endpoint, '/lead/delete/' + req.params.leadId, 'DELETE', req.headers.authorization, req.body, res);
    }
});

router.get('/get-all', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(endpoint, '/lead/get-all', 'GET', req.headers.authorization, undefined, res);
    }
});

module.exports = router;