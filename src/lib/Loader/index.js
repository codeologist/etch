
    "use strict";

    var fs = require("fs");
    var path = require("path");
    var Window = require("../Window");


    function Loader( filename ){


        try {
            filename = path.resolve( filename );
            fs.existsSync( filename );
            var window = new Window();
            window.jsonToDocument( JSON.parse( fs.readFileSync(  filename ).toString() ) );
            return window;
        } catch ( e ){
            throw "error loading document";
        }



    }

    module.exports = Loader;