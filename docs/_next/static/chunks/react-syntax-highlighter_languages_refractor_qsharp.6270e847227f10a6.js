"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8347],{9449:function(b){function a(a){!function(a){function c(a,b){return a.replace(/<<(\d+)>>/g,function(c,a){return"(?:"+b[+a]+")"})}function b(a,b,d){return RegExp(c(a,b),d||"")}var d={type:"Adj BigInt Bool Ctl Double false Int One Pauli PauliI PauliX PauliY PauliZ Qubit Range Result String true Unit Zero",other:"Adjoint adjoint apply as auto body borrow borrowing Controlled controlled distribute elif else fail fixup for function if in internal intrinsic invert is let mutable namespace new newtype open operation repeat return self set until use using while within"},e=RegExp("\\b(?:"+(d.type+" "+d.other).trim().replace(/ /g,"|")+")\\b"),j=/\b[A-Za-z_]\w*\b/.source,f=c(/<<0>>(?:\s*\.\s*<<0>>)*/.source,[j]),g={keyword:e,punctuation:/[<>()?,.:[\]]/},h=/"(?:\\.|[^\\"])*"/.source;a.languages.qsharp=a.languages.extend("clike",{comment:/\/\/.*/,string:[{pattern:b(/(^|[^$\\])<<0>>/.source,[h]),lookbehind:!0,greedy:!0}],"class-name":[{pattern:b(/(\b(?:as|open)\s+)<<0>>(?=\s*(?:;|as\b))/.source,[f]),lookbehind:!0,inside:g},{pattern:b(/(\bnamespace\s+)<<0>>(?=\s*\{)/.source,[f]),lookbehind:!0,inside:g}],keyword:e,number:/(?:\b0(?:x[\da-f]+|b[01]+|o[0-7]+)|(?:\B\.\d+|\b\d+(?:\.\d*)?)(?:e[-+]?\d+)?)l?\b/i,operator:/\band=|\bor=|\band\b|\bnot\b|\bor\b|<[-=]|[-=]>|>>>=?|<<<=?|\^\^\^=?|\|\|\|=?|&&&=?|w\/=?|~~~|[*\/+\-^=!%]=?/,punctuation:/::|[{}[\];(),.:]/}),a.languages.insertBefore("qsharp","number",{range:{pattern:/\.\./,alias:"operator"}});var i=function(a,c){for(var b=0;b<2;b++)a=a.replace(/<<self>>/g,function(){return"(?:"+a+")"});return a.replace(/<<self>>/g,"[^\\s\\S]")}(c(/\{(?:[^"{}]|<<0>>|<<self>>)*\}/.source,[h]),2);a.languages.insertBefore("qsharp","string",{"interpolation-string":{pattern:b(/\$"(?:\\.|<<0>>|[^\\"{])*"/.source,[i]),greedy:!0,inside:{interpolation:{pattern:b(/((?:^|[^\\])(?:\\\\)*)<<0>>/.source,[i]),lookbehind:!0,inside:{punctuation:/^\{|\}$/,expression:{pattern:/[\s\S]+/,alias:"language-qsharp",inside:a.languages.qsharp}}},string:/[\s\S]+/}}})}(a),a.languages.qs=a.languages.qsharp}b.exports=a,a.displayName="qsharp",a.aliases=["qs"]}}])