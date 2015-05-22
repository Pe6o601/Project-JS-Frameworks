SocialNetwork.directive('comments', function(){
    return{
        restrict : 'E',
        templateUrl : 'templates/comments.html',
        controller: 'postController'
    }
});