
    "use strict";

    var assert = require('assert');
    var Window = require("../../../src/lib/Window");

    var revivableDoc = {
        "nodeType": 9,
        "tagName": "HTML",
        style:"top:10",
        "childNodes": [
            {
                "nodeType": 1,
                "tagName": "DIV",
                "childNodes": [

                ],
                style:"left:10"


            },
            {
                "nodeType": 3,
                value:"hello"

            },
            {
                "nodeType": 8,
                "value": " a comment "
            },
            {
                "nodeType": 1,
                "id":"testid",
                "tagName": "DIV",
                "childNodes": [

                ],
                expando1:"expand prop"

            }
        ]

    };

    describe('WINDOW.jsonToDocument', function(){

        var WINDOW = new Window();
        
        it('should create a document element', function(done){

            var doc = WINDOW.jsonToDocument( revivableDoc );

            assert.equal( doc.nodeType, 9 );
            assert.equal( doc.tagName, "HTML" );
            assert.equal( doc.parent, null );
            assert.deepEqual( doc.documentElement, doc );
            //assert.deepEqual( doc.childNodes, [] );


            done();
        });

        it('should revive a child element in the correct position in the dom tree', function(done){

            var doc = WINDOW.jsonToDocument( revivableDoc );

            assert.equal( doc.childNodes[0].nodeType, 1 );
            assert.equal( doc.childNodes[0].tagName, "DIV" );
            assert.deepEqual( doc.childNodes[0].parent, doc );
            assert.deepEqual( doc.childNodes[0].documentElement, doc );


            done();
        });

        it('should revive a Text Node in the correct position in the dom tree', function(done){

            var doc = WINDOW.jsonToDocument( revivableDoc );

            assert.equal( doc.childNodes[1].nodeType, 3 );
            assert( !doc.childNodes[1].tagName );
            assert.equal( doc.childNodes[1].value, "hello");
            assert.deepEqual( doc.childNodes[1].parent, doc );
            assert.deepEqual( doc.childNodes[1].documentElement, doc );


            done();
        });

        it('should revive a Comment Node in the correct position in the dom tree', function(done){

            var doc = WINDOW.jsonToDocument( revivableDoc );

            assert.equal( doc.childNodes[2].nodeType, 8 );
            assert( !doc.childNodes[2].tagName );
            assert.equal( doc.childNodes[2].value, "a comment");
            assert.deepEqual( doc.childNodes[2].parent, doc );
            assert.deepEqual( doc.childNodes[2].documentElement, doc );


            done();
        });

        it('should clone style property on node 9 & 1', function(done){

            var doc = WINDOW.jsonToDocument( revivableDoc );

            assert.equal( doc.style.top,"10" );
            assert.equal( doc.childNodes[0].style.left,"10" );


            done();
        });

        it('should populate id property', function(done){

            var doc = WINDOW.jsonToDocument( revivableDoc );


            assert.equal( doc.childNodes[3].id, "testid" );


            done();
        });
    });