var extend = require('xtend');
var request = require('request');
var querystring = require('querystring');
var socket = require('socket.io-client')('http://localhost:4200');
var Promise = require('bluebird');

var API_URL = 'http://localhost:4200/api/v1';

var Apollo = function(){
    this.credentials = {
        client_id: "",
        api_key: ""
    };
};
module.exports = Apollo;

Apollo.prototype._get = function(url, parameters){
    //parameters = extend(parameters, this.credentials); // Add credentials to parameters
    var getURL = "";
    if(parameters.length > 0) {
        getURL = API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters
    } else {
        getURL = API_URL + '/' + url;
    }
    return new Promise((resolve, reject) => {
        request.get({
            url: getURL,
            strictSSL: false,
            json: true
        }, function(error, response, body) {
            /*
            if(!error && body.status !== 'OK') {
                error = new Error(body);
                reject(error);
                return;
            }
            */
            console.log("Error: " + error);
            console.log("Resp: " + JSON.stringify(response));
            console.log("Body: " + JSON.stringify(body));
            resolve(body || {});
        });
    });
};

Apollo.prototype.usersGetAll = function(){
    return this._get('users', {});
};
