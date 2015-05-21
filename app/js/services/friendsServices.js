SocialNetwork.factory('friendsServices', function ($http, $q) {
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/";
    var service = {};

    service.SearchByName = function (search) {
        var deferred = $q.defer();
        $http.get(serviceUrl +"users/search?searchTerm="+ search)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.getFriends = function () {
        var defer = $q.defer();
        $http.get(serviceUrl+"me/friends")
            .success(function (data) {
                defer.resolve(data);
            }).error(function (error) {
                defer.reject(error);
            });
        return defer.promise;
    };

    var url2 = "http://softuni-social-network.azurewebsites.net/api/users/";
    service.getUserWall = function (userName) {
        var deferred = $q.defer();
        $http.get(url2 + userName)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    var url3 = "http://softuni-social-network.azurewebsites.net/api/me/friends";
    service.getMyFriends = function () {
        var deferred = $q.defer();
        $http.get(url3)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    //get friend requests
    var url4 = "http://softuni-social-network.azurewebsites.net/api/me/requests";
    service.getReceivedRequests = function () {
        var deferred = $q.defer();
        $http.get(url4)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };




    service.acceptFriendRequest = function (userId) {
        var url5 = "http://softuni-social-network.azurewebsites.net/api/me/requests/"+userId+"?status=approved";
        var deferred = $q.defer();
        $http.put(url5)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };


    $http.defaults.headers.common = GetHeaders();
    service.rejectFriendRequest = function (userId) {
        //http://softuni-social-network.azurewebsites.net/api/me/requests/2?status=rejected

        var url5 = "http://softuni-social-network.azurewebsites.net/api/me/requests/"+userId+"?status=rejected";
        var deferred = $q.defer();
        $http.put(url5)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };



    function GetHeaders() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    }

    return service;

});