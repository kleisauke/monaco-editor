/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import webpack from 'webpack';
import * as path from 'path';

const REPO_ROOT = path.join(__dirname, '../../');
const CROSS_ORIGIN_ASSETS = process.argv.includes('--cross-origin');

webpack(
	{
		mode: 'development',
		entry: {
			app: './index.js'
		},
		context: path.join(__dirname, 'webpack'),
		output: {
			path: path.resolve(REPO_ROOT, 'test/smoke/webpack/out'),
			filename: '[name].js',
			publicPath: CROSS_ORIGIN_ASSETS
				? 'http://localhost:8088/monaco-editor/test/smoke/webpack/out/'
				: undefined
		},
		resolve: {
			alias: {
				'monaco-editor': path.resolve(REPO_ROOT, 'out/monaco-editor')
			}
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
		}
	},
	(err: Error | undefined, stats: webpack.Stats | undefined) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		if (stats && stats.hasErrors()) {
			console.log(stats.compilation.errors);
			process.exit(1);
		}
	}
);
