SocialNetwork.controller("userController", function ($scope, userServices, $location, notificationsService) {

    $scope.changePassword = function () {
        userServices.changePassword($scope.changePasswordData)
            .then(function(data){
                SocialNetwork.showSuccess('Changed', notificationsService);
            }, function(error) {
                SocialNetwork.showError(error, notificationsService);
            }).finally(function () {
                $('#my-div').hide();
            });
        $location.path('/home');
    };

    $scope.getUserData = function() {
        userServices.getUserData()
            .then(function(data) {
                $scope.editData = data;
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            });
    };

    $scope.editProfile = function() {
        userServices.editProfile($scope.editData)
            .then(function (data) {
                SocialNetwork.showSuccess('Profile Changed', notificationsService);
                console.log(data);
            }, function (error) {
                SocialNetwork.showError(error, notificationsService);
                console.log(error);
            }).finally(function () {
                $('#my-div').hide();
            })
    };

    $scope.uploadProfilePicture = function () {
        selectFile("profilePicture", "profilePicturePreview");
    };

    $scope.uploadCoverPicture = function () {
        selectFile("coverPicture", "coverPicturePreview");
    };

    function selectFile(inputSelector, picturePreview){
        $('body').on('change', "#" + inputSelector, function() {
            var fileInput = document.getElementById(inputSelector);
            var file = fileInput.files[0];
            var reader = new FileReader();
            reader.onload = function () {
                var targetSource = document.getElementById(picturePreview);
                targetSource.src = reader.result;
                if(inputSelector == "profilePicture"){
                    $scope.editData.profileImageData = targetSource.src;
                }
                else{
                    $scope.editData.coverImageData = targetSource.src;
                }
            };
            reader.readAsDataURL(file);
        });
    }
});