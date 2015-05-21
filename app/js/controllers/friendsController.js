'use strict';
SocialNetwork.controller('friendsController', function ($scope, friendsServices, $location) {

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

    //todo mani go ot tyrsachata da zima prosot userrname  v direktiva
    //tui dolu gi zima ama trqbva da gi printi na userWalla
    //trqbva funckciq na ng-click koqto da zima username i posle kato se vika
    //view to da gi typ4e
    $scope.getUserWall = function(){
      //  console.log($scope);

        friendsServices.getUserWall(sessionStorage['searchedUser'])
           .then(function(data){
                $scope.searchedUser= data;
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