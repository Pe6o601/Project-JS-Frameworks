'use strict';
SocialNetwork.controller('friendsController', function ($scope, friendsServices, $location, $routeParams, $rootScope,notificationsService, $http) {

    SetHeaders($http);

    $scope.search = function(){
        $('#my-div').show();
        if(!$scope.search.searchTerm){
            $('#my-div').hide();
        }else {
            friendsServices.SearchByName($scope.search.searchTerm)
                .then(function (data) {
                    
                    $scope.findedUsers = data;
                }, function (error) {
                    SocialNetwork.showError(error, notificationsService);
                    
                }).finally(function () {
                    $('#my-div').hide();
                })
        }
    };

    $scope.loadFriends = function() {
        $('#my-div').show();
        friendsServices.getFriends()
            .then(function (data) {
                $scope.myFriends = data;
            }, function(error) {
                SocialNetwork.showError(error, notificationsService);
                
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.getUserWall = function(){
        $('#my-div').show();
        friendsServices.getUserWall(sessionStorage['searchedUser'])
           .then(function(data){
                $scope.searchedUser = data;
                    $scope.wallOwner=data;

           }, function (error) {
                SocialNetwork.showError(error, notificationsService);
               
           }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.showMyFriends = function () {
        $('#my-div').show();
        friendsServices.getMyFriends()
            .then(function (data) {
                
               $scope.myFriends = data;
                $scope.friendsTotalCount = data.length;
            }, function(error){
                SocialNetwork.showError(error, notificationsService);
                
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.showFullFriendsOfUser = function () {
        $('#my-div').show();
        friendsServices.getUserFriends()
            .then(function (data) {
                
                $scope.myFriends = data;
                $scope.friendsTotalCount = data.length;
            }, function(error){
                SocialNetwork.showError(error, notificationsService);
                
            }).finally(function () {
                $('#my-div').hide();
            })
    };


    $scope.showFriendsOfUser = function () {
        $('#my-div').show();
        friendsServices.showFriendsOfUser($routeParams.name)
            .then(function (data) {
                
                $scope.myFriends = data.friends;
                $scope.friendsTotalCount = data.totalCount;
            }, function(error){
                SocialNetwork.showError(error, notificationsService);
                
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.redirectToUsersPage = function(username){
        $scope.searchedUser  = username;
        sessionStorage['searchedUser'] = username;
        
        $location.path('/users/' + username);
    }

    $scope.getReceivedRequests = function () {
        $('#my-div').show();
        friendsServices.getReceivedRequests()
            .then(function (data) {

                $rootScope.watingRequests = data;
                $rootScope.watingRequestsLenght = data.length;

            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.sendFriendRequest = function (username) {
        $('#my-div').show();
        friendsServices.sendFriendRequest(username)
            .then(function (data) {

                $scope.searchedUser.hasPendingRequest = true;

            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.getUserFriends = function () {
        $('#my-div').show();
        friendsServices.getUserFriends($routeParams.name)
            .then(function (data) {
                $scope.userFriends = data;
                $scope.userFriednName = $routeParams.name;
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                
            }).finally(function () {
                $('#my-div').hide();
            })
    };


    $scope.acceptFriendRequest = function (userId) {
        $('#my-div').show();
        friendsServices.acceptFriendRequest(userId)
            .then(function (data) {
                $rootScope.myFriendsLength = $scope.myFriendsLength + 1;
                $rootScope.watingRequestsLenght--;
                var tempArr = [];
                $rootScope.watingRequests.forEach(function (key, val) {
                    if (key.id !== userId) {
                        //$rootScope.watingRequests[val];
                        tempArr.push(key);
                        
                    }

                    
                })
                $rootScope.watingRequests = tempArr;
                SocialNetwork.showSuccess('Accepted successfully', notificationsService);

                
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                
            }).finally(function () {
                $('#my-div').hide();
            });
    };
    //rejectFriendRequest
    $scope.rejectFriendRequest = function (userId) {
        $('#my-div').show();
        friendsServices.rejectFriendRequest(userId)
            .then(function (data) {
                var index = 0;
                $rootScope.watingRequestsLenght--;
                var tempArr = [];
                $rootScope.watingRequests.forEach(function (key, val) {
                    if (key.id !== userId) {
                        //$rootScope.watingRequests[val];
                        tempArr.push(key);
                        
                    }

                    
                })
                $rootScope.watingRequests = tempArr;
                SocialNetwork.showSuccess('He is forever alone because of you', notificationsService);

            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                
            }).finally(function () {
                $('#my-div').hide();
            });
    }

    $scope.redirectToUserFriends=function(searchedUser){
        if(searchedUser===undefined){
            $location.path("/friends");
        }else {
            console.log(searchedUser)
            if (searchedUser.username !== sessionStorage.username) {
                $location.path("/users/" + searchedUser.username + "/friends");
            }
            if (searchedUser.username === sessionStorage.username) {
                $location.path("/friends");
            }
        }

    }



});