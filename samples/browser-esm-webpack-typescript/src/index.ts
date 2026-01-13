import * as monaco from 'monaco-editor';
import './index.css';

// @ts-ignore
self.MonacoEnvironment = {
	getWorkerUrl: () => './editor.worker.bundle.js',
};

monaco.editor.create(document.body, {
	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	language: 'typescript'
});
