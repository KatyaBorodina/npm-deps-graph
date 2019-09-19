const path = require('path');

module.exports = {
    mode: 'development',
    entry: './index.js',
    devtool: 'inline-source-map',
    context: __dirname + '/app/js/',
    output: {
        path: __dirname + '/app/',
        filename: 'main.bundle.js'
    },
    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'app')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    babelrc: true
                }
            }
        ]
    }
};
