const path = require('path');
const PORT = process.env.PORT || 5000;

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
        port: PORT,
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
