
    "use strict";

    var ObjectNode = require("./ObjectNode");
    var AspectElement = require("../Aspects/AspectElement"),
    AspectObservable= require("../Aspects/AspectOnPropertyChangeObserver");

    function Element( tag ){

        AspectElement.call( this, tag );
        AspectObservable.call( this );
    }

    Element.prototype =  ObjectNode.prototype;

    //Element.prototype.move = function( x, y ){
    //    var event = this.documentElement.createEvent("layout");
    //};
    //
    //Element.prototype.resize = function( w, h ){
    //    var event = this.documentElement.createEvent("layout");
    //};
    //
    //Element.prototype.css = function( prop, val){
    //    var event = this.documentElement.createEvent("layout");
    //};
    //
    //Element.prototype.show = function(){
    //    var event = this.documentElement.createEvent("layout");
    //};
    //
    //Element.prototype.hide = function(){
    //    var event = this.documentElement.createEvent("layout");
    //};

    module.exports = Element;