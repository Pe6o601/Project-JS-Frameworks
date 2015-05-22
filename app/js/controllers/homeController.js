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
                sessionStorage.clear();
                redirectToLogin();
            }, function (err) {
                console.log(err);
            })
    };

    $scope.redirectToLogin = function(){
        $scope.searchedUser  = username;
        $location.path('/');
    }



});