"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDoubleString = exports.makeMyString = void 0;
var repeat_string_1 = require("repeat-string"); // Test how external libraries are bundled
var makeMyString = function (obj) { return "myNum=" + obj.myNum + " myString=" + obj.myString; };
exports.makeMyString = makeMyString;
var makeDoubleString = function (str) { return (0, repeat_string_1.default)(str, 2); };
exports.makeDoubleString = makeDoubleString;
//# sourceMappingURL=myfunctions.js.map