## Integrating the ESM version of the Monaco Editor

- [Webpack](#using-webpack)
- [Parcel](#using-parcel)
- [Vite](#using-vite)

### Using webpack

Full working samples are available at https://github.com/microsoft/monaco-editor/tree/main/samples/browser-esm-webpack or https://github.com/microsoft/monaco-editor/tree/main/samples/browser-esm-webpack-small.

- `index.js`

```js
import * as monaco from 'monaco-editor';

// Or to use only a subset of the available language definitions and features:
//import * as monaco from 'monaco-editor/editor';
//import 'monaco-editor/languages/definitions/css/register';
//import 'monaco-editor/languages/definitions/html/register';
//import 'monaco-editor/languages/definitions/javascript/register';
//import 'monaco-editor/languages/features/css/register';
//import 'monaco-editor/languages/features/html/register';
//import 'monaco-editor/languages/features/typescript/register';
//import 'monaco-editor/features/register.all';

monaco.editor.create(document.getElementById('container'), {
	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	language: 'javascript'
});
```

- `webpack.config.js`:

```js
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
```

---

### Using parcel

A full working sample is available at https://github.com/microsoft/monaco-editor/tree/main/samples/browser-esm-parcel.

- `index.js`

```js
import * as monaco from 'monaco-editor';

monaco.editor.create(document.getElementById('container'), {
	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	language: 'javascript'
});
```

- `index.html`

```html
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	</head>
	<body>
		<div id="container" style="width: 800px; height: 600px; border: 1px solid #ccc"></div>

		<script type="module" src="index.js"></script>
	</body>
</html>
```

Then, simply run `parcel index.html`.

---

### Using Vite

A full working sample is available at https://github.com/microsoft/monaco-editor/tree/main/samples/browser-esm-vite.

- `index.js`

```js
import * as monaco from 'monaco-editor';

monaco.editor.create(document.getElementById('container'), {
	value: "function hello() {\n\talert('Hello world!');\n}",
	language: 'javascript'
});
```

- `vite.config.js`

```js
import { defineConfig } from 'vite';
import { esmUrlPlugin } from '@vscode/rollup-plugin-esm-url';

export default defineConfig({
  plugins: [esmUrlPlugin()]
});
```
