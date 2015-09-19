
    "use strict";

    var ObjectNode = require("./ObjectNode");

    function DocumentTextNode( obj ){
        this.textNode = true;
        this.value = obj.value;
        this.nodeType = this.ENUMS.TYPE.TEXT_NODE;
    }

    DocumentTextNode.prototype = ObjectNode.prototype;

    module.exports=DocumentTextNode;