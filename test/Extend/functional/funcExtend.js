
    "use strict";

    var assert = require('assert');
    var fs= require("fs");
    var Etch = require("../../../src/index");

    var Compile = require("../../../src/lib/Compile/Index");
    var loader = require("../../../src/lib/Loader/index");





    describe('Extend', function(){


        it('should extend the window prototype with the exposed methods of the extension', function(done){

            function extension( window ){

                this.window = {
                    extfunc : function(){

                    }
                }
            }


            Etch.Extend( extension );

            Compile( "test/Extend/functional/index.html" );
            var window = Etch.Load("test/Extend/functional/a.cmp");

            assert( window.extfunc );
            assert( !window.nofunc );
            done();
        });

        it('should  extend the document prototype with the exposed methods of the extension', function(done){

            function extension( window, document ){

                this.document = {
                    extfunc : function(){

                    }
                }
            }


            Etch.Extend( extension );

            Compile( "test/Extend/functional/index.html" );
            var window = Etch.Load("test/Extend/functional/a.cmp");

            assert( window.document.extfunc );
            assert( !window.document.nofunc );
            done();
        });



    });