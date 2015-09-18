
"use strict";

/**
 *
 * @param elem Object - Object representing the current element being constructed
 * @param attrs Object - properties to apply to the element
 * @returns {*}
 * @decorator
 */
function applyElementAttributesToNode( elem, attrs ){
    //attrs.forEach( function( attr ){
    //    var name = attr.name;
    //    var val = attr.escaped;
    //

    //
    //        elem[ name ] = val;
    //
    //
    //    return elem;
    //
    //});
    attrs.forEach( function( attr ){
        var name = attr.name;
        var val = attr.escaped;

        if ( name === "class" ) {
            elem.className = val;
            return;
        }

        if ( name === "tagName" ) {
            elem.tagName = ""+ val.toUpperCase();
            return;
        }

        elem[ name ] = val;

        return;
    });
    return elem;
}

module.exports = applyElementAttributesToNode;