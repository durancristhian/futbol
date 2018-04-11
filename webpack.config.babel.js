import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import { resolve } from 'path';
import SimpleProgressWebpackPlugin from 'simple-progress-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';
import WebpackChunkHash from 'webpack-chunk-hash';

const distPath = resolve(__dirname, 'dist');
const { ifProduction } = getIfUtils(process.env.NODE_ENV);
const srcPath = resolve(__dirname, 'src');

module.exports = function webpackConfig() {
    return {
        context: srcPath,
        entry: resolve(__dirname, 'src'),
        devtool: ifProduction('source-map', 'eval-source-map'),
        devServer: {
            contentBase: distPath,
            historyApiFallback: true,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    minimize: ifProduction(
                                        {
                                            browsers: ['last 2 versions', '> 5%'],
                                            discardComments: {
                                                removeAll: ifProduction(true, false),
                                            },
                                        },
                                        false
                                    ),
                                },
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: [
                                        require('stylelint')({}),
                                        require('postcss-import')(),
                                        require('postcss-reporter')({
                                            clearReportedMessages: true,
                                        }),
                                    ],
                                    sourceMaps: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.js$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/,
                    enforce: 'pre',
                    options: {
                        fix: true,
                        formatter: require('eslint-formatter-pretty'),
                    },
                },
                {
                    test: /\.js$/,
                    loaders: ['babel-loader'],
                    exclude: /node_modules/,
                },
            ],
        },
        plugins: removeEmpty([
            new webpack.DefinePlugin({
                'process.env': {
                    COVERS_WORKSHEET_ID: JSON.stringify(process.env.COVERS_WORKSHEET_ID),
                    CURIOSITIES_WORKSHEET_ID: JSON.stringify(process.env.CURIOSITIES_WORKSHEET_ID),
                    INSTANCE_NAME: process.env.INSTANCE_NAME,
                    NODE_ENV: process.env.NODE_ENV,
                    POSITIONS_WORKSHEET_ID: JSON.stringify(process.env.POSITIONS_WORKSHEET_ID),
                    SHIRTS_WORKSHEET_ID: JSON.stringify(process.env.SHIRTS_WORKSHEET_ID),
                    SPREADSHEET_ID: JSON.stringify(process.env.SPREADSHEET_ID),
                    TEMPLATE_NAME: process.env.TEMPLATE_NAME,
                },
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new CompressionPlugin({
                algorithm: 'gzip',
                asset: '[path].gz[query]',
                cache: true,
                test: /\.(html|css|js)$/,
            }),
            new CopyWebpackPlugin([
                {
                    from: resolve(srcPath, 'assets'),
                    to: 'assets',
                },
            ]),
            ifProduction(new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })),
            new SimpleProgressWebpackPlugin(),
            new CleanWebpackPlugin([resolve(distPath, '*'), resolve(__dirname, '.tmp', '*')]),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inlineManifestWebpackName: 'webpackManifest',
                template: resolve(__dirname, 'src', process.env.TEMPLATE_NAME),
                minify: ifProduction(
                    {
                        collapseWhitespace: true,
                        removeComments: true,
                    },
                    {}
                ),
            }),
            ifProduction(new UglifyJsPlugin({ sourceMap: true })),
            new ExtractTextPlugin({
                allChunks: true,
                filename: '[name].[hash].css',
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                openAnalyzer: false,
                reportFilename: '../.tmp/statistics.html',
            }),
            ifProduction(
                new webpack.HashedModuleIdsPlugin(),
                new WebpackChunkHash(),
                new ChunkManifestPlugin({
                    filename: 'chunk-manifest.json',
                    manifestVariable: 'webpackManifest',
                    inlineManifest: true,
                })
            ),
        ]),
        output: {
            filename: ifProduction('[name].[chunkhash].js', '[name].[hash].js'),
            path: distPath,
        },
    };
};
