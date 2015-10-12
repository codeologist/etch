    "use strict";

    var funcJsonToDocument = require("./funcJsonToDocument");

    var ready = require("./funcReady");
    var CssPropertySet = require("../CSS/CSSPropertySet");
    var DCINDEX = Symbol();
    var DOCUMENT = Symbol();
    var RENDERSTRATEGY = Symbol();
    var GESTURESTRATEGY = Symbol();
    var DOCUMENTREADY = Symbol();

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


    function readyHandler( resolve, reject, changes ){
        if ( changes[0].object.isDocumentReady === true ){
            resolve( true );
        }
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
        this[DOCUMENTREADY] = false;


        Object.defineProperty( this, "isDocumentReady",{
            get:function(){
                return this[DOCUMENTREADY];
            },
            set:function(){
                if ( !this[DOCUMENTREADY] ){
                    this[DOCUMENTREADY] = true;
                    Object.unobserve( this, readyHandler.bind( this ));
                }
            }
        });

        Object.defineProperty( this, "documentReadyPromiseResolutionQueue",{
            value: new Promise( function( resolve, reject ){
                Object.observe( this, readyHandler.bind( this, resolve, reject ));
            }.bind( this ))
        });

        Object.defineProperty( this, "queueReadyCallbackAwaitingPromiseResolution",{
            value:function( func ){
                this.documentReadyPromiseResolutionQueue.then( func );
            }
        });




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

                if ( this.document && renderStrategy.setRootDocument){
                    renderStrategy.setRootDocument(  this.document );
                    this.document.addEventListener( "onlayout", renderStrategy.layout.bind(renderStrategy), true, Infinity );
                    this.document.addEventListener( "ondraw", renderStrategy.draw.bind(renderStrategy), true, Infinity );
                }
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

    }

    Window.prototype.ready=  ready;
    Window.prototype.jsonToDocument = funcJsonToDocument;

    module.exports = Window;