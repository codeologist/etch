
    "use strict";

    function AspectElement( tag, document  ){

        tag = tag || "ELEMENT";

        this.childNodes = [];
        this.parent = null;
        this.documentElement = document;
        this.eventHandlers = [];
        this.tagName = tag.toUpperCase();
        this.style="";
        this.nodeType = 1;

    }


    module.exports = AspectElement;