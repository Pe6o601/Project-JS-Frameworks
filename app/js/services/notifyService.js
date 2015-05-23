SocialNetwork.factory('notificationsService', function () {
        return {
            error: function(message) {
                noty({
                        text: message,
                        type: 'error',
                        layout: 'top',
                        timeout: 3000}
                );
            },
            success: function(message) {
                noty({
                        text: message,
                        type: 'success',
                        layout: 'top',
                        timeout: 2000}
                );
            }
        }
    }
);