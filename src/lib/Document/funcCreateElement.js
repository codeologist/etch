
    "use strict";

    var Element = require("./ObjectElement");


    function CreateElement( tag ){

        if ( !tag || typeof tag !== "string") {
            return undefined;
        }

        var el = new Element(tag);

        return el;


    }

    module.exports = CreateElement;