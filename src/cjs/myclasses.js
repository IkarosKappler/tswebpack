"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var myconstants_1 = require("./myconstants");
var myfunctions_1 = require("./myfunctions");
var MyClass = /** @class */ (function () {
    function MyClass() {
        this.myNum = myconstants_1.CONST_A;
        this.myString = myconstants_1.CONST_B;
    }
    MyClass.prototype.printMe = function () {
        console.log((0, myfunctions_1.makeMyString)(this));
    };
    return MyClass;
}());
exports.MyClass = MyClass;
//# sourceMappingURL=myclasses.js.map