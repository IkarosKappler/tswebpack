(()=>{var t={464:t=>{"use strict";
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */var e,r="";t.exports=function(t,n){if("string"!=typeof t)throw new TypeError("expected a string");if(1===n)return t;if(2===n)return t+t;var i=t.length*n;if(e!==t||void 0===e)e=t,r="";else if(r.length>=i)return r.substr(0,i);for(;i>r.length&&n>1;)1&n&&(r+=t),n>>=1,t+=t;return r=(r+=t).substr(0,i)}},965:(t,e,r)=>{"use strict";e.f=void 0;var n=r(664),i=r(805),o=function(){function t(){this.myNum=n.CONST_A,this.myString=n.CONST_B}return t.prototype.printMe=function(){console.log((0,i.makeMyString)(this))},t.prototype.printMeDouble=function(){console.log((0,i.makeDoubleString)((0,i.makeMyString)(this)))},t}();e.f=o},664:(t,e)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.CONST_B=e.CONST_A=void 0,e.CONST_A=1234,e.CONST_B="Test"},805:(t,e,r)=>{"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.makeDoubleString=e.makeMyString=void 0;var n=r(464);e.makeMyString=function(t){return"myNum="+t.myNum+" myString="+t.myString};e.makeDoubleString=function(t){return n(t,2)}}},e={};function r(n){var i=e[n];if(void 0!==i)return i.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}globalThis["repeat-string"]=r(464).default,globalThis.MyClass=r(965).f})();
//# sourceMappingURL=build.js.map