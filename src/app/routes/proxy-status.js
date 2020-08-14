var express = require('express');
var router = express.Router();
var linkerBackend = require('../utils/linker-backend.js');
var restEndpoint = 'RESTEndpoint';

router.get('/get-by-name/:name', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(restEndpoint, '/status/get-by-name/' + req.params.name, 'GET', req.headers.authorization, undefined, res);
    }
});

router.get('/get-by-id/:statusId', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(restEndpoint, '/status/get-by-id/' + req.params.statusId, 'GET', req.headers.authorization, undefined, res);
    }
});

router.post('/save', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(restEndpoint, '/status/save', 'POST', req.headers.authorization, req.body, res);
    }
});

router.delete('/delete/:statusId', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(restEndpoint, '/status/delete/' + req.params.statusId, 'DELETE', req.headers.authorization, req.body, res);
    }
});

router.get('/get-all', function (req, res) {
    if (!req.headers.authorization) {
        res.status(401).send();
    } else {
        linkerBackend.connectInBackend(restEndpoint, '/status/get-all', 'GET', req.headers.authorization, undefined, res);
    }
});

module.exports = router;