SocialNetwork.factory('userServices', function ($http, $q) {
    //constant
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/posts/";
    var service = {};

    service.AddPost = function (postData) {
        var deferred = $q.defer();
        $http.post(serviceUrl, postData)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    return service;

});