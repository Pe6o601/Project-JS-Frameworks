'use strict';

var SocialNetwork = angular.module('SocialNetwork', ['ngRoute', 'ui.bootstrap', 'angular-loading-bar']);


SocialNetwork.config(function ($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl:'templates/register.html',
            controller:'AuthenticationController'
        })
        .when('/login', {
            templateUrl:'templates/login.html',
            controller:'AuthenticationController'
        })

        .when('/home', {
            templateUrl:'templates/home.html',
            controller:'HomepageController'
        })
        .otherwise({redirectTo: '/'})

    });