var responseResult = {};

var responseResultModel = {
    'result': '',
    'method': '',
    'msgSaida': [],
    'error': []
};

responseResult.fillModelSuccess = function(method, msgSaida) {
    responseResultModel.result = 'SUCCESS';
    responseResultModel.method = method;
    responseResultModel.msgSaida = msgSaida;

    return responseResultModel;
};

responseResult.fillModelError = function(method, error) {
    responseResultModel.result = 'ERROR';
    responseResultModel.method = method;
    responseResultModel.error = ['Erro na requisição. Detalhes: ' + error];

    return responseResultModel;
};

module.exports = responseResult;