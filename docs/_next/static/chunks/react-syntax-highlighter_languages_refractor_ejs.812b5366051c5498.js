"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7176,3047],{5265:function(b,d,c){var e=c(7305);function a(b){var a;b.register(e),(a=b).languages.ejs={delimiter:{pattern:/^<%[-_=]?|[-_]?%>$/,alias:"punctuation"},comment:/^#[\s\S]*/,"language-javascript":{pattern:/[\s\S]+/,inside:a.languages.javascript}},a.hooks.add("before-tokenize",function(b){a.languages["markup-templating"].buildPlaceholders(b,"ejs",/<%(?!%)[\s\S]+?%>/g)}),a.hooks.add("after-tokenize",function(b){a.languages["markup-templating"].tokenizePlaceholders(b,"ejs")}),a.languages.eta=a.languages.ejs}b.exports=a,a.displayName="ejs",a.aliases=["eta"]},7305:function(b){function a(a){!function(a){function b(a,b){return"___"+a.toUpperCase()+b+"___"}Object.defineProperties(a.languages["markup-templating"]={},{buildPlaceholders:{value:function(c,d,e,f){if(c.language===d){var g=c.tokenStack=[];c.code=c.code.replace(e,function(a){if("function"==typeof f&&!f(a))return a;for(var h,e=g.length;-1!==c.code.indexOf(h=b(d,e));)++e;return g[e]=a,h}),c.grammar=a.languages.markup}}},tokenizePlaceholders:{value:function(c,d){if(c.language===d&&c.tokenStack){c.grammar=a.languages[d];var e=0,f=Object.keys(c.tokenStack);g(c.tokens)}function g(j){for(var k=0;k<j.length;k++){if(e>=f.length)break;var h=j[k];if("string"==typeof h||h.content&&"string"==typeof h.content){var n=f[e],o=c.tokenStack[n],l="string"==typeof h?h:h.content,p=b(d,n),m=l.indexOf(p);if(m> -1){++e;var q=l.substring(0,m),s=new a.Token(d,a.tokenize(o,c.grammar),"language-"+d,o),r=l.substring(m+p.length),i=[];q&&i.push.apply(i,g([q])),i.push(s),r&&i.push.apply(i,g([r])),"string"==typeof h?j.splice.apply(j,[k,1].concat(i)):h.content=i}}else h.content&&g(h.content)}return j}}}})}(a)}b.exports=a,a.displayName="markupTemplating",a.aliases=[]}}])