"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2180,3657],{1171:function(b){function a(a){a.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},a.languages.webmanifest=a.languages.json}b.exports=a,a.displayName="json",a.aliases=["webmanifest"]},906:function(b,d,c){var e=c(1171);function a(b){var c,a;b.register(e),a=/("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/,(c=b).languages.json5=c.languages.extend("json",{property:[{pattern:RegExp(a.source+"(?=\\s*:)"),greedy:!0},{pattern:/(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,alias:"unquoted"}],string:{pattern:a,greedy:!0},number:/[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/})}b.exports=a,a.displayName="json5",a.aliases=[]}}])