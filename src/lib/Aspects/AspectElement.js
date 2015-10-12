
    "use strict";

    var DOCUMENTELEMENT = Symbol();
    var STYLEELEMENT = Symbol();

    function AspectElement( tag, document  ){
        this[DOCUMENTELEMENT] = new WeakMap();
        this[STYLEELEMENT] = new WeakMap();

        var LAYOUT = ["top","left","bottom","right","width","height","display"];



        tag = tag || "ELEMENT";

        this.childNodes = [];
        this.parent = null;

        this.eventHandlers = [];
        this.tagName = tag.toUpperCase();
        this.nodeType = 1;
        this[STYLEELEMENT].set( this, {} );

        Object.defineProperty( this, "documentElement",{
            enumerable:true,
            get: function(){
                return this[DOCUMENTELEMENT].get( this );
            },
            set: function( document ){
                this[DOCUMENTELEMENT].set( this, document);
            }
        });


        Object.defineProperty( this, "focus", {
            value: function(){

                this.dispatchEvent( this.documentElement.createEvent("focus") );
            }
        });

        Object.defineProperty( this, "blur",{

            value: function(){
                this.dispatchEvent( this.documentElement.createEvent("blur") );
            }
        });


        this.documentElement = document;

        Object.defineProperty( this, "style",{
            enumerable:true,
            get: function(){
                return this[STYLEELEMENT].get( this );
            },
            set:function( styleObject ){

                if ( typeof  this[STYLEELEMENT].get( this ) === "object" ){
                    Object.keys( styleObject ).forEach( function( key ){
                        this.style[ key ] = styleObject[key];
                    }, this );
                }
            }
        });

        // LAYOUT CHANGE FOR APPEND AND REMOVE

        Object.observe( this, function(changes) {
            var dispatch = false;
            changes.forEach( function(change){
                if ( change.name === "parent" ) {
                    dispatch = true;
                }
            }, this );

            if ( dispatch ) {
                this.parent.dispatchEvent(  this.documentElement.createEvent("layout") );
            }
        }.bind( this ));

        Object.observe( this.style, function(changes) {
            var dispatchLayout=false;
            var dispatchDraw=false;

            changes.forEach( function(change){
                if ( LAYOUT.indexOf( change.name ) !== -1 && this.parent !== null ) {
                    dispatchLayout = true;
                } else {
                    dispatchDraw = true;
                }
            }, this );

            if ( dispatchLayout ) {
                this.parent.dispatchEvent(  this.documentElement.createEvent("layout") );
            }

            if ( dispatchDraw) {
                this.dispatchEvent(  this.documentElement.createEvent("draw") );
            }

        }.bind( this ));


    }


    module.exports = AspectElement;