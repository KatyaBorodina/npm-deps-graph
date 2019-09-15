module.exports = {
    mode: 'development',
    entry: 'index.js',
    devtool: 'inline-source-map',
    context: __dirname + '/app/js/',
    resolve: {
        alias: {
            app: path.resolve(__dirname, 'app/js'),
            utils: path.resolve(__dirname, 'app/js/utils'),
            css: path.resolve(__dirname, 'app/css')
        }
    },
    output: {
        path: __dirname + '/app/',
        filename: 'main.bundle.js'
    },
    devServer: {
        port: 8000,
        publicPath: '/',
        contentBase: path.join(__dirname, 'app')
    },
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    babelrc: true
                }
            }
        ]
    }
};
