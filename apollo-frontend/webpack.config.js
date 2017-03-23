var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        './src/index'
    ],
    module: {
        loaders: [{ 
            test: /\.js?$/, loader: 'babel', query: { presets: ['es2015', 'react', 'stage-2' ]},exclude: /node_modules/ 
        }, {
            test: /\.(css|scss|sass)$/, loader: 'style!css!sass' 
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: path.join(__dirname, '/public'),
        publicPath: '/',
        filename: 'apollo-core.js'
    },
    devServer: {
        contentBase: './public',
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
