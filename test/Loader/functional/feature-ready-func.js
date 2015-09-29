
    "use strict";

    var assert = require('assert');
    var Loader = require("../../../src/lib/Loader");

    describe('Ready Event', function(){

        it('should trigger a ready promise when the document is loaded', function(done){

            var window = Loader( "test/Loader/functional/compiledHtml.cmp");

            var ct = 0;

            window.ready( function(){
                ct++;

            });

            window.ready( function(){
                ct++;

            });

            window.ready( function(){
                assert( ct == 2);
                done();
            });


        });
    });

