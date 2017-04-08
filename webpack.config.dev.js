import webpack from 'webpack';
import path from 'path';

export default {
	debug: true,
	devtool: 'cheap-module-eval-source-map',
	noInfo: false,
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot reloading module fails.
		'./src/index'
	],
	resolve: {
		root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
		extensions: ['', '.js', '.jsx', '.coffee']
	},
	target: 'web',
	output: {
		path: __dirname + "/dist", // Note: Physical files are only output by the production task 'npm run build'.
		publicPath: "/",
		filename: "bundle.js",
	},
	devServer: {
		contentBase: './src'
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [
			{ test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
			{ test: /(\.css)$/, loaders: ['style', 'css'] },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
			{ test: /\.(jpe?g|png|gif)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'] },
			{ test: /\.less$/, loader: "style!css!less" },
			{ test: /\.woff|\.woff2|\.svg|.eot|\.ttf/, loader: 'url?prefix=font/&limit=10000' }
		]
	}
};
