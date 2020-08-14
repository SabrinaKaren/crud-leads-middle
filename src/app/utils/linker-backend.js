var config = require("./app-config.js");
var unirest = require('unirest');
var linker = [];

linker.connectInBackend = function (endpoint, pathInBackend, verb, token, data, res, getDataCallingBackend) {
    
    if (pathInBackend.substring(0, 1) !== '/')
        pathInBackend = '/' + pathInBackend;

    var options = {
    };

    options.url = config[endpoint].protocol + "://" +
        config[endpoint].host +
        (config[endpoint].port ? ":" + config[endpoint].port : "") +
        config[endpoint].context +
        pathInBackend;

    options.verb = verb;
    options.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' };

    if (token && token !== ''){
        options.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': token };
    }

    connect(
        options,
        data,
        function (statusCode, response) {
            if (getDataCallingBackend) {
                if (!statusCode) {
                    getDataCallingBackend(500);
                }
                else if (statusCode === 200) {
                    getDataCallingBackend(statusCode, response.body);
                } else {
                    getDataCallingBackend(statusCode);
                }
            } else {
                if (!statusCode) {
                    res.status(500).send();
                } else if (statusCode === 200) {
                    res.send(response.body);
                } else {
                    res.status(statusCode).send();
                }
            }
        },
        function (err) {
            if (getDataCallingBackend) {
                getDataCallingBackend(500, undefined);
            } else {
                res.status(500).send();
            }
        }
    );
    
};

function connect(options, data, onResult, onError) {
    try {
        switch (options.verb) {
            case 'GET':
                unirest.get(options.url)
                    .headers(options.headers)
                    .end(function (response) {
                        console.log(response.body);
                        onResult(response.code, response);
                    });
                break;
            case 'POST':
                unirest.post(options.url)
                    .headers(options.headers)
                    .send(data)
                    .end(function (response) {
                        console.log(response.body);
                        onResult(response.code, response);
                    });
                break;
            case 'PUT':
                unirest.put(options.url)
                    .headers(options.headers)
                    .send(data)
                    .end(function (response) {
                        console.log(response.body);
                        onResult(response.code, response);
                    });
                break;
            case 'DELETE':
                unirest.delete(options.url)
                    .headers(options.headers)
                    .send(data)
                    .end(function (response) {
                        console.log(response.body);
                        onResult(response.code, response);
                    });
                break;
            default:
                unirest.get(options.url)
                    .headers(options.headers)
                    .end(function (response) {
                        console.log(response.body);
                        onResult(response.code, response);
                    });
        }
    } catch (e) {
        console.log(e.message);
        onError(e);
    }
};

module.exports = linker;