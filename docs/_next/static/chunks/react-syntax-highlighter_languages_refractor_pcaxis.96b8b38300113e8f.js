"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2726],{4768:function(b){function a(a){a.languages.pcaxis={string:/"[^"]*"/,keyword:{pattern:/((?:^|;)\s*)[-A-Z\d]+(?:\s*\[[-\w]+\])?(?:\s*\("[^"]*"(?:,\s*"[^"]*")*\))?(?=\s*=)/,lookbehind:!0,greedy:!0,inside:{keyword:/^[-A-Z\d]+/,language:{pattern:/^(\s*)\[[-\w]+\]/,lookbehind:!0,inside:{punctuation:/^\[|\]$/,property:/[-\w]+/}},"sub-key":{pattern:/^(\s*)\S[\s\S]*/,lookbehind:!0,inside:{parameter:{pattern:/"[^"]*"/,alias:"property"},punctuation:/^\(|\)$|,/}}}},operator:/=/,tlist:{pattern:/TLIST\s*\(\s*\w+(?:(?:\s*,\s*"[^"]*")+|\s*,\s*"[^"]*"-"[^"]*")?\s*\)/,greedy:!0,inside:{function:/^TLIST/,property:{pattern:/^(\s*\(\s*)\w+/,lookbehind:!0},string:/"[^"]*"/,punctuation:/[(),]/,operator:/-/}},punctuation:/[;,]/,number:{pattern:/(^|\s)\d+(?:\.\d+)?(?!\S)/,lookbehind:!0},boolean:/NO|YES/},a.languages.px=a.languages.pcaxis}b.exports=a,a.displayName="pcaxis",a.aliases=["px"]}}])