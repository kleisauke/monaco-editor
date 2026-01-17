const path = require('path');
const { EsmUrlPlugin } = require('@vscode/esm-url-webpack-plugin');

module.exports = {
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
	plugins: [new EsmUrlPlugin()]
};
