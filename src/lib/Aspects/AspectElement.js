
    "use strict";

    var DOCUMENTELEMENT = Symbol();

    function AspectElement( tag, document  ){
        this[DOCUMENTELEMENT] = new WeakMap();
        tag = tag || "ELEMENT";

        this.childNodes = [];
        this.parent = null;

        this.eventHandlers = [];
        this.tagName = tag.toUpperCase();
        this.style="";
        this.nodeType = 1;


        Object.defineProperty( this, "documentElement",{
            enumerable:true,
            get: function(){
                return this[DOCUMENTELEMENT].get( this );
            },
            set: function( document ){
                this[DOCUMENTELEMENT].set( this, document);
            }
        });

        this.documentElement = document
    }


    module.exports = AspectElement;