
    "use strict";

    var funcJsonToDocument = require("./funcJsonToDocument");


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

                renderStrategy.getComputedStyle = this.getComputedStyle;
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

        if ( this.document ) {
            this.document.addEventListener( "onsystemevent1", function( e ){
                this.getDrawingContext( e.target );
            }, true, Infinity, this );
        }

    }



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