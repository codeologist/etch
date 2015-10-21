
    "use strict";

    var assert = require('assert');
    var fs= require("fs");
    var Etch = require("../../../src/index");

    var Compile = require("../../../src/lib/Compile/Index");
    var loader = require("../../../src/lib/Loader/index");
    var window = require("../../../src/lib/Window");



    Compile( "test/Extend/functional/index.html" );

    describe('Extend', function(){


        it('should bind to the window ready event', function(done){

            var w;

            function extension(){
                this.name="xxx";
                this.init = function( win, doc ){
                    window.prototype.ext={};
                    assert( win === w);
                    assert( doc === w.document);

                    done();
                }
            }


            Etch.Extend( extension );
            w = Etch.Load("test/Extend/functional/a.cmp");

        });



        it('should expect to see a name property on an extension and fail loudly otherwise', function(done){

            function extension(  ){
            }

            try {
                Etch.Extend( extension );

                Etch.Load("test/Extend/functional/a.cmp");
            } catch( e) {
                assert( true );
                assert( !window.prototype.ext.testext );
            }

            done();
        });

        it('should expose extentions on the .ext property', function(done){

            function extension( window ){
                this.name="testext";
            }


            Etch.Extend( extension );


            var window = Etch.Load("test/Extend/functional/a.cmp");

            assert.equal( window.ext.testext.name, "testext" );
            done();
        });


        it('should extend the window prototype with the exposed methods of the extension', function(done){

            function extension( window ){
                this.name="testext";
                this.window = {
                    extfunc : function(){

                    }
                }
            }


            Etch.Extend( extension );


            var window = Etch.Load("test/Extend/functional/a.cmp");

            assert( window.extfunc );
            assert( !window.nofunc );
            done();
        });

        it('should  extend the document prototype with the exposed methods of the extension', function(done){

            function extension( window, document ){
                this.name="testext";
                this.document = {
                    extfunc : function(){

                    }
                }
            }


            Etch.Extend( extension );


            var window = Etch.Load("test/Extend/functional/a.cmp");

            assert( window.document.extfunc );
            assert( !window.document.nofunc );
            done();
        });



    });