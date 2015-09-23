
    "use strict";

    var funcJsonToDocument = require("./funcJsonToDocument");

    var DCINDEX = Symbol();
    var DOCUMENT = Symbol();
    var RENDERSTRATEGY = Symbol();
    var GESTURESTRATEGY = Symbol();
    var ANIMATIONSTRATEGY = Symbol();

    try {
        var Luna = require("luna");
        var geometry = Luna.Application.getDisplayProperties();



    } catch(e) {
        console.log("Luna not found.  Using default config");
        geometry = {
            width: 1920,
            height: 1080
        };
    }






    /**
     * the window object
     * @param document
     * @constructor
     */
    function Window( document ) {
        this[DCINDEX] = new WeakMap();
        this[DOCUMENT] = new WeakMap();
        this[RENDERSTRATEGY] = new WeakMap();
        this[GESTURESTRATEGY] = new WeakMap();
        this[ANIMATIONSTRATEGY] = new WeakMap();



        Object.defineProperty( this, "document",{
            enumerable:true,
            get: function(){
                return this[DOCUMENT].get( this );
            },
            set: function( document ){
                this[DOCUMENT].set( this, document);
            }
        });

        Object.defineProperty( this, "gestureStrategy",{
            enumerable:true,
            get: function(){
                return this[GESTURESTRATEGY].get( this );
            },
            set: function( gestureStrategy ){
                this[GESTURESTRATEGY].set( this, gestureStrategy);
            }
        });

        Object.defineProperty( this, "renderStrategy",{
            enumerable:true,
            get: function(){
                return this[RENDERSTRATEGY].get( this );
            },
            set: function( renderStrategy ){
                this[RENDERSTRATEGY].set( this, renderStrategy);

                this.walkElementTree( this.document ).forEach( function( element ){
                    renderStrategy.seed( element,  this.nodeToDrawingContext( element ), this.getComputedStyle( element ) );
                }, this );

                renderStrategy.enqueue( this.document );
            }
        });

        Object.defineProperty( this, "animationStrategy",{
            enumerable:true,
            get: function(){
                return this[ANIMATIONSTRATEGY].get( this );
            },
            set: function( renderStrategy ){
                this[ANIMATIONSTRATEGY].set( this, renderStrategy);
            }
        });


        this.document = document;

        this.width = geometry.width;
        this.height = geometry.height;

        //if ( this.document ) {
        //    this.document.addEventListener( "onsystemevent1", function( e ){
        //        this.getDrawingContext( e.target );
        //    }, true, Infinity, this );
        //}

    }

    Window.prototype.walkElementTree = function( node ) {

        var out = [ node ];

        if ( node.childNodes ) {
            node.childNodes.forEach( function ( child ) {
                if ( child.nodeType === 9 || child.nodeType === 1 ) {
                    out = out.concat ( this.walkElementTree( child ) );
                }
            }, this );
        }

        return out;
    };
    /**
     * Always returns a drawing context for the element, one is created if it does not exists
     * @param el
     */
    Window.prototype.nodeToDrawingContext = function( el ){

        if ( !this[DCINDEX].has( el ) ){
            this[DCINDEX].set( el, new  Luna.Gfx.DrawingContext() );
        }

        return this[DCINDEX].get( el );
    };


    Window.prototype.getComputedStyle = function( el ){



        return {
            display: "block",
            left: 10,
            top:10,
            width:100,
            height:100,
            fontSize:16,
            backgroundColor:"blue",
            color:"red"
        };
    };

    Window.prototype.jsonToDocument = funcJsonToDocument;

    module.exports = Window;