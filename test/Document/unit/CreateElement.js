
    "use strict";

    var assert = require('assert');
    var CreateElement = require("../../../src/lib/Document/funcCreateElement");

    describe('CreateElement', function(){

        it('should fail to create an element if supplied incorrect inpout', function(done){

            assert.equal( CreateElement(), undefined );
            assert.equal( CreateElement(1), undefined );
            assert.equal( CreateElement({}), undefined );
            assert.equal( CreateElement([]), undefined );


            done();
        });

        it('should create an element with supplied tag', function(done){

            assert.equal( CreateElement("div").tagName, "DIV" );
            assert.equal( CreateElement("blah").tagName, "BLAH" );
            assert.equal( CreateElement("blah").nodeType, 1 );
            assert.deepEqual( CreateElement("blah").style, {} );



            done();
        });
    });