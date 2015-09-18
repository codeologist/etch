#!/usr/bin/env node


    var Etch = require("../src/index.js");
    var args = process.argv.slice(2);

    if ( args[0] === "compile"){
        Etch.Compile( args[1] );
    }