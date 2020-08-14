var unirest = require('unirest');

var httpHelper = {};

httpHelper.getJSON = function (options, onResult, onError) {
    var url = options.protocol + "://" +
        options.host +
        (options.port ? ":" + options.port : "") +
        options.context +
        options.path;

    try {
        unirest.get(url)
            .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json;charset=utf-8' })
            .end(function (response) {
                console.log(response.body);
                onResult(response.code, response.body);
            });
    } catch (e) {
        console.log(e.message);
        onError(e);
    }
};

httpHelper.sendJSON = function (options, data, onResult, onError) {
    try {
        var url = options.protocol + "://" +
            options.host +
            (options.port ? ":" + options.port : "") +
            options.context +
            options.path;

        switch (options.method) {
            case 'POST':
                unirest.post(url)
                    .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json;charset=utf-8' })
                    .send(data)
                    .end(function (response) {
                        console.log(response.body);
                        onResult(response.code, response.body);
                    });
                break;
            case 'PUT':
                unirest.put(url)
                    .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json;charset=utf-8' })
                    .send(data)
                    .end(function (response) {
                        console.log(response.body);
                        onResult(response.code, response.body);
                    });
                break;
            case 'DELETE':
                unirest.delete(url)
                    .headers({ 'Accept': 'application/json', 'Content-Type': 'application/json;charset=utf-8' })
                    .send(data)
                    .end(function (response) {
                        console.log(response.body);
                        onResult(response.code, response.body);
                    });
                break;
            default:
        }
    } catch (e) {
        console.log(e.message);
        onError(e);
    }
}

module.exports = httpHelper;
