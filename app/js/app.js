'use strict';

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute', 'ui.bootstrap', 'angular-loading-bar','infinite-scroll']);


SocialNetwork.config(function ($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl:'templates/register.html',
            controller:'authenticationController'
        })
        .when('/login', {
            templateUrl:'templates/login.html',
            controller:'authenticationController'
        })

        .when('/home', {
            templateUrl:'templates/home.html',
            controller:'homeController'
        })
        .otherwise({redirectTo: '/'})

    });