SocialNetwork.factory('userServices', function ($http, $q) {
    //constant
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/";
    var service = {};

    service.Register = function (registerData) {
        var deferred = $q.defer();
        $http.post(serviceUrl + "users/register", registerData)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.Login = function (loginData) {
        var deferred = $q.defer();
        $http.post(serviceUrl + "users/login", loginData)
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
        service.SetHeaders($http);
        $http.post(serviceUrl + "users/logout")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };











    return service;

});