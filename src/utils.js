(function (root) {

    /* Utility */

    root.empty = function empty(selector) {
        return (
            selector === null ||
            typeof selector === 'undefined' ||
            (Array.isArray(selector) && !selector.length)
        );
    };

    root.EventBinder = function EventBinder(eventsArray) {
        var binder = this;
        this.eventsArray = eventsArray;

        this.bindEvent = function (event, selector, handler) {
            if (empty(selector)) {
                console.warn('EventBinder selector is null or an empty array.');
                return;
            } else if (Array.isArray(selector) && selector !== window) {
                selector.forEach(function (element) {
                    binder.bindEvent.call(binder, event, element, handler);
                });
            } else {
                selector.addEventListener(event, handler);
            }
        }

        this.bind = function () {
            this.eventsArray.forEach(function (e) {
                binder.bindEvent.call(binder, e.event, e.selector, e.handler);
            });
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

    root.addClass = function addClass(element, className) {
        if (empty(element)) return;

        if (Array.isArray(element)) {
            element.forEach(function (el) {
                addClass(el, className);
            })
        } else {
            element.addClass(className);
        }
    }

    root.removeClass = function removeClass(element, className) {
        if (empty(element)) return;

        if (Array.isArray(element)) {
            element.forEach(function (el) {
                removeClass(el, className);
            })
        } else {
            element.removeClass(className);
        }
    }

    root.toggleClass = function toggleClass(element, className) {
        if (empty(element)) return;

        if (Array.isArray(element)) {
            element.forEach(function (el) {
                toggleClass(el, className);
            })
        } else {
            element.toggleClass(className);
        }
    }

    root.replaceClass = function replaceClass(element, oldClass, newClass) {
        if (empty(element)) return;

        if (Array.isArray(element)) {
            element.forEach(function (el) {
                replaceClass(el, oldClass, newClass);
            })
        } else {
            element.replaceClass(oldClass, newClass);
        }
    }

    /* Window Scroll Position / Dimensions */

    root.scrollPosition = function scrollPosition() {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    };

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
