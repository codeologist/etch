
    "use strict";

    var DCINDEX = Symbol();
    var DOCUMENT = Symbol();
    var STRATEGY = Symbol();

    var setRootDC, DrawingContext;
    try {
        var Luna = require("luna");
        var geometry = Luna.Application.getDisplayProperties();
        setRootDC = Luna.Application.setRootDrawingContext;
        DrawingContext =  Luna.Gfx.DrawingContext();

    } catch(e) {
        console.log("Luna not found.  Using default config");
        geometry = {
            width: 1920,
            height: 1080
        };

        setRootDC = function(){};
        DrawingContext = function(){};
    }



    function EmptyStrategy(){

    }

    EmptyStrategy.prototype.draw = function(){
        return DrawingContext();
    };


    var Document = require("../Document");
    var StringUtil = require("../utils/StringUtil");


    /**
     * the window object
     * @param document
     * @constructor
     */
    function Window( document, strategy ) {
        this[DCINDEX] = new WeakMap();
        this[DOCUMENT] = new WeakMap();
        this[STRATEGY] = new WeakMap();


        this.window = this;
        this.width = geometry.width;
        this.height = geometry.height;

        Object.defineProperty( this, "document",{
            enumerable:true,
            get: function(){
                return this[DOCUMENT].get( this );
            },
            set: function( document ){
                this[DOCUMENT].set( this, document);
            }
        });

        Object.defineProperty( this, "strategy",{
            enumerable:true,
            get: function(){
                return this[STRATEGY].get( this );
            },
            set: function( strategy ){
                this[STRATEGY].set( this, strategy);
            }
        });
        /**
         * Set the root luna dc
         */
        Object.defineProperty( this, "setRootDrawingContext", {
            enumerable: false,
            value: setRootDC
        });

        this.document = document;
        this.strategy = strategy || new EmptyStrategy();
        this.setRootDrawingContext( this.strategy.draw() );

        if ( this.document ) {
            this.document.addEventListener( "onsystemevent1", function( e ){
                this.getDrawingContext( e.target );
            }, true, Infinity, this );
        }

    }


    /**
     * Always returns a drawing context for the element, one is created if it does not exists
     * @param el
     */
    Window.prototype.getDrawingContext = function( el ){
        if ( !this[DCINDEX].has( el ) ){
            this[DCINDEX].set( el, new DrawingContext() );
        }
        return this[DCINDEX].get( el );
    };

    Window.prototype.getComputedStyle = function( el ){

    };

    Window.prototype.jsonToDocument = function( json ){


        function recurse( child, parent ){

            var element, ntype = child.nodeType;

            if ( ntype  === 9 ){
                element = new Document( child.tagName );
                element.style = child.style;
                element.id = child.id;
            }

            if (ntype === 1) {
                element = parent.documentElement.createElement(child.tagName);
                element.style = child.style;
                element.id = child.id;
            }

            if (ntype === 3) {

                element = parent.documentElement.createTextNode( new StringUtil( child.value ).normalizeText() );
            }
            if (ntype === 8) {
                element = parent.documentElement.createCommentNode( new StringUtil( child.value ).normalizeText() );
            }


            if ( parent ){
                parent.appendChild( element );
            }

            if ( child.childNodes ) {
                child.childNodes.forEach(function (childNode) {
                    recurse(childNode, element);
                });
            }

            return element;
        }

        this.document = recurse( json );
        this.document.window = this;

        return this.document;
    };

    module.exports = Window;