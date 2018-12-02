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
