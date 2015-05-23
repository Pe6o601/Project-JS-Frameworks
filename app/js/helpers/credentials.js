function SetCredentials (serverData) {
    sessionStorage['accessToken'] = serverData.access_token;
    sessionStorage['username'] = serverData.userName;
}

function SetHeaders ($http) {
    $http.defaults.headers.common = GetHeaders();
}

function RemoveHeaders ($http){
    delete $http.defaults.headers.common;
}

function authorizationCheck(location) {
    if (!sessionStorage.getItem('accessToken')) {
        location.path('/login');
    }
}

function GetHeaders() {
    return {
        'Authorization': 'Bearer ' + sessionStorage['accessToken']
    };
}
