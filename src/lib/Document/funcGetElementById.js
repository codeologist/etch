    
    "use strict";
    
    var EtchFlatten = require("../utils/EtchFlatten");

    function filter1( id, el ){
        return el.tagName && el.id === id;
    }

    function GetElementById( id ){

        if ( typeof id !== "string"){
            return undefined;
        }
        return EtchFlatten( this ).filter( filter1.bind( null, id ) )[0];
    }
    
    module.exports = GetElementById;