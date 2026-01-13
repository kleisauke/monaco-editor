import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

self.MonacoEnvironment = {
	getWorkerUrl: () => './out/editor.worker.js'
};

// expose the monaco API as a global for tests
window.monacoAPI = monaco;
