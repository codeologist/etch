    "use strict";

    var Compile = require("../../src/lib/Compile/Index");
    var loader = require("../../src/lib/Loader/index");
    var RenderStrategy = require("etch-strategy");

    Compile( "./index.html" );

    var window = loader("./a.cmp");
    window.renderStrategy = new RenderStrategy( window );
    window.gestureStrategy = new function(){};

    var document = window.document;

    document.getElementById("one").addEventListener( "onclick", function( e ){
        console.log("HANDLER1 - document element",e.eventPhase,e.currentTarget.id)
    });

    document.getElementById("one").addEventListener( "onclick", function( e ){
       e.stopPropagation();
        e.target.style = "top:100px;left:10px;width:400px;height:400px;font-size:30px;color: yellow;background-color:red;"
        console.log("HANDLER2 - document element",e.eventPhase,e.currentTarget.id)
    });

    document.getElementById("one").addEventListener( "onclick", function( e ){
        console.log("HANDLER3 - document element",e.eventPhase,e.currentTarget.id)
    });

    document.getElementsByTagName("body")[0].addEventListener( "onclick", function( e ){
        console.log("HANDLER4 - body element",e.eventPhase,e.currentTarget.id)
    });


