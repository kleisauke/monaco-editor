/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as esbuild from 'esbuild';
import * as path from 'path';
import { removeDir } from '../../build/fs';
import { esmUrlPlugin } from '@vscode/esbuild-plugin-esm-url';

removeDir('test/smoke/esbuild/out');

build({
	entryPoints: [path.join(__dirname, 'esbuild/index.js')],
	bundle: true,
	format: 'esm',
	logLevel: 'silent',
	outdir: path.join(__dirname, 'esbuild/out'),
	loader: {
		'.ttf': 'file'
	},
	plugins: [esmUrlPlugin()]
});

function build(opts: esbuild.BuildOptions) {
	esbuild.build(opts).then((result) => {
		const errors = result.errors;
		const warnings = result.warnings.filter((w) => {
			return (
				w.text !==
				'Top-level "this" will be replaced with undefined since this file is an ECMAScript module'
			);
		});
		if (errors.length > 0) {
			console.log(`errors:`);
			console.error(errors);
		}
		if (warnings.length > 0) {
			console.log(`warnings:`);
			console.error(warnings);
		}
	});
}
