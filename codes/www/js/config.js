var SERVER = '';
var HOST = '';
var WEBSOCKET_HOST = '';

function set_server() {

    if (window.location.origin.includes("compass")) {
        SERVER = 'https://vm2967.tmdcloud.com/';
        WEBSOCKET_HOST = 'wss://vm2967.tmdcloud.com';
    }
    else if (window.location.origin.includes("https://localhost")) {
        SERVER = 'https://lifeforceenergy.us:4443/';
        WEBSOCKET_HOST = 'wss://api.dreampotential.org';
    }

    else if (window.location.origin.includes("127.0.0.1")) {
        SERVER = 'http://localhost:8040/';
        WEBSOCKET_HOST = 'wss://localhost:8040';
    }
    else if (window.location.origin.includes("localhost:12")) {
        SERVER = 'http://localhost:8040/';
        WEBSOCKET_HOST = 'wss://localhost:8040';
    }
    else {
        SERVER = 'https://lifeforceenergy.us:4443/';
        WEBSOCKET_HOST = 'wss://api.dreampotential.org';
    }
};
set_server()
