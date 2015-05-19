'use strict';
//, $location, mainData, authentication, notifyService
SocialNetwork.controller('homeController', function ($scope, userServices) {

    $scope.username = sessionStorage['username'];
    $scope.startPostId = "";
    $scope.newsPosts = [];

    $scope.logout = function () {
        userServices.Logout()
            .then(function (data) {
                console.log('yea');
                console.log(data);
            }, function (err) {
                console.log(err);
            })
    };

    $scope.nextPage = function(){
         $scope.newsFeedPosts($scope.startPostId);
            console.log($scope.newsPosts);
        console.log($scope.startPostId);
    }



    $scope.newsFeedPosts = function(startPostId){
        userServices.NewsFeedPosts(startPostId)
            .then(function(data){
                var posts = data;
                for(var i = 0; i<posts.length;i++){
                    $scope.newsPosts.push(posts[i]);
                }
                $scope.startPostId=$scope.newsPosts[$scope.newsPosts.length-1].id;
            }, function (err) {
                console.log(err);
            })
    };



});