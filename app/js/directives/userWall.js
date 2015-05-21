SocialNetwork.directive('userwall', function(){

    return{
        restrict : 'E',
        templateUrl : 'templates/wallTemplate.html',
        controller: 'friendsController',
        controllerAs : 'friendsController'
    }
});