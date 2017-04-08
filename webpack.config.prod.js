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
		path: __dirname + "/dist", // Note: Physical files are only output by the production task 'npm run build'.
		publicPath: config.baseName,
		filename: "bundle.js",
	},
	devServer: {
		contentBase: './dist'
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
			{ test: /(\.css)$/, loader: ExtractTextPlugin.extract("css?sourceMap") },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
			{ test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
			{ test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'] }
		]
	}
};
