
    "use strict";

    var assert = require('assert');
    var fs= require("fs");
    var Compile = require("../../../src/lib/Compile");

    Compile( "test/Compile/functional/index.html");

    describe('Compile', function(){


        it('should create a compiled file', function(done){
            assert( fs.existsSync("test/Compile/functional/a.cmp") );
            done();
        });

        it('should contain the json representation of the html node', function(done){
            var data = JSON.parse( fs.readFileSync("test/Compile/functional/a.cmp") );

            assert.equal( data.tagName, "HTML");
            assert.equal( data.nodeType, 9);
            assert( Array.isArray( data.childNodes ) );
            done();
        });



    });