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



});