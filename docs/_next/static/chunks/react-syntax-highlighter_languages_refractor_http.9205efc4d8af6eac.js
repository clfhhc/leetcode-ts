"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6508],{354:function(b){function a(a){!function(b){function e(a){return RegExp("(^(?:"+a+"):[ \t]*(?![ \t]))[^]+","i")}b.languages.http={"request-line":{pattern:/^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,inside:{method:{pattern:/^[A-Z]+\b/,alias:"property"},"request-target":{pattern:/^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,lookbehind:!0,alias:"url",inside:b.languages.uri},"http-version":{pattern:/^(\s)HTTP\/[\d.]+/,lookbehind:!0,alias:"property"}}},"response-status":{pattern:/^HTTP\/[\d.]+ \d+ .+/m,inside:{"http-version":{pattern:/^HTTP\/[\d.]+/,alias:"property"},"status-code":{pattern:/^(\s)\d+(?=\s)/,lookbehind:!0,alias:"number"},"reason-phrase":{pattern:/^(\s).+/,lookbehind:!0,alias:"string"}}},header:{pattern:/^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,inside:{"header-value":[{pattern:e(/Content-Security-Policy/.source),lookbehind:!0,alias:["csp","languages-csp"],inside:b.languages.csp},{pattern:e(/Public-Key-Pins(?:-Report-Only)?/.source),lookbehind:!0,alias:["hpkp","languages-hpkp"],inside:b.languages.hpkp},{pattern:e(/Strict-Transport-Security/.source),lookbehind:!0,alias:["hsts","languages-hsts"],inside:b.languages.hsts},{pattern:e(/[^:]+/.source),lookbehind:!0}],"header-name":{pattern:/^[^:]+/,alias:"keyword"},punctuation:/^:/}}};var d,a=b.languages,f={"application/javascript":a.javascript,"application/json":a.json||a.javascript,"application/xml":a.xml,"text/xml":a.xml,"text/html":a.html,"text/css":a.css,"text/plain":a.plain},g={"application/json":!0,"application/xml":!0};function h(a){var b=a.replace(/^[a-z]+\//,"");return"(?:"+a+"|"+("\\w+/(?:[\\w.-]+\\+)+"+b+"(?![+\\w.-])")+")"}for(var c in f)if(f[c]){d=d||{};var i=g[c]?h(c):c;d[c.replace(/\//g,"-")]={pattern:RegExp("("+/content-type:\s*/.source+i+/(?:(?:\r\n?|\n)[\w-].*)*(?:\r(?:\n|(?!\n))|\n)/.source+")"+/[^ \t\w-][\s\S]*/.source,"i"),lookbehind:!0,inside:f[c]}}d&&b.languages.insertBefore("http","header",d)}(a)}b.exports=a,a.displayName="http",a.aliases=[]}}])