// Expose all you components to the

// globalThis.repeat = require("repeat-string");
globalThis["repeat-string"] = require("repeat-string").default;
globalThis.MyClass = require("./myclasses").MyClass;
