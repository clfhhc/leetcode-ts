"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[982],{5963:function(b){function a(b){var a,c,d;(a=b).languages.xquery=a.languages.extend("markup",{"xquery-comment":{pattern:/\(:[\s\S]*?:\)/,greedy:!0,alias:"comment"},string:{pattern:/(["'])(?:\1\1|(?!\1)[\s\S])*\1/,greedy:!0},extension:{pattern:/\(#.+?#\)/,alias:"symbol"},variable:/\$[-\w:]+/,axis:{pattern:/(^|[^-])(?:ancestor(?:-or-self)?|attribute|child|descendant(?:-or-self)?|following(?:-sibling)?|parent|preceding(?:-sibling)?|self)(?=::)/,lookbehind:!0,alias:"operator"},"keyword-operator":{pattern:/(^|[^:-])\b(?:and|castable as|div|eq|except|ge|gt|idiv|instance of|intersect|is|le|lt|mod|ne|or|union)\b(?=$|[^:-])/,lookbehind:!0,alias:"operator"},keyword:{pattern:/(^|[^:-])\b(?:as|ascending|at|base-uri|boundary-space|case|cast as|collation|construction|copy-namespaces|declare|default|descending|else|empty (?:greatest|least)|encoding|every|external|for|function|if|import|in|inherit|lax|let|map|module|namespace|no-inherit|no-preserve|option|order(?: by|ed|ing)?|preserve|return|satisfies|schema|some|stable|strict|strip|then|to|treat as|typeswitch|unordered|validate|variable|version|where|xquery)\b(?=$|[^:-])/,lookbehind:!0},function:/[\w-]+(?::[\w-]+)*(?=\s*\()/,"xquery-element":{pattern:/(element\s+)[\w-]+(?::[\w-]+)*/,lookbehind:!0,alias:"tag"},"xquery-attribute":{pattern:/(attribute\s+)[\w-]+(?::[\w-]+)*/,lookbehind:!0,alias:"attr-name"},builtin:{pattern:/(^|[^:-])\b(?:attribute|comment|document|element|processing-instruction|text|xs:(?:ENTITIES|ENTITY|ID|IDREFS?|NCName|NMTOKENS?|NOTATION|Name|QName|anyAtomicType|anyType|anyURI|base64Binary|boolean|byte|date|dateTime|dayTimeDuration|decimal|double|duration|float|gDay|gMonth|gMonthDay|gYear|gYearMonth|hexBinary|int|integer|language|long|negativeInteger|nonNegativeInteger|nonPositiveInteger|normalizedString|positiveInteger|short|string|time|token|unsigned(?:Byte|Int|Long|Short)|untyped(?:Atomic)?|yearMonthDuration))\b(?=$|[^:-])/,lookbehind:!0},number:/\b\d+(?:\.\d+)?(?:E[+-]?\d+)?/,operator:[/[+*=?|@]|\.\.?|:=|!=|<[=<]?|>[=>]?/,{pattern:/(\s)-(?=\s)/,lookbehind:!0}],punctuation:/[[\](){},;:/]/}),a.languages.xquery.tag.pattern=/<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/,a.languages.xquery.tag.inside["attr-value"].pattern=/=(?:("|')(?:\\[\s\S]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!\1)[^\\])*\1|[^\s'">=]+)/,a.languages.xquery.tag.inside["attr-value"].inside.punctuation=/^="|"$/,a.languages.xquery.tag.inside["attr-value"].inside.expression={pattern:/\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}/,inside:a.languages.xquery,alias:"language-xquery"},c=function(a){return"string"==typeof a?a:"string"==typeof a.content?a.content:a.content.map(c).join("")},d=function(e){for(var g=[],b=0;b<e.length;b++){var f=e[b],i=!1;if("string"!=typeof f&&("tag"===f.type&&f.content[0]&&"tag"===f.content[0].type?"</"===f.content[0].content[0].content?g.length>0&&g[g.length-1].tagName===c(f.content[0].content[1])&&g.pop():"/>"===f.content[f.content.length-1].content||g.push({tagName:c(f.content[0].content[1]),openedBraces:0}):!(g.length>0)||"punctuation"!==f.type||"{"!==f.content||e[b+1]&&"punctuation"===e[b+1].type&&"{"===e[b+1].content||e[b-1]&&"plain-text"===e[b-1].type&&"{"===e[b-1].content?g.length>0&&g[g.length-1].openedBraces>0&&"punctuation"===f.type&&"}"===f.content?g[g.length-1].openedBraces--:"comment"!==f.type&&(i=!0):g[g.length-1].openedBraces++),(i||"string"==typeof f)&&g.length>0&&0===g[g.length-1].openedBraces){var h=c(f);b<e.length-1&&("string"==typeof e[b+1]||"plain-text"===e[b+1].type)&&(h+=c(e[b+1]),e.splice(b+1,1)),b>0&&("string"==typeof e[b-1]||"plain-text"===e[b-1].type)&&(h=c(e[b-1])+h,e.splice(b-1,1),b--),/^\s+$/.test(h)?e[b]=h:e[b]=new a.Token("plain-text",h,null,h)}f.content&&"string"!=typeof f.content&&d(f.content)}},a.hooks.add("after-tokenize",function(a){"xquery"===a.language&&d(a.tokens)})}b.exports=a,a.displayName="xquery",a.aliases=[]}}])