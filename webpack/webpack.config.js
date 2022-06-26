const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    mode: "development",
    entry: {
        "index": "./src/index.js",
        "print": "./src/print.js",
    },
    devServer: {
        static: "./dist"
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: 'output'
        }),
        new BundleAnalyzerPlugin(),
    ],
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        }
    }
}