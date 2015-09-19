
    "use strict";


    var CommentNode = require("./ObjectCommentNode");

    function CreateCommentNode( comment ){

        return new CommentNode( comment );

    }

    module.exports = CreateCommentNode;