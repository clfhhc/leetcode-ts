(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[258],{9019:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/plasmic-host",function(){return c(614)}])},9025:function(f,c,a){"use strict";a.d(c,{"_":function(){return g}});var d=a(6995),e=a(2054),b=a(6879),g=(0,d.fZ)({projects:[{id:b.env.PLASMIC_ID||"",token:b.env.PLASMIC_TOKEN||""},],preview:!(0,e.G)()})},2054:function(c,a,b){"use strict";b.d(a,{"$":function(){return d},G:function(){return e}});var d=function(){return!0},e=function(){return!0}},1598:function(d,c,a){"use strict";function e(c,a){(null==a||a>c.length)&&(a=c.length);for(var b=0,d=new Array(a);b<a;b++)d[b]=c[b];return d}function f(a,b){return function(a){if(Array.isArray(a))return a}(a)||function(b,e){var f,g,a=null==b?null:"undefined"!=typeof Symbol&&b[Symbol.iterator]||b["@@iterator"];if(null!=a){var c=[],d=!0,h=!1;try{for(a=a.call(b);!(d=(f=a.next()).done)&&(c.push(f.value),!e||c.length!==e);d=!0);}catch(i){h=!0,g=i}finally{try{d||null==a.return||a.return()}finally{if(h)throw g}}return c}}(a,b)||g(a,b)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(a,c){if(a){if("string"==typeof a)return e(a,c);var b=Object.prototype.toString.call(a).slice(8,-1);if("Object"===b&&a.constructor&&(b=a.constructor.name),"Map"===b||"Set"===b)return Array.from(b);if("Arguments"===b||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b))return e(a,c)}}Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var b,h=(b=a(5170))&&b.__esModule?b:{default:b},i=a(9905),j=a(5505),k=a(1116),l={};function m(a,c,d,b){if(a&&i.isLocalURL(c)){a.prefetch(c,d,b).catch(function(a){});var e=b&& void 0!==b.locale?b.locale:a&&a.locale;l[c+"%"+d+(e?"%"+e:"")]=!0}}c.default=function(b){var c,r=!1!==b.prefetch,a=j.useRouter(),o=h.default.useMemo(function(){var c=f(i.resolveHref(a,b.href,!0),2),d=c[0],e=c[1];return{href:d,as:b.as?i.resolveHref(a,b.as):e||d}},[a,b.href,b.as]),s=o.href,e=o.as,d=b.children,y=b.replace,z=b.shallow,A=b.scroll,g=b.locale;"string"==typeof d&&(d=h.default.createElement("a",null,d));var t=(c=h.default.Children.only(d))&&"object"==typeof c&&c.ref,p=f(k.useIntersection({rootMargin:"200px"}),2),u=p[0],v=p[1],w=h.default.useCallback(function(a){u(a),t&&("function"==typeof t?t(a):"object"==typeof t&&(t.current=a))},[t,u]);h.default.useEffect(function(){var c=v&&r&&i.isLocalURL(s),b=void 0!==g?g:a&&a.locale,d=l[s+"%"+e+(b?"%"+b:"")];c&&!d&&m(a,s,e,{locale:b})},[e,s,v,g,r,a]);var n={ref:w,onClick:function(f){var d,j,h,k,l,m,n,o,b,p;c.props&&"function"==typeof c.props.onClick&&c.props.onClick(f),f.defaultPrevented||(d=f,j=a,h=s,k=e,l=y,m=z,n=A,o=g,"A"===d.currentTarget.nodeName.toUpperCase()&&((p=(b=d).currentTarget.target)&&"_self"!==p||b.metaKey||b.ctrlKey||b.shiftKey||b.altKey||b.nativeEvent&&2===b.nativeEvent.which||!i.isLocalURL(h))||(d.preventDefault(),j[l?"replace":"push"](h,k,{shallow:m,locale:o,scroll:n})))}};if(n.onMouseEnter=function(b){c.props&&"function"==typeof c.props.onMouseEnter&&c.props.onMouseEnter(b),i.isLocalURL(s)&&m(a,s,e,{priority:!0})},b.passHref||"a"===c.type&&!("href"in c.props)){var q=void 0!==g?g:a&&a.locale,x=a&&a.isLocaleDomain&&i.getDomainLocale(e,q,a&&a.locales,a&&a.domainLocales);n.href=x||i.addBasePath(i.addLocale(e,q,a&&a.defaultLocale))}return h.default.cloneElement(c,n)}},1116:function(c,a,b){"use strict";function d(c,a){(null==a||a>c.length)&&(a=c.length);for(var b=0,d=new Array(a);b<a;b++)d[b]=c[b];return d}function e(a,b){return function(a){if(Array.isArray(a))return a}(a)||function(b,e){var f,g,a=null==b?null:"undefined"!=typeof Symbol&&b[Symbol.iterator]||b["@@iterator"];if(null!=a){var c=[],d=!0,h=!1;try{for(a=a.call(b);!(d=(f=a.next()).done)&&(c.push(f.value),!e||c.length!==e);d=!0);}catch(i){h=!0,g=i}finally{try{d||null==a.return||a.return()}finally{if(h)throw g}}return c}}(a,b)||f(a,b)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(a,c){if(a){if("string"==typeof a)return d(a,c);var b=Object.prototype.toString.call(a).slice(8,-1);if("Object"===b&&a.constructor&&(b=a.constructor.name),"Map"===b||"Set"===b)return Array.from(b);if("Arguments"===b||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(b))return d(a,c)}}Object.defineProperty(a,"__esModule",{value:!0}),a.useIntersection=function(a){var b=a.rootRef,k=a.rootMargin,l=a.disabled||!i,o=g.useRef(),d=e(g.useState(!1),2),c=d[0],p=d[1],f=e(g.useState(b?b.current:null),2),m=f[0],q=f[1],n=g.useCallback(function(a){o.current&&(o.current(),o.current=void 0),!l&&!c&&a&&a.tagName&&(o.current=j(a,function(a){return a&&p(a)},{root:m,rootMargin:k}))},[l,m,k,c]);return g.useEffect(function(){if(!i&&!c){var a=h.requestIdleCallback(function(){return p(!0)});return function(){return h.cancelIdleCallback(a)}}},[c]),g.useEffect(function(){b&&q(b.current)},[b]),[n,c]};var g=b(5170),h=b(2745),i="undefined"!=typeof IntersectionObserver;function j(b,c,d){var a=m(d),g=a.id,e=a.observer,f=a.elements;return f.set(b,c),e.observe(b),function(){if(f.delete(b),e.unobserve(b),0===f.size){e.disconnect(),k.delete(g);var a=l.findIndex(function(a){return a.root===g.root&&a.margin===g.margin});a> -1&&l.splice(a,1)}}}var k=new Map,l=[];function m(c){var a,b={root:c.root||null,margin:c.rootMargin||""},d=l.find(function(a){return a.root===b.root&&a.margin===b.margin});if(d?a=k.get(d):(a=k.get(b),l.push(b)),a)return a;var e=new Map,f=new IntersectionObserver(function(a){a.forEach(function(a){var b=e.get(a.target),c=a.isIntersecting||a.intersectionRatio>0;b&&c&&b(c)})},c);return k.set(b,a={id:b,observer:f,elements:e}),a}},614:function(c,b,a){"use strict";a.r(b);var d=a(3010),e=a(6995),f=a(9025),g=a(7946);b.default=function(){return f._&&(0,d.jsxs)("div",{children:[(0,d.jsx)(g.default,{src:"https://static1.plasmic.app/preamble.js",strategy:"beforeInteractive"}),(0,d.jsx)(e.nh,{})]})}},7720:function(a,c,b){a.exports=b(3258)},7506:function(a,c,b){a.exports=b(1598)},7946:function(a,c,b){a.exports=b(2935)}},function(a){a.O(0,[9774,6995,2888,179],function(){return a(a.s=9019)}),_N_E=a.O()}])