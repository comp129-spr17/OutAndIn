/*
 * Apollo
 * Description: Messaging application
 * Authors: Out-N-In Team
 * License: MIT
 */

const path = require('path');
const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080


/*
 * Development Environment
 * Description: Setup for Webpack Development Environment
 */

if(process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpack = require('webpack');
  const config = require('./webpack.config');
  const compiler = webpack(config);
  
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(morgan('dev'));

// Serves static assets from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handles and serves the React app
app.get('*', function(request, response) {
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
