SocialNetwork.directive('likeComment', function(){
    return{
        restrict : 'E',
        templateUrl : 'templates/likesComment.html',
        controller: 'postController'
    }
});