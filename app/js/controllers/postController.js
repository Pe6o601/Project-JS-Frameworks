SocialNetwork.controller('postController', function ($scope, postServices, $routeParams, notificationsService) {

    $scope.username = sessionStorage['username'];
    $scope.comments = [];
    $scope.commentsToPost = [];
    $scope.startPostId = "";
    $scope.isBusy = false;
    $scope.init= function () {
        $scope.newsPosts = [];
    }


    $scope.addPost = function () {
        $('#my-div').show();
        var data = {
            postContent: $scope.postToSubmitContent,
            username: $routeParams.name
        };

        postServices.addPost(data)
            .then(function (data) {
                console.log(data)
                console.log($scope.newsPosts)
                $scope.newsPosts.splice(0, 0, data);
                SocialNetwork.showSuccess('Post added', notificationsService);

            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    }

    $scope.nextPageFeed = function () {
        $('#my-div').show();
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
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.nextPageUser = function () {
        $('#my-div').show();
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
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.isMe = function (author) {

        if (author.username === sessionStorage['username']) {
            return true
        }

        return false;

        //()||
    }

    $scope.addCommentToPost = function (post) {
        $('#my-div').show();
        var data = {
            commentContent: $scope.commentData.content
        }
        console.log($scope.commentData);
        postServices.AddCommentToPost(post.id, data)
            .then(function (data) {
                post.comments.splice(0, 0, data);
                post.totalCommentsCount++;
                console.log(data);
                SocialNetwork.showSuccess('Comment added', notificationsService);

            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    }

    $scope.getCommentByPostId = function (post) {
        $('#my-div').show();
        postServices.GetCommentByPostId(post.id)
            .then(function (data) {
                data.forEach(function (key, val) {
                    if (val > 2) {
                        if (post.comments.filter(function (p) {
                                return p.id === key.id;
                            }).length === 0) {
                            post.comments.push(key);
                        }
                    }
                })
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    }


    $scope.editPostById = function (post) {
        $('#my-div').show();
        var postData = {
            postContent: $scope.editPostContent
        };

        console.log(postData);

        postServices.EditPostById(post.id, postData)
            .then(function (data) {
                post.postContent = data.content;
                SocialNetwork.showSuccess('Edited', notificationsService);

            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    }

    $scope.deletePost = function (postId) {
        $('#my-div').show();
        postServices.deletePost(postId)
            .then(function (data) {
                console.log(data);
                console.log($scope.newsPosts);
                for (var i = $scope.newsPosts.length - 1; i >= 0; i--) {
                    if ($scope.newsPosts[i].id === postId) {
                        $scope.newsPosts.splice(i, 1);
                        break;
                    }
                }

                SocialNetwork.showSuccess('Deleted', notificationsService);

            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.likePost = function (post) {
        $('#my-div').show();
        postServices.LikePost(post.id)
            .then(function (data) {
                post.liked = true;
                post.likesCount++;
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.unLikePost = function (post) {
        $('#my-div').show();
        postServices.UnLikePost(post.id)
            .then(function (data) {
                post.liked = false;
                post.likesCount--;
                console.log('disLiked');
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.likeComment = function (post, comment) {
        $('#my-div').show();
        console.log(comment)
        postServices.likeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = true;
                comment.likesCount++;
                console.log('disLiked');
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.unLikeComment = function (post, comment) {
        $('#my-div').show();
        console.log(comment)
        postServices.unLikeComment(post.id, comment.id)
            .then(function (data) {
                comment.liked = false;
                comment.likesCount--;
                console.log('disLiked');
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.editComment = function (post, comment) {
        $('#my-div').show();
        postServices.editComment(post, comment, $scope.commentEdit)
            .then(function (data) {

                post.comments.forEach(function (key, val) {
                    if (key.id == comment.id) {
                        key.commentContent = data.commentContent;
                    }
                })

                SocialNetwork.showSuccess('Edited', notificationsService);

            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    }
    $scope.deleteComment = function (post, comment) {
        $('#my-div').show();
        postServices.deleteComment(post, comment)
            .then(function (data) {
                console.log('asd');
                console.log(post);
                var commentToDel;
                post['comments'].forEach(function (key, val) {
                    if (key.id == comment.id) {
                        commentToDel = key;
                    }
                })

                for (var i = post.comments.length - 1; i >= 0; i--) {
                    if (post.comments[i].id === commentToDel.id) {
                        post.comments.splice(i, 1);
                        break;
                    }
                }

                post.totalCommentsCount--;
                SocialNetwork.showSuccess('Deleted', notificationsService);

            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    }


    //$scope.toggle = function() {
    //    $scope.DSshow = !$scope.DSshow;
    //};

});