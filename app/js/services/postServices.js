SocialNetwork.factory('postServices', function ($http, $q) {
    //constant
    var serviceUrl = "http://softuni-social-network.azurewebsites.net/api/";
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

    service.NewsFeedPosts = function (startPostId) {
        var deferred = $q.defer();
        SetHeaders($http);
        console.log("request :" + startPostId);
        var request = serviceUrl + "me/feed?StartPostId=" + (startPostId || "") + "&PageSize=5";
        // console.log(request);
        $http.get(request)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.AddCommentToPost = function(postId,data){
        var deferred = $q.defer();
        $http.post(serviceUrl+"posts/"+postId+"/comments",data)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.GetCommentByPostId = function(postId){
        var deferred = $q.defer();
        $http.get(serviceUrl+"posts/"+postId+'/comments')
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    service.EditPostById = function(postId,postData){
        var deferred = $q.defer();
        $http.put(serviceUrl+"Posts/"+postId,postData)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }


    return service;

});