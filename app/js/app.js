'use strict';

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute', 'ui.bootstrap', 'angular-loading-bar','infinite-scroll','customFilters']);


SocialNetwork.config(function ($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl:'templates/register.html',
            controller:'authenticationController'
        })
        .when('/', {
            templateUrl:'templates/login.html',
            controller:'authenticationController'
        })

        .when('/home', {
            templateUrl:'templates/home.html',
            controller:'homeController'
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
        .when('/users/:name*', {
            controller: 'friendsController',
            templateUrl: function () {
                return 'templates/userWall.html';
            }
        })
        .otherwise({redirectTo: '/'})
    });