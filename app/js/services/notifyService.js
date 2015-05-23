SocialNetwork.factory('notificationsService', function () {
        return {
            error: function(message) {
                noty({
                        text: message,
                        type: 'error',
                        layout: 'center',
                        timeout: 3000}
                );
            },
            success: function(message) {
                noty({
                        text: message,
                        type: 'success',
                        layout: 'center',
                        timeout: 2000}
                );
            }
        }
    }
);