'use strict';
SocialNetwork.controller("authenticationController", function ($scope, userServices, $location,notificationsService,$http) {


    $scope.register = function () {
        $('#my-div').show();
        userServices.Register($scope.registerData)
            .then(function (data) {
                SetCredentials(data);
                SetHeaders($http);
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
                SetHeaders($http);
                $location.path('/home');
                SocialNetwork.showSuccess('Logged successful', notificationsService);
                console.log(data)
            },function(error){
                SocialNetwork.showError(error, notificationsService);
            }).finally(function () {
                $('#my-div').hide();
            });

    };

    $scope.logout = function () {
        userServices.Logout()
            .then(function (data) {
                sessionStorage.clear();
                RemoveHeaders($http);
                $scope.redirectToLogin();
                SocialNetwork.showSuccess('Why you leave us', notificationsService);
            }, function (err) {
                console.log(err);
            })
    };

    $scope.redirectToLogin = function(){
        $location.path('/');
    }

    $scope.isLogged= function () {
        if(sessionStorage['accessToken']){
            return true;
        }else{
            return false;
        }
    }
});