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
        for(index in _self._events["message"]){
            // 'this' context from function origin
            var funcContext = _self._events["message"][index]["self"];
            // function handler
            var func = _self._events["message"][index]["func"];
            func(funcContext, data);
        }
    });
};

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
    return this._get('users', {});
};

Apollo.prototype.sendMessage = function(msg){
    socket.emit('message', msg);
};

Apollo.prototype.registerSocketEvent = function(compRef, eventName, funcName) {
    console.log("REF: " + compRef);
    this._events[eventName].push({self: compRef, func: compRef[funcName]});
}

//var client = exports.client = new Apollo();
module.exports = Apollo;
