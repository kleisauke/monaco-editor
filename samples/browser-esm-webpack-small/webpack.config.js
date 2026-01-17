const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { EsmUrlPlugin } = require('@vscode/esm-url-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		app: './index.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.ttf$/,
				use: ['file-loader']
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()]
	},
	plugins: [new EsmUrlPlugin()]
};
