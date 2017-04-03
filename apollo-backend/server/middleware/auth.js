module.exports = function(req, res, next) {
    // Get token from Authorization header
    var token = req.headers["authorization"];
    if (!token){
        // Token does not exist. User must login or register
        return res.status(401).json({
            header: {
                object: 'AUTH',
                action: 'authenticate',
                code: 0,
                message: "User is not authenticated"
            },
            body: {}
        });
    }

    // Parse token
    token = token.replace('Bearer ', '');
    
    // Verify the token
    jwt.verify(token, "apollo-secret", function(err, user){
        if(err){
            return res.status(401).json({
                header: {
                    object: 'AUTH',
                    action: 'authenticate',
                    code: 0,
                    message: "Token is invalid. Authenicated failed."
                },
                body: {}                
            });
        } else {
            req.user = user;
            next();
        }
    });
};
