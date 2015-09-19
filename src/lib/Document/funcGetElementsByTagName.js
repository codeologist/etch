
    "use strict";

    var EtchFlatten = require("../utils/EtchFlatten");

    function filter1( tagname, el ){
        return el.tagName && el.tagName === tagname;
    }

    function filter2( el ){
        return el.tagName;
    }

    function GetElementByTagName( tag ){

        if ( typeof tag !== "string"){
            return [];
        }

        tag = (""+tag).toUpperCase();

        if ( tag === "*" ){
            return  EtchFlatten( this ).filter( filter2 );
        }

        return EtchFlatten( this ).filter( filter1.bind( null,tag ) );
    }

    module.exports = GetElementByTagName;