(function (root) {

    /* Utility */

    root.EventBinder = function EventBinder(eventsArray) {
        this.eventsArray = eventsArray;

        this.bindEvents = function (eventsArray) {
            eventsArray.forEach(function (e) {
                if (e.selector.length && e.selector !== window) {
                    (e.selector).forEach(function (element) {
                        element.addEventListener(e.event, e.handler);
                    });
                } else {
                    (e.selector).addEventListener(e.event, e.handler);
                }
            });
        };

        this.bind = function () {
            this.bindEvents(this.eventsArray);
        };
    };

    root.debounce = function debounce(func, wait, immediate) {
        var timeout;

        return function () {
            var context = this,
                args = arguments,
                callNow = immediate && !timeout,
                later = function () {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };

            clearTimeout(timeout);

            timeout = setTimeout(later, wait);

            if (callNow) func.apply(context, args);
        };
    };


    /* DOM Queries */

    root.select = function select(selector, context) {
        if (typeof context === 'undefined') context = document;
        return context.querySelector(selector);
    }

    root.selectAll = function selectAll(selector, context) {
        if (typeof context === 'undefined') context = document;
        return Array.prototype.slice.call(context.querySelectorAll(selector));
    }


    /* Element Methods */

    Element.prototype.is = function is(selector) {
        return this.matches(selector);
    }

    Element.prototype.addClass = function addClass(selector) {
        this.classList.add(selector);
    }

    Element.prototype.removeClass = function removeClass(selector) {
        this.classList.remove(selector);
    }

    Element.prototype.toggleClass = function toggleClass(selector) {
        this.classList.toggle(selector);
    }

    Element.prototype.width = function width(value) {
        if (typeof value !== 'undefined') {
            this.style.width = value + 'px';
            return this;
        } else {
            return this.clientWidth;
        }
    }

    Element.prototype.height = function height(value) {
        if (typeof value !== 'undefined') {
            this.style.height = value + 'px';
            return this;
        } else {
            return this.clientHeight;
        }
    }


    /* Window Dimensions */

    root.windowSize = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    function _setWindowSize() {
        root.windowSize = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    window.addEventListener('resize', debounce(_setWindowSize, 100));

})(this);
