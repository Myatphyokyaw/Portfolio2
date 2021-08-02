#!/usr/bin/env node
var com = require("./command.js");

var args = process.argv.slice(0);
// shift off node and script name

new com.commands(args).init();