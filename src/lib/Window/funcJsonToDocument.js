
    "use strict";

    var Document = require("../Document");
    var StringUtil = require("../utils/StringUtil");

    function funcJsonToDocument( json ){


        function recurse( child, parent ){

            var element, ntype = child.nodeType;

            if ( ntype  === 9 ){
                element = new Document( child.tagName );
                element.style = child.style;
                element.id = child.id;
            }

            if (ntype === 1) {
                element = parent.documentElement.createElement(child.tagName);
                element.style = child.style;
                element.id = child.id;
            }

            if (ntype === 3) {

                element = parent.documentElement.createTextNode( new StringUtil( child.value ).normalizeText() );
            }
            if (ntype === 8) {
                element = parent.documentElement.createCommentNode( new StringUtil( child.value ).normalizeText() );
            }


            if ( parent ){
                parent.appendChild( element );
            }

            if ( child.childNodes ) {
                child.childNodes.forEach(function (childNode) {
                    recurse(childNode, element);
                });
            }

            return element;
        }

        this.document = recurse( json );
        this.document.window = this;

        return this.document;
    }

    module.exports = funcJsonToDocument;