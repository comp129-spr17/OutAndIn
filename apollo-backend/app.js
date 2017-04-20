#!/usr/bin/env node

/**
 *  @(Project): Apollo Backend
 *  @(Filename): app.js
 *  @(Description): Backend services for web and mobile clients
 *  @(Authors): Out-N-In Team
 *  @(License): MIT
 */

/**
 *  App Dependencies
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('apollo-backend:server');
var setup = require('./setup');

/**
 * Application Initialization
 */
// Express Instance
var app = express();
// Create HTTP server from Express app
var server = require('http').Server(app);

/**
 * Socket.io Initialization
 */
// Socket.io Instance
var io = require('socket.io')(server, {
    'serveClient': false
});

/**
 * Route Handler Modules
 */
// REST API route handler module
var routes = require('./server/routes');
// Socket.io route handler module
var sockets = require('./controllers/sockets');


/**
 * Middleware Handlers
 */
// Attach socket.io to res to allow REST routes to interact with sockets
app.use(function(req, res, next){
    res.socketIO = io;
    next();
});
// Logging
app.use(logger('dev'));
// Body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cookie parsing
app.use(cookieParser("super-secret"));
// Cross origin request sharing
app.use(require('./server/middleware/cors'));
app.use(require('./server/middleware/auth'));

/**
 * Route Handlers
 */
// Route Handlers
app.use('/api/v1', routes);
// IO Handlers
sockets(io);

// Setup script for database
setup.init();

/**
 * Error Handlers
 */
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// Error handler
app.use(function(err, req, res, next) {
	// Render the error page
	res.status(err.status || 500);
	res.json({error: "error"});
});

/**
 * Start server
 */
// Get port from environment and store in Express
var port = normalizePort(process.env.PORT || '4200');
app.set('port', port);
// Listen on provided port, on all network interfaces
server.listen(port);
// Error handlers for failed server start
server.on('error', onError);
server.on('listening', onListening);

/**
 *  @(Description): Normalize a port into a number, string, or false
 *  @(Params): {int} : Port number
 *  @(Return): {int} : Port Number
 *              or
 *             {boolean} : Error
 */
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * @(Description): Event listener for HTTP server "error" event
 * @(Params): {Error}: Error
 * @(Return): {Error}: Error
 *             or
 *            {SIGTERM}: None // Process kill
 */
function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // Handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
  }
}

/**
 * @(Description): Event listener for HTTP server "listening" event
 * @(Params): None
 * @(Return): None
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
