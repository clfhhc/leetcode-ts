"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3520],{9008:function(b){function a(a){!function(d){function i(a){return RegExp(/(\()/.source+"(?:"+a+")"+/(?=[\s\)])/.source)}function j(a){return RegExp(/([\s([])/.source+"(?:"+a+")"+/(?=[\s)])/.source)}var a=/(?!\d)[-+*/~!@$%^=<>{}\w]+/.source,c="(\\()",k="(?=\\s)",e=/(?:[^()]|\((?:[^()]|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\))*\))*/.source,b={heading:{pattern:/;;;.*/,alias:["comment","title"]},comment:/;.*/,string:{pattern:/"(?:[^"\\]|\\.)*"/,greedy:!0,inside:{argument:/[-A-Z]+(?=[.,\s])/,symbol:RegExp("`"+a+"'")}},"quoted-symbol":{pattern:RegExp("#?'"+a),alias:["variable","symbol"]},"lisp-property":{pattern:RegExp(":"+a),alias:"property"},splice:{pattern:RegExp(",@?"+a),alias:["symbol","variable"]},keyword:[{pattern:RegExp(c+"(?:and|(?:cl-)?letf|cl-loop|cond|cons|error|if|(?:lexical-)?let\\*?|message|not|null|or|provide|require|setq|unless|use-package|when|while)"+k),lookbehind:!0},{pattern:RegExp(c+"(?:append|by|collect|concat|do|finally|for|in|return)"+k),lookbehind:!0}],declare:{pattern:i(/declare/.source),lookbehind:!0,alias:"keyword"},interactive:{pattern:i(/interactive/.source),lookbehind:!0,alias:"keyword"},boolean:{pattern:j(/nil|t/.source),lookbehind:!0},number:{pattern:j(/[-+]?\d+(?:\.\d*)?/.source),lookbehind:!0},defvar:{pattern:RegExp(c+"def(?:const|custom|group|var)\\s+"+a),lookbehind:!0,inside:{keyword:/^def[a-z]+/,variable:RegExp(a)}},defun:{pattern:RegExp(c+/(?:cl-)?(?:defmacro|defun\*?)\s+/.source+a+/\s+\(/.source+e+/\)/.source),lookbehind:!0,greedy:!0,inside:{keyword:/^(?:cl-)?def\S+/,arguments:null,function:{pattern:RegExp("(^\\s)"+a),lookbehind:!0},punctuation:/[()]/}},lambda:{pattern:RegExp(c+"lambda\\s+\\(\\s*(?:&?"+a+"(?:\\s+&?"+a+")*\\s*)?\\)"),lookbehind:!0,greedy:!0,inside:{keyword:/^lambda/,arguments:null,punctuation:/[()]/}},car:{pattern:RegExp(c+a),lookbehind:!0},punctuation:[/(?:['`,]?\(|[)\[\]])/,{pattern:/(\s)\.(?=\s)/,lookbehind:!0}]},f={"lisp-marker":RegExp("&"+a),varform:{pattern:RegExp(/\(/.source+a+/\s+(?=\S)/.source+e+/\)/.source),inside:b},argument:{pattern:RegExp(/(^|[\s(])/.source+a),lookbehind:!0,alias:"variable"},rest:b},g="\\S+(?:\\s+\\S+)*",h={pattern:RegExp(c+e+"(?=\\))"),lookbehind:!0,inside:{"rest-vars":{pattern:RegExp("&(?:body|rest)\\s+"+g),inside:f},"other-marker-vars":{pattern:RegExp("&(?:aux|optional)\\s+"+g),inside:f},keys:{pattern:RegExp("&key\\s+"+g+"(?:\\s+&allow-other-keys)?"),inside:f},argument:{pattern:RegExp(a),alias:"variable"},punctuation:/[()]/}};b.lambda.inside.arguments=h,b.defun.inside.arguments=d.util.clone(h),b.defun.inside.arguments.inside.sublist=h,d.languages.lisp=b,d.languages.elisp=b,d.languages.emacs=b,d.languages["emacs-lisp"]=b}(a)}b.exports=a,a.displayName="lisp",a.aliases=[]}}])