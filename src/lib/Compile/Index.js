"use strict";

var fs = require("fs");
var path = require("path");
var html5 = require("./html5");
var applyElementAttributesToNode = require("./convertAttributesToProperties");
var StringUtil = require("../utils/StringUtil");

function CompileHtml( html  ){

    var document = {  childNodes:[]   };

    var elems = [];
    var curParentNode = document;

    html5( html, {
        start: function ( tagName, attrs, unary ) {
            tagName = tagName.replace("\n","").replace(" ","");
            var elem = {
                nodeType: tagName === "html" ? 9 : 1,
                tagName:            tagName.toUpperCase(),
                childNodes:         [],
                style:""
            };

            elem = applyElementAttributesToNode( elem, attrs );




            if (curParentNode ) {
                curParentNode.childNodes.push(elem);
            }

            if (!unary) {
                elems.push(elem);
                curParentNode = elem;
            }
        },
        end: function (tag) {
            elems.length -= 1;
            // Init the new parentNode
            curParentNode = elems[elems.length - 1];
        },
        chars: function (text) {

            var su = new StringUtil(text);
            text = su.normalizeText();


            if (!text){
                return;
            }



            curParentNode.childNodes.push({
                nodeType: 3,
                value:text
            });

        },
        comment: function (text) {


            curParentNode.childNodes.push({
                nodeType: 8,
                value:text
            });


        }
    });
    return document;
}


/**
 *
 * @param filenameOrHtmlString -
 * @param compileTarget - name of compiled file - defaults to input filename.cmp
 * @returns {object}
 * @constructor
 */

function Compile( source ){


    //source is html text


    // remove newline / carriage return
    source.replace(/\n/g, "");

// remove whitespace (space and tabs) before tags
    source.replace(/[\t ]+\</g, "<");

// remove whitespace between tags
    source.replace(/\>[\t ]+\</g, "><");

// remove whitespace after tags
    source.replace(/\>[\t ]+$/g, ">");


    var compiledHTML =  CompileHtml( source );



    return compiledHTML.childNodes[0];



}

function save( output, html  ){

    if ( output ) {
        if ( fs.existsSync( output ) ) {
            fs.unlink(output);
        }
        fs.writeFileSync( output, JSON.stringify( html, null, 4 ),'utf8' );
    }
}
module.exports = function( filename ){

    var filepath =  path.dirname(filename);

    filename = path.resolve( filename );
    // todo - test file is infact html

    if ( !fs.existsSync( filename ) ) {
        throw "no such file as "+filename;
    }


    save( path.resolve(filepath ,"a.cmp" ), Compile( fs.readFileSync( filename, 'utf8' ) ) );

};