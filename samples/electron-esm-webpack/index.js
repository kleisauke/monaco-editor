import * as monaco from 'monaco-editor';

self.MonacoEnvironment = {
	getWorkerUrl: () => './editor.worker.bundle.js',
};

monaco.editor.create(document.getElementById('container'), {
	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	language: 'javascript'
});
