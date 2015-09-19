
    "use strict";

    var assert = require('assert');
    var EtchString = require("../../../src/lib/utils/StringUtil");

    describe('EtchString', function(){

        it("toCamelCase()", function( done ){

            var str = new EtchString( "this-is-text");

            assert.equal( str.toCamelCase(), "thisIsText");

            done();
        });

        it("normalizeText()", function( done ){

            var str = new EtchString( "   this is some text   \n");

            assert.equal( str.normalizeText(), "this is some text");

            done();
        });
    });