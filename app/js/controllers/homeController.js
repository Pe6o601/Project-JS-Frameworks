'use strict';
//, $location, mainData, authentication, notifyService
SocialNetwork.controller('homeController', function ($scope, userServices, $q) {

    $scope.username = sessionStorage['username'];
    $scope.startPostId = "";
    $scope.newsPosts = [];
    $scope.isBusy = false;


    $scope.logout = function () {
        userServices.Logout()
            .then(function (data) {
                console.log('yea');
                console.log(data);
            }, function (err) {
                console.log(err);
            })
    };

    $scope.nextPage = function () {
        if($scope.isBusy){
            return;
        }
        $scope.isBusy = true;
        userServices.NewsFeedPosts($scope.startPostId)
            .then(function (data) {
                //console.log($scope.startPostId);

                $scope.busy = true;
                var posts = data;
                for (var i = 0; i < posts.length; i++) {
                    $scope.newsPosts.push(posts[i]);
                }
                $scope.startPostId = $scope.newsPosts[$scope.newsPosts.length - 1].id;
                $scope.isBusy = false;
            }, function (err) {
                console.log(err);
            })
    };


    $scope.newsFeedPosts = function (startPostId) {


    };


});