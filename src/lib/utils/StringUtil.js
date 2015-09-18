"use strict";


function StringUtil( string ){
    this.string = ""+string;
}




StringUtil.prototype.normalizeText = function() {
    var text =  this.string;
    text = text.trim();
    text = text.replace("\n","");
    text = text.replace("\t","");
    text = text.replace("\r","");
    return text;
};

StringUtil.prototype.toCamelCase = function(){

    var str = this.string.trim().split("-");
    var out=[str[0]];

    for ( var x=1, l = str.length; x<=l; x++ ){
        if ( !!str[x] ){
            out.push( str[x].charAt(0).toUpperCase() + str[x].substring(1) );
        }
    }

    return out.join("");

};

module.exports = StringUtil;