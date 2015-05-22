'use strict';
SocialNetwork.controller('friendsController', function ($scope, friendsServices, $location, $routeParams, $rootScope) {




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

    $scope.getReceivedRequests = function () {
        friendsServices.getReceivedRequests()
            .then(function (data) {

                $rootScope.watingRequests = data;
                $rootScope.watingRequestsLenght = data.length;

            }, function (err) {
                console.log(err);
            })
    };

    $scope.sendFriendRequest = function (username) {
        friendsServices.sendFriendRequest(username)
            .then(function (data) {

                $scope.searchedUser.hasPendingRequest = true;

            }, function (err) {
                console.log(err);
            })
    };

    $scope.getUserFriends = function () {

        friendsServices.getUserFriends($routeParams.name)
            .then(function (data) {
                $scope.userFriends = data;
                $scope.userFriednName = $routeParams.name;
            }, function (err) {
                console.log(err);
            })
    };


    $scope.acceptFriendRequest = function (userId) {
        friendsServices.acceptFriendRequest(userId)
            .then(function (data) {
                $rootScope.myFriendsLength = $scope.myFriendsLength + 1;
                $rootScope.watingRequestsLenght--;
                var tempArr = [];
                $rootScope.watingRequests.forEach(function (key, val) {
                    if (key.id !== userId) {
                        //$rootScope.watingRequests[val];
                        tempArr.push(key);
                        console.log('deleted')
                    }

                    console.log($rootScope.watingRequests.length)
                })
                $rootScope.watingRequests = tempArr;
                console.log($rootScope.watingRequestsLenght)
            }, function (err) {
                console.log(err)
            });
    };
    //rejectFriendRequest
    $scope.rejectFriendRequest = function (userId) {
        friendsServices.rejectFriendRequest(userId)
            .then(function (data) {
                var index = 0;
                $rootScope.watingRequestsLenght--;
                var tempArr = [];
                $rootScope.watingRequests.forEach(function (key, val) {
                    if (key.id !== userId) {
                        //$rootScope.watingRequests[val];
                        tempArr.push(key);
                        console.log('deleted')
                    }

                    console.log($rootScope.watingRequests.length)
                })
                $rootScope.watingRequests = tempArr;
            }, function (err) {
                console.log(err)
            });
    }



});