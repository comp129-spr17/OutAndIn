module.exports = function(req, res, next) {
	// Intercept Cross Origin Resource Sharing
	// Check if Origin header is set
	var origin = req.get('Origin');
	if(origin){
		// Add the following headers to the response to allow CORS
		res.header("Access-Control-Allow-Origin", origin);
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Expose-Headers", "Content-Encoding, Content-Length, Content-Type, Date, Server");
	}
    next();
};
