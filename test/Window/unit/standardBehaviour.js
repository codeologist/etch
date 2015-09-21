
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


    it('should attatch a strategy to the window', function(done){

        var w = new Window();

        w.strategy={"a":1};

        assert.equal( w.strategy.a, 1);
        done();
    });

    it('should create a new Luna drawing context', function(done){

        var w = new Window();
        var el = { dummy:true };

        var dc = w.getDrawingContext( el );

        assert.equal( typeof dc, "object");// TODO - is this the best i can do?
        done();
    });


});