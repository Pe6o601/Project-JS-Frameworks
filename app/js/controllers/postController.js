SocialNetwork.controller('postController', function ($scope, postServices) {

    $scope.username = sessionStorage['username'];
    $scope.comments = [];
    $scope.commentsToPost = [];


    $scope.addPost = function () {
        postServices.AddPost()
            .then(function (data) {
                console.log(data);
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
                post.comments.push(data);
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

    $scope.toggle = function() {
        $scope.DSshow = !$scope.DSshow;
    };

});