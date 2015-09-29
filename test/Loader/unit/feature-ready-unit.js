
    "use strict";

    var assert = require('assert');
    var Window = require("../../../src/lib/Window");

    describe('unit ready', function(){

        it('should only be able to be set to true', function(done){

            var window = new Window();

            assert( window.isDocumentReady === false );

            window.isDocumentReady = true;

            assert( window.isDocumentReady === true );

            window.isDocumentReady = false;

            assert( window.isDocumentReady === true );

            done();
        });
    });

