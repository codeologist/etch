
    "use strict";
    var FOCUSEDELEMENT = Symbol();
    function AspectDocument(){
        this[FOCUSEDELEMENT]=new WeakMap();

        this.nodeType = 9;
        this.eventQueue=[];
        this.window = null;


        Object.defineProperty( this, "getFocusedElement",{
            value: function(){
                this[FOCUSEDELEMENT].get( this );
            }
        });


        this.addEventListener( "onfocus", function( e ) {
            this[FOCUSEDELEMENT].set( this, e.target );
        }, true, Infinity, this );

        this.addEventListener( "onblur", function() {
            this[FOCUSEDELEMENT].set( this, undefined );
        }, true, Infinity, this );

    }


    module.exports = AspectDocument;