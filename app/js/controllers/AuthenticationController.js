'use strict';
SocialNetwork.controller("authenticationController", function ($scope, userServices, $location) {
    $scope.register = function () {

        userServices.Register($scope.registerData)
            .then(function(data){
                userServices.SetCredentials(data);

                console.log(data)
            });
        $location.path('/home');
    };

    $scope.login = function () {

        userServices.Login($scope.loginData)
            .then(function(data){
                userServices.SetCredentials(data);

                console.log(data)
            });
        $location.path('/home');

    };
});