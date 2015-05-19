SocialNetwork.controller('postController', function ($scope, postServices) {

    $scope.username = sessionStorage['username'];

    $scope.addPost = function () {
        postServices.AddPost()
            .then(function (data) {
                console.log(data);
            }, function (err) {
                console.log(err);
            })
    }



});