
    "use strict";

    var Element = require("./ObjectElement");


    function CreateElement( tag ){

        if ( !tag || typeof tag !== "string") {
            return undefined;
        }

        var el = new Element(tag);

        el.nodeType = 1;
        el.style="";

        return el;


    }

    module.exports = CreateElement;