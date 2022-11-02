if (typeof __dirname === "undefined") global.__dirname = "/";
if (typeof __filename === "undefined") global.__filename = "";
if (typeof process === "undefined") {
  global.process = require("process");
} else {
  const bProcess = require("process");
  for (let p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

// shim Intl for Matrix.js
if (typeof global.Intl === "undefined") {
  global.Intl = {};
  global.Intl.Collator = function () {};
  global.Intl.Collator.prototype.compare = function (a, b) {
    return a.localeCompare(b);
  };
}

process.browser = false;
if (typeof Buffer === "undefined") global.Buffer = require("buffer").Buffer;

// global.location = global.location || { port: 80 }
const isDev = typeof __DEV__ === "boolean" && __DEV__;
process.env["NODE_ENV"] = isDev ? "development" : "production";
if (typeof localStorage !== "undefined") {
  localStorage.debug = isDev ? "*" : "";
}

// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require("crypto");
