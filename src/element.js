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

    Element.prototype.getChildren = function getChildren() {
        return Array.prototype.slice.call(this.children);
    };

    Element.prototype.next = function next(selector) {
        var parent = this.parentNode,
            children = parent.getChildren(),
            search = true,
            nextElement = null;

        if (typeof selector === 'undefined') {
            return this.nextElementSibling;
        } else {
            children.forEach(function (child) {
                if (search && child.is(selector)) {
                    search = false;
                    nextElement = child;
                }
            });

            return nextElement;
        }
    };

})(this);
