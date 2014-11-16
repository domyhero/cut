(function ($, document) {
    'use strict';

    /**
     * 获取特定厂商前缀的属性
     */
    $.vendor = function (prop) {
        var vendorProp,
            supportedProp,
            capProp = prop.charAt(0).toUpperCase() + prop.slice(1),
            prefixed = ['Moz', 'Webkit', 'O', 'ms'],
            div = document.createElement('div'),
            i;

        function hasOwnProperty(property) {
            return div.style &&
                (div.style[property] !== undefined ||
                    (div.style.hasOwnProperty && div.style.hasOwnProperty(property)));
        }

        if (hasOwnProperty(prop)) {
            supportedProp = prop;
        } else {

            for (i = 0; i < prefixed.length; i += 1) {
                vendorProp = prefixed[i] + capProp;

                if (hasOwnProperty(vendorProp)) {
                    supportedProp = vendorProp;
                    break;
                }
            }
        }

        // Avoid memory leak in IE.
        div = null;
        return supportedProp;
    };

    /*
     * Transition
     * ----------
     * 通过检测dom元素的style对象是否支持transition属性
     */
    $.support.transitionend = (function () {
        var events = {
                'WebkitTransition': 'webkitTransitionEnd',
                'MozTransition': 'transitionend',
                'OTransition': 'oTransitionEnd otransitionend',
                'transition': 'transitionend'
            };

        return events[$.vendor('transition')];
    }());

    $.support.animationstart = (function () {
        var events = {
            'WebkitAnimation': 'webkitAnimationStart',
            'MozAnimation': 'animationstart',
            'OAnimation': 'oAnimationStart oAnimationstart',
            'animation': 'animationstart'
        };

        return events[$.vendor('animation')];
    }());

    $.support.animationend = (function () {
        var events = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'MozAnimation': 'animationend',
            'OAnimation': 'oAnimationEnd oAnimationend',
            'animation': 'animationend'
        };

        return events[$.vendor('animation')];
    }());
}(this.Zepto, this.document));
