
"use strict";

var assert = require('assert');
var DispatchEvent = require("../../../src/lib/Document/funcDispatchEvent");
var AddEventListener = require("../../../src/lib/Document/funcAddEventListener");

describe('DispatchEvent', function(){


    it('should dispatch and bubble event handler only', function(done) {


        var iterations = 1;
        var handler2 = function (e) {
        };
        var capture = false;
        var contextOfHandler = {context: true};

        var docEl = {
            eventQueue: [],
            eventHandlers: []
        };

        var targetElement = {
            parent: docEl,
            documentElement: docEl,
            eventHandlers: []
        };

        AddEventListener.call(targetElement, "onchange", handler2, capture, iterations, contextOfHandler);

        DispatchEvent.call(targetElement, {type: "onchange"} );
        assert.equal( docEl.eventQueue.length, 1 );

        done();
    });


    it('should set the current target on the event before dispatching', function(done) {
        var ct = 0;

        var handler1 = function (e) {
        };

        var handler2 = function (e) {
        };


        var docEl = {
            id:"DOCELEMENT",
            eventQueue: [],
            eventHandlers: []
        };

        var targetElement = {
            id:"DIVELEMENT",
            parent: docEl,
            documentElement: docEl,
            eventHandlers: []
        };
        AddEventListener.call( docEl, "ondasher", handler1, false, 1, null);
        AddEventListener.call( targetElement, "ondasher", handler2, false, 1, null);


        DispatchEvent.call( targetElement, {type: "ondasher"} );

        assert.equal( docEl.eventQueue.length, 2 );
        assert.equal( docEl.eventQueue[0].currentTarget.id , "DIVELEMENT" );

        assert.equal( docEl.eventQueue[1].currentTarget.id , "DOCELEMENT");
        done();


    });


        it('should dispatch an event in both capture and bubble phases', function(done){



        var type  = "onclick";
        var handler1 = function( e ){  };
        var handler2 = function( e ){   };
        var contextOfHandler = { context:true };

        var docEl = {
            eventQueue:[],
            eventHandlers: []
        };

        var targetElement = {
            parent : docEl,
            documentElement: docEl,
            eventHandlers: []
        };

        AddEventListener.call( docEl, "onchange", handler1, true, 1, contextOfHandler );
        AddEventListener.call( targetElement, type, handler1, true, 1, contextOfHandler );
        AddEventListener.call( targetElement, "onchange", handler2, true, 1, contextOfHandler );
        AddEventListener.call( targetElement, type, handler2, true, 1, contextOfHandler );

        assert.equal( docEl.eventHandlers.length, 1 );
        assert.equal( targetElement.eventHandlers.length, 3 );

        // dispatch must loop thru all nodes and get all valid handlers, overide the event obj and bind to it
        // the context and type and dispatch them
        var event = { type:"onchange" };
        var listOfElementsInvolvedInCurrentDispatch = DispatchEvent.call( targetElement, event );

        // assert the number of elements involved in this dispatch
        assert.equal( listOfElementsInvolvedInCurrentDispatch.length, 2  );
        assert.deepEqual( listOfElementsInvolvedInCurrentDispatch[0], docEl, "top of the document is always listed first" );
        assert.deepEqual( listOfElementsInvolvedInCurrentDispatch[1], targetElement );

        // The number of handlers that have been queued to execute.
        // for listeners that include the capture phase there should be 2 per registered element
        assert.equal( docEl.eventQueue.length, 4 );

        var eventresult = docEl.eventQueue[0];
        assert( eventresult.context === contextOfHandler, "correct context should be applied to event handler" );
        assert.equal( eventresult.eventPhase, 1, "we should be in the capture phase" );
        assert.equal( eventresult.type, "onchange" );
        assert.deepEqual( eventresult.event, event );
        assert.equal( eventresult.iterations, null, "set to null becuase it is redundant in this context" );
        assert.equal( eventresult.handler, handler1 );
        assert.equal( eventresult.capture, true );

        var eventresult2 = docEl.eventQueue[1];
        assert( eventresult2.context === contextOfHandler, "correct context should be applied to event handler" );
        assert.equal(  eventresult2.eventPhase, 2, "we should be in the target phase" );

        assert.equal(  eventresult2.type, "onchange" );
        assert.deepEqual(  eventresult2.event, event );
        assert.equal( eventresult2.iterations, null, "set to null becuase it is redundant in this context" );
        assert.equal( eventresult2.handler, handler2 );
        assert.equal( eventresult2.capture, true );

        var eventresult3 = docEl.eventQueue[2];
        assert( eventresult3.context === contextOfHandler, "correct context should be applied to event handler" );
        assert.equal(  eventresult3.eventPhase, 3, "we should be in the bubble phase" );

        assert.equal(  eventresult3.type, "onchange" );
        assert.deepEqual(  eventresult3.event, event );
        assert.equal( eventresult3.iterations, null, "set to null becuase it is redundant in this context" );
        assert.equal( eventresult3.handler, handler2 );
        assert.equal( eventresult3.capture, true );

        var eventresult4 = docEl.eventQueue[3];
        assert( eventresult4.context === contextOfHandler, "correct context should be applied to event handler" );
        assert.equal(  eventresult4.eventPhase, 3, "we should be in the bubble phase" );

        assert.equal(  eventresult4.type, "onchange" );
        assert.deepEqual(  eventresult4.event, event );
        assert.equal( eventresult4.iterations, null, "set to null becuase it is redundant in this context" );
        assert.equal( eventresult4.handler, handler1 );
        assert.equal( eventresult4.capture, true );

        assert.equal( docEl.eventHandlers.length, 0, "event handlers queued"  );
        assert.equal( targetElement.eventHandlers.length, 2 );

        done();
    });
});
//
//stopprop,stopimmediateprop,preventdefault
//event obj passed to event
//set event to no bubble
//set first dispatch of bubble phase to phase=2
//populate event obj fully