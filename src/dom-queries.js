(function (root) {

    /* DOM Queries */

    root.select = function select(selector, context) {
        if (typeof context === 'undefined') context = document;
        return context.querySelector(selector);
    };

    root.selectAll = function selectAll(selector, context) {
        if (typeof context === 'undefined') context = document;
        return Array.prototype.slice.call(context.querySelectorAll(selector));
    };

})(this);
