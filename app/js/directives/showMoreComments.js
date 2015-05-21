SocialNetwork.directive('showMoreComments', function () {
    return{
        restrict:'E',
        templateUrl:'templates/moreComments.html',
        controller:'postController'
    }
})