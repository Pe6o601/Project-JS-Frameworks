'use strict';
SocialNetwork.controller("authenticationController", function ($scope, userServices, $location,$rootScope) {
    $scope.register = function () {

        userServices.Register($scope.registerData)
            .then(function (data) {
                SetCredentials(data);
                $location.path('/home');
                console.log(data)
            });
    };

    $scope.login = function () {

        userServices.Login($scope.loginData)
            .then(function (data) {
                SetCredentials(data);
                $location.path('/home');

                console.log(data)
            });

    };
});