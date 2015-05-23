SocialNetwork.controller('postController', function ($scope, postServices, $routeParams) {

    $scope.username = sessionStorage['username'];
    $scope.comments = [];
    $scope.commentsToPost = [];



    $scope.addPost = function () {
        var data = {
            postContent: $scope.postToSubmitContent,
            username: $routeParams.name
        };

        postServices.addPost(data)
            .then(function (data) {
                console.log(data)
                console.log($scope.userNewsPosts)
                $scope.newsPosts.splice(0, 0, data);
            }, function (err) {
                console.log(err);
            })
    }

    $scope.nextPageFeed = function () {
        if ($scope.isBusy) {
            return;
        }
        $scope.isBusy = true;
        postServices.NewsFeedPosts($scope.startPostId)
            .then(function (data) {
                $scope.busy = true;
                var posts = data;
                console.log(posts);
                for (var i = 0; i < posts.length; i++) {
                    $scope.newsPosts.push(posts[i]);
                }
                $scope.startPostId = $scope.newsPosts[$scope.newsPosts.length - 1].id;
                $scope.isBusy = false;
            }, function (err) {
                console.log(err);
            })
    };

    $scope.nextPageUser = function () {
        if ($scope.isBusy) {
            return;
        }
        $scope.isBusy = true;
        postServices.userWallPosts($scope.startPostId)
            .then(function (data) {
                $scope.busy = true;
                var posts = data;
                console.log(posts);
                for (var i = 0; i < posts.length; i++) {
                    $scope.newsPosts.push(posts[i]);
                }
                $scope.startPostId = $scope.newsPosts[$scope.newsPosts.length - 1].id;
                $scope.isBusy = false;
            }, function (err) {
                console.log(err);
            })
    };

    $scope.shoudShowForUser=function(username){
        return username===sessionStorage['username'];
    }

    $scope.addCommentToPost = function (post) {
        var data = {
            commentContent: $scope.commentData.content
        }
        console.log($scope.commentData);
        postServices.AddCommentToPost(post.id, data)
            .then(function (data) {
                post.comments.splice(0,0,data);
                post.totalCommentsCount++;
                console.log(data);
            }, function (err) {
                console.log(err);
            })
    }

    $scope.getCommentByPostId = function (id) {
        postServices.GetCommentByPostId(id)
            .then(function (data) {
                $scope.comments[id] = data;
                console.log($scope.comments)
            }, function (err) {
                console.log(err);
            })
    }


    $scope.editPostById = function (post) {
        var postData = {
            postContent:$scope.editPostContent
        }

        console.log(postData)

        postServices.EditPostById(post.id, postData)
            .then(function (data) {
                post.postContent=data.content;
            }, function (err) {
                console.log(err);
            })
    }

    $scope.likePost = function (post) {
        postServices.LikePost(post.id)
            .then(function (data) {
                post.liked = true;
                post.likesCount++;
            }, function (err) {
                console.log(err);
            })
    };

    $scope.unLikePost = function (post) {
        postServices.UnLikePost(post.id)
            .then(function (data) {
                post.liked = false;
                post.likesCount--;
                console.log('disLiked');
            }, function (err) {
                console.log(err);
            })
    };

    $scope.likeComment = function (post, comment) {
        console.log(comment)
        postServices.likeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = true;
                comment.likesCount++;
                console.log('disLiked');
            }, function (err) {
                console.log(err);
            })
    };

    $scope.unLikeComment = function (post, comment) {
        console.log(comment)
        postServices.unLikeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = false;
                comment.likesCount--;
                console.log('disLiked');
            }, function (err) {
                console.log(err);
            })
    };



    //$scope.toggle = function() {
    //    $scope.DSshow = !$scope.DSshow;
    //};

});