
    "use strict";

    var Luna = require("luna");

    /**
     * manage a queue of nodes that a pending an initial draw or a redraw.  Also manage a reference
     * between node and drawing context
     * @constructor
     */
    function AspectRenderQueue(){

        var INDEX1 = Symbol();
        var INDEX2 = Symbol();
        
        this[INDEX1] = new WeakMap();
        this[INDEX2] = [];

        Array.observe( this[INDEX2], function(){
            while( this[INDEX2].length) {

                var node = this[INDEX2].shift();

                if ( !this[INDEX1].has(node) ){
                    this[INDEX1].set( node, new Luna.Gfx.DrawingContext() );
                }
                if ( typeof this.pending === "function"){
                    this.pending( node, this[INDEX1].get( node ) );
                } else {
                    throw "renderer has no pending handler";
                }
            }
        }.bind( this ));

        Object.defineProperty( this, "nodeToDrawingContext", {
            value:function( node ){
                return this[INDEX1].get( node );
            }
        });

        Object.defineProperty( this, "setPendingDraw", {
            value:function( node ){

                if ( this[INDEX2].indexOf( node ) === -1 ){
                    this[INDEX2].push( node );
                }
            }
        });
    }


    module.exports = AspectRenderQueue;