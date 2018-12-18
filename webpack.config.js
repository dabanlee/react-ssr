const path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.jsx',
    output: {
        filename: 'app.js',
        path: path.resolve('dist'),
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        }],
    },
};
