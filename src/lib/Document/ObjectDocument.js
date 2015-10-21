
"use strict";



var ObjectNode = require("./ObjectNode"),
    ready = require("./funcReady"),
    CreateElement = require("./funcCreateElement"),
    CreateEvent= require("./funcCreateEvent"),
    CreateTextNode = require("./funcCreateTextNode"),
    CreateCommentNode = require("./funcCreateCommentNode"),
    ProcessEventQueue = require("./funcProcessEventQueue"),
    AspectElement = require("../Aspects/AspectElement"),
    AspectDocument= require("../Aspects/AspectDocument"),
    AspectObservable= require("../Aspects/AspectOnPropertyChangeObserver");

    function ObjectDocument( tag ){


        AspectElement.call( this, tag || "DOCUMENT", this );
        AspectDocument.call( this );

        Array.observe( this.eventQueue, function( changes ){
            changes.forEach( function( change ) {
                if (change.addedCount) {
                    change.object.forEach(function () {
                        process.nextTick( this.processEventQueue.bind( this ) );
                    }, this );
                }
            }, this );
        }.bind( this ));


        this.allowOnPropertyChangeEvents = false;
        AspectObservable.call( this );
    }

    ObjectDocument.prototype = ObjectNode.prototype;
    ObjectDocument.prototype.createElement = CreateElement;
    ObjectDocument.prototype.createTextNode = CreateTextNode;
    ObjectDocument.prototype.createCommentNode = CreateCommentNode;
    ObjectDocument.prototype.createEvent=  CreateEvent;
    ObjectDocument.prototype.processEventQueue=  ProcessEventQueue;
    ObjectDocument.prototype.ready=  ready;







module.exports=ObjectDocument;