import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from './src/config';

const GLOBALS = {
	"process.env.NODE_ENV": JSON.stringify("production")
};

export default {
	debug: true,
	devtool: 'source-map',
	noInfo: false,
	entry: './src/index',
	target: 'web',
	resolve: {
		root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
		extensions: ['', '.js', '.jsx', '.coffee']
	},
	output: {
		path: __dirname + "/public", // Note: Physical files are only output by the production task 'npm run build'.
		publicPath: config.baseName,
		filename: "bundle.js",
	},
	devServer: {
		contentBase: './public'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin(GLOBALS),
		new ExtractTextPlugin("styles.css"),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{ test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
			{ test: /(\.css)$/, loader: ExtractTextPlugin.extract("css") },
			{ test: /\.less$/, loader: "style!css!less" },
			{ test: /\.(jpe?g|png|gif)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'] },
			{ test: /\.woff|\.woff2|\.svg|.eot|\.ttf/, loader: 'url?prefix=font/&limit=10000' }
		]
	}
};
