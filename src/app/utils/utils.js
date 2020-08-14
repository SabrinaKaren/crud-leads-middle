function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getDateTimeFromBackEnd() {
    $scope.apiRootUrl = "/api/util/get-date-time";

    var token = window.localStorage['token'];
    var serviceUrl = $scope.apiRootUrl;
    $scope.communicatingWithBackend = true;

    $http.defaults.headers.common['Authorization'] = 'Basic ' + token;
    
    $http({
        method: 'GET',
        url: serviceUrl
    }).then(function successCallback(response) {
        $scope.visitorList = response.data;
        $scope.initVisualControls();
        $scope.communicatingWithBackend = false;

    }, function errorCallback(response) {
        $scope.communicatingWithBackend = false;
        if (response.status == 401) {
            $scope.unauthorizedAction();
        }
    });
}