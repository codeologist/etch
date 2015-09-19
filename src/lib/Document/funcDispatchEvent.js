
    "use strict";

    var EtchAncestors = require("../utils/EtchAncestors");
    var EventHandler = require("./../Event/ObjectEventHandler");


    function filterHandlers( eh ){
        return !eh.removed && eh.type === this.type && eh.iterations > 0 ;
    }
//TODO: this is  suboptimal because process queue does half the job and this does half the job - which is it?.
    function dispatchHandler( eho, event, doc, el, phase, originalTarget ){
        var eventHandler = eho.clone();
        eventHandler.eventPhase = phase;
        eventHandler.event = event;
        eventHandler.iterations = null;
        eventHandler.currentTarget = el;
        eventHandler.target = originalTarget;

        doc.eventQueue.push( eventHandler );

    }

    /**
     *
     * @param event
     * @returns {*}
     * @constructor
     */
    function DispatchEvent( event ){



        //if ( !this.documentElement ){
        //    throw "Elements must part of a document before events can be dispatched."
        //}

        // CAPTURE PHASE

        EtchAncestors(this).reverse().forEach( function( el ){
            var localEventHandlers = el.eventHandlers;
            localEventHandlers.filter( filterHandlers.bind( event ) ).forEach( function( eho ){
                if ( eho.capture ){
                    dispatchHandler( eho, event, this.documentElement, el,  el === this ? 2 : 1, this );
                }
            }, this );
        }, this);


        // BUBBLE PHASE
        EtchAncestors(this).forEach( function( el ){
            var localEventHandlers = el.eventHandlers;
            localEventHandlers.filter( filterHandlers.bind( event ) ).forEach( function( eho ){
                dispatchHandler( eho, event, this.documentElement, el, 3, this );
            }, this );
        }, this);


        // decrease iterations on dispatched events
        EtchAncestors(this).forEach( function( el ){
            var localEventHandlers = el.eventHandlers;
            localEventHandlers.filter( filterHandlers.bind( event ) ).forEach( function( eho ){
                if ( eho.iterations > 0){
                    eho.iterations--;
                }
            }, this );
        }, this);


        // remove expired handlers
        EtchAncestors(this).forEach( function( el ){
            var localEventHandlers = el.eventHandlers;
            var replace = [];
            localEventHandlers.forEach( function( eho, i ){

                if ( eho.iterations > 0){
                    replace.push( eho );
                }

            }, this );

            el.eventHandlers.length=0;
            el.eventHandlers=replace;

        }, this);

        return  EtchAncestors(this).reverse();
    }

    module.exports = DispatchEvent;