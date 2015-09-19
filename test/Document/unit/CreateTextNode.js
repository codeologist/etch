
    "use strict";

    var assert = require('assert');
    var CreateTextNode = require("../../../src/lib/Document/funcCreateTextNode");

    describe('CreateTextNode', function(){


        it('should create a text node with supplied text', function(done){
            assert.equal( CreateTextNode("example text").value, "example text" );
            done();
        });

    });