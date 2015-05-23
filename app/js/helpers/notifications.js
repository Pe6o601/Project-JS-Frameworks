var SocialNetwork = SocialNetwork || {};

(function () {

    var showError = function(error, notificationsService) {
        if(error.error_description) {
            notificationsService.error(error.error_description);
        } else {
            notificationsService.error(error.message);
        }
    };

    var showSuccess = function(message, notificationsService) {
        notificationsService.success(message);
    };

    SocialNetwork.showSuccess = showSuccess;
    SocialNetwork.showError = showError;
})();