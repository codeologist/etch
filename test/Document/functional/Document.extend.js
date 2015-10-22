
    "use strict";

    var assert = require('assert');
    var Document = require("../../../src/lib/Document/index");


    var ETCH = require("../../../src");

    ETCH.Extend( require("etch-extend-selector") );

    describe('Document.getElementById', function(){

        it('should find an element by id', function(done){

            var document = new Document();

            var element = document.createElement("div");
            element.id="one";
            document.appendChild( element );
            var el =  document.getElementById("one");
            assert.equal(el.id, "one" );

            done();
        });
    });

    describe('Document.getElementsByTagName', function(){

        it('should find elements by Tag Name', function(done){

            var document = new Document();

            var element = document.createElement("div");

            document.appendChild( element );

            var elist = document.getElementsByTagName("div");

            assert.equal( elist.length, 1 );


            done();
        });
    });

    describe('Document.consumeNode', function(){

        it('should copy all enumerable properties and destroy node', function(done){

            var document = new Document();
            var target = { one:1, two: 2 };

            document.consume( target );


            assert.equal( document.one, 1 );
            assert.equal( document.two, 2 );

            assert( !target.one );
            assert( !target.two );


            done();
        });
    });
