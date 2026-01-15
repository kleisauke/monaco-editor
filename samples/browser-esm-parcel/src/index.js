import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

monaco.editor.create(document.getElementById('container'), {
	value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
	language: 'javascript'
});
