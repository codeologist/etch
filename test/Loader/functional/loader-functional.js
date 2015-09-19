
    "use strict";

    var assert = require('assert');
    var Loader = require("../../../src/lib/Loader");

    describe('Loader', function(){

        it('should throw an error if no filename provided', function(done){

            try {
                Loader();
            } catch( e ){
                assert.equal( e, "error loading document" );
            }

            done();
        });

        it('should throw an error if filename dosent exist', function(done){

            try {
                Loader("./abc123");
            } catch( e ) {
                assert.equal( e, "error loading document" );
            }

            done();
        });

        it('should load a document', function(done){

            var APPWINDOW = Loader( "test/Loader/functional/compiledHtml.cmp");

            // Loader returns a window object
            assert( APPWINDOW.document );

            // Window onbject is a graph that maps back to itself via the document
            assert.deepEqual( APPWINDOW.document.window, APPWINDOW );

            assert.equal( APPWINDOW.document.nodeType, 9 );
            assert.equal( APPWINDOW.document.tagName, "HTML" );
            done();
        });
    });

