
    "use strict";

    try {
        var Luna = require("luna");
        var geometry = Luna.Application.getDisplayProperties();
    } catch(e) {
        console.log("Luna not found.  Using default config");
        geometry = {
            width: 1920,
            height: 1080
        };
    }

    var Document = require("../Document");
    var StringUtil = require("../utils/StringUtil");


    /**
     * the window object
     * @param document
     * @constructor
     */
    function Window() {
        this.window = this;
        this.document = null;

        this.width = geometry.width;
        this.height = geometry.height;

    }

    Window.prototype.getComputedStyle = function( el ){

    };



    Window.prototype.jsonToDocument = function( json ){


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
    };
    module.exports = Window;