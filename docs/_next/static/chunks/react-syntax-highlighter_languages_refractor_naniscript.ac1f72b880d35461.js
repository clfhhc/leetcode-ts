"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1975],{5187:function(b){function a(a){!function(a){var b=/\{[^\r\n\[\]{}]*\}/,c={"quoted-string":{pattern:/"(?:[^"\\]|\\.)*"/,alias:"operator"},"command-param-id":{pattern:/(\s)\w+:/,lookbehind:!0,alias:"property"},"command-param-value":[{pattern:b,alias:"selector"},{pattern:/([\t ])\S+/,lookbehind:!0,greedy:!0,alias:"operator"},{pattern:/\S(?:.*\S)?/,alias:"operator"}]};function d(a){return"string"==typeof a?a:Array.isArray(a)?a.map(d).join(""):d(a.content)}a.languages.naniscript={comment:{pattern:/^([\t ]*);.*/m,lookbehind:!0},define:{pattern:/^>.+/m,alias:"tag",inside:{value:{pattern:/(^>\w+[\t ]+)(?!\s)[^{}\r\n]+/,lookbehind:!0,alias:"operator"},key:{pattern:/(^>)\w+/,lookbehind:!0}}},label:{pattern:/^([\t ]*)#[\t ]*\w+[\t ]*$/m,lookbehind:!0,alias:"regex"},command:{pattern:/^([\t ]*)@\w+(?=[\t ]|$).*/m,lookbehind:!0,alias:"function",inside:{"command-name":/^@\w+/,expression:{pattern:b,greedy:!0,alias:"selector"},"command-params":{pattern:/\s*\S[\s\S]*/,inside:c}}},"generic-text":{pattern:/(^[ \t]*)[^#@>;\s].*/m,lookbehind:!0,alias:"punctuation",inside:{"escaped-char":/\\[{}\[\]"]/,expression:{pattern:b,greedy:!0,alias:"selector"},"inline-command":{pattern:/\[[\t ]*\w[^\r\n\[\]]*\]/,greedy:!0,alias:"function",inside:{"command-params":{pattern:/(^\[[\t ]*\w+\b)[\s\S]+(?=\]$)/,lookbehind:!0,inside:c},"command-param-name":{pattern:/^(\[[\t ]*)\w+/,lookbehind:!0,alias:"name"},"start-stop-char":/[\[\]]/}}}}},a.languages.nani=a.languages.naniscript,a.hooks.add("after-tokenize",function(a){a.tokens.forEach(function(a){if("string"!=typeof a&&"generic-text"===a.type){var b=d(a);!function(d){for(var b=[],c=0;c<d.length;c++){var e=d[c],a="[]{}".indexOf(e);if(-1!==a){if(a%2==0)b.push(a+1);else if(b.pop()!==a)return!1}}return 0===b.length}(b)&&(a.type="bad-line",a.content=b)}})})}(a)}b.exports=a,a.displayName="naniscript",a.aliases=[]}}])