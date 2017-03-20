module.exports = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');

    // Intercepts OPTIONS method
    if('OPTIONS' === req.method) {
      // Respond with 200 code
      res.sendStatus(200);
    } else {
      next();
    }
};
