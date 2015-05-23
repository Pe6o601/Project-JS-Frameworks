'use strict';

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute', 'ui.bootstrap', 'angular-loading-bar', 'infinite-scroll', 'customFilters']);


SocialNetwork.config(function ($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'authenticationController'
        })
        .when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'authenticationController'
        })

        .when('/home', {
            templateUrl: 'templates/home.html',
        })
        .when('/changePassword', {
            templateUrl: 'templates/changePassword.html',
            controller: 'userController'
        })
        .when('/editProfile', {
            templateUrl: 'templates/editProfile.html',
            controller: 'userController'
        })
        .when('/friends', {
            templateUrl: 'templates/friends.html',
            controller: 'friendsController'
        })
        .when('/users/:name', {
            controller: 'friendsController',
            templateUrl: function () {
                return 'templates/userWall.html';
            }
        })
        .when('/users/:name/friends', {
            controller: 'friendsController',
            templateUrl: function () {
                return 'templates/friends-of-friend.html';
            }
        })
        .otherwise({redirectTo: '/login'})
}).run(function ($rootScope,$location) {
    $rootScope.$on('$locationChangeStart', function () {
        if($location.path().indexOf('register')===-1)        {
            authorizationCheck($location);
        }

    });
});
