    
    "use strict";

    var ObjectSchema = require("../Schema");

    var AppendChild = require("./funcAppendChild");
    var EtchAncestors = require("../utils/EtchAncestors");
    var AddEventListener = require("./funcAddEventListener");
    var RemoveEventListener = require("./funcRemoveEventListener");
    var DispatchEvent = require("./funcDispatchEvent");
    var AspectObservable= require("../Aspects/AspectOnPropertyChangeObserver");
    var ConsumeNode = require("./funcConsumeNode");
    var innerText = require("./funcInnerText");



    function setAttribute( name, value){
        this[name] = value;
    }

    function ObjectNode(){
        this.parent = null;
        this.documentElement = null;
        this.nodeType = 0;
        AspectObservable.call( this );
    }

    ObjectNode.prototype = Object.create( new ObjectSchema(),{
        appendChild: {
            value: AppendChild
        },
        addEventListener: {
            value: AddEventListener
        },
        removeEventListener: {
            value: RemoveEventListener
        },
        dispatchEvent: {
            value: DispatchEvent
        },
        consume: {
            value: ConsumeNode
        },
        innerText: {
            value: innerText
        },
        setAttribute: {
            value: setAttribute
        }
    });



    module.exports=ObjectNode;