
    "use strict";


    function TextNode(text){
        this.parent = null;
        this.documentElement = this;
        this.nodeType = 3;
        this.value=text;
    }

    function CreateTextNode( text ){

        return new TextNode( text );

    }

    module.exports = CreateTextNode;