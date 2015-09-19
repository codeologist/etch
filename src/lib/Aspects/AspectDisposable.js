
    "use strict";

    function EventHandler(){

        //Returns the element that triggered the event
        Object.defineProperty( this, "disposed", {
            enumerable: false,/* This is deliberatley a non-enumerable property for fear of infinite loop */
            configurable:false,
            set: function( val ){
                if ( val === true ){
                    Object.keys( this ).forEach( function( key ){ this[key] = null; }, this );
                }
            },
            get: function(){
                return Object.keys( this ).filter( function( key ){ return this[key] !== null; },this).length === 0;
            }
        });
    }


    module.exports = EventHandler;