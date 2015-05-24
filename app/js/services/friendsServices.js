SocialNetwork.factory('friendsServices', function ($http, $q,$routeParams) {
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

    service.getUserWall = function (userName) {
        var deferred = $q.defer();
        var request = "http://softuni-social-network.azurewebsites.net/api/users/"+userName;

        $http.get(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.getMyFriends = function () {
        var request = serviceUrl+"me/friends";
        var deferred = $q.defer();
        $http.get(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.getUserFriends = function () {
        var request = serviceUrl+"users/"+$routeParams.name+"/friends";
        var deferred = $q.defer();
        $http.get(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.getReceivedRequests = function () {
        var request = serviceUrl+"me/requests"
        var deferred = $q.defer();
        $http.get(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };




    service.acceptFriendRequest = function (userId) {
        var request = serviceUrl+"me/requests/"+userId+"?status=approved";
        var deferred = $q.defer();
        $http.put(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };


    service.rejectFriendRequest = function (userId) {

        var request = serviceUrl+ "me/requests/"+userId+"?status=rejected";
        var deferred = $q.defer();
        $http.put(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.showFriendsOfUser= function (user) {
        var request = serviceUrl+"users/"+user+"/friends/preview";
        var deferred = $q.defer();
        $http.get(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }


    function GetHeaders() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    }

    return service;

});