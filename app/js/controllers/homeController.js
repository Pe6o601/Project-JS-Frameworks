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
        if ($scope.isBusy) {
            return;
        }
        $scope.isBusy = true;
        userServices.NewsFeedPosts($scope.startPostId)
            .then(function (data) {
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

    $scope.addCommentToPost = function (postId) {
        var data = {
            commentContent: $scope.commentData.content
        }
        console.log($scope.commentData);
        userServices.AddCommentToPost(postId, data)
            .then(function (data) {
                console.log('yea');
                console.log(data);
            }, function (err) {
                console.log(err);
            })
    }

    $scope.getCommentByPostId = function (id) {
        userServices.GetCommentByPostId(id)
            .then(function (data) {
                console.log('yea');
                $scope.comments = data.comments;
            }, function (err) {
                console.log(err);
            })
    }


});