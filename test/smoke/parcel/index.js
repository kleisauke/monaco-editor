import * as monaco from '../../../out/monaco-editor/esm/vs/editor/editor.main.js';

self.MonacoEnvironment = {
	getWorker: () => new Worker(
		new URL('../../../out/monaco-editor/esm/vs/editor/editor.worker.js', import.meta.url),
		{ type: 'module' }
	),
};

window.monacoAPI = monaco;
