SocialNetwork.directive('divBackImage', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('divBackImage', function (value) {
                if (value) {
                    $('#' + (attrs.id)).css("background-image", "url('" + value.replace(/(\r\n|\n|\r)/gm, "") + "')");
                    scope.variable = value;
                } else {
                    $('#' + (attrs.id)).css("background-image", "url('resources/missingProfilePicture.jpg')");
                }
            });
        }
    }
});
