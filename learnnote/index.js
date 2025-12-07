console.log("Hello via Bun!");

//const common = require("./common.js");
import common from "./common.js";
common.hello();

import es from "./es.js";
es.hello();

import boxen from "boxen";

console.log(boxen("unicorn", {padding: 1}));