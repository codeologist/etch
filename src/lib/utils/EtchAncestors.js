    /**
     * Traverse up a tree returning a list of all nodes including the start node.
     * @param node
     * @returns {Array}
     * @constructor
     */
    function EtchAncestors( node ){
        var nodelist = [];
        while (  node && typeof node === "object" && !Array.isArray(node) ) {
            nodelist.push( node );
            node = node.parent;
        }
        return nodelist;
    }

    module.exports = EtchAncestors;