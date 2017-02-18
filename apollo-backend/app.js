var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./server/routes');

var app = express();
var server; 		//HTTP Server
var io;				//Socket.io

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow for Cross Origin Domain Requests
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With');

    // Intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      // Respond with 200 code
      res.send(200);
    }
    else {
      next();
    }
});

// Routes
app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Create HTTP server
server = http.createServer(app);

//websockets
io = require('socket.io')(server);

io.on('connection', function(socket){
	socket.emit('news', {data:'yeee'});
	socket.on('my other event', function(data){
		console.log(data);
	});
});


module.exports.app = app;
module.exports.server = server;
