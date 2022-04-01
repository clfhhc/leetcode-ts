"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1323,3047],{680:function(b,d,c){var e=c(7305);function a(a){a.register(e),a.languages.liquid={comment:{pattern:/(^\{%\s*comment\s*%\})[\s\S]+(?=\{%\s*endcomment\s*%\}$)/,lookbehind:!0},delimiter:{pattern:/^\{(?:\{\{|[%\{])-?|-?(?:\}\}|[%\}])\}$/,alias:"punctuation"},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},keyword:/\b(?:as|assign|break|(?:end)?(?:capture|case|comment|for|form|if|paginate|raw|style|tablerow|unless)|continue|cycle|decrement|echo|else|elsif|in|include|increment|limit|liquid|offset|range|render|reversed|section|when|with)\b/,object:/\b(?:address|all_country_option_tags|article|block|blog|cart|checkout|collection|color|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|part|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,function:[{pattern:/(\|\s*)\w+/,lookbehind:!0,alias:"filter"},{pattern:/(\.\s*)(?:first|last|size)/,lookbehind:!0}],boolean:/\b(?:false|nil|true)\b/,range:{pattern:/\.\./,alias:"operator"},number:/\b\d+(?:\.\d+)?\b/,operator:/[!=]=|<>|[<>]=?|[|?:=-]|\b(?:and|contains(?=\s)|or)\b/,punctuation:/[.,\[\]()]/,empty:{pattern:/\bempty\b/,alias:"keyword"}},a.hooks.add("before-tokenize",function(b){var c=!1;a.languages["markup-templating"].buildPlaceholders(b,"liquid",/\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}|\{(?:%[\s\S]*?%|\{\{[\s\S]*?\}\}|\{[\s\S]*?\})\}/g,function(d){var a=/^\{%-?\s*(\w+)/.exec(d);if(a){var b=a[1];if("raw"===b&&!c)return c=!0,!0;if("endraw"===b)return c=!1,!0}return!c})}),a.hooks.add("after-tokenize",function(b){a.languages["markup-templating"].tokenizePlaceholders(b,"liquid")})}b.exports=a,a.displayName="liquid",a.aliases=[]},7305:function(b){function a(a){!function(a){function b(a,b){return"___"+a.toUpperCase()+b+"___"}Object.defineProperties(a.languages["markup-templating"]={},{buildPlaceholders:{value:function(c,d,e,f){if(c.language===d){var g=c.tokenStack=[];c.code=c.code.replace(e,function(a){if("function"==typeof f&&!f(a))return a;for(var h,e=g.length;-1!==c.code.indexOf(h=b(d,e));)++e;return g[e]=a,h}),c.grammar=a.languages.markup}}},tokenizePlaceholders:{value:function(c,d){if(c.language===d&&c.tokenStack){c.grammar=a.languages[d];var e=0,f=Object.keys(c.tokenStack);g(c.tokens)}function g(j){for(var k=0;k<j.length;k++){if(e>=f.length)break;var h=j[k];if("string"==typeof h||h.content&&"string"==typeof h.content){var n=f[e],o=c.tokenStack[n],l="string"==typeof h?h:h.content,p=b(d,n),m=l.indexOf(p);if(m> -1){++e;var q=l.substring(0,m),s=new a.Token(d,a.tokenize(o,c.grammar),"language-"+d,o),r=l.substring(m+p.length),i=[];q&&i.push.apply(i,g([q])),i.push(s),r&&i.push.apply(i,g([r])),"string"==typeof h?j.splice.apply(j,[k,1].concat(i)):h.content=i}}else h.content&&g(h.content)}return j}}}})}(a)}b.exports=a,a.displayName="markupTemplating",a.aliases=[]}}])