SocialNetwork.factory('userServices', function ($http, $q) {
    //constant
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/users/";
    var service = {};

    service.Register = function (registerData) {
        var deferred = $q.defer();
        $http.post(serviceUrl + "register", registerData)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.Login = function (loginData) {

        var deferred = $q.defer();
        $http.post(serviceUrl + "login", loginData)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.Logout = function () {

        var deferred = $q.defer();
        console.log(GetHeaders());
        $http.defaults.headers.common = GetHeaders();
        $http.post(serviceUrl + "logout")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };


    service.SetCredentials = function (serverData) {
        sessionStorage['accessToken'] = serverData.access_token;
        sessionStorage['username'] = serverData.userName;
    };


    function GetHeaders() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    }


    return service;

});