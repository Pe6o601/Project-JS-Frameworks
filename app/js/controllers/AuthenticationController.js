'use strict';
SocialNetwork.controller("authenticationController", function ($scope, userServices, $location,notificationsService) {
    $scope.register = function () {
        $('#my-div').show();
        userServices.Register($scope.registerData)
            .then(function (data) {
                SetCredentials(data);
                SocialNetwork.showSuccess('Register successful', notificationsService);
                $location.path('/home');
                console.log(data)
            },function(error){
                SocialNetwork.showError(error, notificationsService);
            }).finally(function () {
                $('#my-div').hide();
            });
    };

    $scope.login = function () {
        $('#my-div').show();
        userServices.Login($scope.loginData)
            .then(function (data) {
                SetCredentials(data);
                $location.path('/home');
                SocialNetwork.showSuccess('Logged successful', notificationsService);
                console.log(data)
            },function(error){
                SocialNetwork.showError(error, notificationsService);
            }).finally(function () {
                $('#my-div').hide();
            });

    };

    $scope.isLogged= function () {
        if(sessionStorage['accessToken']){
            return true;
        }else{
            return false;
        }
    }
});