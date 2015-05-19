'use strict';
//, $location, mainData, authentication, notifyService
SocialNetwork.controller('HomepageController', function ($scope, userServices) {

    $scope.username = sessionStorage['username'];

    $scope.logout = function(){
        userServices.Logout()
            .then(function(data){
                console.log('yea')
                console.log(data);
            }, function(err){
                console.log(err);
            } )
    }

});