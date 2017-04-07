/**
 *  Apollo
 *  @description: Controller helper methods
 *  @author: Out-N-In Team
 *  @license: MIT
 */

/**
 * ResponseObject
 * @constructor
 * @description: Response object template
 * @param: {boolean} success - Success flag
 * @param: {array or null} errors - Collection of errors
 * @param: {array or null} results - Collection of results
 * @return: {none}
 */
var responseObject = function(success, errors, results){
	var _success, _errors, _results;
	if(typeof success != 'boolean' || typeof success === "undefined"){
		_success = false;	
	}
	if(typeof errors !== "object" || typeof errors === "undefined" || (Array.isArray(errors) && errors.length == 0)){
		_errors = null;	
	}
	if(typeof results !== "object" || typeof results === "undefined" || (Array.isArray(results) && errors.length == 0)){
		_results = null;	
	}
	// Response object
	this._response = {
		success: _success,
		errors: _errors,
		results: _results
	};
};

/**
 * SetSuccess
 * @description: Sets the success flag of the response object
 * @param: {boolean} success - Success flag
 * @return: {none}
 */
responseObject.prototype.setSuccess = function(flag){
	this._response.success = flag;
};

/**
 * SetErrors
 * @description: Set errors for the response object
 * @param: {boolean} errors - Collection or object of errors
 * @return: {none}
 */
responseObject.prototype.setErrors = function(errors){
	if(Array.isArray(errors)){
		this._response.errors = errors;
		return;
	}
	if(this._response.errors == null){
		this._response.errors = [];
	}
	if(Array.isArray(this._response.errors)){
		this._response.errors.push(errors);
	}
};

/**
 * SetResults
 * @description: Set results for the response object
 * @param: {boolean} results - Collection or object of results
 * @return: {none}
 */
responseObject.prototype.setResults = function(results){
	if(Array.isArray(results)){
		this._response.results = results;
		return;
	}
	if(this._response.results == null){
		this._response.results = [];
	}
	if(Array.isArray(this._response.results)){
		this._response.results.push(results);
	}
};

/**
 * ToJSON
 * @description: Returns response object
 * @param: {none}
 * @return: {object} response - Response object
 */
responseObject.prototype.toJSON = function(){
	return this._response;
};

/**
 * ToString
 * @description: Logging helper
 * @param: {none}
 * @return: {object} response - Response object
 */
responseObject.prototype.toString = function(){
	return this._response;
};

/**
 * Inspect
 * @description: Logging helper
 * @param: {none}
 * @return: {string} response - String of response object
 */
responseObject.prototype.inspect = function(){
	return this.toString();
};

// Module wrapper
var controller = {
	responseObject: responseObject
};

module.exports = controller;
