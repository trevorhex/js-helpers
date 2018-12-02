(function (root) {

    /* Array Methods */

    Array.prototype.are = function are(selector) {
        var matches = true;
        this.forEach(function (i) {
            if (!i.matches(selector)) matches = false;
        });
        return matches;
    };

    Array.prototype.addClass = function addClass(selector) {
        this.forEach(function (i) {
            if (typeof i.classList !== 'undefined')
                i.classList.add(selector);
        });
        return this;
    };

    Array.prototype.removeClass = function removeClass(selector) {
        this.forEach(function (i) {
            if (typeof i.classList !== 'undefined')
                i.classList.remove(selector);
        });
        return this;
    };

    Array.prototype.toggleClass = function toggleClass(selector) {
        this.forEach(function (i) {
            if (typeof i.classList !== 'undefined')
                i.classList.toggle(selector);
        });
        return this;
    };

    Array.prototype.replaceClass = function replaceClass(oldClass, newClass) {
        this.forEach(function (i) {
            if (typeof i.classList !== 'undefined')
                i.classList.replace(oldClass, newClass);
        });
        return this;
    };

    Array.prototype.clear = function clear() {
        this.forEach(function (i) {
            if (typeof i.innerHTML !== 'undefined')
                i.innerHTML = '';
        });
        return this;
    }

    Array.prototype.setStyle = function setStyle(props, value) {
        this.forEach(function (i) {
            if (typeof i.setStyle !== 'undefined')
                i.setStyle(props, value);
        });
        return this;
    };

    Array.prototype.on = function on(event, handler) {
        this.forEach(function (i) {
            if (typeof i.addEventListener !== 'undefined')
                i.addEventListener(event, handler);
        });
        return this;
    };

})(this);

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

(function (root) {

    /* Element Methods */

    Element.prototype.is = function is(selector) {
        return this.matches(selector);
    };

    Element.prototype.isChildOf = function isChildOf(selector) {
        var isChild = false,
            parent = this.parentNode;

        while (parent) {
            if (typeof parent.is !== 'undefined' && parent.is(selector)) isChild = true;
            parent = parent.parentNode;
        }

        return isChild;
    };

    Element.prototype.addClass = function addClass(selector) {
        this.classList.add(selector);
        return this;
    };

    Element.prototype.removeClass = function removeClass(selector) {
        this.classList.remove(selector);
        return this;
    };

    Element.prototype.toggleClass = function toggleClass(selector) {
        this.classList.toggle(selector);
        return this;
    };

    Element.prototype.replaceClass = function replaceClass(oldClass, newClass) {
        this.classList.replace(oldClass, newClass);
        return this;
    };

    Element.prototype.clear = function clear() {
        this.innerHTML = '';
        return this;
    }

    Element.prototype.width = function width(value) {
        if (typeof value !== 'undefined') {
            this.style.width = value + 'px';
            return this;
        } else {
            return this.clientWidth;
        }
    };

    Element.prototype.height = function height(value) {
        if (typeof value !== 'undefined') {
            this.style.height = value + 'px';
            return this;
        } else {
            return this.clientHeight;
        }
    };

    Element.prototype.absolutePos = function absolutePos() {
        var bound = this.getBoundingClientRect();

        return {
            x: bound.left + window.pageXOffset,
            y: bound.top + window.pageYOffset
        }
    };

    Element.prototype.xPos = function xPos() {
        return this.getBoundingClientRect().left;
    };

    Element.prototype.yPos = function yPos() {
        return this.getBoundingClientRect().top;
    };

    Element.prototype.data = function data(dataName, dataValue) {
        var name = dataName.split('-').map(function (hotdog, i) {
            if (!i) return hotdog;
            return hotdog.charAt(0).toUpperCase() + hotdog.slice(1);
        })
        .join('');

        if (typeof dataValue !== 'undefined') {
            this.dataset[name] = dataValue;
            return this;
        } else {
            return this.dataset[name];
        }
    };

    Element.prototype.hide = function hide() {
        this.style.display = 'none';
        return this;
    };

    Element.prototype.show = function show(value) {
        var displayValue = typeof value !== 'undefined' ? value : 'block';
        this.style.display = displayValue;
        return this;
    };

    Element.prototype.getHiddenHeight = function getHiddenHeight() {
        var elStyle = window.getComputedStyle(this),
            elDisplay = elStyle.display,
            elPosition = elStyle.position,
            elVisibility = elStyle.visibility,
            elMaxHeight = elStyle.maxHeight.replace('px', '').replace('%', ''),
            elHeight = 0;

        if (elDisplay !== 'none' && elMaxHeight !== '0') {
            return this.height();
        }

        this.style.display = 'block';
        this.style.position = 'absolute';
        this.style.visibility = 'hidden';

        elHeight = this.height();

        this.style.display = elDisplay;
        this.style.position = elPosition;
        this.style.visibility = elVisibility;

        return elHeight;
    }

    Element.prototype.toggleSlide = function toggleSlide(speed) {
        var elMaxHeight = 0,
            isHidden = this.style.display === 'none',
            el = this;

        if (this.data('max-height')) {
            if (_getMaxHeight(this) === '0') {
                this.style.maxHeight = this.data('max-height');
            } else {
                this.style.maxHeight = '0';
            }
        } else {
            elMaxHeight = this.getHiddenHeight() + 'px';
            this.style.transition = 'max-height ' + speed + 'ms ease-in-out';
            this.style.overflowY = 'hidden';
            this.data('max-height', elMaxHeight);
            this.style.display = 'block';

            if (isHidden) {
                el.style.maxHeight = 0;

                setTimeout(function() {
                    el.style.maxHeight = elMaxHeight;
                }, 10);
            } else {
                el.style.maxHeight = elMaxHeight;

                setTimeout(function() {
                    el.style.maxHeight = 0;
                }, 10);
            }
        }

        function _getMaxHeight(el) {
            return el.style.maxHeight.replace('px', '').replace('%', '');
        }
    }

    Element.prototype.setStyle = function setStyle(props, value) {
        var el = this,
            keys;

        if (typeof props === 'string' && typeof value !== 'undefined') {
            this.style[props] = value;
        } else if (typeof props === 'object') {
            keys = Object.keys(props);
            keys.forEach(function (key) {
                el.style[key] = props[key];
            });
        } else {
            console.warn('Invalid style props supplied to setStyle.');
        }

        return this;
    }

    Element.prototype.on = function on(event, handler) {
        this.addEventListener(event, handler);
        return this;
    };

})(this);

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
