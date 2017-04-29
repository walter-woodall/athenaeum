const path = require('path');
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const postCSSConfig = require('./postcss.config.js');
const get = require('lodash/get');

const variant = process.env.CSS_VARIANT;

const baseDir = variant ? `tmp/${variant}` : 'src';

module.exports = options => ({
  entry: options.entry,
  output: options.output,
  externals: options.externals,
  devtool: 'source-map',
  context: path.resolve(__dirname, baseDir),
  resolve: {
    modules: [
      path.resolve(__dirname, baseDir),
      'node_modules'
    ],
    alias: {
      'rsg-components/ComponentsList/ComponentsListRenderer': path.join(__dirname, 'styleguide_assets/CustomRenderers/ComponentsListRenderer'),
      'rsg-components/StyleGuide/StyleGuideRenderer': path.join(__dirname, 'styleguide_assets/CustomRenderers/StyleGuideRenderer')
    }
  },
  module: {
    rules: get(options, 'module.rules', []).concat([
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          /__tests__/
        ],
        use: [
          {
            // babel-loader will throw a deprecation warning
            // waiting for stable v7.0.0 to upgrade
            loader: 'babel-loader',
            options: { presets: [ 'react', 'es2015' ] }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?importLoaders=3',
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader?parser=postcss-scss',
              options: {
                postCSSConfig
              }
            },
            {
              loader: 'resolve-url-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sourceComments: true,
                includePaths: [ baseDir ]
              }
            }
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
              publicPath: '/'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
              publicPath: '/'
            }
          }
        ]
      }
    ])
  },
  plugins: get(options, 'plugins', []).concat([
    new ExtractTextPlugin({
      filename: variant ? `assets/${variant}_styles.css` : 'assets/styles.css',
      allChunks: true
    })
  ])
});