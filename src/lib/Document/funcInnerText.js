
    "use strict";


    function innerText(){
        var text="";
        this.childNodes.filter( function( node ){ return node.nodeType === 3  }).forEach( function( node ){
            text+=node.value;
        });
        return text;
    };

    module.exports = innerText;