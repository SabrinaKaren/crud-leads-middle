var config = require("./app-config.js");
var unirest = require('unirest');

var linker = [];

linker.connectInBackend = function (endpointConfigName, backendPath, method, token, data, res, callbackToGetData) {
    
    if (backendPath.substring(0, 1) !== '/')
        backendPath = '/' + backendPath;

    var options = {
    };

    options.url = config[endpointConfigName].protocol + "://" +
        config[endpointConfigName].host +
        (config[endpointConfigName].port ? ":" + config[endpointConfigName].port : "") +
        config[endpointConfigName].context +
        backendPath;

    options.method = method;
    options.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8' };

    if (token && token !== '')
        options.headers = { 'Accept': 'application/json', 'Content-Type': 'application/json;charset=UTF-8', 'Authorization': token };

    connect(
        options,
        data,
        function (statusCode, response) {
            if (callbackToGetData) {
                if (!statusCode) {
                    callbackToGetData(500);
                }
                else if (statusCode === 200) {
                    callbackToGetData(statusCode, response.body);
                } else {
                    callbackToGetData(statusCode);
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
            if (callbackToGetData) {
                callbackToGetData(500, undefined);
            } else {
                res.status(500).send();
            }
        });
};

function connect(options, data, onResult, onError) {
    try {
        switch (options.method) {
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