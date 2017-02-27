var socket = require('socket.io-client')('http://localhost:4200');
var Promise = require('bluebird');

var API_URL = 'http://localhost:4200/api/v1';
var _self;
var Apollo = function(){
    this.credentials = {
        client_id: "",
        api_key: ""
    };
    this._events = {
        "message": []
    };
    this.socket = socket;
    _self = this;
    socket.on('message', function(data) {
        console.log("EVENTS: " + _self._events);
        for(event in _self._events["message"]){
            _self._events["message"][event](data);
        }
    });
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
    return fetch(getURL);
};

Apollo.prototype.usersGetAll = function(){
    return _self._get('users', {});
};

Apollo.prototype.sendMessage = function(msg){
    socket.emit('message', { message: msg });
};

Apollo.prototype.register = function(compRef, funcName) {
    _self._events["message"].push(compRef[funcName]);
}
