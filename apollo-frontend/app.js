/*
 * Apollo
 * Description: Messaging application
 * Authors: Out-N-In Team
 * License: MIT
 */

var path = require('path');
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080


/*
 * Development Environment
 * Description: Setup for Webpack Development Environment
 */

if(process.env.NODE_ENV !== 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Serves static assets from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handles and serves the React app
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html')
});

// Express app listens and serves the React app
app.listen(PORT, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("Apollo app is listening on port %s. \nVisit http://localhost:%s/ in your browser.", PORT, PORT);
  }
});
