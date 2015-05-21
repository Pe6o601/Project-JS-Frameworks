SocialNetwork.directive('errsrc', function () {
    return {
        link: function ($scope, element, attrs) {
            //console.log(element);
            if (attrs['ng-src'] === undefined) {
                $(element).attr("src", "resources/missingProfilePicture.jpg");
            }
        }
    }
});