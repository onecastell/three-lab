var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var path = require('path')

module.exports = {
    entry: './src/planes/ao.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inlineSource: '.(js|.css)$' // embed all javascript and css inline
          }),
          new HtmlWebpackInlineSourcePlugin()
    ]

}
