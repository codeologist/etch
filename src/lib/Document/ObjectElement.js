
    "use strict";

    var ObjectNode = require("./ObjectNode");
    var AspectElement = require("../Aspects/AspectElement"),
    AspectObservable= require("../Aspects/AspectOnPropertyChangeObserver");

    function Element( tag ){

        AspectElement.call( this, tag );


        this.nodeType = 1;


        AspectObservable.call( this );
    }

    Element.prototype =  ObjectNode.prototype;

    module.exports = Element;