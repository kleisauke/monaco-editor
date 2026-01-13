/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as monaco from '../../../out/monaco-editor/esm/vs/editor/editor.main';
import editorWorker from '../../../out/monaco-editor/esm/vs/editor/editor.worker?worker';

self.MonacoEnvironment = {
	getWorker: () => new editorWorker(),
};

window.monacoAPI = monaco;
