
    "use strict";

    var assert = require('assert');
    var Document = require("../../../src/lib/Document");


    describe('Document.appendChild', function(){

        /*
            When a childnode is appended to a dom an event is raise on that dom
            to signal that a node has been added and can be considered for drawing
         */
        it('should raise a capture event on the document', function(done){
            var document = new Document();
            var el = document.createElement("div");
            el.tag = 1;

            document.addEventListener( "onsystemevent1", function( e ){
            }, true );



            assert.equal( document.eventHandlers[0].type,"onsystemevent1");
            assert.equal( document.eventHandlers[0].capture,true);


            document.appendChild( el );

            assert.equal( document.eventQueue[0].type, "onsystemevent1");
            done();
        });
    });
