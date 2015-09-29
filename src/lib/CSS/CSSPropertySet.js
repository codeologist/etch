
    "use strict";

    var StringUtil = require("../utils/StringUtil");


    /**
     * Parses a string representation of a css property block.
     * if an empty param is passed and empty object is returned
     * if a non string is passed bad things will happen
     *
     * @param String propertySetString
     * @constructor
     */
    function CSSPropertySet( propertySetString ){

        if ( propertySetString ){
            var properties = propertySetString.split(";");

            properties.forEach( function( kvpair ){
                if ( kvpair ){
                    kvpair = kvpair.split(":");
                    var pname = new StringUtil(kvpair[0]);
                    this[ pname.toCamelCase() ] = ""+( kvpair[1] ).trim();

                }

            }, this );
        }

    }

    module.exports = CSSPropertySet;