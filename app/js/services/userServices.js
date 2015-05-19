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
        service.SetHeaders();
        $http.post(serviceUrl + "users/logout")
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    service.NewsFeedPosts = function (startPostId) {
        var deferred = $q.defer();
        service.SetHeaders();
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
        $http.get(serviceUrl+"posts/"+postId)
            .success(function (data) {
                deferred.resolve(data);
            }).error(function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }

    service.SetCredentials = function (serverData) {
        sessionStorage['accessToken'] = serverData.access_token;
        sessionStorage['username'] = serverData.userName;
    };

    service.SetHeaders = function () {
        $http.defaults.headers.common = GetHeaders();
    }


    function GetHeaders() {
        return {
            'Authorization': 'Bearer ' + sessionStorage['accessToken']
        };
    }


    return service;

});