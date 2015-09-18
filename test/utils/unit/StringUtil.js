
"use strict";

var assert = require('assert');
var StringUtil = require("../../../src/lib/utils/StringUtil");

describe('StringUtil', function(){

    it("toCamelCase()", function( done ){

        var str = new StringUtil( "this-is-text");

        assert.equal( str.toCamelCase(), "thisIsText");

        done();
    });

    it("normalizeText()", function( done ){

        var str = new StringUtil( "   this is some text   \n");

        assert.equal( str.normalizeText(), "this is some text");

        done();
    });
});