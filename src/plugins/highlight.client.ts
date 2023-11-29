import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';

import highlightJS from '@highlightjs/vue-plugin';
// import 'highlight.js/styles/atom-one-dark.css';

export default defineNuxtPlugin((nuxtApp) => {
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('json', json);
	hljs.registerLanguage('markdown', markdown);
	nuxtApp.vueApp.use(highlightJS);
});
