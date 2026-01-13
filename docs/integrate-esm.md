## Integrating the ESM version of the Monaco Editor

- [Webpack](#using-webpack)
  - [Option 1: Using the Monaco Editor WebPack Plugin](#option-1-using-the-monaco-editor-webpack-plugin)
  - [Option 2: Using plain webpack](#option-2-using-plain-webpack)
- [Parcel](#using-parcel)
- [Vite](#using-vite)

### Using webpack

Here is the most basic script that imports the editor using ESM with webpack.

More self-contained samples are available in the [samples folder](../samples/).

---

### Option 1: Using the Monaco Editor WebPack Plugin

This is the easiest method, and it allows for options to be passed into the plugin in order to select only a subset of editor features or editor languages. Read more about the [Monaco Editor WebPack Plugin](../webpack-plugin/), which is a community authored plugin.

- `index.js`

```js
import * as monaco from 'monaco-editor';

monaco.editor.create(document.getElementById('container'), {
	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	language: 'javascript'
});
```

- `webpack.config.js`

```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
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
	plugins: [new MonacoWebpackPlugin()]
};
```

---

### Option 2: Using plain webpack

Full working samples are available at https://github.com/microsoft/monaco-editor/tree/main/samples/browser-esm-webpack or https://github.com/microsoft/monaco-editor/tree/main/samples/browser-esm-webpack-small

- `index.js`

```js
import * as monaco from 'monaco-editor';

// Since packaging is done by you, you need
// to instruct the editor how you named the
// bundle that contain the editor web worker.
self.MonacoEnvironment = {
	getWorkerUrl: () => './editor.worker.bundle.js',
};

monaco.editor.create(document.getElementById('container'), {
	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	language: 'javascript'
});
```

- `webpack.config.js`:

```js
const path = require('path');

module.exports = {
	entry: {
		app: './index.js',
		// Monaco editor web worker entry (used by `getWorkerUrl`)
		'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
	},
	output: {
		globalObject: 'self',
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
	}
};
```

---

### Using parcel

A full working sample is available at https://github.com/microsoft/monaco-editor/tree/main/samples/browser-esm-parcel

When using parcel, we need to use the `getWorkerUrl` function to find the editor worker. Importing the worker with the `url:` prefix tells parcel to emit the worker as a separate file and return its URL.

- `index.js`

```js
import EditorWorker from 'url:monaco-editor/esm/vs/editor/editor.worker.js';
import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
	getWorkerUrl: () => EditorWorker,
};

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

Adding monaco editor to [Vite](https://vitejs.dev/) is simple since it has built-in support for web workers. You only need to implement the `getWorker` function (NOT the `getWorkerUrl`) to use Vite's output ([Source](https://github.com/vitejs/vite/discussions/1791#discussioncomment-321046)):

```js
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

self.MonacoEnvironment = {
	getWorker: () => new editorWorker(),
};

monaco.editor.create(document.getElementById('container'), {
	value: "function hello() {\n\talert('Hello world!');\n}",
	language: 'javascript'
});
```
