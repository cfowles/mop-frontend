var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');
var APP_ENTRY = process.env.APP_ENTRY || "main";

var THEME = process.env.THEME || "legacy";
var THEME_DIR = path.resolve(__dirname, 'src/components/theme-' + THEME);

var config = {
  entry: {
    javascript: APP_DIR + '/apps/' + APP_ENTRY + '.js'
  },
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: {
      disableDotRule: true
    }
  },
  devtool: 'sourcemap',
  output: {
    path: BUILD_DIR,
    publicPath: process.env.PUBLIC_ROOT || "/",
    //NOTE: when process.env.PROD is true this will be the minified file
    //TODO: maybe we should hash this and figure out a way to pass the hashed version to it
    filename: APP_ENTRY + '.' + THEME + '.js',
    chunkFilename: 'chunk-[id]' + '.' + THEME + '.js?v=[hash]'
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: APP_DIR,
        use: 'babel-loader'
      },
      {
        test: /\.json$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.svg$/,
        use: 'svg-react-loader'
      }
    ]
  },
  resolve: {
    alias: {
      Theme: THEME_DIR,
      LegacyTheme: path.resolve(__dirname, "src/components/theme-legacy/"),
      GiraffeUI: path.resolve(__dirname, "src/giraffe-ui")
    }
  },
  plugins : [
    new HtmlWebpackPlugin({
      template: 'local/index.html',
      inject: 'body',
      //hash: true,
      filename: 'index.html',
      staticPath: (process.env.STATIC_ROOT || ''),
      theme: THEME,
      cssPath: (process.env.NODE_ENV == 'production'
                ? 'https://s3.amazonaws.com/mop-static/css/moui.css'
                : '/css/moui.css'),
      giraffeCssPath: process.env.LOCAL_CSS ||
                        'https://mop-static-stage.s3-us-west-1.amazonaws.com/giraffe/styles/main.css',
      reactJs: (process.env.LOCAL_REACT
                ? process.env.LOCAL_REACT + 'react.js'
                : 'https://unpkg.com/react@15.4.1/dist/react.js'),
      reactDomJs: (process.env.LOCAL_REACT
                   ? process.env.LOCAL_REACT + 'react-dom.js'
                   : 'https://unpkg.com/react-dom@15.4.1/dist/react-dom.js')
    }),
    ((process.env.PROD)
     ? new webpack.optimize.UglifyJsPlugin({sourceMap: true})
     : new webpack.HotModuleReplacementPlugin()),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(((process.env.PROD) ? 'production' : 'development')),
        'API_URI': JSON.stringify(process.env.API_URI ||
                                  (process.env.PROD ? '/api/v1' : '/local/api/v1')
                                 ),
        'WORDPRESS_API_URI': JSON.stringify(process.env.WORDPRESS_API_URI
                                            || (process.env.PROD ? '' : '/local/api')),
        'API_WRITABLE': JSON.stringify(process.env.API_WRITABLE || process.env.PROD),
        'API_SIGN_PETITION': JSON.stringify(process.env.API_SIGN_PETITION || ''),
        'BASE_APP_PATH': JSON.stringify(process.env.BASE_APP_PATH || '/'),
        'BASE_URL': JSON.stringify(process.env.BASE_URL
                                   || (process.env.PROD ? 'https://petitions.moveon.org' : '')),
        'ONLY_PROD_ROUTES': JSON.stringify(process.env.ONLY_PROD_ROUTES || ''),
        'SESSION_COOKIE_NAME': JSON.stringify(process.env.SESSION_COOKIE_NAME || 'SO_SESSION'),
        'STATIC_ROOT': JSON.stringify(process.env.STATIC_ROOT || '/local/'),
        'TRACK_SHARE_URL': JSON.stringify(process.env.TRACK_SHARE_URL || ''),
        'USE_HASH_BROWSING': JSON.stringify(process.env.USE_HASH_BROWSING || false),
        'PROD': process.env.PROD
      }
    })

  ]
};

module.exports = config;
