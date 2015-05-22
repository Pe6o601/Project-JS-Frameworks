'use strict';
SocialNetwork.controller('friendsController', function ($scope, friendsServices, $location, $routeParams) {

    $scope.search = function(){
        friendsServices.SearchByName($scope.search.searchTerm)
            .then(function(data){
                console.log(data);
               $scope.findedUsers = data;
            }, function(err){
                console.log(err);
            })
    };

    $scope.loadFriends = function() {
        friendsServices.getFriends()
            .then(function (data) {
                $scope.myFriends = data;
            }, function(error) {
                console.log(error);
            })
    };

    $scope.getUserWall = function(){
        friendsServices.getUserWall(sessionStorage['searchedUser'])
           .then(function(data){
                $scope.searchedUser = data;
                console.log(data);
           }, function (error) {
               console.log(error);
           })
    };

    $scope.showMyFriends = function () {
        friendsServices.getMyFriends()
            .then(function (data) {
                console.log(data);
               $scope.myFriends = data;
                $scope.friendsTotalCount = data.length;
            }, function(err){
                console.log(err);
            })
    };


    $scope.showFriendsOfUser = function () {
        friendsServices.showFriendsOfUser($routeParams.name)
            .then(function (data) {
                console.log(data);
                $scope.myFriends = data.friends;
                $scope.friendsTotalCount = data.totalCount;
            }, function(err){
                console.log(err);
            })
    };

    $scope.redirectToUsersPage = function(username){
        $scope.searchedUser  = username;
        sessionStorage['searchedUser'] = username;
        console.log($scope);
        $location.path('/users/' + username);
    }



});