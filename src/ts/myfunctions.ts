import { MyClass } from "./myclasses";
import repeat from "repeat-string"; // Test how external libraries are bundled

export const makeMyString = (obj:MyClass) => `myNum=${obj.myNum} myString=${obj.myString}`;

export const makeDoubleString = (str:string) => repeat(str,2);
