
    "use strict";

    var assert = require('assert');
    var Window = require("../../../src/lib/Window");

    describe('Setting isDocumentReady', function(){

        it('should resolve the ready promise', function(done){

            var window = new Window();

            window.queueReadyCallbackAwaitingPromiseResolution( function(){
                assert(true);
                done();
            });


            window.isDocumentReady = true;
        });
    });

