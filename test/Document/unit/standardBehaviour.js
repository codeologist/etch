
    "use strict";

    var assert = require('assert');
    var Document = require("../../../src/lib/Document");

    describe('Document - Standard Behaviour', function(){

        it('should attatch a window to the document', function(done){

            var d = new Document();

            d.window={"a":1};

            assert.equal( d.window.a, 1);
            done();
        });



    });