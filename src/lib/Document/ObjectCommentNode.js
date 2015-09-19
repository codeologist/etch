
    "use strict";


    var ObjectNode = require("./ObjectNode");

    function CommentNode(text){
        this.parent = null;
        this.documentElement = this;
        this.nodeType = 8;
        this.value=text;
    }

    CommentNode.prototype = ObjectNode.prototype;

    module.exports = CommentNode;