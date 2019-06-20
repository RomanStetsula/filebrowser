const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, "src"),
    entry: './app.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [{
                    loader: 'babel-loader'
                }]
            },
            {
                test: /(phaser-split|p2|pixi).js$/,
                use: 'script-loader'
            },
        ]
    },
    resolve: {
        extensions: [ '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development'
};