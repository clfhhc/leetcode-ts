"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8921],{3526:function(b){function a(a){a.languages.graphql={comment:/#.*/,description:{pattern:/(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,greedy:!0,alias:"string",inside:{"language-markdown":{pattern:/(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,lookbehind:!0,inside:a.languages.markdown}}},string:{pattern:/"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,greedy:!0},number:/(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,boolean:/\b(?:false|true)\b/,variable:/\$[a-z_]\w*/i,directive:{pattern:/@[a-z_]\w*/i,alias:"function"},"attr-name":{pattern:/\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,greedy:!0},"atom-input":{pattern:/\b[A-Z]\w*Input\b/,alias:"class-name"},scalar:/\b(?:Boolean|Float|ID|Int|String)\b/,constant:/\b[A-Z][A-Z_\d]*\b/,"class-name":{pattern:/(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,lookbehind:!0},fragment:{pattern:/(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,lookbehind:!0,alias:"function"},"definition-mutation":{pattern:/(\bmutation\s+)[a-zA-Z_]\w*/,lookbehind:!0,alias:"function"},"definition-query":{pattern:/(\bquery\s+)[a-zA-Z_]\w*/,lookbehind:!0,alias:"function"},keyword:/\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,operator:/[!=|&]|\.{3}/,"property-query":/\w+(?=\s*\()/,object:/\w+(?=\s*\{)/,punctuation:/[!(){}\[\]:=,]/,property:/\w+/},a.hooks.add("after-tokenize",function(h){if("graphql"===h.language)for(var b=h.tokens.filter(function(a){return"string"!=typeof a&&"comment"!==a.type&&"scalar"!==a.type}),a=0;a<b.length;){var i=b[a++];if("keyword"===i.type&&"mutation"===i.content){var c=[];if(l(["definition-mutation","punctuation"])&&"("===k(1).content){a+=2;var d=m(/^\($/,/^\)$/);if(-1===d)continue;for(;a<d;a++){var e=k(0);"variable"===e.type&&(n(e,"variable-input"),c.push(e.content))}a=d+1}if(l(["punctuation","property-query"])&&"{"===k(0).content&&(a++,n(k(0),"property-mutation"),c.length>0)){var j=m(/^\{$/,/^\}$/);if(-1===j)continue;for(var f=a;f<j;f++){var g=b[f];"variable"===g.type&&c.indexOf(g.content)>=0&&n(g,"variable-input")}}}}function k(c){return b[a+c]}function l(c,b){b=b||0;for(var a=0;a<c.length;a++){var d=k(a+b);if(!d||d.type!==c[a])return!1}return!0}function m(g,h){for(var d=1,c=a;c<b.length;c++){var f=b[c],e=f.content;if("punctuation"===f.type&&"string"==typeof e){if(g.test(e))d++;else if(h.test(e)&&(d--,0===d))return c}}return -1}function n(b,c){var a=b.alias;a?Array.isArray(a)||(b.alias=a=[a]):b.alias=a=[],a.push(c)}})}b.exports=a,a.displayName="graphql",a.aliases=[]}}])