const path = require('path');


module.exports = {
  mode: 'production',
  entry: './src/DataVizReactTable.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'DataVizReactTable.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
		  include: path.resolve(__dirname, 'src'),
		  //exclude: /(node_modules|bower_components|build)/,
        use: {
			  loader: 'babel-loader',
			  options:{
				  presets: ['@babel/preset-env', '@babel/preset-react'],
				  'plugins':['@babel/plugin-transform-react-jsx','@babel/plugin-proposal-class-properties']
			  }
		  }
      },
		{
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
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
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
};