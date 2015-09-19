
    "use strict";

    var assert = require('assert');
    var CreateCommentNode = require("../../../src/lib/Document/funcCreateCommentNode");

    describe('CreateCommentNode', function(){


        it('should create a comment node with supplied text', function(done){
            assert.equal( CreateCommentNode("example comment").value, "example comment" );
            done();
        });

    });