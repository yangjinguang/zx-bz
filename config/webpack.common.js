const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');
const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'url-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: [/material/,helpers.root('src')],
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['to-string-loader', "css-loader?sourceMap"]
                })
            },
            {
                test: /\.(scss|css)$/,
                include: [/material/, helpers.root('src')],
                loaders: ['to-string-loader', 'css-loader?sourceMap', 'sass-loader'] // sass-loader not scss-loader
            }
        ]
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
        new ExtractTextPlugin({filename: '[name].[hash].css'}),
        new webpack.optimize.CommonsChunkPlugin({
            name: [
                'app',
                'polyfills'
            ]
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
};