const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: './src/DataVizReactTable.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'DataVizReactTable.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [{
                test: /\.s[ac]ss$/i,
                sideEffects: true,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            //additionalData: '@import "src/_global.scss";'
                        }
                    }
                ],
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'svg-url-loader',
                    options: {
                        limit: 10000
                    },
                }, ],
            },
            {
                test: /\.js?$/,
                include: path.resolve(__dirname, 'src'),
                //exclude: /(node_modules|bower_components|build)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        'plugins': ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, 'public'),
                use: [{
                    loader: 'html-loader'
                }]
            }
        ]
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
        }
    },
    externals: {
        // Don't bundle react or react-dom
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'React',
            root: 'React'
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'ReactDOM',
            root: 'ReactDOM'
        }
    }
};