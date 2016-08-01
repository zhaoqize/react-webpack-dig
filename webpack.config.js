//var path = require('path');


module.exports = {
    entry: './app.js',
    output : {
		path : './build/',
		filename : 'bundle.js'
	},
	resolve: {
    	extensions: ['', '.js', '.jsx']
    },
	module: {
	    loaders: [{
	      test: /\.jsx?$/, 
	      loader: 'babel',
	      query: {
          	presets: ['react', 'es2015'],
          	plugins: [["antd", { "style": "css" }]]
          },
          exclude:/node_modules/
	    },{
	      test: /\.css$/, 
	      loader: 'style!css' 
	    }
	    ]
  	}
};