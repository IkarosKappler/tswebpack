import { CONST_A, CONST_B } from "./myconstants";
import { makeMyString } from "./myfunctions";
export class MyClass {
    constructor() {
        this.myNum = CONST_A;
        this.myString = CONST_B;
    }
    printMe() {
        console.log(makeMyString(this));
    }
}
//# sourceMappingURL=myclasses.js.map