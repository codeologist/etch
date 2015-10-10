    "use strict";

    var assert = require('assert');
    var Loader = require("../../../src/lib/Loader");

    describe('FUNCTIONAL:Document ', function(){

        it('should trigger an layout event when an elements geometry is changed', function(done){

            var window = Loader( "test/Document/functional/document.cmp");
            var ct = 0;



            window.ready( function(){

                window.document.addEventListener( "onlayout", function( e ){
                    ct++;
                }, true );

                window.document.addEventListener( "ondraw", function( e ){
                    assert( false );
                }, true );


                window.document.childNodes[0].style.top=86;
                window.document.childNodes[0].childNodes[0].childNodes[0].nongeometry="RANDOMTEXT";
                window.document.childNodes[0].childNodes[0].style.height=99;
                window.document.childNodes[0].childNodes[0].childNodes[0].style.left=99;
                window.document.childNodes[0].childNodes[0].childNodes[0].style.width=99;
                window.document.childNodes[0].childNodes[0].childNodes[0].style.display="none";
            });

            setTimeout( function(){
                assert.equal( ct, 5 );
                window.document.removeEventListener("onlayout");
                window.document.removeEventListener("ondraw");
                done();
            }, 0 );


        });


        it('should trigger an draw event when an elements visual style is changed', function(done){

            var window = Loader( "test/Document/functional/document.cmp");
            var ct = 0;

            window.ready( function(){

                window.document.addEventListener( "onlayout", function( e ){
                    assert( false );
                }, true );

                window.document.addEventListener( "ondraw", function( e ){
                    ct++;
                    console.log(":::::::",ct, e.eventPhase, e.target.tagName , e.target.style)
                }, true );

                window.document.childNodes[0].childNodes[0].childNodes[0].nongeometry="RANDOMTEXT";
                window.document.childNodes[0].childNodes[0].style.backgroundColor="red";
                window.document.childNodes[0].childNodes[0].style.color="red";

            });

            setTimeout( function(){
                assert.equal( ct, 2 );
                window.document.removeEventListener("onlayout");
                window.document.removeEventListener("ondraw");
                done();
            }, 0 );


        });

    });
