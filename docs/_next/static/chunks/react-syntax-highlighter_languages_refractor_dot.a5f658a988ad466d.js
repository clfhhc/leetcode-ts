"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8752],{7467:function(b){function a(a){!function(a){var d="(?:"+[/[a-zA-Z_\x80-\uFFFF][\w\x80-\uFFFF]*/.source,/-?(?:\.\d+|\d+(?:\.\d*)?)/.source,/"[^"\\]*(?:\\[\s\S][^"\\]*)*"/.source,/<(?:[^<>]|(?!<!--)<(?:[^<>"']|"[^"]*"|'[^']*')+>|<!--(?:[^-]|-(?!->))*-->)*>/.source].join("|")+")",b={markup:{pattern:/(^<)[\s\S]+(?=>$)/,lookbehind:!0,alias:["language-markup","language-html","language-xml"],inside:a.languages.markup}};function c(a,b){return RegExp(a.replace(/<ID>/g,function(){return d}),b)}a.languages.dot={comment:{pattern:/\/\/.*|\/\*[\s\S]*?\*\/|^#.*/m,greedy:!0},"graph-name":{pattern:c(/(\b(?:digraph|graph|subgraph)[ \t\r\n]+)<ID>/.source,"i"),lookbehind:!0,greedy:!0,alias:"class-name",inside:b},"attr-value":{pattern:c(/(=[ \t\r\n]*)<ID>/.source),lookbehind:!0,greedy:!0,inside:b},"attr-name":{pattern:c(/([\[;, \t\r\n])<ID>(?=[ \t\r\n]*=)/.source),lookbehind:!0,greedy:!0,inside:b},keyword:/\b(?:digraph|edge|graph|node|strict|subgraph)\b/i,"compass-point":{pattern:/(:[ \t\r\n]*)(?:[ewc_]|[ns][ew]?)(?![\w\x80-\uFFFF])/,lookbehind:!0,alias:"builtin"},node:{pattern:c(/(^|[^-.\w\x80-\uFFFF\\])<ID>/.source),lookbehind:!0,greedy:!0,inside:b},operator:/[=:]|-[->]/,punctuation:/[\[\]{};,]/},a.languages.gv=a.languages.dot}(a)}b.exports=a,a.displayName="dot",a.aliases=["gv"]}}])