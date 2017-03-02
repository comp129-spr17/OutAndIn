var axios = require('axios');

var Apollo = function(){
    this.API_URL = 'http://localhost:4200/api/v1';
    this.credentials = {
        client_id: "",
        api_key: ""
    };
    this.socketEvents();
};

Apollo.prototype.socketEvents = function(){
    this._events = {
        "message": []
    };
    this.socket = require('socket.io-client')('http://localhost:4200');
    var self = this;
    this.socket.on('message', function(data) {
        for(var index in self._events["message"]){
            // 'this' context from function origin
            var funcContext = self._events["message"][index]["self"];
            // function handler
            var func = self._events["message"][index]["func"];
            func(funcContext, data);
        }
    });
};

Apollo.prototype.registerSocketEvent = function(compRef, eventName, funcName) {
    this._events[eventName].push({self: compRef, func: compRef[funcName]});
}

Apollo.prototype._get = function(url, parameters){
    //parameters = extend(parameters, this.credentials); // Add credentials to parameters
    return;
    var getURL = "";
    if(parameters.length > 0) {
        getURL = this.API_URL + '/' + url + '?' + querystring.stringify(parameters); // Construct URL with parameters
    } else {
        getURL = this.API_URL + '/' + url;
    }
    return axios.get(getURL);
};

Apollo.prototype.usersGetAll = function(){
    return this._get('users', {});
};

Apollo.prototype.sendMessage = function(msg){
    this.socket.emit('message', msg);
};

module.exports = Apollo;
