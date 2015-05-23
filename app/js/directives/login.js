SocialNetwork.directive('login', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/comments.html',
        controller: 'authenticationController'
    }
})