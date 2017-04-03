
/**
 *  @(Project): Apollo Backend
 *  @(Filename): controller.js
 *  @(Description): Controller helper methods
 *  @(Authors): Out-N-In Team
 *  @(License): MIT
 */

var ResponsePayload = function(status, count, type, results){
	var _status, _count, _type, _results;
	if(typeof status != 'string' || status != ""){
		_status = "";	
	}
	if(typeof count != 'number' || count < 0){
		_count = "";	
	}	
	if(typeof type != 'string' || status != ""){
		_type = "";	
	}
	if(!Array.isArray(results) || results.length < 0){
		_results = [];	
	}
	this.response = {
		status: _status,
		count: _count,
		type: _type,
		results: _results
	};
};

ResponsePayload.prototype.setStatus = function(status){
	this.response.status = status;
};

ResponsePayload.prototype.setCount = function(count){
	this.response.count = count;
};

ResponsePayload.prototype.setType = function(type){
	this.response.type = type;
};

ResponsePayload.prototype.pushResult = function(values){
	this.response.results.push(values);
};

ResponsePayload.prototype.getResponse = function(values){
	return this.response;
};

module.exports = ResponsePayload;
