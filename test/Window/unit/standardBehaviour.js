
"use strict";

var assert = require('assert');
var Window = require("../../../src/lib/Window");

describe('Window - Standard Behaviour', function(){



    it('should attatch a document to the window', function(done){

        var w = new Window();

        w.document={"a":1};

        assert.equal( w.document.a, 1);
        done();
    });


    it('should attatch a render strategy to the window', function(done){

        var w = new Window();

        w.renderStrategy={"a":1,draw:function(){}};

        assert.equal( w.renderStrategy.a, 1);
        done();
    });

    it('should attatch a gesture strategy to the window', function(done){

        var w = new Window();

        w.gestureStrategy={"a":1};

        assert.equal( w.gestureStrategy.a, 1);
        done();
    });




});