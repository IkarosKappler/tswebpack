import { CONST_A, CONST_B } from "./myconstants";
import { makeDoubleString, makeMyString } from "./myfunctions";
export class MyClass {
    constructor() {
        this.myNum = CONST_A;
        this.myString = CONST_B;
    }
    printMe() {
        console.log(makeMyString(this));
    }
    printMeDouble() {
        console.log(makeDoubleString(makeMyString(this)));
    }
}
//# sourceMappingURL=myclasses.js.map