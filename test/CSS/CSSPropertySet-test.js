
    "use strict";

    var assert = require('assert');

    var CSSPropertySet = require("../../src/lib/CSS/CSSPropertySet");


    describe('CSSPropertySet', function(){


        it("should parse a property string", function( done ) {

            assert.deepEqual( new CSSPropertySet(), {} );
            assert.equal( new CSSPropertySet("color:blue").color, "blue" );
            assert.equal( new CSSPropertySet("background-color:red").backgroundColor, "red" );
            assert.equal( new CSSPropertySet("border-width-left:0").borderWidthLeft, 0 );
            done();
        });

        it("should parse a set of css props", function( done ) {

            var css= new CSSPropertySet("color:blue;top:10;left:20;display:none");
            assert.equal( css.color, "blue" );
            assert.equal( css.top, "10" );
            assert.equal( css.left, "20" );
            assert.equal( css.display, "none" );

            done();
        });

    });