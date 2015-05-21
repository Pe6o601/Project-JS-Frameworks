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
        $http.post(serviceUrl + "users/logout")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };



    service.changePassword = function (changePasswordData) {
        var defer = $q.defer();
        $http.put(serviceUrl + "me/changepassword", changePasswordData)
            .success(function (data) {
                console.log(changePasswordData);
                defer.resolve(data);
            }).error(function (error) {
                console.log(changePasswordData);
                defer.reject(error);
            });
        return defer.promise;
    };

    service.getUserData = function() {
        var defer = $q.defer();
        $http.get(serviceUrl+"me")
            .success(function (data) {
                console.log(data);
                defer.resolve(data);
            }).error(function (error) {
                console.log(error);
                defer.reject(error);
            });
        return defer.promise;
    };

    service.editProfile = function(data) {
        var defer = $q.defer();
        $http.put(serviceUrl+"me", data)
            .success(function (data) {
                console.log(data);
                defer.resolve(data);
            }).error(function (error) {
                console.log(error);
                defer.reject(error);
            });
        return defer.promise;
    };








    return service;

});