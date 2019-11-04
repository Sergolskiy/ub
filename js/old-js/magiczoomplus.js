'use strict';
window.MagicZoom = function() {
    /**
     * @param {string} tstr
     * @return {?}
     */
    function transform(tstr) {
        var output;
        var i;
        /** @type {string} */
        output = "";
        /** @type {number} */
        i = 0;
        for (; i < tstr.length; i++) {
            /** @type {string} */
            output = output + String.fromCharCode(14 ^ tstr.charCodeAt(i));
        }
        return output;
    }
    /**
     * @param {!Object} name
     * @return {?}
     */
    function cb(name) {
        /** @type {!Array} */
        var cnameParts = [];
        /** @type {null} */
        var n = null;
        if (name && (n = callback(name))) {
            cnameParts = result.filter(function(f) {
                return f.placeholder === n;
            });
        }
        return cnameParts.length ? cnameParts[0] : null;
    }
    /**
     * @param {number} offset
     * @return {?}
     */
    function extend(offset) {
        var options = callback(window).jGetSize();
        var markerCoord = callback(window).jGetScroll();
        offset = offset || 0;
        return {
            left : offset,
            right : options.width - offset,
            top : offset,
            bottom : options.height - offset,
            x : markerCoord.x,
            y : markerCoord.y
        };
    }
    /**
     * @param {!Object} evt
     * @return {?}
     */
    function handleTouch(evt) {
        return Object.assign({}, evt, {
            type : evt.type,
            pageX : evt.pageX,
            pageY : evt.pageY,
            screenX : evt.screenX,
            screenY : evt.screenY,
            clientX : evt.clientX,
            clientY : evt.clientY,
            cloned : true
        });
    }
    /**
     * @return {undefined}
     */
    function bind() {
        var cmd_args = $.$A(arguments);
        var name = cmd_args.shift();
        var container = containers[name];
        if (container) {
            /** @type {number} */
            var i = 0;
            for (; i < container.length; i++) {
                container[i].apply(null, cmd_args);
            }
        }
    }
    /**
     * @return {undefined}
     */
    function render() {
        var el = arguments[0];
        var dir;
        var id;
        /** @type {!Array} */
        var closeTagsForsummaryText = [];
        try {
            do {
                id = el.tagName;
                if (/^[A-Za-z]*$/.test(id)) {
                    if (dir = el.getAttribute("id")) {
                        if (/^[A-Za-z][-A-Za-z0-9_]*/.test(dir)) {
                            /** @type {string} */
                            id = id + ("#" + dir);
                        }
                    }
                    closeTagsForsummaryText.push(id);
                }
                el = el.parentNode;
            } while (el && el !== document.documentElement);
            /** @type {!Array} */
            closeTagsForsummaryText = closeTagsForsummaryText.reverse();
            $.addCSS(closeTagsForsummaryText.join(" ") + "> .mz-figure > img", {
                transition : "none",
                transform : "none"
            }, "mz-runtime-css", true);
            $.addCSS(closeTagsForsummaryText.join(" ") + ":not(.mz-no-rt-width-css)> .mz-figure:not(.mz-no-rt-width-css) > img", {
                width : "100% !important;"
            }, "mz-runtime-css", true);
        } catch (M) {
        }
    }
    /**
     * @return {?}
     */
    function resize() {
        /** @type {null} */
        var L = null;
        /** @type {null} */
        var t = null;
        /**
         * @return {undefined}
         */
        var render = function() {
            window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
            window.dispatchEvent(new Event("resize"));
        };
        /** @type {number} */
        t = setInterval(function() {
            /** @type {boolean} */
            var $fixed_footer_active = window.orientation === 90 || window.orientation === -90;
            /** @type {number} */
            var fixed_footer_tick_lastPosition = window.innerHeight;
            /** @type {number} */
            var $fixed_footer_trigger_offset = ($fixed_footer_active ? screen.availWidth : screen.availHeight) * .85;
            if ((L === null || L === false) && ($fixed_footer_active && fixed_footer_tick_lastPosition < $fixed_footer_trigger_offset || !$fixed_footer_active && fixed_footer_tick_lastPosition < $fixed_footer_trigger_offset)) {
                /** @type {boolean} */
                L = true;
                render();
            } else {
                if ((L === null || L === true) && ($fixed_footer_active && fixed_footer_tick_lastPosition > $fixed_footer_trigger_offset || !$fixed_footer_active && fixed_footer_tick_lastPosition > $fixed_footer_trigger_offset)) {
                    /** @type {boolean} */
                    L = false;
                    render();
                }
            }
        }, 250);
        return t;
    }
    /**
     * @return {undefined}
     */
    function initMidi() {
        $.addCSS(".magic-hidden-wrapper, .magic-temporary-img", {
            display : "block !important",
            "min-height" : "0 !important",
            "min-width" : "0 !important",
            "max-height" : "none !important",
            "max-width" : "none !important",
            width : "10px !important",
            height : "10px !important",
            position : "absolute !important",
            top : "-10000px !important",
            left : "0 !important",
            overflow : "hidden !important",
            "-webkit-transform" : "none !important",
            transform : "none !important",
            "-webkit-transition" : "none !important",
            transition : "none !important"
        }, "magiczoom-reset-css");
        $.addCSS(".magic-temporary-img img, .magic-temporary-img picture", {
            display : "inline-block !important",
            border : "0 !important",
            padding : "0 !important",
            "min-height" : "0 !important",
            "min-width" : "0 !important",
            "max-height" : "none !important",
            "max-width" : "none !important",
            "-webkit-transform" : "none !important",
            transform : "none !important",
            "-webkit-transition" : "none !important",
            transition : "none !important"
        }, "magiczoom-reset-css");
        $.addCSS(".magic-temporary-img picture, .magic-temporary-img picture > img", {
            width : "auto !important",
            height : "auto !important"
        }, "magiczoom-reset-css");
        if ($.browser.androidBrowser) {
            $.addCSS(".mobile-magic .mz-expand .mz-expand-bg", {
                display : "none !important"
            }, "magiczoom-reset-css");
        }
        if ($.browser.androidBrowser && ($.browser.uaName !== "chrome" || $.browser.uaVersion === 44)) {
            $.addCSS(".mobile-magic .mz-zoom-window.mz-magnifier, .mobile-magic .mz-zoom-window.mz-magnifier:before", {
                "border-radius" : "0 !important"
            }, "magiczoom-reset-css");
        }
    }
    var jQuery;
    var $;
    jQuery = $ = function() {
        /**
         * @param {string} prop
         * @return {?}
         */
        function getPrefixedProp(prop) {
            var styleProp = prop.charAt(0).toUpperCase() + prop.slice(1);
            return prop in s || "Webkit" + styleProp in s || "Moz" + styleProp in s || "ms" + styleProp in s || "O" + styleProp in s;
        }
        /**
         * @param {string} item
         * @return {?}
         */
        function render(item) {
            var coords;
            var ab;
            /** @type {boolean} */
            ab = $.browser.webkit && "filter" == item ? false : item in s;
            if (!ab) {
                coords = $.browser.cssDomPrefix + item.charAt(0).toUpperCase() + item.slice(1);
                if (coords in s) {
                    return coords;
                }
            }
            return item;
        }
        var self = {
            version : "v3.3.4",
            UUID : 0,
            storage : {},
            $uuid : function(objOrTsid) {
                return objOrTsid.$J_UUID || (objOrTsid.$J_UUID = ++$.UUID);
            },
            getStorage : function(name) {
                return $.storage[name] || ($.storage[name] = {});
            },
            $F : function() {
            },
            $false : function() {
                return false;
            },
            $true : function() {
                return true;
            },
            stylesId : "mjs-" + Math.floor(Math.random() * (new Date).getTime()),
            defined : function(string) {
                return undefined != string;
            },
            ifndef : function(min, value) {
                return undefined != min ? min : value;
            },
            exists : function(val) {
                return !!val;
            },
            jTypeOf : function(obj) {
                if (!$.defined(obj)) {
                    return false;
                }
                if (obj.$J_TYPE) {
                    return obj.$J_TYPE;
                }
                if (!!obj.nodeType) {
                    if (1 == obj.nodeType) {
                        return "element";
                    }
                    if (3 == obj.nodeType) {
                        return "textnode";
                    }
                }
                if (obj.length && obj.item) {
                    return "collection";
                }
                if (obj.length && obj.callee) {
                    return "arguments";
                }
                if ((obj instanceof window.Object || obj instanceof window.Function) && obj.constructor === $.Class) {
                    return "class";
                }
                if (obj instanceof window.Array) {
                    return "array";
                }
                if (obj instanceof window.Function) {
                    return "function";
                }
                if (obj instanceof window.String) {
                    return "string";
                }
                if ($.browser.trident) {
                    if ($.defined(obj.cancelBubble)) {
                        return "event";
                    }
                } else {
                    if (obj === window.event || obj.constructor == window.Event || obj.constructor == window.MouseEvent || obj.constructor == window.UIEvent || obj.constructor == window.KeyboardEvent || obj.constructor == window.KeyEvent) {
                        return "event";
                    }
                }
                if (obj instanceof window.Date) {
                    return "date";
                }
                if (obj instanceof window.RegExp) {
                    return "regexp";
                }
                if (obj === window) {
                    return "window";
                }
                if (obj === document) {
                    return "document";
                }
                return typeof obj;
            },
            extend : function(data, source) {
                if (!(data instanceof window.Array)) {
                    /** @type {!Array} */
                    data = [data];
                }
                if (!source) {
                    return data[0];
                }
                /** @type {number} */
                var i = 0;
                var tldCount = data.length;
                for (; i < tldCount; i++) {
                    if (!$.defined(data)) {
                        continue;
                    }
                    var name;
                    for (name in source) {
                        if (!Object.prototype.hasOwnProperty.call(source, name)) {
                            continue;
                        }
                        try {
                            data[i][name] = source[name];
                        } catch (aa) {
                        }
                    }
                }
                return data[0];
            },
            implement : function(obj, params) {
                if (!(obj instanceof window.Array)) {
                    /** @type {!Array} */
                    obj = [obj];
                }
                /** @type {number} */
                var prop = 0;
                var len = obj.length;
                for (; prop < len; prop++) {
                    if (!$.defined(obj[prop])) {
                        continue;
                    }
                    if (!obj[prop].prototype) {
                        continue;
                    }
                    var name;
                    for (name in params || {}) {
                        if (!obj[prop].prototype[name]) {
                            obj[prop].prototype[name] = params[name];
                        }
                    }
                }
                return obj[0];
            },
            nativize : function(result, headers) {
                if (!$.defined(result)) {
                    return result;
                }
                var name;
                for (name in headers || {}) {
                    if (!result[name]) {
                        result[name] = headers[name];
                    }
                }
                return result;
            },
            $try : function() {
                /** @type {number} */
                var i = 0;
                /** @type {number} */
                var argl = arguments.length;
                for (; i < argl; i++) {
                    try {
                        return arguments[i]();
                    } catch (ac) {
                    }
                }
                return null;
            },
            $A : function(obj) {
                if (!$.defined(obj)) {
                    return $.$([]);
                }
                if (obj.toArray) {
                    return $.$(obj.toArray());
                }
                if (obj.item) {
                    var t = obj.length || 0;
                    /** @type {!Array} */
                    var f = new Array(t);
                    for (; t--;) {
                        f[t] = obj[t];
                    }
                    return $.$(f);
                }
                return $.$(Array.prototype.slice.call(obj));
            },
            now : function() {
                return (new Date).getTime();
            },
            detach : function(obj) {
                var binding;
                switch($.jTypeOf(obj)) {
                    case "object":
                        binding = {};
                        var prop;
                        for (prop in obj) {
                            binding[prop] = $.detach(obj[prop]);
                        }
                        break;
                    case "array":
                        /** @type {!Array} */
                        binding = [];
                        /** @type {number} */
                        var i = 0;
                        var patchLen = obj.length;
                        for (; i < patchLen; i++) {
                            binding[i] = $.detach(obj[i]);
                        }
                        break;
                    default:
                        return obj;
                }
                return $.$(binding);
            },
            $ : function(obj) {
                /** @type {boolean} */
                var aa = true;
                if (!$.defined(obj)) {
                    return null;
                }
                if (obj.$J_EXT) {
                    return obj;
                }
                switch($.jTypeOf(obj)) {
                    case "array":
                        obj = $.nativize(obj, $.extend($.Array, {
                            $J_EXT : $.$F
                        }));
                        obj.jEach = obj.forEach;
                        /** @type {function(!Object, undefined): ?} */
                        obj.contains = $.Array.contains;
                        return obj;
                        break;
                    case "string":
                        /** @type {(Element|null)} */
                        var data = document.getElementById(obj);
                        if ($.defined(data)) {
                            return $.$(data);
                        }
                        return null;
                        break;
                    case "window":
                    case "document":
                        $.$uuid(obj);
                        obj = $.extend(obj, $.Doc);
                        break;
                    case "element":
                        $.$uuid(obj);
                        obj = $.extend(obj, $.Element);
                        break;
                    case "event":
                        obj = $.extend(obj, $.Event);
                        break;
                    case "textnode":
                    case "function":
                    case "array":
                    case "date":
                    default:
                        /** @type {boolean} */
                        aa = false;
                        break;
                }
                if (aa) {
                    return $.extend(obj, {
                        $J_EXT : $.$F
                    });
                } else {
                    return obj;
                }
            },
            $new : function(name, url, parent) {
                return $.$($.doc.createElement(name)).setProps(url || {}).jSetCss(parent || {});
            },
            addCSS : function(selector, css, options) {
                var style;
                var sheet;
                var i;
                /** @type {!Array} */
                var drilldownLevelLabels = [];
                /** @type {number} */
                var rule = -1;
                if (!options) {
                    /** @type {string} */
                    options = $.stylesId;
                }
                style = $.$(options) || $.$new("style", {
                    id : options,
                    type : "text/css"
                }).jAppendTo(document.head || document.body, "top");
                sheet = style.sheet || style.styleSheet;
                if ("string" != $.jTypeOf(css)) {
                    for (i in css) {
                        drilldownLevelLabels.push(i + ":" + css[i]);
                    }
                    /** @type {string} */
                    css = drilldownLevelLabels.join(";");
                }
                if (sheet.insertRule) {
                    rule = sheet.insertRule(selector + " {" + css + "}", sheet.cssRules.length);
                } else {
                    try {
                        rule = sheet.addRule(selector, css, sheet.rules.length);
                    } catch (af) {
                    }
                }
                return rule;
            },
            removeCSS : function(node, index) {
                var el;
                var sheet;
                el = $.$(node);
                if ("element" !== $.jTypeOf(el)) {
                    return;
                }
                sheet = el.sheet || el.styleSheet;
                if (sheet.deleteRule) {
                    sheet.deleteRule(index);
                } else {
                    if (sheet.removeRule) {
                        sheet.removeRule(index);
                    }
                }
            },
            generateUUID : function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
                    /** @type {number} */
                    var r = Math.random() * 16 | 0;
                    /** @type {number} */
                    var v = c == "x" ? r : r & 3 | 8;
                    return v.toString(16);
                }).toUpperCase();
            },
            getAbsoluteURL : function() {
                var node;
                return function(X) {
                    if (!node) {
                        /** @type {!Element} */
                        node = document.createElement("a");
                    }
                    node.setAttribute("href", X);
                    return ("!!" + node.href).replace("!!", "");
                };
            }(),
            getHashCode : function(s) {
                /** @type {number} */
                var hash = 0;
                var l = s.length;
                /** @type {number} */
                var i = 0;
                for (; i < l; ++i) {
                    hash = 31 * hash + s.charCodeAt(i);
                    /** @type {number} */
                    hash = hash % 4294967296;
                }
                return hash;
            }
        };
        var $ = self;
        /** @type {function(!Object): ?} */
        var $this = self.$;
        if (!window.magicJS) {
            window.magicJS = self;
            /** @type {function(!Object): ?} */
            window.$mjs = self.$;
        }
        $.Array = {
            $J_TYPE : "array",
            indexOf : function(num, from) {
                var l = this.length;
                var length = this.length;
                var index = from < 0 ? Math.max(0, length + from) : from || 0;
                for (; index < length; index++) {
                    if (this[index] === num) {
                        return index;
                    }
                }
                return -1;
            },
            contains : function(start, value) {
                return this.indexOf(start, value) != -1;
            },
            forEach : function(context, callback) {
                /** @type {number} */
                var i = 0;
                var l = this.length;
                for (; i < l; i++) {
                    if (i in this) {
                        context.call(callback, this[i], i, this);
                    }
                }
            },
            filter : function(callback, thisp) {
                /** @type {!Array} */
                var result = [];
                /** @type {number} */
                var i = 0;
                var l = this.length;
                for (; i < l; i++) {
                    if (i in this) {
                        var rpcSetting = this[i];
                        if (callback.call(thisp, this[i], i, this)) {
                            result.push(rpcSetting);
                        }
                    }
                }
                return result;
            },
            map : function(callback, thisp) {
                /** @type {!Array} */
                var result = [];
                /** @type {number} */
                var i = 0;
                var l = this.length;
                for (; i < l; i++) {
                    if (i in this) {
                        result[i] = callback.call(thisp, this[i], i, this);
                    }
                }
                return result;
            }
        };
        $.implement(String, {
            $J_TYPE : "string",
            jTrim : function() {
                return this.replace(/^\s+|\s+$/g, "");
            },
            eq : function(callback, table) {
                return table || false ? this.toString() === callback.toString() : this.toLowerCase().toString() === callback.toLowerCase().toString();
            },
            jCamelize : function() {
                return this.replace(/-\D/g, function(hashComponent) {
                    return hashComponent.charAt(1).toUpperCase();
                });
            },
            dashize : function() {
                return this.replace(/[A-Z]/g, function(hashComponent) {
                    return "-" + hashComponent.charAt(0).toLowerCase();
                });
            },
            jToInt : function(radix) {
                return parseInt(this, radix || 10);
            },
            toFloat : function() {
                return parseFloat(this);
            },
            jToBool : function() {
                return !this.replace(/true/i, "").jTrim();
            },
            has : function(key, value) {
                value = value || "";
                return (value + this + value).indexOf(value + key + value) > -1;
            }
        });
        self.implement(Function, {
            $J_TYPE : "function",
            jBind : function() {
                var args = $.$A(arguments);
                var f = this;
                var c = args.shift();
                return function() {
                    return f.apply(c || null, args.concat($.$A(arguments)));
                };
            },
            jBindAsEvent : function() {
                var args = $.$A(arguments);
                var f = this;
                var c = args.shift();
                return function(canCreateDiscussions) {
                    return f.apply(c || null, $.$([canCreateDiscussions || ($.browser.ieMode ? window.event : null)]).concat(args));
                };
            },
            jDelay : function() {
                var cmd_args = $.$A(arguments);
                var item = this;
                var timeout = cmd_args.shift();
                return window.setTimeout(function() {
                    return item.apply(item, cmd_args);
                }, timeout || 0);
            },
            jDefer : function() {
                var cmd_args = $.$A(arguments);
                var myHooks = this;
                return function() {
                    return myHooks.jDelay.apply(myHooks, cmd_args);
                };
            },
            interval : function() {
                var cmd_args = $.$A(arguments);
                var item = this;
                var inInterval = cmd_args.shift();
                return window.setInterval(function() {
                    return item.apply(item, cmd_args);
                }, inInterval || 0);
            }
        });
        var map = {};
        /** @type {string} */
        var prefixpart = navigator.userAgent.toLowerCase();
        /** @type {(Array<string>|null)} */
        var m = prefixpart.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i);
        /** @type {(Array<string>|null)} */
        var match = prefixpart.match(/(edge|opr)\/(\d+\.?\d*)/i) || prefixpart.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);
        /** @type {(Array<string>|null)} */
        var degreeMatch = prefixpart.match(/version\/(\d+\.?\d*)/i);
        /** @type {!CSSStyleDeclaration} */
        var s = document.documentElement.style;
        $.browser = {
            features : {
                xpath : !!document.evaluate,
                air : !!window.runtime,
                query : !!document.querySelector,
                fullScreen : !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
                xhr2 : !!window.ProgressEvent && !!window.FormData && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                transition : getPrefixedProp("transition"),
                transform : getPrefixedProp("transform"),
                perspective : getPrefixedProp("perspective"),
                animation : getPrefixedProp("animation"),
                requestAnimationFrame : false,
                multibackground : false,
                cssFilters : false,
                canvas : false,
                svg : function() {
                    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
                }()
            },
            touchScreen : function() {
                return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
            }(),
            mobile : !!prefixpart.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/),
            engine : m && m[1] ? m[1].toLowerCase() : window.opera ? "presto" : !!window.ActiveXObject ? "trident" : document.getBoxObjectFor !== undefined || window.mozInnerScreenY !== null ? "gecko" : window.WebKitPoint !== null || !navigator.taintEnabled ? "webkit" : "unknown",
            version : m && m[2] ? parseFloat(m[2]) : 0,
            uaName : match && match[1] ? match[1].toLowerCase() : "",
            uaVersion : match && match[2] ? parseFloat(match[2]) : 0,
            cssPrefix : "",
            cssDomPrefix : "",
            domPrefix : "",
            ieMode : 0,
            platform : prefixpart.match(/ip(?:ad|od|hone)/) ? "ios" : (prefixpart.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
            backCompat : document.compatMode && document.compatMode.toLowerCase() === "backcompat",
            scrollbarsWidth : 0,
            getDoc : function() {
                return document.compatMode && document.compatMode.toLowerCase() === "backcompat" ? document.body : document.documentElement;
            },
            requestAnimationFrame : window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
            cancelAnimationFrame : window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
            ready : false,
            onready : function() {
                if ($.browser.ready) {
                    return;
                }
                var tester;
                var rule;
                /** @type {boolean} */
                $.browser.ready = true;
                $.body = $.$(document.body);
                $.win = $.$(window);
                try {
                    var myDom = $.$new("div").jSetCss({
                        width : 100,
                        height : 100,
                        overflow : "scroll",
                        position : "absolute",
                        top : -9999
                    }).jAppendTo(document.body);
                    /** @type {number} */
                    $.browser.scrollbarsWidth = myDom.offsetWidth - myDom.clientWidth;
                    myDom.jRemove();
                } catch (aa) {
                }
                try {
                    tester = $.$new("div");
                    rule = tester.style;
                    /** @type {string} */
                    rule.cssText = "background:url(https://),url(https://),red url(https://)";
                    /** @type {boolean} */
                    $.browser.features.multibackground = /(url\s*\(.*?){3}/.test(rule.background);
                    /** @type {null} */
                    rule = null;
                    /** @type {null} */
                    tester = null;
                } catch (aa) {
                }
                if (!$.browser.cssTransformProp) {
                    $.browser.cssTransformProp = $.normalizeCSS("transform").dashize();
                }
                try {
                    tester = $.$new("div");
                    tester.style.cssText = $.normalizeCSS("filter").dashize() + ":blur(2px);";
                    /** @type {boolean} */
                    $.browser.features.cssFilters = !!tester.style.length && (!$.browser.ieMode || $.browser.ieMode > 9);
                    /** @type {null} */
                    tester = null;
                } catch (aa) {
                }
                if (!$.browser.features.cssFilters) {
                    $.$(document.documentElement).jAddClass("no-cssfilters-magic");
                }
                try {
                    $.browser.features.canvas = function() {
                        var textedCanvas = $.$new("canvas");
                        return !!(textedCanvas.getContext && textedCanvas.getContext("2d"));
                    }();
                } catch (aa) {
                }
                if (window.TransitionEvent === undefined && window.WebKitTransitionEvent !== undefined) {
                    /** @type {string} */
                    map.transitionend = "webkitTransitionEnd";
                }
                $.Doc.jCallEvent.call($.$(document), "domready");
            }
        };
        (function() {
            /**
             * @return {?}
             */
            function onProcessMouse() {
                return !!arguments.callee.caller;
            }
            /** @type {!Array} */
            var pos_args = [];
            var items;
            var version;
            var el;
            switch($.browser.engine) {
                case "trident":
                    if (!$.browser.version) {
                        /** @type {number} */
                        $.browser.version = !!window.XMLHttpRequest ? 3 : 2;
                    }
                    break;
                case "gecko":
                    /** @type {number} */
                    $.browser.version = match && match[2] ? parseFloat(match[2]) : 0;
                    break;
            }
            /** @type {boolean} */
            $.browser[$.browser.engine] = true;
            if (match && match[1] === "crios") {
                /** @type {string} */
                $.browser.uaName = "chrome";
            }
            if (!!window.chrome) {
                /** @type {boolean} */
                $.browser.chrome = true;
            }
            if (match && match[1] === "opr") {
                /** @type {string} */
                $.browser.uaName = "opera";
                /** @type {boolean} */
                $.browser.opera = true;
            }
            if ($.browser.uaName === "safari" && (degreeMatch && degreeMatch[1])) {
                /** @type {number} */
                $.browser.uaVersion = parseFloat(degreeMatch[1]);
            }
            if ($.browser.platform === "android" && $.browser.webkit && (degreeMatch && degreeMatch[1])) {
                /** @type {boolean} */
                $.browser.androidBrowser = true;
            }
            items = {
                gecko : ["-moz-", "Moz", "moz"],
                webkit : ["-webkit-", "Webkit", "webkit"],
                trident : ["-ms-", "ms", "ms"],
                presto : ["-o-", "O", "o"]
            }[$.browser.engine] || ["", "", ""];
            $.browser.cssPrefix = items[0];
            $.browser.cssDomPrefix = items[1];
            $.browser.domPrefix = items[2];
            $.browser.ieMode = !$.browser.trident ? undefined : document.documentMode ? document.documentMode : function() {
                /** @type {number} */
                var ag = 0;
                if ($.browser.backCompat) {
                    return 5;
                }
                switch($.browser.version) {
                    case 2:
                        /** @type {number} */
                        ag = 6;
                        break;
                    case 3:
                        /** @type {number} */
                        ag = 7;
                        break;
                }
                return ag;
            }();
            if (!$.browser.mobile && $.browser.platform === "mac" && $.browser.touchScreen) {
                /** @type {boolean} */
                $.browser.mobile = true;
                /** @type {string} */
                $.browser.platform = "ios";
            }
            pos_args.push($.browser.platform + "-magic");
            if ($.browser.mobile) {
                pos_args.push("mobile-magic");
            }
            if ($.browser.androidBrowser) {
                pos_args.push("android-browser-magic");
            }
            if ($.browser.ieMode) {
                /** @type {string} */
                $.browser.uaName = "ie";
                $.browser.uaVersion = $.browser.ieMode;
                pos_args.push("ie" + $.browser.ieMode + "-magic");
                /** @type {number} */
                version = 11;
                for (; version > $.browser.ieMode; version--) {
                    pos_args.push("lt-ie" + version + "-magic");
                }
            }
            if ($.browser.webkit && $.browser.version < 536) {
                /** @type {boolean} */
                $.browser.features.fullScreen = false;
            }
            if ($.browser.requestAnimationFrame) {
                $.browser.requestAnimationFrame.call(window, function() {
                    /** @type {boolean} */
                    $.browser.features.requestAnimationFrame = true;
                });
            }
            if ($.browser.features.svg) {
                pos_args.push("svg-magic");
            } else {
                pos_args.push("no-svg-magic");
            }
            el = (document.documentElement.className || "").match(/\S+/g) || [];
            document.documentElement.className = $.$(el).concat(pos_args).join(" ");
            try {
                document.documentElement.setAttribute("data-magic-ua", $.browser.uaName);
                document.documentElement.setAttribute("data-magic-ua-ver", $.browser.uaVersion);
                document.documentElement.setAttribute("data-magic-engine", $.browser.engine);
                document.documentElement.setAttribute("data-magic-engine-ver", $.browser.version);
            } catch (ac) {
            }
            if ($.browser.ieMode && $.browser.ieMode < 9) {
                document.createElement("figure");
                document.createElement("figcaption");
            }
            if (!window.navigator.pointerEnabled) {
                $.$(["Down", "Up", "Move", "Over", "Out"]).jEach(function(cap) {
                    /** @type {(number|string)} */
                    map["pointer" + cap.toLowerCase()] = window.navigator.msPointerEnabled ? "MSPointer" + cap : -1;
                });
            }
        })();
        (function() {
            $.browser.fullScreen = {
                capable : $.browser.features.fullScreen,
                enabled : function() {
                    return !!(document.fullscreenElement || document[$.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[$.browser.domPrefix + "FullScreen"]);
                },
                request : function(elem, state) {
                    if (!state) {
                        state = {};
                    }
                    if (this.capable) {
                        $.$(document).jAddEvent(this.changeEventName, this.onchange = function(canCreateDiscussions) {
                            if (this.enabled()) {
                                if (state.onEnter) {
                                    state.onEnter();
                                }
                            } else {
                                $.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                                if (state.onExit) {
                                    state.onExit();
                                }
                            }
                        }.jBindAsEvent(this));
                        $.$(document).jAddEvent(this.errorEventName, this.onerror = function(canCreateDiscussions) {
                            if (state.fallback) {
                                state.fallback();
                            }
                            $.$(document).jRemoveEvent(this.errorEventName, this.onerror);
                        }.jBindAsEvent(this));
                        (elem.requestFullscreen || elem[$.browser.domPrefix + "RequestFullscreen"] || elem[$.browser.domPrefix + "RequestFullScreen"] || function() {
                        }).call(elem);
                    } else {
                        if (state.fallback) {
                            state.fallback();
                        }
                    }
                },
                cancel : (document.exitFullscreen || document.cancelFullScreen || document[$.browser.domPrefix + "ExitFullscreen"] || document[$.browser.domPrefix + "CancelFullScreen"] || function() {
                }).jBind(document),
                changeEventName : document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : $.browser.domPrefix) + "fullscreenchange",
                errorEventName : document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : $.browser.domPrefix) + "fullscreenerror",
                prefix : $.browser.domPrefix,
                activeElement : null
            };
        })();
        /** @type {!RegExp} */
        var _digitExpr = /\S+/g;
        /** @type {!RegExp} */
        var unitsElement = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/;
        var ret = {
            "float" : "undefined" === typeof s.styleFloat ? "cssFloat" : "styleFloat"
        };
        var CSS_NO_PX = {
            fontWeight : true,
            lineHeight : true,
            opacity : true,
            zIndex : true,
            zoom : true
        };
        /** @type {function(?, string): ?} */
        var awaitTransitionEnd = window.getComputedStyle ? function(elem, name) {
            var computed = window.getComputedStyle(elem, null);
            return computed ? computed.getPropertyValue(name) || computed[name] : null;
        } : function(o, name) {
            var style = o.currentStyle;
            /** @type {null} */
            var input = null;
            input = style ? style[name] : null;
            if (null == input && o.style && o.style[name]) {
                input = o.style[name];
            }
            return input;
        };
        /** @type {function(string): ?} */
        $.normalizeCSS = render;
        $.Element = {
            jHasClass : function(data) {
                return !(data || "").has(" ") && (this.className || "").has(data, " ");
            },
            jAddClass : function(name) {
                var el = (this.className || "").match(_digitExpr) || [];
                var a = (name || "").match(_digitExpr) || [];
                var startLen = a.length;
                /** @type {number} */
                var j = 0;
                for (; j < startLen; j++) {
                    if (!$.$(el).contains(a[j])) {
                        el.push(a[j]);
                    }
                }
                this.className = el.join(" ");
                return this;
            },
            jRemoveClass : function(name) {
                var file = (this.className || "").match(_digitExpr) || [];
                var whitelistWildcardTerms = (name || "").match(_digitExpr) || [];
                var combLen = whitelistWildcardTerms.length;
                /** @type {number} */
                var w = 0;
                var range_start;
                for (; w < combLen; w++) {
                    if ((range_start = $.$(file).indexOf(whitelistWildcardTerms[w])) > -1) {
                        file.splice(range_start, 1);
                    }
                }
                this.className = name ? file.join(" ") : "";
                return this;
            },
            jToggleClass : function(value) {
                return this.jHasClass(value) ? this.jRemoveClass(value) : this.jAddClass(value);
            },
            jGetCss : function(style) {
                var i = style.jCamelize();
                /** @type {null} */
                var value = null;
                style = ret[i] || (ret[i] = render(i));
                value = awaitTransitionEnd(this, style);
                if ("auto" === value) {
                    /** @type {null} */
                    value = null;
                }
                if (null !== value) {
                    if ("opacity" == style) {
                        return $.defined(value) ? parseFloat(value) : 1;
                    }
                    if (unitsElement.test(style)) {
                        value = parseInt(value, 10) ? value : "0px";
                    }
                }
                return value;
            },
            jSetCssProp : function(style, value) {
                var i = style.jCamelize();
                try {
                    if ("opacity" == style) {
                        this.jSetOpacity(value);
                        return this;
                    }
                    style = ret[i] || (ret[i] = render(i));
                    /** @type {string} */
                    this.style[style] = value + ("number" == $.jTypeOf(value) && !CSS_NO_PX[i] ? "px" : "");
                } catch (ac) {
                }
                return this;
            },
            jSetCss : function(f) {
                var D;
                for (D in f) {
                    this.jSetCssProp(D, f[D]);
                }
                return this;
            },
            jGetStyles : function() {
                var addonPromises = {};
                $.$A(arguments).jEach(function(name) {
                    addonPromises[name] = this.jGetCss(name);
                }, this);
                return addonPromises;
            },
            jSetOpacity : function(val, oldAncestors) {
                var ab;
                oldAncestors = oldAncestors || false;
                /** @type {number} */
                this.style.opacity = val;
                /** @type {number} */
                val = parseInt(parseFloat(val) * 100);
                if (oldAncestors) {
                    if (0 === val) {
                        if ("hidden" != this.style.visibility) {
                            /** @type {string} */
                            this.style.visibility = "hidden";
                        }
                    } else {
                        if ("visible" != this.style.visibility) {
                            /** @type {string} */
                            this.style.visibility = "visible";
                        }
                    }
                }
                if ($.browser.ieMode && $.browser.ieMode < 9) {
                    if (!isNaN(val)) {
                        if (!~this.style.filter.indexOf("Alpha")) {
                            this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + val + ")";
                        } else {
                            this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + val);
                        }
                    } else {
                        this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim();
                        if ("" === this.style.filter) {
                            this.style.removeAttribute("filter");
                        }
                    }
                }
                return this;
            },
            setProps : function(data) {
                var key;
                for (key in data) {
                    if ("class" === key) {
                        this.jAddClass("" + data[key]);
                    } else {
                        this.setAttribute(key, "" + data[key]);
                    }
                }
                return this;
            },
            jGetTransitionDuration : function() {
                /** @type {number} */
                var str = 0;
                /** @type {number} */
                var item = 0;
                str = this.jGetCss("transition-duration");
                item = this.jGetCss("transition-delay");
                /** @type {number} */
                str = str.indexOf("ms") > -1 ? parseFloat(str) : str.indexOf("s") > -1 ? parseFloat(str) * 1E3 : 0;
                /** @type {number} */
                item = item.indexOf("ms") > -1 ? parseFloat(item) : item.indexOf("s") > -1 ? parseFloat(item) * 1E3 : 0;
                return str + item;
            },
            hide : function() {
                return this.jSetCss({
                    display : "none",
                    visibility : "hidden"
                });
            },
            show : function() {
                return this.jSetCss({
                    display : "",
                    visibility : "visible"
                });
            },
            jGetSize : function() {
                return {
                    width : this.offsetWidth,
                    height : this.offsetHeight
                };
            },
            getInnerSize : function(el) {
                var s = this.jGetSize();
                s.width -= parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0);
                s.height -= parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0);
                if (!el) {
                    s.width -= parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0);
                    s.height -= parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0);
                }
                return s;
            },
            jGetScroll : function() {
                return {
                    top : this.scrollTop,
                    left : this.scrollLeft
                };
            },
            jGetFullScroll : function() {
                var parentElm = this;
                var anitarget = {
                    top : 0,
                    left : 0
                };
                do {
                    anitarget.left += parentElm.scrollLeft || 0;
                    anitarget.top += parentElm.scrollTop || 0;
                    parentElm = parentElm.parentNode;
                } while (parentElm);
                return anitarget;
            },
            jGetPosition : function() {
                var offsetParent = this;
                /** @type {number} */
                var _rowPosition = 0;
                /** @type {number} */
                var addtop = 0;
                if ($.defined(document.documentElement.getBoundingClientRect)) {
                    var boundingRect = this.getBoundingClientRect();
                    var coordinates = $.$(document).jGetScroll();
                    var body = $.browser.getDoc();
                    return {
                        top : boundingRect.top + coordinates.y - body.clientTop,
                        left : boundingRect.left + coordinates.x - body.clientLeft
                    };
                }
                do {
                    _rowPosition = _rowPosition + (offsetParent.offsetLeft || 0);
                    addtop = addtop + (offsetParent.offsetTop || 0);
                    offsetParent = offsetParent.offsetParent;
                } while (offsetParent && !/^(?:body|html)$/i.test(offsetParent.tagName));
                return {
                    top : addtop,
                    left : _rowPosition
                };
            },
            jGetRect : function() {
                var cropRegion = this.jGetPosition();
                var dimensionsOnActivate = this.jGetSize();
                return {
                    top : cropRegion.top,
                    bottom : cropRegion.top + dimensionsOnActivate.height,
                    left : cropRegion.left,
                    right : cropRegion.left + dimensionsOnActivate.width
                };
            },
            changeContent : function(value) {
                try {
                    /** @type {string} */
                    this.innerHTML = value;
                } catch (aa) {
                    /** @type {string} */
                    this.innerText = value;
                }
                return this;
            },
            jRemove : function() {
                return this.parentNode ? this.parentNode.removeChild(this) : this;
            },
            kill : function() {
                $.$A(this.childNodes).jEach(function(binding) {
                    if (3 == binding.nodeType || 8 == binding.nodeType) {
                        return;
                    }
                    $.$(binding).kill();
                });
                this.jRemove();
                this.jClearEvents();
                if (this.$J_UUID) {
                    /** @type {null} */
                    $.storage[this.$J_UUID] = null;
                    delete $.storage[this.$J_UUID];
                }
                return null;
            },
            append : function(value, position) {
                position = position || "bottom";
                var child = this.firstChild;
                if ("top" == position && child) {
                    this.insertBefore(value, child);
                } else {
                    this.appendChild(value);
                }
                return this;
            },
            jAppendTo : function(template, index) {
                var targetWidgetId = $.$(template).append(this, index);
                return this;
            },
            enclose : function(title) {
                this.append(title.parentNode.replaceChild(this, title));
                return this;
            },
            hasChild : function(value) {
                if ("element" !== $.jTypeOf("string" == $.jTypeOf(value) ? value = document.getElementById(value) : value)) {
                    return false;
                }
                return this == value ? false : this.contains && !$.browser.webkit419 ? this.contains(value) : this.compareDocumentPosition ? !!(this.compareDocumentPosition(value) & 16) : $.$A(this.byTag(value.tagName)).contains(value);
            }
        };
        /** @type {function(string): ?} */
        $.Element.jGetStyle = $.Element.jGetCss;
        /** @type {function(string): ?} */
        $.Element.jSetStyle = $.Element.jSetCss;
        if (!window.Element) {
            /** @type {function(): undefined} */
            window.Element = $.$F;
            if ($.browser.engine.webkit) {
                window.document.createElement("iframe");
            }
            window.Element.prototype = $.browser.engine.webkit ? window["[[DOMElement.prototype]]"] : {};
        }
        $.implement(window.Element, {
            $J_TYPE : "element"
        });
        $.Doc = {
            jGetSize : function() {
                if ($.browser.touchScreen || $.browser.presto925 || $.browser.webkit419) {
                    return {
                        width : window.innerWidth,
                        height : window.innerHeight
                    };
                }
                return {
                    width : $.browser.getDoc().clientWidth,
                    height : $.browser.getDoc().clientHeight
                };
            },
            jGetScroll : function() {
                return {
                    x : window.pageXOffset || $.browser.getDoc().scrollLeft,
                    y : window.pageYOffset || $.browser.getDoc().scrollTop
                };
            },
            jGetFullSize : function() {
                var bottomCorner = this.jGetSize();
                return {
                    width : Math.max($.browser.getDoc().scrollWidth, bottomCorner.width),
                    height : Math.max($.browser.getDoc().scrollHeight, bottomCorner.height)
                };
            }
        };
        $.extend(document, {
            $J_TYPE : "document"
        });
        $.extend(window, {
            $J_TYPE : "window"
        });
        $.extend([$.Element, $.Doc], {
            jFetch : function(src, val) {
                var map = $.getStorage(this.$J_UUID);
                var a = map[src];
                if (undefined !== val && undefined === a) {
                    a = map[src] = val;
                }
                return $.defined(a) ? a : null;
            },
            jStore : function(str, obj) {
                var by = $.getStorage(this.$J_UUID);
                /** @type {string} */
                by[str] = obj;
                return this;
            },
            jDel : function(key) {
                var closedFrames = $.getStorage(this.$J_UUID);
                delete closedFrames[key];
                return this;
            }
        });
        if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
            $.extend([$.Element, $.Doc], {
                getElementsByClassName : function(className) {
                    return $.$A(this.getElementsByTagName("*")).filter(function(srcNodeRef) {
                        try {
                            return 1 == srcNodeRef.nodeType && srcNodeRef.className.has(className, " ");
                        } catch (ab) {
                        }
                    });
                }
            });
        }
        $.extend([$.Element, $.Doc], {
            byClass : function() {
                return this.getElementsByClassName(arguments[0]);
            },
            byTag : function() {
                return this.getElementsByTagName(arguments[0]);
            }
        });
        if ($.browser.fullScreen.capable && !document.requestFullScreen) {
            /**
             * @return {undefined}
             */
            $.Element.requestFullScreen = function() {
                $.browser.fullScreen.request(this);
            };
        }
        $.Event = {
            $J_TYPE : "event",
            isQueueStopped : $.$false,
            stop : function() {
                return this.stopDistribution().stopDefaults();
            },
            stopDistribution : function() {
                if (this.stopPropagation) {
                    this.stopPropagation();
                } else {
                    /** @type {boolean} */
                    this.cancelBubble = true;
                }
                return this;
            },
            stopDefaults : function() {
                if (this.preventDefault) {
                    this.preventDefault();
                } else {
                    /** @type {boolean} */
                    this.returnValue = false;
                }
                return this;
            },
            stopQueue : function() {
                /** @type {function(): ?} */
                this.isQueueStopped = $.$true;
                return this;
            },
            getClientXY : function() {
                var e = /touch/i.test(this.type) ? this.changedTouches[0] : this;
                return !$.defined(e) ? {
                    x : 0,
                    y : 0
                } : {
                    x : e.clientX,
                    y : e.clientY
                };
            },
            jGetPageXY : function() {
                var e = /touch/i.test(this.type) ? this.changedTouches[0] : this;
                return !$.defined(e) ? {
                    x : 0,
                    y : 0
                } : {
                    x : e.pageX || e.clientX + $.browser.getDoc().scrollLeft,
                    y : e.pageY || e.clientY + $.browser.getDoc().scrollTop
                };
            },
            getTarget : function() {
                var target = this.target || this.srcElement;
                for (; target && target.nodeType === 3;) {
                    target = target.parentNode;
                }
                return target;
            },
            getRelated : function() {
                /** @type {null} */
                var related = null;
                switch(this.type) {
                    case "mouseover":
                    case "pointerover":
                    case "MSPointerOver":
                        related = this.relatedTarget || this.fromElement;
                        break;
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        related = this.relatedTarget || this.toElement;
                        break;
                    default:
                        return related;
                }
                try {
                    for (; related && related.nodeType === 3;) {
                        related = related.parentNode;
                    }
                } catch (aa) {
                    /** @type {null} */
                    related = null;
                }
                return related;
            },
            getButton : function() {
                if (!this.which && this.button !== undefined) {
                    return this.button & 1 ? 1 : this.button & 2 ? 3 : this.button & 4 ? 2 : 0;
                }
                return this.which;
            },
            isTouchEvent : function() {
                return this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH) || /touch/i.test(this.type);
            },
            isPrimaryTouch : function() {
                if (this.pointerType) {
                    return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary;
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches.length === 1 && this.targetTouches[0].identifier === this.changedTouches[0].identifier : true);
                    }
                }
                return false;
            },
            getPrimaryTouch : function() {
                if (this.pointerType) {
                    return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null;
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches[0];
                    }
                }
                return null;
            },
            getPrimaryTouchId : function() {
                if (this.pointerType) {
                    return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null;
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches[0].identifier;
                    }
                }
                return null;
            }
        };
        /** @type {string} */
        $._event_add_ = "addEventListener";
        /** @type {string} */
        $._event_del_ = "removeEventListener";
        /** @type {string} */
        $._event_prefix_ = "";
        if (!document.addEventListener) {
            /** @type {string} */
            $._event_add_ = "attachEvent";
            /** @type {string} */
            $._event_del_ = "detachEvent";
            /** @type {string} */
            $._event_prefix_ = "on";
        }
        $.Event.Custom = {
            type : "",
            x : null,
            y : null,
            timeStamp : null,
            button : null,
            target : null,
            relatedTarget : null,
            $J_TYPE : "event.custom",
            isQueueStopped : $.$false,
            events : $.$([]),
            pushToEvents : function(str) {
                /** @type {!Object} */
                var msg = str;
                this.events.push(msg);
            },
            stop : function() {
                return this.stopDistribution().stopDefaults();
            },
            stopDistribution : function() {
                this.events.jEach(function(canCreateDiscussions) {
                    try {
                        canCreateDiscussions.stopDistribution();
                    } catch (aa) {
                    }
                });
                return this;
            },
            stopDefaults : function() {
                this.events.jEach(function(canCreateDiscussions) {
                    try {
                        canCreateDiscussions.stopDefaults();
                    } catch (aa) {
                    }
                });
                return this;
            },
            stopQueue : function() {
                /** @type {function(): ?} */
                this.isQueueStopped = $.$true;
                return this;
            },
            getClientXY : function() {
                return {
                    x : this.clientX,
                    y : this.clientY
                };
            },
            jGetPageXY : function() {
                return {
                    x : this.x,
                    y : this.y
                };
            },
            getTarget : function() {
                return this.target;
            },
            getRelated : function() {
                return this.relatedTarget;
            },
            getButton : function() {
                return this.button;
            },
            getOriginalTarget : function() {
                return this.events.length > 0 ? this.events[0].getTarget() : undefined;
            },
            isTouchEvent : function() {
                return this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH) || /touch/i.test(this.type);
            },
            isPrimaryTouch : function() {
                if (this.pointerType) {
                    return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary;
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches[0].identifier === this.changedTouches[0].identifier : true);
                    }
                }
                return false;
            },
            getPrimaryTouch : function() {
                if (this.pointerType) {
                    return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null;
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches[0];
                    }
                }
                return null;
            },
            getPrimaryTouchId : function() {
                if (this.pointerType) {
                    return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null;
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches[0].identifier;
                    }
                }
                return null;
            }
        };
        $.extend([$.Element, $.Doc], {
            jAddEvent : function(type, obj, count, centerLatLng) {
                var lists;
                var list;
                var placeMidpointLine;
                var item;
                var yamlType;
                if ($.jTypeOf(type) === "string") {
                    yamlType = type.split(" ");
                    if (yamlType.length > 1) {
                        type = yamlType;
                    }
                }
                if ($.jTypeOf(type) === "array") {
                    $.$(type).jEach(this.jAddEvent.jBindAsEvent(this, obj, count, centerLatLng));
                    return this;
                }
                type = map[type] || type;
                if (!type || !obj || $.jTypeOf(type) !== "string" || $.jTypeOf(obj) !== "function") {
                    return this;
                }
                if (type === "domready" && $.browser.ready) {
                    obj.call(this);
                    return this;
                }
                /** @type {number} */
                count = parseInt(count || 50, 10);
                if (!obj.$J_EUID) {
                    /** @type {number} */
                    obj.$J_EUID = Math.floor(Math.random() * $.now());
                }
                lists = $.Doc.jFetch.call(this, "_EVENTS_", {});
                list = lists[type];
                if (!list) {
                    lists[type] = list = $.$([]);
                    placeMidpointLine = this;
                    if ($.Event.Custom[type]) {
                        $.Event.Custom[type].handler.add.call(this, centerLatLng);
                    } else {
                        /**
                         * @param {!Array} e
                         * @return {undefined}
                         */
                        list.handle = function(e) {
                            e = $.extend(e || window.e, {
                                $J_TYPE : "event"
                            });
                            $.Doc.jCallEvent.call(placeMidpointLine, type, $.$(e));
                        };
                        this[$._event_add_]($._event_prefix_ + type, list.handle, false);
                    }
                }
                item = {
                    type : type,
                    fn : obj,
                    priority : count,
                    euid : obj.$J_EUID
                };
                list.push(item);
                list.sort(function(secondListenerDetails, firstListenerDetails) {
                    return secondListenerDetails.priority - firstListenerDetails.priority;
                });
                return this;
            },
            jRemoveEvent : function(type) {
                var typeToConstructorMapping = $.Doc.jFetch.call(this, "_EVENTS_", {});
                var body;
                var dog;
                var i;
                var ah;
                var lastviewmatrix;
                var yamlType;
                lastviewmatrix = arguments.length > 1 ? arguments[1] : -100;
                if ($.jTypeOf(type) === "string") {
                    yamlType = type.split(" ");
                    if (yamlType.length > 1) {
                        type = yamlType;
                    }
                }
                if ($.jTypeOf(type) === "array") {
                    $.$(type).jEach(this.jRemoveEvent.jBindAsEvent(this, lastviewmatrix));
                    return this;
                }
                type = map[type] || type;
                if (!type || $.jTypeOf(type) !== "string" || !typeToConstructorMapping || !typeToConstructorMapping[type]) {
                    return this;
                }
                body = typeToConstructorMapping[type] || [];
                /** @type {number} */
                i = 0;
                for (; i < body.length; i++) {
                    dog = body[i];
                    if (lastviewmatrix === -100 || !!lastviewmatrix && lastviewmatrix.$J_EUID === dog.euid) {
                        ah = body.splice(i--, 1);
                    }
                }
                if (body.length === 0) {
                    if ($.Event.Custom[type]) {
                        $.Event.Custom[type].handler.jRemove.call(this);
                    } else {
                        this[$._event_del_]($._event_prefix_ + type, body.handle, false);
                    }
                    delete typeToConstructorMapping[type];
                }
                return this;
            },
            jCallEvent : function(type, obj) {
                var typeToConstructorMapping = $.Doc.jFetch.call(this, "_EVENTS_", {});
                var readyList;
                var i;
                type = map[type] || type;
                if (!type || $.jTypeOf(type) !== "string" || !typeToConstructorMapping || !typeToConstructorMapping[type]) {
                    return this;
                }
                try {
                    obj = $.extend(obj || {}, {
                        type : type
                    });
                } catch (ae) {
                }
                if (obj.timeStamp === undefined) {
                    obj.timeStamp = $.now();
                }
                readyList = typeToConstructorMapping[type] || [];
                /** @type {number} */
                i = 0;
                for (; i < readyList.length && !(obj.isQueueStopped && obj.isQueueStopped()); i++) {
                    readyList[i].fn.call(this, obj);
                }
            },
            jRaiseEvent : function(name, type) {
                /** @type {boolean} */
                var customName = name !== "domready";
                var element = this;
                var event;
                name = map[name] || name;
                if (!customName) {
                    $.Doc.jCallEvent.call(this, name);
                    return this;
                }
                if (element === document && document.createEvent && !element.dispatchEvent) {
                    element = document.documentElement;
                }
                if (document.createEvent) {
                    event = document.createEvent(name);
                    event.initEvent(type, true, true);
                } else {
                    event = document.createEventObject();
                    /** @type {string} */
                    event.eventType = name;
                }
                if (document.createEvent) {
                    element.dispatchEvent(event);
                } else {
                    element.fireEvent("on" + type, event);
                }
                return event;
            },
            jClearEvents : function() {
                var egressPerm = $.Doc.jFetch.call(this, "_EVENTS_");
                if (!egressPerm) {
                    return this;
                }
                var i;
                for (i in egressPerm) {
                    $.Doc.jRemoveEvent.call(this, i);
                }
                $.Doc.jDel.call(this, "_EVENTS_");
                return this;
            }
        });
        (function(self) {
            if (document.readyState === "complete") {
                return self.browser.onready.jDelay(1);
            }
            if (self.browser.webkit && self.browser.version < 420) {
                (function() {
                    if (self.$(["loaded", "complete"]).contains(document.readyState)) {
                        self.browser.onready();
                    } else {
                        arguments.callee.jDelay(50);
                    }
                })();
            } else {
                if (self.browser.trident && self.browser.ieMode < 9 && window === top) {
                    (function() {
                        if (self.$try(function() {
                            self.browser.getDoc().doScroll("left");
                            return true;
                        })) {
                            self.browser.onready();
                        } else {
                            arguments.callee.jDelay(50);
                        }
                    })();
                } else {
                    self.Doc.jAddEvent.call(self.$(document), "DOMContentLoaded", self.browser.onready);
                    self.Doc.jAddEvent.call(self.$(window), "load", self.browser.onready);
                }
            }
        })(self);
        /**
         * @return {?}
         */
        $.Class = function() {
            /** @type {null} */
            var target = null;
            var m = $.$A(arguments);
            if ("class" == $.jTypeOf(m[0])) {
                target = m.shift();
            }
            /**
             * @return {?}
             */
            var constructor = function() {
                var i;
                for (i in this) {
                    this[i] = $.detach(this[i]);
                }
                if (this.constructor.$parent) {
                    this.$parent = {};
                    var namespace = this.constructor.$parent;
                    var name;
                    for (name in namespace) {
                        var value = namespace[name];
                        switch($.jTypeOf(value)) {
                            case "function":
                                this.$parent[name] = $.Class.wrap(this, value);
                                break;
                            case "object":
                                this.$parent[name] = $.detach(value);
                                break;
                            case "array":
                                this.$parent[name] = $.detach(value);
                                break;
                        }
                    }
                }
                var tunnelsMesh = this.init ? this.init.apply(this, arguments) : this;
                delete this.caller;
                return tunnelsMesh;
            };
            if (!constructor.prototype.init) {
                /** @type {function(): undefined} */
                constructor.prototype.init = $.$F;
            }
            if (target) {
                /**
                 * @return {undefined}
                 */
                var F = function() {
                };
                F.prototype = target.prototype;
                constructor.prototype = new F;
                constructor.$parent = {};
                var i;
                for (i in target.prototype) {
                    constructor.$parent[i] = target.prototype[i];
                }
            } else {
                /** @type {null} */
                constructor.$parent = null;
            }
            /** @type {function(): ?} */
            constructor.constructor = $.Class;
            /** @type {function(): ?} */
            constructor.prototype.constructor = constructor;
            $.extend(constructor.prototype, m[0]);
            $.extend(constructor, {
                $J_TYPE : "class"
            });
            return constructor;
        };
        /**
         * @param {?} elem
         * @param {!Function} callback
         * @return {?}
         */
        self.Class.wrap = function(elem, callback) {
            return function() {
                var caller = this.caller;
                var result = callback.apply(elem, arguments);
                return result;
            };
        };
        (function(self) {
            /** @type {function(!Object): ?} */
            var $this = self.$;
            /** @type {number} */
            var aa = 5;
            /** @type {number} */
            var threshold = 300;
            self.Event.Custom.btnclick = new self.Class(self.extend(self.Event.Custom, {
                type : "btnclick",
                init : function(view, event) {
                    var matTemp = event.jGetPageXY();
                    this.x = matTemp.x;
                    this.y = matTemp.y;
                    this.clientX = event.clientX;
                    this.clientY = event.clientY;
                    this.timeStamp = event.timeStamp;
                    this.button = event.getButton();
                    /** @type {!Object} */
                    this.target = view;
                    this.pushToEvents(event);
                }
            }));
            self.Event.Custom.btnclick.handler = {
                options : {
                    threshold : threshold,
                    button : 1
                },
                add : function(value) {
                    this.jStore("event:btnclick:options", self.extend(self.detach(self.Event.Custom.btnclick.handler.options), value || {}));
                    this.jAddEvent("mousedown", self.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("mouseup", self.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("click", self.Event.Custom.btnclick.handler.onclick, 1);
                    if (self.browser.trident && self.browser.ieMode < 9) {
                        this.jAddEvent("dblclick", self.Event.Custom.btnclick.handler.handle, 1);
                    }
                },
                jRemove : function() {
                    this.jRemoveEvent("mousedown", self.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("mouseup", self.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("click", self.Event.Custom.btnclick.handler.onclick);
                    if (self.browser.trident && self.browser.ieMode < 9) {
                        this.jRemoveEvent("dblclick", self.Event.Custom.btnclick.handler.handle);
                    }
                },
                onclick : function(branch) {
                    branch.stopDefaults();
                },
                handle : function(e) {
                    var event;
                    var is;
                    var startEvent;
                    is = this.jFetch("event:btnclick:options");
                    if (e.type != "dblclick" && e.getButton() != is.button) {
                        return;
                    }
                    if (this.jFetch("event:btnclick:ignore")) {
                        this.jDel("event:btnclick:ignore");
                        return;
                    }
                    if ("mousedown" == e.type) {
                        event = new self.Event.Custom.btnclick(this, e);
                        this.jStore("event:btnclick:btnclickEvent", event);
                    } else {
                        if ("mouseup" == e.type) {
                            event = this.jFetch("event:btnclick:btnclickEvent");
                            if (!event) {
                                return;
                            }
                            startEvent = e.jGetPageXY();
                            this.jDel("event:btnclick:btnclickEvent");
                            event.pushToEvents(e);
                            if (e.timeStamp - event.timeStamp <= is.threshold && Math.sqrt(Math.pow(startEvent.x - event.x, 2) + Math.pow(startEvent.y - event.y, 2)) <= aa) {
                                this.jCallEvent("btnclick", event);
                            }
                            document.jCallEvent("mouseup", e);
                        } else {
                            if (e.type == "dblclick") {
                                event = new self.Event.Custom.btnclick(this, e);
                                this.jCallEvent("btnclick", event);
                            }
                        }
                    }
                }
            };
        })(self);
        (function($) {
            /** @type {function(!Object): ?} */
            var $$ = $.$;
            $.Event.Custom.mousedrag = new $.Class($.extend($.Event.Custom, {
                type : "mousedrag",
                state : "dragstart",
                dragged : false,
                init : function(view, event, data) {
                    var matTemp = event.jGetPageXY();
                    this.x = matTemp.x;
                    this.y = matTemp.y;
                    this.clientX = event.clientX;
                    this.clientY = event.clientY;
                    this.timeStamp = event.timeStamp;
                    this.button = event.getButton();
                    /** @type {!Object} */
                    this.target = view;
                    this.pushToEvents(event);
                    /** @type {string} */
                    this.state = data;
                }
            }));
            $.Event.Custom.mousedrag.handler = {
                add : function() {
                    var pornResult = $.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this);
                    var illegalResult = $.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                    this.jAddEvent("mousedown", $.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                    this.jAddEvent("mouseup", $.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                    document.jAddEvent("mousemove", pornResult, 1);
                    document.jAddEvent("mouseup", illegalResult, 1);
                    this.jStore("event:mousedrag:listeners:document:move", pornResult);
                    this.jStore("event:mousedrag:listeners:document:end", illegalResult);
                },
                jRemove : function() {
                    this.jRemoveEvent("mousedown", $.Event.Custom.mousedrag.handler.handleMouseDown);
                    this.jRemoveEvent("mouseup", $.Event.Custom.mousedrag.handler.handleMouseUp);
                    $$(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || $.$F);
                    $$(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || $.$F);
                    this.jDel("event:mousedrag:listeners:document:move");
                    this.jDel("event:mousedrag:listeners:document:end");
                },
                handleMouseDown : function(event) {
                    var mouseEvent;
                    if (event.getButton() !== 1) {
                        return;
                    }
                    mouseEvent = new $.Event.Custom.mousedrag(this, event, "dragstart");
                    this.jStore("event:mousedrag:dragstart", mouseEvent);
                },
                handleMouseUp : function(datapos) {
                    var _this;
                    _this = this.jFetch("event:mousedrag:dragstart");
                    if (!_this) {
                        return;
                    }
                    if (_this.dragged) {
                        datapos.stopDefaults();
                    }
                    _this = new $.Event.Custom.mousedrag(this, datapos, "dragend");
                    this.jDel("event:mousedrag:dragstart");
                    this.jCallEvent("mousedrag", _this);
                },
                handleMouseMove : function(originalPosition) {
                    var _this;
                    _this = this.jFetch("event:mousedrag:dragstart");
                    if (!_this) {
                        return;
                    }
                    originalPosition.stopDefaults();
                    if (!_this.dragged) {
                        /** @type {boolean} */
                        _this.dragged = true;
                        this.jCallEvent("mousedrag", _this);
                    }
                    _this = new $.Event.Custom.mousedrag(this, originalPosition, "dragmove");
                    this.jCallEvent("mousedrag", _this);
                }
            };
        })(self);
        (function(options) {
            /** @type {function(!Object): ?} */
            var $form = options.$;
            options.Event.Custom.dblbtnclick = new options.Class(options.extend(options.Event.Custom, {
                type : "dblbtnclick",
                timedout : false,
                tm : null,
                init : function(view, event) {
                    var matTemp = event.jGetPageXY();
                    this.x = matTemp.x;
                    this.y = matTemp.y;
                    this.clientX = event.clientX;
                    this.clientY = event.clientY;
                    this.timeStamp = event.timeStamp;
                    this.button = event.getButton();
                    /** @type {!Object} */
                    this.target = view;
                    this.pushToEvents(event);
                }
            }));
            options.Event.Custom.dblbtnclick.handler = {
                options : {
                    threshold : 200
                },
                add : function(extra) {
                    this.jStore("event:dblbtnclick:options", options.extend(options.detach(options.Event.Custom.dblbtnclick.handler.options), extra || {}));
                    this.jAddEvent("btnclick", options.Event.Custom.dblbtnclick.handler.handle, 1);
                },
                jRemove : function() {
                    this.jRemoveEvent("btnclick", options.Event.Custom.dblbtnclick.handler.handle);
                },
                handle : function(opts) {
                    var data;
                    var tpx;
                    data = this.jFetch("event:dblbtnclick:event");
                    tpx = this.jFetch("event:dblbtnclick:options");
                    if (!data) {
                        data = new options.Event.Custom.dblbtnclick(this, opts);
                        /** @type {number} */
                        data.tm = setTimeout(function() {
                            /** @type {boolean} */
                            data.timedout = true;
                            /** @type {function(): ?} */
                            opts.isQueueStopped = options.$false;
                            this.jCallEvent("btnclick", opts);
                            this.jDel("event:dblbtnclick:event");
                        }.jBind(this), tpx.threshold + 10);
                        this.jStore("event:dblbtnclick:event", data);
                        opts.stopQueue();
                    } else {
                        clearTimeout(data.tm);
                        this.jDel("event:dblbtnclick:event");
                        if (!data.timedout) {
                            data.pushToEvents(opts);
                            opts.stopQueue().stop();
                            this.jCallEvent("dblbtnclick", data);
                        } else {
                        }
                    }
                }
            };
        })(self);
        (function($) {
            /** @type {function(!Object): ?} */
            var doc = $.$;
            /** @type {number} */
            var aa = 10;
            /** @type {number} */
            var ab = 200;
            $.Event.Custom.tap = new $.Class($.extend($.Event.Custom, {
                type : "tap",
                id : null,
                init : function(elem, src) {
                    var event = src.getPrimaryTouch();
                    this.id = event.pointerId || event.identifier;
                    this.x = event.pageX;
                    this.y = event.pageY;
                    this.pageX = event.pageX;
                    this.pageY = event.pageY;
                    this.clientX = event.clientX;
                    this.clientY = event.clientY;
                    this.timeStamp = src.timeStamp;
                    /** @type {number} */
                    this.button = 0;
                    /** @type {string} */
                    this.target = elem;
                    this.pushToEvents(src);
                }
            }));
            $.Event.Custom.tap.handler = {
                add : function(canvasview) {
                    this.jAddEvent(["touchstart", "pointerdown"], $.Event.Custom.tap.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", "pointerup"], $.Event.Custom.tap.handler.onTouchEnd, 1);
                    this.jAddEvent("click", $.Event.Custom.tap.handler.onClick, 1);
                },
                jRemove : function() {
                    this.jRemoveEvent(["touchstart", "pointerdown"], $.Event.Custom.tap.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", "pointerup"], $.Event.Custom.tap.handler.onTouchEnd);
                    this.jRemoveEvent("click", $.Event.Custom.tap.handler.onClick);
                },
                onClick : function($notyfy) {
                    $notyfy.stopDefaults();
                },
                onTouchStart : function(event) {
                    if (!event.isPrimaryTouch()) {
                        this.jDel("event:tap:event");
                        return;
                    }
                    this.jStore("event:tap:event", new $.Event.Custom.tap(this, event));
                    this.jStore("event:btnclick:ignore", true);
                },
                onTouchEnd : function(event) {
                    var af = $.now();
                    var data = this.jFetch("event:tap:event");
                    var ae = this.jFetch("event:tap:options");
                    if (!data || !event.isPrimaryTouch()) {
                        return;
                    }
                    this.jDel("event:tap:event");
                    if (data.id === event.getPrimaryTouchId() && event.timeStamp - data.timeStamp <= ab && Math.sqrt(Math.pow(event.getPrimaryTouch().pageX - data.x, 2) + Math.pow(event.getPrimaryTouch().pageY - data.y, 2)) <= aa) {
                        this.jDel("event:btnclick:btnclickEvent");
                        event.stop();
                        data.pushToEvents(event);
                        this.jCallEvent("tap", data);
                    }
                }
            };
        })(self);
        $.Event.Custom.dbltap = new $.Class($.extend($.Event.Custom, {
            type : "dbltap",
            timedout : false,
            tm : null,
            init : function(view, event) {
                this.x = event.x;
                this.y = event.y;
                this.clientX = event.clientX;
                this.clientY = event.clientY;
                this.timeStamp = event.timeStamp;
                /** @type {number} */
                this.button = 0;
                /** @type {!Object} */
                this.target = view;
                this.pushToEvents(event);
            }
        }));
        $.Event.Custom.dbltap.handler = {
            options : {
                threshold : 300
            },
            add : function(extra) {
                this.jStore("event:dbltap:options", $.extend($.detach($.Event.Custom.dbltap.handler.options), extra || {}));
                this.jAddEvent("tap", $.Event.Custom.dbltap.handler.handle, 1);
            },
            jRemove : function() {
                this.jRemoveEvent("tap", $.Event.Custom.dbltap.handler.handle);
            },
            handle : function(config) {
                var data;
                var tpx;
                data = this.jFetch("event:dbltap:event");
                tpx = this.jFetch("event:dbltap:options");
                if (!data) {
                    data = new $.Event.Custom.dbltap(this, config);
                    /** @type {number} */
                    data.tm = setTimeout(function() {
                        /** @type {boolean} */
                        data.timedout = true;
                        /** @type {function(): ?} */
                        config.isQueueStopped = $.$false;
                        this.jCallEvent("tap", config);
                    }.jBind(this), tpx.threshold + 10);
                    this.jStore("event:dbltap:event", data);
                    config.stopQueue();
                } else {
                    clearTimeout(data.tm);
                    this.jDel("event:dbltap:event");
                    if (!data.timedout) {
                        data.pushToEvents(config);
                        config.stopQueue().stop();
                        this.jCallEvent("dbltap", data);
                    } else {
                    }
                }
            }
        };
        (function($) {
            /** @type {function(!Object): ?} */
            var $$ = $.$;
            /** @type {number} */
            var aa = 10;
            $.Event.Custom.touchdrag = new $.Class($.extend($.Event.Custom, {
                type : "touchdrag",
                state : "dragstart",
                id : null,
                dragged : false,
                init : function(elem, src, x) {
                    var event = src.getPrimaryTouch();
                    this.id = event.pointerId || event.identifier;
                    this.clientX = event.clientX;
                    this.clientY = event.clientY;
                    this.pageX = event.pageX;
                    this.pageY = event.pageY;
                    this.x = event.pageX;
                    this.y = event.pageY;
                    this.timeStamp = src.timeStamp;
                    /** @type {number} */
                    this.button = 0;
                    /** @type {!Object} */
                    this.target = elem;
                    this.pushToEvents(src);
                    /** @type {string} */
                    this.state = x;
                }
            }));
            $.Event.Custom.touchdrag.handler = {
                add : function() {
                    var pornResult = $.Event.Custom.touchdrag.handler.onTouchMove.jBind(this);
                    var illegalResult = $.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["touchstart", "pointerdown"], $.Event.Custom.touchdrag.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", "pointerup"], $.Event.Custom.touchdrag.handler.onTouchEnd, 1);
                    this.jAddEvent(["touchmove", "pointermove"], $.Event.Custom.touchdrag.handler.onTouchMove, 1);
                    this.jStore("event:touchdrag:listeners:document:move", pornResult);
                    this.jStore("event:touchdrag:listeners:document:end", illegalResult);
                    $$(document).jAddEvent("pointermove", pornResult, 1);
                    $$(document).jAddEvent("pointerup", illegalResult, 1);
                },
                jRemove : function() {
                    this.jRemoveEvent(["touchstart", "pointerdown"], $.Event.Custom.touchdrag.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", "pointerup"], $.Event.Custom.touchdrag.handler.onTouchEnd);
                    this.jRemoveEvent(["touchmove", "pointermove"], $.Event.Custom.touchdrag.handler.onTouchMove);
                    $$(document).jRemoveEvent("pointermove", this.jFetch("event:touchdrag:listeners:document:move") || $.$F, 1);
                    $$(document).jRemoveEvent("pointerup", this.jFetch("event:touchdrag:listeners:document:end") || $.$F, 1);
                    this.jDel("event:touchdrag:listeners:document:move");
                    this.jDel("event:touchdrag:listeners:document:end");
                },
                onTouchStart : function(event) {
                    var mouseEvent;
                    if (!event.isPrimaryTouch()) {
                        return;
                    }
                    mouseEvent = new $.Event.Custom.touchdrag(this, event, "dragstart");
                    this.jStore("event:touchdrag:dragstart", mouseEvent);
                },
                onTouchEnd : function(event) {
                    var evt;
                    evt = this.jFetch("event:touchdrag:dragstart");
                    if (!evt || !evt.dragged || evt.id !== event.getPrimaryTouchId()) {
                        return;
                    }
                    evt = new $.Event.Custom.touchdrag(this, event, "dragend");
                    this.jDel("event:touchdrag:dragstart");
                    this.jCallEvent("touchdrag", evt);
                },
                onTouchMove : function(eventName) {
                    var data;
                    data = this.jFetch("event:touchdrag:dragstart");
                    if (!data || !eventName.isPrimaryTouch()) {
                        return;
                    }
                    if (data.id !== eventName.getPrimaryTouchId()) {
                        this.jDel("event:touchdrag:dragstart");
                        return;
                    }
                    if (!data.dragged && Math.sqrt(Math.pow(eventName.getPrimaryTouch().pageX - data.x, 2) + Math.pow(eventName.getPrimaryTouch().pageY - data.y, 2)) > aa) {
                        /** @type {boolean} */
                        data.dragged = true;
                        this.jCallEvent("touchdrag", data);
                    }
                    if (!data.dragged) {
                        return;
                    }
                    data = new $.Event.Custom.touchdrag(this, eventName, "dragmove");
                    this.jCallEvent("touchdrag", data);
                }
            };
        })(self);
        (function(self) {
            /**
             * @param {!Object} event
             * @param {!Object} data
             * @return {?}
             */
            function run(event, data) {
                /** @type {number} */
                var lightI = data.x - event.x;
                /** @type {number} */
                var lightJ = data.y - event.y;
                return Math.sqrt(lightI * lightI + lightJ * lightJ);
            }
            /**
             * @param {(Array|NodeList)} component
             * @param {!Object} options
             * @return {?}
             */
            function require(component, options) {
                /** @type {!Array<?>} */
                var t = Array.prototype.slice.call(component);
                /** @type {number} */
                var at = Math.abs(t[1].pageX - t[0].pageX);
                /** @type {number} */
                var aq = Math.abs(t[1].pageY - t[0].pageY);
                /** @type {number} */
                var audioOffsetX = Math.min(t[1].pageX, t[0].pageX) + at / 2;
                /** @type {number} */
                var languageOffsetY = Math.min(t[1].pageY, t[0].pageY) + aq / 2;
                /** @type {number} */
                var rndPlaceholder = 0;
                /** @type {!Array} */
                options.points = [t[0], t[1]];
                /** @type {number} */
                rndPlaceholder = Math.pow(run({
                    x : t[0].pageX,
                    y : t[0].pageY
                }, {
                    x : t[1].pageX,
                    y : t[1].pageY
                }), 2);
                options.centerPoint = {
                    x : audioOffsetX,
                    y : languageOffsetY
                };
                /** @type {number} */
                options.x = options.centerPoint.x;
                /** @type {number} */
                options.y = options.centerPoint.y;
                return rndPlaceholder;
            }
            /**
             * @param {?} a
             * @return {?}
             */
            function isArray(a) {
                return a / line;
            }
            /**
             * @param {!Object} event
             * @param {!Array} subArray
             * @return {?}
             */
            function get(event, subArray) {
                var touches;
                if (event.targetTouches && event.changedTouches) {
                    if (event.targetTouches) {
                        touches = event.targetTouches;
                    } else {
                        touches = event.changedTouches;
                    }
                    /** @type {!Array<?>} */
                    touches = Array.prototype.slice.call(touches);
                } else {
                    /** @type {!Array} */
                    touches = [];
                    if (subArray) {
                        subArray.forEach(function(e) {
                            touches.push(e);
                        });
                    }
                }
                return touches;
            }
            /**
             * @param {!Object} event
             * @param {!Object} node
             * @param {boolean} ap
             * @return {?}
             */
            function filter(event, node, ap) {
                /** @type {boolean} */
                var chart = false;
                if (event.pointerId && event.pointerType === "touch" && (!ap || node.has(event.pointerId))) {
                    node.set(event.pointerId, event);
                    /** @type {boolean} */
                    chart = true;
                }
                return chart;
            }
            /**
             * @param {!Object} e
             * @param {string} d
             * @return {undefined}
             */
            function p(e, d) {
                if (e.pointerId && e.pointerType === "touch" && d && d.has(e.pointerId)) {
                    d["delete"](e.pointerId);
                }
            }
            /**
             * @param {!Object} options
             * @return {?}
             */
            function cb(options) {
                var identifier;
                if (options.pointerId && options.pointerType === "touch") {
                    identifier = options.pointerId;
                } else {
                    identifier = options.identifier;
                }
                return identifier;
            }
            /**
             * @param {!Object} data
             * @param {!Array} path
             * @return {?}
             */
            function callback(data, path) {
                var i;
                var a;
                /** @type {boolean} */
                var HOOK = false;
                /** @type {number} */
                i = 0;
                for (; i < data.length; i++) {
                    if (path.length === 2) {
                        break;
                    } else {
                        a = cb(data[i]);
                        if (!path.contains(a)) {
                            path.push(a);
                            /** @type {boolean} */
                            HOOK = true;
                        }
                    }
                }
                return HOOK;
            }
            /**
             * @param {!Array} value
             * @return {?}
             */
            function check(value) {
                var result = $([]);
                value.forEach(function(n) {
                    result.push(cb(n));
                });
                return result;
            }
            /**
             * @param {!Array} name
             * @param {!Array} points
             * @return {?}
             */
            function encode(name, points) {
                var i;
                var c;
                /** @type {boolean} */
                var parsed_float = false;
                if (points) {
                    c = check(name);
                    /** @type {number} */
                    i = 0;
                    for (; i < points.length; i++) {
                        if (!c.contains(points[i])) {
                            points.splice(i, 1);
                            /** @type {boolean} */
                            parsed_float = true;
                            break;
                        }
                    }
                }
                return parsed_float;
            }
            /**
             * @param {!Object} result
             * @param {!Node} name
             * @return {?}
             */
            function add(result, name) {
                var i;
                var results = $([]);
                /** @type {number} */
                i = 0;
                for (; i < result.length; i++) {
                    if (name.contains(cb(result[i]))) {
                        results.push(result[i]);
                        if (results.length === 2) {
                            break;
                        }
                    }
                }
                return results;
            }
            /** @type {function(!Object): ?} */
            var $ = self.$;
            /** @type {null} */
            var line = null;
            self.Event.Custom.pinch = new self.Class(self.extend(self.Event.Custom, {
                type : "pinch",
                state : "pinchstart",
                init : function(elem, src, charset, options) {
                    /** @type {!Object} */
                    this.target = elem;
                    /** @type {string} */
                    this.state = charset;
                    this.x = options.x;
                    this.y = options.y;
                    this.timeStamp = src.timeStamp;
                    this.scale = options.scale;
                    this.space = options.space;
                    this.zoom = options.zoom;
                    /** @type {string} */
                    this.state = charset;
                    this.centerPoint = options.centerPoint;
                    this.points = options.points;
                    this.pushToEvents(src);
                }
            }));
            self.Event.Custom.pinch.handler = {
                variables : {
                    x : 0,
                    y : 0,
                    space : 0,
                    scale : 1,
                    zoom : 0,
                    startSpace : 0,
                    startScale : 1,
                    started : false,
                    dragged : false,
                    points : [],
                    centerPoint : {
                        x : 0,
                        y : 0
                    }
                },
                add : function(canvasview) {
                    if (!line) {
                        line = function() {
                            var layout = $(window).jGetSize();
                            /** @type {number} */
                            layout.width = Math.min(layout.width, layout.height);
                            /** @type {number} */
                            layout.height = layout.width;
                            return Math.pow(run({
                                x : 0,
                                y : 0
                            }, {
                                x : layout.width,
                                y : layout.height
                            }), 2);
                        }();
                    }
                    var pornResult = self.Event.Custom.pinch.handler.onTouchMove.jBind(this);
                    var illegalResult = self.Event.Custom.pinch.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["click", "tap"], self.Event.Custom.pinch.handler.onClick, 1);
                    this.jAddEvent(["touchstart", "pointerdown"], self.Event.Custom.pinch.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", "pointerup"], self.Event.Custom.pinch.handler.onTouchEnd, 1);
                    this.jAddEvent(["touchmove", "pointermove"], self.Event.Custom.pinch.handler.onTouchMove, 1);
                    this.jStore("event:pinch:listeners:touchmove", pornResult);
                    this.jStore("event:pinch:listeners:touchend", illegalResult);
                    self.doc.jAddEvent("pointermove", pornResult, 1);
                    self.doc.jAddEvent("pointerup", illegalResult, 1);
                },
                jRemove : function() {
                    this.jRemoveEvent(["click", "tap"], self.Event.Custom.pinch.handler.onClick);
                    this.jRemoveEvent(["touchstart", "pointerdown"], self.Event.Custom.pinch.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", "pointerup"], self.Event.Custom.pinch.handler.onTouchEnd);
                    this.jRemoveEvent(["touchmove", "pointermove"], self.Event.Custom.pinch.handler.onTouchMove);
                    self.doc.jRemoveEvent("pointermove", this.jFetch("event:pinch:listeners:touchmove"));
                    self.doc.jRemoveEvent("pointerup", this.jFetch("event:pinch:listeners:touchend"));
                    this.jDel("event:pinch:listeners:touchmove");
                    this.jDel("event:pinch:listeners:touchend");
                    this.jDel("event:pinch:pinchstart");
                    this.jDel("event:pinch:variables");
                    this.jDel("event:pinch:activepoints");
                    var subREGL = this.jFetch("event:pinch:cache");
                    if (subREGL) {
                        subREGL.clear();
                    }
                    this.jDel("event:pinch:cache");
                },
                onClick : function(event) {
                    event.stop();
                },
                setVariables : function(s, obj) {
                    var space = obj.space;
                    if (s.length > 1) {
                        obj.space = require(s, obj);
                        if (!obj.startSpace) {
                            obj.startSpace = obj.space;
                        }
                        if (space > obj.space) {
                            /** @type {number} */
                            obj.zoom = -1;
                        } else {
                            if (space < obj.space) {
                                /** @type {number} */
                                obj.zoom = 1;
                            } else {
                                /** @type {number} */
                                obj.zoom = 0;
                            }
                        }
                        obj.scale = isArray(obj.space);
                    } else {
                        /** @type {!Array<?>} */
                        obj.points = Array.prototype.slice.call(s, 0, 2);
                    }
                },
                onTouchMove : function(e) {
                    var event;
                    var a = this.jFetch("event:pinch:cache");
                    var evt = this.jFetch("event:pinch:variables") || self.extend({}, self.Event.Custom.pinch.handler.variables);
                    var extractData = this.jFetch("event:pinch:activepoints");
                    if (evt.started) {
                        if (e.pointerId && !filter(e, a, true)) {
                            return;
                        }
                        e.stop();
                        self.Event.Custom.pinch.handler.setVariables(add(get(e, a), extractData), evt);
                        event = new self.Event.Custom.pinch(this, e, "pinchmove", evt);
                        this.jCallEvent("pinch", event);
                    }
                },
                onTouchStart : function(event) {
                    var target;
                    var node;
                    var message;
                    var a = this.jFetch("event:pinch:cache");
                    var right = this.jFetch("event:pinch:activepoints");
                    if (event.pointerType === "mouse") {
                        return;
                    }
                    if (!right) {
                        right = $([]);
                        this.jStore("event:pinch:activepoints", right);
                    }
                    if (!right.length) {
                        $(event.target).jAddEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend"), 1);
                    }
                    if (!a) {
                        /** @type {!Map} */
                        a = new Map;
                        this.jStore("event:pinch:cache", a);
                    }
                    filter(event, a);
                    message = get(event, a);
                    callback(message, right);
                    if (message.length === 2) {
                        target = this.jFetch("event:pinch:pinchstart");
                        node = this.jFetch("event:pinch:variables") || self.extend({}, self.Event.Custom.pinch.handler.variables);
                        self.Event.Custom.pinch.handler.setVariables(add(message, right), node);
                        if (!target) {
                            target = new self.Event.Custom.pinch(this, event, "pinchstart", node);
                            this.jStore("event:pinch:pinchstart", target);
                            this.jStore("event:pinch:variables", node);
                            line = node.space;
                            this.jCallEvent("pinch", target);
                            /** @type {boolean} */
                            node.started = true;
                        }
                    }
                },
                onTouchEnd : function(e) {
                    var i;
                    var event;
                    var listener;
                    var oldVersion;
                    var b = this.jFetch("event:pinch:cache");
                    var value;
                    var segment;
                    if (e.pointerType === "mouse" || e.pointerId && (!b || !b.has(e.pointerId))) {
                        return;
                    }
                    event = this.jFetch("event:pinch:pinchstart");
                    listener = this.jFetch("event:pinch:variables");
                    value = this.jFetch("event:pinch:activepoints");
                    i = get(e, b);
                    p(e, b);
                    segment = encode(i, value);
                    if (!event || !listener || !listener.started || !segment || !value) {
                        return;
                    }
                    if (segment) {
                        callback(i, value);
                    }
                    /** @type {string} */
                    oldVersion = "pinchend";
                    if (i.length > 1) {
                        /** @type {string} */
                        oldVersion = "pinchresize";
                    } else {
                        e.target.jRemoveEvent(["touchend", "pointerup"], this.jFetch("event:pinch:listeners:touchend"));
                        if (b) {
                            b.clear();
                        }
                        this.jDel("event:pinch:pinchstart");
                        this.jDel("event:pinch:variables");
                        this.jDel("event:pinch:cache");
                        this.jDel("event:pinch:activepoints");
                    }
                    self.Event.Custom.pinch.handler.setVariables(add(i, value), listener);
                    event = new self.Event.Custom.pinch(this, e, oldVersion, listener);
                    this.jCallEvent("pinch", event);
                }
            };
        })(self);
        (function(self) {
            /**
             * @return {undefined}
             */
            function scrollHeightObserver() {
                /** @type {null} */
                lowestDelta = null;
            }
            /**
             * @param {number} loadedimg
             * @param {number} loadedev
             * @return {?}
             */
            function perform_graphics_ops(loadedimg, loadedev) {
                return loadedimg > 50 || 1 === loadedev && !("win" == self.browser.platform && loadedimg < 1) || 0 === loadedimg % 12 || 0 == loadedimg % 4.000244140625;
            }
            /** @type {function(!Object): ?} */
            var $this = self.$;
            self.Event.Custom.mousescroll = new self.Class(self.extend(self.Event.Custom, {
                type : "mousescroll",
                init : function(view, event, delta, items, expanded, onInit, opt_logFunction) {
                    var matTemp = event.jGetPageXY();
                    this.x = matTemp.x;
                    this.y = matTemp.y;
                    this.timeStamp = event.timeStamp;
                    /** @type {!Object} */
                    this.target = view;
                    this.delta = delta || 0;
                    this.deltaX = items || 0;
                    this.deltaY = expanded || 0;
                    this.deltaZ = onInit || 0;
                    this.deltaFactor = opt_logFunction || 0;
                    this.deltaMode = event.deltaMode || 0;
                    /** @type {boolean} */
                    this.isMouse = false;
                    this.pushToEvents(event);
                }
            }));
            var lowestDelta;
            var _takingTooLongTimeout;
            self.Event.Custom.mousescroll.handler = {
                eventType : "onwheel" in document || self.browser.ieMode > 8 ? "wheel" : "mousewheel",
                add : function() {
                    this.jAddEvent(self.Event.Custom.mousescroll.handler.eventType, self.Event.Custom.mousescroll.handler.handle, 1);
                },
                jRemove : function() {
                    this.jRemoveEvent(self.Event.Custom.mousescroll.handler.eventType, self.Event.Custom.mousescroll.handler.handle, 1);
                },
                handle : function(e) {
                    /** @type {number} */
                    var delta = 0;
                    /** @type {number} */
                    var deltaX = 0;
                    /** @type {number} */
                    var deltaY = 0;
                    /** @type {number} */
                    var absDelta = 0;
                    var fn;
                    var event;
                    if (e.detail) {
                        /** @type {number} */
                        deltaY = e.detail * -1;
                    }
                    if (e.wheelDelta !== undefined) {
                        deltaY = e.wheelDelta;
                    }
                    if (e.wheelDeltaY !== undefined) {
                        deltaY = e.wheelDeltaY;
                    }
                    if (e.wheelDeltaX !== undefined) {
                        /** @type {number} */
                        deltaX = e.wheelDeltaX * -1;
                    }
                    if (e.deltaY) {
                        /** @type {number} */
                        deltaY = -1 * e.deltaY;
                    }
                    if (e.deltaX) {
                        deltaX = e.deltaX;
                    }
                    if (0 === deltaY && 0 === deltaX) {
                        return;
                    }
                    delta = 0 === deltaY ? deltaX : deltaY;
                    /** @type {number} */
                    absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));
                    if (!lowestDelta || absDelta < lowestDelta) {
                        /** @type {number} */
                        lowestDelta = absDelta;
                    }
                    /** @type {string} */
                    fn = delta > 0 ? "floor" : "ceil";
                    delta = Math[fn](delta / lowestDelta);
                    deltaX = Math[fn](deltaX / lowestDelta);
                    deltaY = Math[fn](deltaY / lowestDelta);
                    if (_takingTooLongTimeout) {
                        clearTimeout(_takingTooLongTimeout);
                    }
                    /** @type {number} */
                    _takingTooLongTimeout = setTimeout(scrollHeightObserver, 200);
                    event = new self.Event.Custom.mousescroll(this, e, delta, deltaX, deltaY, 0, lowestDelta);
                    event.isMouse = perform_graphics_ops(lowestDelta, e.deltaMode || 0);
                    this.jCallEvent("mousescroll", event);
                }
            };
        })(self);
        $.win = $.$(window);
        $.doc = $.$(document);
        return self;
    }();
    (function($) {
        if (!$) {
            throw "MagicJS not found";
        }
        var push = $.$;
        var URL = window.URL || window.webkitURL || null;
        jQuery.ImageLoader = new $.Class({
            img : null,
            ready : false,
            options : {
                onprogress : $.$F,
                onload : $.$F,
                onabort : $.$F,
                onerror : $.$F,
                oncomplete : $.$F,
                onxhrerror : $.$F,
                xhr : false,
                progressiveLoad : true
            },
            size : null,
            _timer : null,
            loadedBytes : 0,
            _handlers : {
                onprogress : function(event) {
                    if (event.target && (200 === event.target.status || 304 === event.target.status) && event.lengthComputable) {
                        this.options.onprogress.jBind(null, (event.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / event.total).jDelay(1);
                        this.loadedBytes = event.loaded;
                    }
                },
                onload : function(val) {
                    if (val) {
                        push(val).stop();
                    }
                    this._unbind();
                    if (this.ready) {
                        return;
                    }
                    /** @type {boolean} */
                    this.ready = true;
                    this._cleanup();
                    if (!this.options.xhr) {
                        this.options.onprogress.jBind(null, 1).jDelay(1);
                    }
                    this.options.onload.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1);
                },
                onabort : function(e) {
                    if (e) {
                        push(e).stop();
                    }
                    this._unbind();
                    /** @type {boolean} */
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1);
                },
                onerror : function(e) {
                    if (e) {
                        push(e).stop();
                    }
                    this._unbind();
                    /** @type {boolean} */
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1);
                }
            },
            _bind : function() {
                push(["load", "abort", "error"]).jEach(function(evt) {
                    this.img.jAddEvent(evt, this._handlers["on" + evt].jBindAsEvent(this).jDefer(1));
                }, this);
            },
            _unbind : function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer);
                    } catch (N) {
                    }
                    /** @type {null} */
                    this._timer = null;
                }
                push(["load", "abort", "error"]).jEach(function(size) {
                    this.img.jRemoveEvent(size);
                }, this);
            },
            _cleanup : function() {
                this.jGetSize();
                if (this.img.jFetch("new")) {
                    var s = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position : "static",
                        top : "auto"
                    });
                    s.kill();
                }
            },
            loadBlob : function(url) {
                /** @type {!XMLHttpRequest} */
                var req = new XMLHttpRequest;
                var blob;
                push(["abort", "progress"]).jEach(function(i) {
                    req["on" + i] = push(function(p1__3354_SHARP_) {
                        this._handlers["on" + i].call(this, p1__3354_SHARP_);
                    }).jBind(this);
                }, this);
                req.onerror = push(function() {
                    this.options.onxhrerror.jBind(null, this).jDelay(1);
                    /** @type {boolean} */
                    this.options.xhr = false;
                    this._bind();
                    /** @type {!Object} */
                    this.img.src = url;
                }).jBind(this);
                req.onload = push(function() {
                    if (200 !== req.status && 304 !== req.status) {
                        this._handlers.onerror.call(this);
                        return;
                    }
                    /** @type {(Object|null|string)} */
                    blob = req.response;
                    this._bind();
                    if (URL && !$.browser.trident && !("ios" === $.browser.platform && $.browser.version < 537)) {
                        this.img.setAttribute("src", URL.createObjectURL(blob));
                    } else {
                        /** @type {!Object} */
                        this.img.src = url;
                    }
                }).jBind(this);
                req.open("GET", url);
                /** @type {string} */
                req.responseType = "blob";
                req.send();
            },
            init : function(image, options) {
                this.options = $.extend(this.options, options);
                this.img = push(image) || $.$new("img", {}, {
                    "max-width" : "none",
                    "max-height" : "none"
                }).jAppendTo($.$new("div").jAddClass("magic-temporary-img").jSetCss({
                    position : "absolute",
                    top : -1E4,
                    width : 10,
                    height : 10,
                    overflow : "hidden"
                }).jAppendTo(document.body)).jStore("new", true);
                if ($.browser.features.xhr2 && this.options.xhr && "string" == $.jTypeOf(image)) {
                    this.loadBlob(image);
                    return;
                }
                var slideBackward = function() {
                    if (this.isReady()) {
                        this._handlers.onload.call(this);
                    } else {
                        this._handlers.onerror.call(this);
                    }
                    /** @type {null} */
                    slideBackward = null;
                }.jBind(this);
                this._bind();
                if ("string" == $.jTypeOf(image)) {
                    /** @type {!Object} */
                    this.img.src = image;
                } else {
                    if ($.browser.trident && 5 == $.browser.version && $.browser.ieMode < 9) {
                        this.img.onreadystatechange = function() {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                /** @type {null} */
                                this.img.onreadystatechange = null;
                                if (slideBackward) {
                                    slideBackward();
                                }
                            }
                        }.jBind(this);
                    }
                    this.img.src = image.getAttribute("src");
                }
                if (this.img && this.img.complete && slideBackward) {
                    this._timer = slideBackward.jDelay(100);
                }
            },
            destroy : function() {
                this._unbind();
                this._cleanup();
                /** @type {boolean} */
                this.ready = false;
                return this;
            },
            isReady : function() {
                var img = this.img;
                return img.naturalWidth ? img.naturalWidth > 0 : img.readyState ? "complete" == img.readyState : img.width > 0;
            },
            jGetSize : function() {
                return this.size || (this.size = {
                    width : this.img.naturalWidth || this.img.width,
                    height : this.img.naturalHeight || this.img.height
                });
            }
        });
    })(jQuery);
    (function($) {
        if (!$) {
            throw "MagicJS not found";
        }
        if ($.FX) {
            return;
        }
        var includeScroll = $.$;
        $.FX = new $.Class({
            init : function(type, customOptions) {
                var f;
                this.el = $.$(type);
                this.options = $.extend(this.options, customOptions);
                /** @type {boolean} */
                this.timer = false;
                this.easeFn = this.cubicBezierAtTime;
                f = $.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === $.jTypeOf(f)) {
                    this.easeFn = f;
                } else {
                    this.cubicBezier = this.parseCubicBezier(f) || this.parseCubicBezier("ease");
                }
                if ("string" == $.jTypeOf(this.options.cycles)) {
                    /** @type {number} */
                    this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1;
                }
            },
            options : {
                fps : 60,
                duration : 600,
                transition : "ease",
                cycles : 1,
                direction : "normal",
                onStart : $.$F,
                onComplete : $.$F,
                onBeforeRender : $.$F,
                onAfterRender : $.$F,
                forceAnimation : false,
                roundCss : false
            },
            styles : null,
            cubicBezier : null,
            easeFn : null,
            setTransition : function(value) {
                /** @type {string} */
                this.options.transition = value;
                value = $.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === $.jTypeOf(value)) {
                    /** @type {string} */
                    this.easeFn = value;
                } else {
                    this.easeFn = this.cubicBezierAtTime;
                    this.cubicBezier = this.parseCubicBezier(value) || this.parseCubicBezier("ease");
                }
            },
            start : function(name) {
                /** @type {!RegExp} */
                var currencyRegExp = /%$/;
                var i;
                this.styles = name || {};
                /** @type {number} */
                this.cycle = 0;
                /** @type {number} */
                this.state = 0;
                /** @type {number} */
                this.curFrame = 0;
                this.pStyles = {};
                /** @type {boolean} */
                this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
                /** @type {boolean} */
                this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
                for (i in this.styles) {
                    if (currencyRegExp.test(this.styles[i][0])) {
                        /** @type {boolean} */
                        this.pStyles[i] = true;
                    }
                    if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                        this.styles[i].reverse();
                    }
                }
                this.startTime = $.now();
                this.finishTime = this.startTime + this.options.duration;
                this.options.onStart.call();
                if (0 === this.options.duration) {
                    this.render(1);
                    this.options.onComplete.call();
                } else {
                    this.loopBind = this.loop.jBind(this);
                    if (!this.options.forceAnimation && $.browser.features.requestAnimationFrame) {
                        this.timer = $.browser.requestAnimationFrame.call(window, this.loopBind);
                    } else {
                        this.timer = this.loopBind.interval(Math.round(1E3 / this.options.fps));
                    }
                }
                return this;
            },
            stopAnimation : function() {
                if (this.timer) {
                    if (!this.options.forceAnimation && $.browser.features.requestAnimationFrame && $.browser.cancelAnimationFrame) {
                        $.browser.cancelAnimationFrame.call(window, this.timer);
                    } else {
                        clearInterval(this.timer);
                    }
                    /** @type {boolean} */
                    this.timer = false;
                }
            },
            stop : function(prop) {
                prop = $.defined(prop) ? prop : false;
                this.stopAnimation();
                if (prop) {
                    this.render(1);
                    this.options.onComplete.jDelay(10);
                }
                return this;
            },
            calc : function(f, n, s) {
                /** @type {number} */
                f = parseFloat(f);
                /** @type {number} */
                n = parseFloat(n);
                return (n - f) * s + f;
            },
            loop : function() {
                var time = $.now();
                /** @type {number} */
                var upDelta = (time - this.startTime) / this.options.duration;
                /** @type {number} */
                var TOTAL_DMA_CYCLES = Math.floor(upDelta);
                if (time >= this.finishTime && TOTAL_DMA_CYCLES >= this.options.cycles) {
                    this.stopAnimation();
                    this.render(1);
                    this.options.onComplete.jDelay(10);
                    return this;
                }
                if (this.alternate && this.cycle < TOTAL_DMA_CYCLES) {
                    var i;
                    for (i in this.styles) {
                        this.styles[i].reverse();
                    }
                }
                /** @type {number} */
                this.cycle = TOTAL_DMA_CYCLES;
                if (!this.options.forceAnimation && $.browser.features.requestAnimationFrame) {
                    this.timer = $.browser.requestAnimationFrame.call(window, this.loopBind);
                }
                this.render((this.continuous ? TOTAL_DMA_CYCLES : 0) + this.easeFn(upDelta % 1));
            },
            render : function(value) {
                var data = {};
                /** @type {number} */
                var expectedRenderable = value;
                var s;
                for (s in this.styles) {
                    if ("opacity" === s) {
                        /** @type {number} */
                        data[s] = Math.round(this.calc(this.styles[s][0], this.styles[s][1], value) * 100) / 100;
                    } else {
                        data[s] = this.calc(this.styles[s][0], this.styles[s][1], value);
                        if (this.pStyles[s]) {
                            data[s] += "%";
                        }
                    }
                }
                this.options.onBeforeRender(data, this.el);
                this.set(data);
                this.options.onAfterRender(data, this.el);
            },
            set : function(val) {
                return this.el.jSetCss(val);
            },
            parseCubicBezier : function(input) {
                var i;
                /** @type {null} */
                var offsets = null;
                if ("string" !== $.jTypeOf(input)) {
                    return null;
                }
                switch(input) {
                    case "linear":
                        offsets = includeScroll([0, 0, 1, 1]);
                        break;
                    case "ease":
                        offsets = includeScroll([.25, .1, .25, 1]);
                        break;
                    case "ease-in":
                        offsets = includeScroll([.42, 0, 1, 1]);
                        break;
                    case "ease-out":
                        offsets = includeScroll([0, 0, .58, 1]);
                        break;
                    case "ease-in-out":
                        offsets = includeScroll([.42, 0, .58, 1]);
                        break;
                    case "easeInSine":
                        offsets = includeScroll([.47, 0, .745, .715]);
                        break;
                    case "easeOutSine":
                        offsets = includeScroll([.39, .575, .565, 1]);
                        break;
                    case "easeInOutSine":
                        offsets = includeScroll([.445, .05, .55, .95]);
                        break;
                    case "easeInQuad":
                        offsets = includeScroll([.55, .085, .68, .53]);
                        break;
                    case "easeOutQuad":
                        offsets = includeScroll([.25, .46, .45, .94]);
                        break;
                    case "easeInOutQuad":
                        offsets = includeScroll([.455, .03, .515, .955]);
                        break;
                    case "easeInCubic":
                        offsets = includeScroll([.55, .055, .675, .19]);
                        break;
                    case "easeOutCubic":
                        offsets = includeScroll([.215, .61, .355, 1]);
                        break;
                    case "easeInOutCubic":
                        offsets = includeScroll([.645, .045, .355, 1]);
                        break;
                    case "easeInQuart":
                        offsets = includeScroll([.895, .03, .685, .22]);
                        break;
                    case "easeOutQuart":
                        offsets = includeScroll([.165, .84, .44, 1]);
                        break;
                    case "easeInOutQuart":
                        offsets = includeScroll([.77, 0, .175, 1]);
                        break;
                    case "easeInQuint":
                        offsets = includeScroll([.755, .05, .855, .06]);
                        break;
                    case "easeOutQuint":
                        offsets = includeScroll([.23, 1, .32, 1]);
                        break;
                    case "easeInOutQuint":
                        offsets = includeScroll([.86, 0, .07, 1]);
                        break;
                    case "easeInExpo":
                        offsets = includeScroll([.95, .05, .795, .035]);
                        break;
                    case "easeOutExpo":
                        offsets = includeScroll([.19, 1, .22, 1]);
                        break;
                    case "easeInOutExpo":
                        offsets = includeScroll([1, 0, 0, 1]);
                        break;
                    case "easeInCirc":
                        offsets = includeScroll([.6, .04, .98, .335]);
                        break;
                    case "easeOutCirc":
                        offsets = includeScroll([.075, .82, .165, 1]);
                        break;
                    case "easeInOutCirc":
                        offsets = includeScroll([.785, .135, .15, .86]);
                        break;
                    case "easeInBack":
                        offsets = includeScroll([.6, -.28, .735, .045]);
                        break;
                    case "easeOutBack":
                        offsets = includeScroll([.175, .885, .32, 1.275]);
                        break;
                    case "easeInOutBack":
                        offsets = includeScroll([.68, -.55, .265, 1.55]);
                        break;
                    default:
                        input = input.replace(/\s/g, "");
                        if (input.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                            offsets = input.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
                            /** @type {number} */
                            i = offsets.length - 1;
                            for (; i >= 0; i--) {
                                /** @type {number} */
                                offsets[i] = parseFloat(offsets[i]);
                            }
                        }
                }
                return includeScroll(offsets);
            },
            cubicBezierAtTime : function(t) {
                /**
                 * @param {!Object} t
                 * @return {?}
                 */
                function sampleCurveX(t) {
                    return ((a * t + b) * t + c) * t;
                }
                /**
                 * @param {?} t
                 * @return {?}
                 */
                function sampleCurveY(t) {
                    return ((ay * t + by) * t + cy) * t;
                }
                /**
                 * @param {number} t
                 * @return {?}
                 */
                function sampleCurveDerivativeX(t) {
                    return (3 * a * t + 2 * b) * t + c;
                }
                /**
                 * @param {number} duration
                 * @return {?}
                 */
                function solveEpsilon(duration) {
                    return 1 / (200 * duration);
                }
                /**
                 * @param {number} x
                 * @param {?} epsilon
                 * @return {?}
                 */
                function solve(x, epsilon) {
                    return sampleCurveY(solveCurveX(x, epsilon));
                }
                /**
                 * @param {number} x
                 * @param {?} epsilon
                 * @return {?}
                 */
                function solveCurveX(x, epsilon) {
                    /**
                     * @param {number} n
                     * @return {?}
                     */
                    function fabs(n) {
                        if (n >= 0) {
                            return n;
                        } else {
                            return 0 - n;
                        }
                    }
                    var t0;
                    var t1;
                    var t2;
                    var x2;
                    var d2;
                    var ad;
                    /** @type {number} */
                    t2 = x;
                    /** @type {number} */
                    ad = 0;
                    for (; ad < 8; ad++) {
                        /** @type {number} */
                        x2 = sampleCurveX(t2) - x;
                        if (fabs(x2) < epsilon) {
                            return t2;
                        }
                        d2 = sampleCurveDerivativeX(t2);
                        if (fabs(d2) < 1E-6) {
                            break;
                        }
                        /** @type {number} */
                        t2 = t2 - x2 / d2;
                    }
                    /** @type {number} */
                    t0 = 0;
                    /** @type {number} */
                    t1 = 1;
                    /** @type {number} */
                    t2 = x;
                    if (t2 < t0) {
                        return t0;
                    }
                    if (t2 > t1) {
                        return t1;
                    }
                    for (; t0 < t1;) {
                        x2 = sampleCurveX(t2);
                        if (fabs(x2 - x) < epsilon) {
                            return t2;
                        }
                        if (x > x2) {
                            t0 = t2;
                        } else {
                            t1 = t2;
                        }
                        t2 = (t1 - t0) * .5 + t0;
                    }
                    return t2;
                }
                /** @type {number} */
                var a = 0;
                /** @type {number} */
                var b = 0;
                /** @type {number} */
                var c = 0;
                /** @type {number} */
                var ay = 0;
                /** @type {number} */
                var by = 0;
                /** @type {number} */
                var cy = 0;
                var duration = this.options.duration;
                /** @type {number} */
                c = 3 * this.cubicBezier[0];
                /** @type {number} */
                b = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - c;
                /** @type {number} */
                a = 1 - c - b;
                /** @type {number} */
                cy = 3 * this.cubicBezier[1];
                /** @type {number} */
                by = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - cy;
                /** @type {number} */
                ay = 1 - cy - by;
                return solve(t, solveEpsilon(duration));
            }
        });
        $.FX.Transition = {
            linear : "linear",
            sineIn : "easeInSine",
            sineOut : "easeOutSine",
            expoIn : "easeInExpo",
            expoOut : "easeOutExpo",
            quadIn : "easeInQuad",
            quadOut : "easeOutQuad",
            cubicIn : "easeInCubic",
            cubicOut : "easeOutCubic",
            backIn : "easeInBack",
            backOut : "easeOutBack",
            elasticIn : function(p, a) {
                a = a || [];
                return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (a[0] || 1) / 3);
            },
            elasticOut : function(a, b) {
                return 1 - $.FX.Transition.elasticIn(1 - a, b);
            },
            bounceIn : function(b) {
                /** @type {number} */
                var i = 0;
                /** @type {number} */
                var s = 1;
                for (; 1; i = i + s, s = s / 2) {
                    if (b >= (7 - 4 * i) / 11) {
                        return s * s - Math.pow((11 - 6 * i - 11 * b) / 4, 2);
                    }
                }
            },
            bounceOut : function(b) {
                return 1 - $.FX.Transition.bounceIn(1 - b);
            },
            none : function(deep) {
                return 0;
            }
        };
    })(jQuery);
    (function($) {
        if (!$) {
            throw "MagicJS not found";
        }
        if ($.PFX) {
            return;
        }
        var doc = $.$;
        $.PFX = new $.Class($.FX, {
            init : function(type, customOptions) {
                /** @type {!Object} */
                this.el_arr = type;
                this.options = $.extend(this.options, customOptions);
                /** @type {boolean} */
                this.timer = false;
                this.$parent.init();
            },
            start : function(value) {
                /** @type {!RegExp} */
                var currencyRegExp = /%$/;
                var i;
                var j;
                var valueLength = value.length;
                /** @type {!Object} */
                this.styles_arr = value;
                /** @type {!Array} */
                this.pStyles_arr = new Array(valueLength);
                /** @type {number} */
                j = 0;
                for (; j < valueLength; j++) {
                    this.pStyles_arr[j] = {};
                    for (i in value[j]) {
                        if (currencyRegExp.test(value[j][i][0])) {
                            /** @type {boolean} */
                            this.pStyles_arr[j][i] = true;
                        }
                        if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                            this.styles_arr[j][i].reverse();
                        }
                    }
                }
                this.$parent.start({});
                return this;
            },
            render : function(e) {
                /** @type {number} */
                var i = 0;
                for (; i < this.el_arr.length; i++) {
                    this.el = $.$(this.el_arr[i]);
                    this.styles = this.styles_arr[i];
                    this.pStyles = this.pStyles_arr[i];
                    this.$parent.render(e);
                }
            }
        });
    })(jQuery);
    (function($) {
        if (!$) {
            throw "MagicJS not found";
            return;
        }
        if ($.Tooltip) {
            return;
        }
        var doc = $.$;
        /**
         * @param {!Object} option
         * @param {?} trigger
         * @return {undefined}
         */
        $.Tooltip = function(option, trigger) {
            var tooltip = this.tooltip = $.$new("div", null, {
                position : "absolute",
                "z-index" : 999
            }).jAddClass("MagicToolboxTooltip");
            $.$(option).jAddEvent("mouseover", function() {
                tooltip.jAppendTo(document.body);
            });
            $.$(option).jAddEvent("mouseout", function() {
                tooltip.jRemove();
            });
            $.$(option).jAddEvent("mousemove", function(component) {
                /**
                 * @param {number} val
                 * @param {number} c
                 * @param {number} v
                 * @return {?}
                 */
                function parsePercent(val, c, v) {
                    return v < (val - c) / 2 ? v : v > (val + c) / 2 ? v - c : (val - c) / 2;
                }
                /** @type {number} */
                var padding = 20;
                var dialogGeometry = $.$(component).jGetPageXY();
                var bcr = tooltip.jGetSize();
                var positionInfo = $.$(window).jGetSize();
                var containerGeometry = $.$(window).jGetScroll();
                tooltip.jSetCss({
                    left : containerGeometry.x + parsePercent(positionInfo.width, bcr.width + 2 * padding, dialogGeometry.x - containerGeometry.x) + padding,
                    top : containerGeometry.y + parsePercent(positionInfo.height, bcr.height + 2 * padding, dialogGeometry.y - containerGeometry.y) + padding
                });
            });
            this.text(trigger);
        };
        /**
         * @param {?} text
         * @return {undefined}
         */
        $.Tooltip.prototype.text = function(text) {
            if (this.tooltip.firstChild) {
                this.tooltip.removeChild(this.tooltip.firstChild);
            }
            this.tooltip.append(document.createTextNode(text));
        };
    })(jQuery);
    (function(self) {
        if (!self) {
            throw "MagicJS not found";
            return;
        }
        if (self.MessageBox) {
            return;
        }
        var $this = self.$;
        /**
         * @param {?} text
         * @param {string} file
         * @param {!Object} context
         * @param {string} token
         * @return {undefined}
         */
        self.Message = function(text, file, context, token) {
            /** @type {null} */
            this.hideTimer = null;
            this.messageBox = self.$new("span", null, {
                position : "absolute",
                "z-index" : 999,
                visibility : "hidden",
                opacity : .8
            }).jAddClass(token || "").jAppendTo(context || document.body);
            this.setMessage(text);
            this.show(file);
        };
        /**
         * @param {string} left
         * @return {undefined}
         */
        self.Message.prototype.show = function(left) {
            this.messageBox.show();
            this.hideTimer = this.hide.jBind(this).jDelay(self.ifndef(left, 5E3));
        };
        /**
         * @param {string} item
         * @return {undefined}
         */
        self.Message.prototype.hide = function(item) {
            clearTimeout(this.hideTimer);
            /** @type {null} */
            this.hideTimer = null;
            if (this.messageBox && !this.hideFX) {
                this.hideFX = (new jQuery.FX(this.messageBox, {
                    duration : self.ifndef(item, 500),
                    onComplete : function() {
                        this.messageBox.kill();
                        delete this.messageBox;
                        /** @type {null} */
                        this.hideFX = null;
                    }.jBind(this)
                })).start({
                    opacity : [this.messageBox.jGetCss("opacity"), 0]
                });
            }
        };
        /**
         * @param {?} text
         * @return {undefined}
         */
        self.Message.prototype.setMessage = function(text) {
            if (this.messageBox.firstChild) {
                this.tooltip.removeChild(this.messageBox.firstChild);
            }
            this.messageBox.append(document.createTextNode(text));
        };
    })(jQuery);
    (function(_) {
        if (!_) {
            throw "MagicJS not found";
        }
        if (_.Options) {
            return;
        }
        var $ = _.$;
        /** @type {null} */
        var text = null;
        var obj = {
            "boolean" : 1,
            array : 2,
            number : 3,
            "function" : 4,
            string : 100
        };
        var options = {
            "boolean" : function(node, v, s) {
                if ("boolean" != _.jTypeOf(v)) {
                    if (s || "string" != _.jTypeOf(v)) {
                        return false;
                    } else {
                        if (!/^(true|false)$/.test(v)) {
                            return false;
                        } else {
                            v = v.jToBool();
                        }
                    }
                }
                if (node.hasOwnProperty("enum") && !$(node["enum"]).contains(v)) {
                    return false;
                }
                /** @type {string} */
                text = v;
                return true;
            },
            string : function(node, name, data) {
                if ("string" !== _.jTypeOf(name)) {
                    return false;
                } else {
                    if (node.hasOwnProperty("enum") && !$(node["enum"]).contains(name)) {
                        return false;
                    } else {
                        /** @type {string} */
                        text = "" + name;
                        return true;
                    }
                }
            },
            number : function(node, value, raw) {
                /** @type {boolean} */
                var T = false;
                /** @type {!RegExp} */
                var trueRE = /%$/;
                /** @type {boolean} */
                var variances = _.jTypeOf(value) == "string" && trueRE.test(value);
                if (raw && !"number" == typeof value) {
                    return false;
                }
                /** @type {number} */
                value = parseFloat(value);
                if (isNaN(value)) {
                    return false;
                }
                if (isNaN(node.minimum)) {
                    /** @type {number} */
                    node.minimum = Number.NEGATIVE_INFINITY;
                }
                if (isNaN(node.maximum)) {
                    /** @type {number} */
                    node.maximum = Number.POSITIVE_INFINITY;
                }
                if (node.hasOwnProperty("enum") && !$(node["enum"]).contains(value)) {
                    return false;
                }
                if (node.minimum > value || value > node.maximum) {
                    return false;
                }
                /** @type {(number|string)} */
                text = variances ? value + "%" : value;
                return true;
            },
            array : function(options, node, cond) {
                if ("string" === _.jTypeOf(node)) {
                    try {
                        node = window.JSON.parse(node);
                    } catch (V) {
                        return false;
                    }
                }
                if (_.jTypeOf(node) === "array") {
                    /** @type {string} */
                    text = node;
                    return true;
                } else {
                    return false;
                }
            },
            "function" : function(name, val, paramName) {
                if (_.jTypeOf(val) === "function") {
                    /** @type {string} */
                    text = val;
                    return true;
                } else {
                    return false;
                }
            }
        };
        /**
         * @param {!Object} context
         * @param {string} data
         * @param {boolean} method
         * @return {?}
         */
        var resolve = function(context, data, method) {
            var a;
            a = context.hasOwnProperty("oneOf") ? context.oneOf : [context];
            if ("array" != _.jTypeOf(a)) {
                return false;
            }
            /** @type {number} */
            var i = 0;
            /** @type {number} */
            var zIncLen = a.length - 1;
            for (; i <= zIncLen; i++) {
                if (options[a[i].type](a[i], data, method)) {
                    return true;
                }
            }
            return false;
        };
        /**
         * @param {!Object} context
         * @return {?}
         */
        var reduce = function(context) {
            var i;
            var idx;
            var X;
            var repeats;
            var pos_info;
            if (context.hasOwnProperty("oneOf")) {
                repeats = context.oneOf.length;
                /** @type {number} */
                i = 0;
                for (; i < repeats; i++) {
                    /** @type {number} */
                    idx = i + 1;
                    for (; idx < repeats; idx++) {
                        if (obj[context.oneOf[i]["type"]] > obj[context.oneOf[idx].type]) {
                            pos_info = context.oneOf[i];
                            context.oneOf[i] = context.oneOf[idx];
                            context.oneOf[idx] = pos_info;
                        }
                    }
                }
            }
            return context;
        };
        /**
         * @param {!Object} context
         * @return {?}
         */
        var validate = function(context) {
            var schema;
            schema = context.hasOwnProperty("oneOf") ? context.oneOf : [context];
            if ("array" != _.jTypeOf(schema)) {
                return false;
            }
            /** @type {number} */
            var field = schema.length - 1;
            for (; field >= 0; field--) {
                if (!schema[field].type || !obj.hasOwnProperty(schema[field].type)) {
                    return false;
                }
                if (_.defined(schema[field]["enum"])) {
                    if ("array" !== _.jTypeOf(schema[field]["enum"])) {
                        return false;
                    }
                    /** @type {number} */
                    var id = schema[field]["enum"].length - 1;
                    for (; id >= 0; id--) {
                        if (!options[schema[field].type]({
                            type : schema[field].type
                        }, schema[field]["enum"][id], true)) {
                            return false;
                        }
                    }
                }
            }
            if (context.hasOwnProperty("default") && !resolve(context, context["default"], true)) {
                return false;
            }
            return true;
        };
        /**
         * @param {!Object} definition
         * @return {undefined}
         */
        var Schema = function(definition) {
            this.schema = {};
            this.options = {};
            this.parseSchema(definition);
        };
        _.extend(Schema.prototype, {
            parseSchema : function(schema) {
                var c;
                var key;
                var W;
                for (c in schema) {
                    if (!schema.hasOwnProperty(c)) {
                        continue;
                    }
                    key = (c + "").jTrim().jCamelize();
                    if (!this.schema.hasOwnProperty(key)) {
                        this.schema[key] = reduce(schema[c]);
                        if (!validate(this.schema[key])) {
                            throw "Incorrect definition of the '" + c + "' parameter in " + schema;
                        }
                        this.options[key] = undefined;
                    }
                }
            },
            set : function(key, value) {
                key = (key + "").jTrim().jCamelize();
                if (_.jTypeOf(value) == "string") {
                    value = value.jTrim();
                }
                if (this.schema.hasOwnProperty(key)) {
                    /** @type {string} */
                    text = value;
                    if (resolve(this.schema[key], value)) {
                        this.options[key] = text;
                    }
                    /** @type {null} */
                    text = null;
                }
            },
            get : function(name) {
                name = (name + "").jTrim().jCamelize();
                if (this.schema.hasOwnProperty(name)) {
                    return _.defined(this.options[name]) ? this.options[name] : this.schema[name]["default"];
                }
            },
            fromJSON : function(data) {
                var hashKey;
                for (hashKey in data) {
                    this.set(hashKey, data[hashKey]);
                }
            },
            getJSON : function() {
                var obj = _.extend({}, this.options);
                var i;
                for (i in obj) {
                    if (undefined === obj[i] && undefined !== this.schema[i]["default"]) {
                        obj[i] = this.schema[i]["default"];
                    }
                }
                return obj;
            },
            fromString : function(encodedAddress) {
                $(encodedAddress.split(";")).jEach($(function(prefixSplit) {
                    prefixSplit = prefixSplit.split(":");
                    this.set(prefixSplit.shift().jTrim(), prefixSplit.join(":"));
                }).jBind(this));
            },
            exists : function(prop) {
                prop = (prop + "").jTrim().jCamelize();
                return this.schema.hasOwnProperty(prop);
            },
            isset : function(name) {
                name = (name + "").jTrim().jCamelize();
                return this.exists(name) && _.defined(this.options[name]);
            },
            jRemove : function(index) {
                index = (index + "").jTrim().jCamelize();
                if (this.exists(index)) {
                    delete this.options[index];
                    delete this.schema[index];
                }
            }
        });
        /** @type {function(!Object): undefined} */
        _.Options = Schema;
    })(jQuery);
    (function(obj) {
        if (!obj) {
            throw "MagicJS not found";
            return;
        }
        var $ = obj.$;
        if (obj.SVGImage) {
            return;
        }
        /** @type {string} */
        var i = "http://www.w3.org/2000/svg";
        /** @type {string} */
        var xlink = "http://www.w3.org/1999/xlink";
        /**
         * @param {!Object} wrapper
         * @return {undefined}
         */
        var f = function(wrapper) {
            this.filters = {};
            this.originalImage = $(wrapper);
            this.canvas = $(document.createElementNS(i, "svg"));
            this.canvas.setAttribute("width", this.originalImage.naturalWidth || this.originalImage.width);
            this.canvas.setAttribute("height", this.originalImage.naturalHeight || this.originalImage.height);
            this.image = $(document.createElementNS(i, "image"));
            this.image.setAttributeNS(xlink, "href", this.originalImage.getAttribute("src"));
            this.image.setAttribute("width", "100%");
            this.image.setAttribute("height", "100%");
            this.image.jAppendTo(this.canvas);
        };
        /**
         * @return {?}
         */
        f.prototype.getNode = function() {
            return this.canvas;
        };
        /**
         * @param {number} val
         * @return {?}
         */
        f.prototype.blur = function(val) {
            if (Math.round(val) < 1) {
                return;
            }
            if (!this.filters.blur) {
                this.filters.blur = $(document.createElementNS(i, "filter"));
                this.filters.blur.setAttribute("id", "filterBlur");
                this.filters.blur.appendChild($(document.createElementNS(i, "feGaussianBlur")).setProps({
                    "in" : "SourceGraphic",
                    stdDeviation : val
                }));
                this.filters.blur.jAppendTo(this.canvas);
                this.image.setAttribute("filter", "url(#filterBlur)");
            } else {
                this.filters.blur.firstChild.setAttribute("stdDeviation", val);
            }
            return this;
        };
        /** @type {function(!Object): undefined} */
        obj.SVGImage = f;
    })(jQuery);
    var __m1 = function($) {
        var attr = $.$;
        /**
         * @param {?} ctx
         * @param {!Object} options
         * @return {undefined}
         */
        var render = function(ctx, options) {
            this.settings = {
                cssPrefix : "magic",
                orientation : "horizontal",
                position : "bottom",
                size : {
                    units : "px",
                    width : "auto",
                    height : "auto"
                },
                sides : ["height", "width"]
            };
            this.parent = ctx;
            /** @type {null} */
            this.root = null;
            /** @type {null} */
            this.wrapper = null;
            /** @type {null} */
            this.context = null;
            this.buttons = {};
            /** @type {!Array} */
            this.items = [];
            /** @type {null} */
            this.selectedItem = null;
            /** @type {null} */
            this.scrollFX = null;
            /** @type {null} */
            this.resizeCallback = null;
            this.settings = $.extend(this.settings, options);
            /** @type {string} */
            this.rootCSS = this.settings.cssPrefix + "-thumbs";
            /** @type {string} */
            this.itemCSS = this.settings.cssPrefix + "-thumb";
            this.setupContent();
        };
        render.prototype = {
            setupContent : function() {
                this.root = $.$new("div").jAddClass(this.rootCSS).jAddClass(this.rootCSS + "-" + this.settings.orientation).jSetCss({
                    visibility : "hidden"
                });
                this.wrapper = $.$new("div").jAddClass(this.rootCSS + "-wrapper").jAppendTo(this.root);
                this.root.jAppendTo(this.parent);
                attr(["prev", "next"]).jEach(function(i) {
                    this.buttons[i] = $.$new("button").jAddClass(this.rootCSS + "-button").jAddClass(this.rootCSS + "-button-" + i).jAppendTo(this.root).jAddEvent("btnclick tap", function(string, selector) {
                        attr(string).events[0].stop().stopQueue();
                        attr(string).stopDistribution();
                        this.scroll(selector);
                    }.jBindAsEvent(this, i));
                }.jBind(this));
                this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                this.context = $.$new("ul").jAddEvent("btnclick tap", function(incoming_item) {
                    incoming_item.stop();
                });
            },
            addItem : function(name) {
                var item = $.$new("li").jAddClass(this.itemCSS).append(name).jAppendTo(this.context);
                new $.ImageLoader(name, {
                    oncomplete : this.reflow.jBind(this)
                });
                this.items.push(item);
                return item;
            },
            selectItem : function(index) {
                var raw = this.selectedItem || this.context.byClass(this.itemCSS + "-selected")[0];
                if (raw) {
                    attr(raw).jRemoveClass(this.itemCSS + "-selected");
                }
                this.selectedItem = attr(index);
                if (!this.selectedItem) {
                    return;
                }
                this.selectedItem.jAddClass(this.itemCSS + "-selected");
                this.scroll(this.selectedItem);
            },
            run : function() {
                if (this.wrapper !== this.context.parentNode) {
                    attr(this.context).jAppendTo(this.wrapper);
                    this.initDrag();
                    attr(window).jAddEvent("resize", this.resizeCallback = this.reflow.jBind(this));
                    this.run.jBind(this).jDelay(1);
                    return;
                }
                var options = this.parent.jGetSize();
                if (options.height > 0 && options.height > options.width) {
                    this.setOrientation("vertical");
                } else {
                    this.setOrientation("horizontal");
                }
                this.reflow();
                this.root.jSetCss({
                    visibility : ""
                });
            },
            stop : function() {
                if (this.resizeCallback) {
                    attr(window).jRemoveEvent("resize", this.resizeCallback);
                }
                this.root.kill();
            },
            scroll : function(obj, model) {
                var position = {
                    x : 0,
                    y : 0
                };
                /** @type {string} */
                var i = "vertical" == this.settings.orientation ? "top" : "left";
                /** @type {string} */
                var ref = "vertical" == this.settings.orientation ? "height" : "width";
                /** @type {string} */
                var x = "vertical" == this.settings.orientation ? "y" : "x";
                var n = this.context.parentNode.jGetSize()[ref];
                var subtractee = this.context.parentNode.jGetPosition();
                var len = this.context.jGetSize()[ref];
                var subtractor;
                var reg2;
                var conf_lang_text;
                var T;
                var O;
                var X;
                var cssPosition;
                /** @type {!Array} */
                var l = [];
                if (this.scrollFX) {
                    this.scrollFX.stop();
                } else {
                    this.context.jSetCss("transition", $.browser.cssTransformProp + String.fromCharCode(32) + "0s");
                }
                if (undefined === model) {
                    /** @type {number} */
                    model = 600;
                }
                subtractor = this.context.jGetPosition();
                if ("string" == $.jTypeOf(obj)) {
                    /** @type {number} */
                    position[x] = "next" == obj ? Math.max(subtractor[i] - subtractee[i] - n, n - len) : Math.min(subtractor[i] - subtractee[i] + n, 0);
                } else {
                    if ("element" == $.jTypeOf(obj)) {
                        reg2 = obj.jGetSize();
                        conf_lang_text = obj.jGetPosition();
                        /** @type {number} */
                        position[x] = Math.min(0, Math.max(n - len, subtractor[i] + n / 2 - conf_lang_text[i] - reg2[ref] / 2));
                    } else {
                        return;
                    }
                }
                if ($.browser.gecko && "android" == $.browser.platform || $.browser.ieMode && $.browser.ieMode < 10) {
                    if ("string" == $.jTypeOf(obj) && position[x] == subtractor[i] - subtractee[i]) {
                        subtractor[i] += 0 === subtractor[i] - subtractee[i] ? 30 : -30;
                    }
                    /** @type {!Array} */
                    position["margin-" + i] = [len <= n ? 0 : subtractor[i] - subtractee[i], position[x]];
                    delete position.x;
                    delete position.y;
                    if (!this.selectorsMoveFX) {
                        this.selectorsMoveFX = new $.PFX([this.context], {
                            duration : 500
                        });
                    }
                    l.push(position);
                    this.selectorsMoveFX.start(l);
                    cssPosition = position["margin-" + i][1];
                } else {
                    this.context.jSetCss({
                        transition : $.browser.cssTransformProp + String.fromCharCode(32) + model + "ms ease",
                        transform : "translate3d(" + position.x + "px, " + position.y + "px, 0)"
                    });
                    cssPosition = position[x];
                }
                if (cssPosition >= 0) {
                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                    /** @type {boolean} */
                    this.buttons.prev.disabled = true;
                } else {
                    this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled");
                    /** @type {boolean} */
                    this.buttons.prev.disabled = false;
                }
                if (cssPosition <= n - len) {
                    this.buttons.next.jAddClass(this.rootCSS + "-button-disabled");
                    /** @type {boolean} */
                    this.buttons.next.disabled = true;
                } else {
                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled");
                    /** @type {boolean} */
                    this.buttons.next.disabled = false;
                }
                /** @type {null} */
                cssPosition = null;
            },
            initDrag : function() {
                var x;
                var O;
                var editorContentNewHeight;
                var c;
                var event;
                var y;
                var CheckChange;
                var sX;
                var Y0;
                var Y;
                var toolbarHeight;
                var editorWithToolbarHeight;
                var method;
                var result = {
                    x : 0,
                    y : 0
                };
                var val;
                var dimType;
                /** @type {number} */
                var S = 300;
                /**
                 * @param {number} n
                 * @return {?}
                 */
                var f = function(n) {
                    var direction;
                    /** @type {number} */
                    var i = 0;
                    /** @type {number} */
                    direction = 1.5;
                    for (; direction <= 90; direction = direction + 1.5) {
                        /** @type {number} */
                        i = i + n * Math.cos(direction / Math.PI / 2);
                    }
                    if (c < 0) {
                        /** @type {number} */
                        i = i * -1;
                    }
                    return i;
                };
                event = attr(function(e) {
                    result = {
                        x : 0,
                        y : 0
                    };
                    /** @type {string} */
                    val = "vertical" == this.settings.orientation ? "top" : "left";
                    /** @type {string} */
                    dimType = "vertical" == this.settings.orientation ? "height" : "width";
                    /** @type {string} */
                    x = "vertical" == this.settings.orientation ? "y" : "x";
                    editorWithToolbarHeight = this.context.parentNode.jGetSize()[dimType];
                    toolbarHeight = this.context.jGetSize()[dimType];
                    /** @type {number} */
                    editorContentNewHeight = editorWithToolbarHeight - toolbarHeight;
                    if (editorContentNewHeight >= 0) {
                        return;
                    }
                    if (e.state == "dragstart") {
                        if (undefined === method) {
                            /** @type {number} */
                            method = 0;
                        }
                        this.context.jSetCssProp("transition", $.browser.cssTransformProp + String.fromCharCode(32) + "0ms");
                        y = e[x];
                        Y0 = e.y;
                        sX = e.x;
                        /** @type {boolean} */
                        Y = false;
                    } else {
                        if ("dragend" == e.state) {
                            if (Y) {
                                return;
                            }
                            CheckChange = f(Math.abs(c));
                            method = method + CheckChange;
                            if (method <= editorContentNewHeight) {
                                /** @type {number} */
                                method = editorContentNewHeight;
                            }
                            if (method >= 0) {
                                /** @type {number} */
                                method = 0;
                            }
                            result[x] = method;
                            this.context.jSetCssProp("transition", $.browser.cssTransformProp + String.fromCharCode(32) + S + "ms  cubic-bezier(.0, .0, .0, 1)");
                            this.context.jSetCssProp("transform", "translate3d(" + result.x + "px, " + result.y + "px, 0px)");
                            /** @type {number} */
                            c = 0;
                        } else {
                            if (Y) {
                                return;
                            }
                            if ("horizontal" == this.settings.orientation && Math.abs(e.x - sX) > Math.abs(e.y - Y0) || "vertical" == this.settings.orientation && Math.abs(e.x - sX) < Math.abs(e.y - Y0)) {
                                e.stop();
                                /** @type {number} */
                                c = e[x] - y;
                                method = method + c;
                                result[x] = method;
                                this.context.jSetCssProp("transform", "translate3d(" + result.x + "px, " + result.y + "px, 0px)");
                                if (method >= 0) {
                                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                                } else {
                                    this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled");
                                }
                                if (method <= editorContentNewHeight) {
                                    this.buttons.next.jAddClass(this.rootCSS + "-button-disabled");
                                } else {
                                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled");
                                }
                            } else {
                                /** @type {boolean} */
                                Y = true;
                            }
                        }
                        y = e[x];
                    }
                }).jBind(this);
                this.context.jAddEvent("touchdrag", event);
            },
            reflow : function() {
                var dimType;
                var firstColLeft;
                var scrollLeft;
                var options = this.parent.jGetSize();
                if (options.height > 0 && options.height > options.width) {
                    this.setOrientation("vertical");
                } else {
                    this.setOrientation("horizontal");
                }
                /** @type {string} */
                dimType = "vertical" == this.settings.orientation ? "height" : "width";
                firstColLeft = this.context.jGetSize()[dimType];
                scrollLeft = this.root.jGetSize()[dimType];
                if (firstColLeft <= scrollLeft) {
                    this.root.jAddClass("no-buttons");
                    this.context.jSetCssProp("transition", "").jGetSize();
                    this.context.jSetCssProp("transform", "translate3d(0,0,0)");
                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled");
                } else {
                    this.root.jRemoveClass("no-buttons");
                }
                if (this.selectedItem) {
                    this.scroll(this.selectedItem, 0);
                }
            },
            setOrientation : function(value) {
                if ("vertical" !== value && "horizontal" !== value || value == this.settings.orientation) {
                    return;
                }
                this.root.jRemoveClass(this.rootCSS + "-" + this.settings.orientation);
                /** @type {string} */
                this.settings.orientation = value;
                this.root.jAddClass(this.rootCSS + "-" + this.settings.orientation);
                this.context.jSetCssProp("transition", "none").jGetSize();
                this.context.jSetCssProp("transform", "").jSetCssProp("margin", "");
            }
        };
        return render;
    }(jQuery);
    var callback = $.$;
    if (typeof Object.assign !== "function") {
        /**
         * @param {!Object} target
         * @param {...(Object|null)} p1
         * @return {!Object}
         */
        Object.assign = function(target) {
            if (target == null) {
                throw new TypeError("Cannot convert undefined or null to object");
            }
            /** @type {!Object} */
            target = Object(target);
            /** @type {number} */
            var i = 1;
            for (; i < arguments.length; i++) {
                var source = arguments[i];
                if (source != null) {
                    var prop;
                    for (prop in source) {
                        if (Object.prototype.hasOwnProperty.call(source, prop)) {
                            target[prop] = source[prop];
                        }
                    }
                }
            }
            return target;
        };
    }
    if (!$.browser.cssTransform) {
        $.browser.cssTransform = $.normalizeCSS("transform").dashize();
    }
    var options = {
        zoomOn : {
            type : "string",
            "enum" : ["click", "hover"],
            "default" : "hover"
        },
        zoomMode : {
            oneOf : [{
                type : "string",
                "enum" : ["zoom", "magnifier", "preview", "off"],
                "default" : "zoom"
            }, {
                type : "boolean",
                "enum" : [false]
            }],
            "default" : "zoom"
        },
        zoomWidth : {
            oneOf : [{
                type : "string",
                "enum" : ["auto"]
            }, {
                type : "number",
                minimum : 1
            }],
            "default" : "auto"
        },
        zoomHeight : {
            oneOf : [{
                type : "string",
                "enum" : ["auto"]
            }, {
                type : "number",
                minimum : 1
            }],
            "default" : "auto"
        },
        zoomPosition : {
            type : "string",
            "default" : "right"
        },
        zoomDistance : {
            type : "number",
            minimum : 0,
            "default" : 15
        },
        zoomCaption : {
            oneOf : [{
                type : "string",
                "enum" : ["bottom", "top", "off"],
                "default" : "off"
            }, {
                type : "boolean",
                "enum" : [false]
            }],
            "default" : "off"
        },
        expand : {
            oneOf : [{
                type : "string",
                "enum" : ["window", "fullscreen", "off"]
            }, {
                type : "boolean",
                "enum" : [false]
            }],
            "default" : "window"
        },
        expandZoomMode : {
            oneOf : [{
                type : "string",
                "enum" : ["zoom", "magnifier", "off"],
                "default" : "zoom"
            }, {
                type : "boolean",
                "enum" : [false]
            }],
            "default" : "zoom"
        },
        expandZoomOn : {
            type : "string",
            "enum" : ["click", "always"],
            "default" : "click"
        },
        expandCaption : {
            type : "boolean",
            "default" : true
        },
        closeOnClickOutside : {
            type : "boolean",
            "default" : true
        },
        history : {
            type : "boolean",
            "default" : true
        },
        hint : {
            oneOf : [{
                type : "string",
                "enum" : ["once", "always", "off"]
            }, {
                type : "boolean",
                "enum" : [false]
            }],
            "default" : "once"
        },
        smoothing : {
            type : "boolean",
            "default" : true
        },
        upscale : {
            type : "boolean",
            "default" : true
        },
        variableZoom : {
            type : "boolean",
            "default" : false
        },
        lazyZoom : {
            type : "boolean",
            "default" : false
        },
        autostart : {
            type : "boolean",
            "default" : true
        },
        rightClick : {
            type : "boolean",
            "default" : false
        },
        transitionEffect : {
            type : "boolean",
            "default" : true
        },
        selectorTrigger : {
            type : "string",
            "enum" : ["click", "hover"],
            "default" : "click"
        },
        cssClass : {
            type : "string"
        },
        forceTouch : {
            type : "boolean",
            "default" : false
        },
        textHoverZoomHint : {
            type : "string",
            "default" : "Hover to zoom"
        },
        textClickZoomHint : {
            type : "string",
            "default" : "Click to zoom"
        },
        textBtnNext : {
            type : "string",
            "default" : "Next"
        },
        textBtnPrev : {
            type : "string",
            "default" : "Previous"
        },
        textBtnClose : {
            type : "string",
            "default" : "Close"
        },
        textExpandHint : {
            type : "string",
            "default" : "Click to expand"
        }
    };
    var element = {
        zoomMode : {
            oneOf : [{
                type : "string",
                "enum" : ["zoom", "magnifier", "off"],
                "default" : "zoom"
            }, {
                type : "boolean",
                "enum" : [false]
            }],
            "default" : "zoom"
        },
        expandZoomOn : {
            type : "string",
            "enum" : ["click", "always"],
            "default" : "click"
        },
        textExpandHint : {
            type : "string",
            "default" : "Tap or pinch to expand"
        },
        textHoverZoomHint : {
            type : "string",
            "default" : "Touch to zoom"
        },
        textClickZoomHint : {
            type : "string",
            "default" : "Double tap or pinch to zoom"
        }
    };
    /** @type {string} */
    var a = "MagicZoom";
    /** @type {string} */
    var name = "mz";
    /** @type {number} */
    var id = 20;
    /** @type {!Array} */
    var names = ["onZoomReady", "onUpdate", "onZoomIn", "onZoomOut", "onExpandOpen", "onExpandClose"];
    /** @type {number} */
    var w = 600;
    /** @type {number} */
    var midpoint = 1.1;
    /** @type {number} */
    var outwardsMinScaleToTranslate = .5;
    var self;
    var containers = {};
    var result = callback([]);
    var parent;
    /** @type {number} */
    var f = window.devicePixelRatio || 1;
    var isShortcut;
    /** @type {boolean} */
    var l = true;
    /** @type {string} */
    var img_dim = $.browser.features.perspective ? "translate3d(" : "translate(";
    /** @type {string} */
    var trnClose = $.browser.features.perspective ? ",0)" : ")";
    /** @type {null} */
    var logIntervalId = null;
    var playerObserver;
    var match = function() {
        var L;
        var root;
        var N;
        var M;
        var out;
        /** @type {!HTMLDocument} */
        root = document;
        /** @type {!Location} */
        root = root.location;
        /** @type {string} */
        root = root.host;
        if (root.indexOf(transform("coigmzaablav mac")) == -1 && root.indexOf(transform("coigmzk}zg`i mac")) == -1) {
            /** @type {!Array} */
            out = ["2o.f|kh3,fzz~4!!yyy coigmzaablav mac!coigmtaac~b{}!,.a`mbgme3,zfg} lb{|&'5,.zo|ikz3,Qlbo`e,.}zwbk3,maba|4.g`fk|gz5.zkvz#jkma|ozga`4.`a`k5,0Coigm.Taac.^b{}(z|ojk5.z|gob.xk|}ga`2!o0", "#ff0000", 11, "normal", "", "center", "100%"];
        }
        return out;
    }();
    /**
     * @return {?}
     */
    var i = function() {
        return "mgctlbxN$MZ" + "p".toUpperCase() + " mgctlbxV$" + "v5.3.2".replace("v", "") + " mgctlbxL$" + "m".toUpperCase() + (window.mgctlbx$Pltm && $.jTypeOf(window.mgctlbx$Pltm) === "string" ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "");
    };
    /**
     * @param {!Object} url
     * @param {number} src
     * @param {string} method
     * @param {!Object} options
     * @param {!Function} from
     * @return {undefined}
     */
    var load = function(url, src, method, options, from) {
        this.small = {
            src : null,
            url : null,
            dppx : 1,
            node : null,
            state : 0,
            size : {
                width : 0,
                height : 0
            },
            loaded : false
        };
        this.zoom = {
            src : null,
            url : null,
            dppx : 1,
            node : null,
            state : 0,
            size : {
                width : 0,
                height : 0
            },
            loaded : false
        };
        if ($.jTypeOf(url) === "object") {
            /** @type {!Object} */
            this.small = url;
        } else {
            if ($.jTypeOf(url) === "string") {
                this.small.url = $.getAbsoluteURL(url);
            }
        }
        if ($.jTypeOf(src) === "object") {
            /** @type {number} */
            this.zoom = src;
        } else {
            if ($.jTypeOf(src) === "string") {
                this.zoom.url = $.getAbsoluteURL(src);
            }
        }
        /** @type {string} */
        this.caption = method;
        /** @type {!Object} */
        this.options = options;
        /** @type {!Function} */
        this.origin = from;
        /** @type {null} */
        this.callback = null;
        /** @type {null} */
        this.link = null;
        /** @type {null} */
        this.node = null;
    };
    load.prototype = {
        parseNode : function(element, options, file) {
            var data = element.byTag("img")[0];
            if (file) {
                this.small.node = data || $.$new("img").jAppendTo(element);
            }
            if (f > 1) {
                this.small.url = element.getAttribute("data-image-2x");
                if (this.small.url) {
                    /** @type {number} */
                    this.small.dppx = 2;
                }
                this.zoom.url = element.getAttribute("data-zoom-image-2x");
                if (this.zoom.url) {
                    /** @type {number} */
                    this.zoom.dppx = 2;
                }
            }
            this.small.src = element.getAttribute("data-image") || element.getAttribute("rev") || (data ? data.currentSrc || data.getAttribute("src") : null);
            if (this.small.src) {
                this.small.src = $.getAbsoluteURL(this.small.src);
            }
            this.small.url = this.small.url || this.small.src;
            if (this.small.url) {
                this.small.url = $.getAbsoluteURL(this.small.url);
            }
            this.zoom.src = element.getAttribute("data-zoom-image") || element.getAttribute("href");
            if (this.zoom.src) {
                this.zoom.src = $.getAbsoluteURL(this.zoom.src);
            }
            this.zoom.url = this.zoom.url || this.zoom.src;
            if (this.zoom.url) {
                this.zoom.url = $.getAbsoluteURL(this.zoom.url);
            }
            this.caption = element.getAttribute("data-caption") || element.getAttribute("title") || options;
            this.link = element.getAttribute("data-link");
            /** @type {!Object} */
            this.origin = element;
            return this;
        },
        loadImg : function(name) {
            /** @type {null} */
            var data = null;
            if (arguments.length > 1 && $.jTypeOf(arguments[1]) === "function") {
                data = arguments[1];
            }
            if (this[name].state !== 0) {
                if (this[name].loaded) {
                    this.onload(data);
                }
                return;
            }
            if (this[name].url && this[name].node && !this[name].node.getAttribute("src") && !this[name].node.getAttribute("srcset")) {
                this[name].node.setAttribute("src", this[name].url);
            }
            /** @type {number} */
            this[name].state = 1;
            new $.ImageLoader(this[name].node || this[name].url, {
                oncomplete : callback(function(that) {
                    /** @type {boolean} */
                    this[name].loaded = true;
                    /** @type {number} */
                    this[name].state = that.ready ? 2 : -1;
                    if (that.ready) {
                        if (this[name].size.width === 0 && this[name].size.height === 0) {
                            this[name].size = that.jGetSize();
                        }
                        if (!this[name].node) {
                            this[name].node = callback(that.img);
                            this[name].node.getAttribute("style");
                            this[name].node.removeAttribute("style");
                            this[name].size.width /= this[name].dppx;
                            this[name].size.height /= this[name].dppx;
                        } else {
                            this[name].node.jSetCss({
                                maxWidth : this[name].size.width,
                                maxHeight : this[name].size.height
                            });
                            if (this[name].node.currentSrc && this[name].node.currentSrc !== this[name].node.src) {
                                this[name].url = this[name].node.currentSrc;
                            } else {
                                if ($.getAbsoluteURL(this[name].node.getAttribute("src") || "") !== this[name].url) {
                                    this[name].node.setAttribute("src", this[name].url);
                                }
                            }
                        }
                    }
                    this.onload(data);
                }).jBind(this)
            });
        },
        loadSmall : function() {
            this.loadImg("small", arguments[0]);
        },
        loadZoom : function() {
            this.loadImg("zoom", arguments[0]);
        },
        load : function() {
            /** @type {null} */
            this.callback = null;
            if (arguments.length > 0 && $.jTypeOf(arguments[0]) === "function") {
                this.callback = arguments[0];
            }
            this.loadSmall();
            this.loadZoom();
        },
        onload : function(_data) {
            if (_data) {
                _data.call(null, this);
            }
            if (this.callback && this.small.loaded && this.zoom.loaded) {
                this.callback.call(null, this);
                /** @type {null} */
                this.callback = null;
                return;
            }
        },
        loaded : function() {
            return this.small.loaded && this.zoom.loaded;
        },
        ready : function() {
            return this.small.state === 2 && this.zoom.state === 2;
        },
        getURL : function(type) {
            /** @type {string} */
            var i = type === "small" ? "zoom" : "small";
            if (!this[type].loaded || this[type].loaded && this[type].state === 2) {
                return this[type].url;
            } else {
                if (!this[i].loaded || this[i].loaded && this[i].state === 2) {
                    return this[i].url;
                }
            }
            return null;
        },
        getNode : function(name) {
            /** @type {string} */
            var i = name === "small" ? "zoom" : "small";
            if (!this[name].loaded || this[name].loaded && this[name].state === 2) {
                return this[name].node;
            } else {
                if (!this[i].loaded || this[i].loaded && this[i].state === 2) {
                    return this[i].node;
                }
            }
            return null;
        },
        jGetSize : function(name) {
            /** @type {string} */
            var i = name === "small" ? "zoom" : "small";
            if (!this[name].loaded || this[name].loaded && this[name].state === 2) {
                return this[name].size;
            } else {
                if (!this[i].loaded || this[i].loaded && this[i].state === 2) {
                    return this[i].size;
                }
            }
            return {
                width : 0,
                height : 0
            };
        },
        setSize : function(size, offset) {
            /** @type {number} */
            this[size].size = offset;
        },
        getRatio : function(value) {
            /** @type {string} */
            var i = value === "small" ? "zoom" : "small";
            if (!this[value].loaded || this[value].loaded && this[value].state === 2) {
                return this[value].dppx;
            } else {
                if (!this[i].loaded || this[i].loaded && this[i].state === 2) {
                    return this[i].dppx;
                }
            }
            return 1;
        },
        setCurNode : function(name) {
            this.node = this.getNode(name);
        }
    };
    /**
     * @param {!Object} theme
     * @param {undefined} type
     * @return {undefined}
     */
    var init = function(theme, type) {
        this.options = new $.Options(options);
        this.option = callback(function() {
            if (arguments.length > 1) {
                return this.set(arguments[0], arguments[1]);
            }
            return this.get(arguments[0]);
        }).jBind(this.options);
        this.touchOptions = new $.Options(element);
        /** @type {!Array} */
        this.additionalImages = [];
        /** @type {null} */
        this.image = null;
        /** @type {null} */
        this.primaryImage = null;
        this.placeholder = callback(theme).jAddEvent("dragstart selectstart click", function(incoming_item) {
            incoming_item.stop();
        });
        /** @type {null} */
        this.id = null;
        /** @type {null} */
        this.node = null;
        /** @type {null} */
        this.stubNode = null;
        /** @type {null} */
        this.originalImg = null;
        /** @type {null} */
        this.originalImgSrc = null;
        /** @type {null} */
        this.originalTitle = null;
        this.normalSize = {
            width : 0,
            height : 0
        };
        this.size = {
            width : 0,
            height : 0
        };
        this.zoomSize = {
            width : 0,
            height : 0
        };
        this.zoomSizeOrigin = {
            width : 0,
            height : 0
        };
        this.boundaries = {
            top : 0,
            left : 0,
            bottom : 0,
            right : 0
        };
        /** @type {boolean} */
        this.ready = false;
        /** @type {boolean} */
        this.expanded = false;
        /** @type {null} */
        this.activateTimer = null;
        /** @type {null} */
        this.resizeTimer = null;
        this.resizeCallback = callback(function() {
            if (this.expanded) {
                if (playerObserver) {
                    this.expandBox.jSetCss({
                        height : window.innerHeight,
                        top : Math.abs(playerObserver.getBoundingClientRect().top)
                    });
                }
                this.image.node.jSetCss({
                    "max-height" : Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
                });
                this.image.node.jSetCss({
                    "max-width" : Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
                });
            }
            this.reflowZoom(arguments[0]);
        }).jBind(this);
        this.onResize = callback(function(event) {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = callback(this.resizeCallback).jDelay(10, event.type === "scroll");
        }).jBindAsEvent(this);
        this.onHistoryStateChange = callback(function(rec) {
            if (!rec.state && this.expanded) {
                this.close();
            }
            if (rec.state && rec.state.mzId === this.id && !this.expanded) {
                this.expand();
            }
        }).jBindAsEvent(this);
        if (i) {
            parent.append($.$new("div", {}, {
                display : "none",
                visibility : "hidden"
            }).append(document.createTextNode(i)));
            i = undefined;
        }
        /** @type {null} */
        this.lens = null;
        /** @type {null} */
        this.zoomBox = null;
        /** @type {null} */
        this.hint = null;
        /** @type {null} */
        this.hintMessage = null;
        /** @type {number} */
        this.hintRuns = 0;
        /** @type {boolean} */
        this.mobileZoomHint = true;
        /** @type {null} */
        this.loadingBox = null;
        /** @type {null} */
        this.loadTimer = null;
        /** @type {null} */
        this.thumb = null;
        /** @type {null} */
        this.expandBox = null;
        /** @type {null} */
        this.expandBg = null;
        /** @type {null} */
        this.expandCaption = null;
        /** @type {null} */
        this.expandStage = null;
        /** @type {null} */
        this.expandImageStage = null;
        /** @type {null} */
        this.expandFigure = null;
        /** @type {null} */
        this.navControlsLayer = null;
        /** @type {null} */
        this.expandNav = null;
        /** @type {null} */
        this.expandThumbs = null;
        /** @type {!Array} */
        this.expandGallery = [];
        this.buttons = {};
        /** @type {number} */
        this.startAttempts = 0;
        /** @type {null} */
        this.startTimer = null;
        this.start(type);
    };
    init.prototype = {
        loadOptions : function(value) {
            this.options.fromJSON(window[name + "Options"] || {});
            this.options.fromString(this.placeholder.getAttribute("data-options") || "");
            if (!$.browser.touchScreen) {
                this.option("forceTouch", false);
            }
            if ($.browser.mobile || this.option("forceTouch")) {
                this.options.fromJSON(this.touchOptions.getJSON());
                this.options.fromJSON(window[name + "MobileOptions"] || {});
                this.options.fromString(this.placeholder.getAttribute("data-mobile-options") || "");
            }
            if ($.jTypeOf(value) === "string") {
                this.options.fromString(value || "");
            } else {
                this.options.fromJSON(value || {});
            }
            if (this.option("cssClass")) {
                this.option("cssClass", this.option("cssClass").replace(",", " "));
            }
            if (this.option("zoomCaption") === false) {
                this.option("zoomCaption", "off");
            }
            if (this.option("hint") === false) {
                this.option("hint", "off");
            }
            switch(this.option("hint")) {
                case "off":
                    /** @type {number} */
                    this.hintRuns = 0;
                    break;
                case "always":
                    /** @type {number} */
                    this.hintRuns = Infinity;
                    break;
                case "once":
                default:
                    /** @type {number} */
                    this.hintRuns = 2;
                    break;
            }
            if (this.option("zoomMode") === "off") {
                this.option("zoomMode", false);
            }
            if (this.option("expand") === "off") {
                this.option("expand", false);
            }
            if (this.option("expandZoomMode") === "off") {
                this.option("expandZoomMode", false);
            }
            if ($.browser.mobile && this.option("zoomMode") === "zoom" && this.option("zoomPosition") === "inner") {
                if (this.option("expand")) {
                    this.option("zoomMode", false);
                } else {
                    this.option("zoomOn", "click");
                }
            }
        },
        start : function(key) {
            var parts;
            var self = this;
            var element;
            if (this.startAttempts < 1) {
                this.loadOptions(key);
                if (l && !this.option("autostart")) {
                    return;
                }
                this.originalImg = this.placeholder.querySelector("img");
                this.originalImgSrc = this.originalImg ? this.originalImg.getAttribute("src") : null;
                this.originalTitle = callback(this.placeholder).getAttribute("title");
                callback(this.placeholder).removeAttribute("title");
                if (this.originalImg && this.originalImg.parentNode.tagName === "PICTURE") {
                    /** @type {null} */
                    this.originalImgSrc = null;
                    var item = $.$new("div").jAddClass("magic-temporary-img").jAppendTo(document.body);
                    var P = this.originalImg.parentNode.cloneNode(true);
                    P.getAttribute("style");
                    P.removeAttribute("style");
                    var imageIcon = P.querySelector("img");
                    imageIcon.getAttribute("style");
                    imageIcon.removeAttribute("style");
                    callback(imageIcon).jAddEvent("load", function() {
                        self.size = callback(imageIcon).jGetSize();
                        item.kill();
                        var start_elm = self.originalImg.cloneNode(false);
                        callback(start_elm).jSetCss({
                            maxWidth : self.size.width,
                            maxHeight : self.size.height
                        }).setAttribute("src", self.originalImg.currentSrc || self.originalImg.src);
                        self.originalImg = self.placeholder.replaceChild(start_elm, self.originalImg.parentNode);
                        self.start();
                    });
                    item.append(P);
                    ++this.startAttempts;
                    return;
                }
            }
            element = (new load).parseNode(this.placeholder, this.originalTitle, true);
            element.setSize("small", this.size);
            if (!element.small.url) {
                if (++this.startAttempts <= w) {
                    /** @type {number} */
                    this.startTimer = setTimeout(function() {
                        self.start();
                    }, 100);
                }
                return;
            }
            this.primaryImage = element;
            this.image = this.primaryImage;
            render(this.placeholder);
            this.id = this.placeholder.getAttribute("id") || "mz-" + Math.floor(Math.random() * $.now());
            this.placeholder.setAttribute("id", this.id);
            this.node = $.$new("figure").jAddClass("mz-figure");
            this.node.enclose(this.image.small.node).jAddClass(this.option("cssClass"));
            if (this.option("rightClick") !== true) {
                this.node.jAddEvent("contextmenu", function(incoming_item) {
                    incoming_item.stop();
                    return false;
                });
            }
            this.node.jAddClass("mz-" + this.option("zoomOn") + "-zoom");
            if (!this.option("expand")) {
                this.node.jAddClass("mz-no-expand");
            }
            this.lens = {
                node : $.$new("div", {
                    "class" : "mz-lens"
                }, {
                    top : 0
                }).jAppendTo(this.node),
                image : $.$new("img", {
                    src : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position : "absolute",
                    top : 0,
                    left : 0
                }),
                width : 0,
                height : 0,
                pos : {
                    x : 0,
                    y : 0
                },
                spos : {
                    x : 0,
                    y : 0
                },
                size : {
                    width : 0,
                    height : 0
                },
                border : {
                    x : 0,
                    y : 0
                },
                dx : 0,
                dy : 0,
                innertouch : false,
                hide : function() {
                    if ($.browser.features.transform) {
                        this.node.jSetCss({
                            transform : "translate(-10000px, -10000px)"
                        });
                    } else {
                        this.node.jSetCss({
                            top : -1E4
                        });
                    }
                }
            };
            this.lens.hide();
            this.lens.node.append(this.lens.image);
            this.zoomBox = {
                node : $.$new("div", {
                    "class" : "mz-zoom-window"
                }, {
                    top : -1E5
                }).jAddClass(this.option("cssClass")).jAppendTo(parent),
                image : $.$new("img", {
                    src : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position : "absolute"
                }),
                aspectRatio : 0,
                width : 0,
                height : 0,
                innerWidth : 0,
                innerHeight : 0,
                size : {
                    width : "auto",
                    wunits : "px",
                    height : "auto",
                    hunits : "px"
                },
                mode : this.option("zoomMode"),
                position : this.option("zoomPosition"),
                trigger : this.option("zoomOn"),
                custom : false,
                active : false,
                activating : false,
                enabled : false,
                enable : callback(function() {
                    /** @type {boolean} */
                    this.zoomBox.enabled = arguments[0] !== false;
                    this.node[this.zoomBox.enabled ? "jRemoveClass" : "jAddClass"]("mz-no-zoom");
                }).jBind(this),
                hide : callback(function() {
                    var crr = callback(this.node).jFetch("cr");
                    this.zoomBox.node.jRemoveEvent("transitionend");
                    this.zoomBox.node.jSetCss({
                        top : -1E5
                    }).jAppendTo(parent);
                    this.zoomBox.node.jRemoveClass("mz-deactivating mz-p-" + (this.zoomBox.mode === "zoom" ? this.zoomBox.position : this.zoomBox.mode));
                    if (!this.expanded && crr) {
                        crr.jRemove();
                    }
                    this.zoomBox.image.getAttribute("style");
                    this.zoomBox.image.removeAttribute("style");
                }).jBind(this),
                setMode : callback(function(mode) {
                    this.node[mode === false ? "jAddClass" : "jRemoveClass"]("mz-no-zoom");
                    this.node[mode === "magnifier" ? "jAddClass" : "jRemoveClass"]("mz-magnifier-zoom");
                    this.zoomBox.node[mode === "magnifier" ? "jAddClass" : "jRemoveClass"]("mz-magnifier");
                    this.zoomBox.node[mode === "preview" ? "jAddClass" : "jRemoveClass"]("mz-preview");
                    if (mode !== "zoom") {
                        this.node.jRemoveClass("mz-inner-zoom");
                        this.zoomBox.node.jRemoveClass("mz-inner");
                    }
                    /** @type {string} */
                    this.zoomBox.mode = mode;
                    if (mode === false) {
                        this.zoomBox.enable(false);
                    }
                }).jBind(this)
            };
            this.zoomBox.node.append(this.zoomBox.image);
            this.zoomBox.setMode(this.option("zoomMode"));
            this.zoomBox.image.removeAttribute("width");
            this.zoomBox.image.removeAttribute("height");
            if (typeof match !== "undefined") {
                /** @type {number} */
                var presentationExt = Math.floor(Math.random() * $.now());
                callback(this.node).jStore("cr", $.$new((Math.floor(Math.random() * 101) + 1) % 2 ? "span" : "div").setProps({
                    id : "crMz" + presentationExt
                }).jSetCss({
                    display : "inline",
                    overflow : "hidden",
                    visibility : "visible",
                    color : match[1],
                    fontSize : match[2],
                    fontWeight : match[3],
                    fontFamily : "sans-serif",
                    position : "absolute",
                    top : 8,
                    left : 8,
                    margin : "auto",
                    width : "auto",
                    textAlign : "right",
                    lineHeight : "2em",
                    zIndex : 2147483647
                }).changeContent(transform(match[0])));
                if (callback(callback(this.node).jFetch("cr")).byTag("a")[0]) {
                    callback(callback(callback(this.node).jFetch("cr")).byTag("a")[0]).jAddEvent("tap btnclick", function(canCreateDiscussions) {
                        canCreateDiscussions.stopDistribution();
                        window.open(this.href);
                    }).setProps({
                        id : "mzCrA" + presentationExt
                    });
                }
                $.addCSS("#" + this.id + " > figure.mz-figure > #" + ("crMz" + presentationExt) + ",#" + this.id + " > figure.mz-figure > #" + ("crMz" + presentationExt) + " > #" + ("mzCrA" + presentationExt) + ",html body .mz-expand > #" + ("crMz" + presentationExt) + ",html body .mz-expand > #" + ("crMz" + presentationExt) + " > #" + ("mzCrA" + presentationExt), {
                    display : "inline !important;",
                    visibility : "visible !important;",
                    color : match[1] + " !important;",
                    "font-size" : match[2] + "px !important;",
                    "z-index" : "2147483647 !important;"
                }, "mz-runtime-css", true);
            }
            if (parts = ("" + this.option("zoomWidth")).match(/^([0-9]+)?(px|%)?$/)) {
                this.zoomBox.size.wunits = parts[2] || "px";
                /** @type {(number|string)} */
                this.zoomBox.size.width = parseFloat(parts[1]) || "auto";
            }
            if (parts = ("" + this.option("zoomHeight")).match(/^([0-9]+)?(px|%)?$/)) {
                this.zoomBox.size.hunits = parts[2] || "px";
                /** @type {(number|string)} */
                this.zoomBox.size.height = parseFloat(parts[1]) || "auto";
            }
            if (this.zoomBox.mode === "magnifier") {
                this.node.jAddClass("mz-magnifier-zoom");
                this.zoomBox.node.jAddClass("mz-magnifier");
                if (this.zoomBox.size.width === "auto") {
                    /** @type {string} */
                    this.zoomBox.size.wunits = "%";
                    /** @type {number} */
                    this.zoomBox.size.width = 70;
                }
                if (this.zoomBox.size.height === "auto") {
                    /** @type {string} */
                    this.zoomBox.size.hunits = "%";
                }
            } else {
                if (this.option("zoom-position").match(/^#/)) {
                    if (this.zoomBox.custom = callback(this.option("zoom-position").replace(/^#/, ""))) {
                        if (callback(this.zoomBox.custom).jGetSize().height > 50) {
                            if (this.zoomBox.size.width === "auto") {
                                /** @type {string} */
                                this.zoomBox.size.wunits = "%";
                                /** @type {number} */
                                this.zoomBox.size.width = 100;
                            }
                            if (this.zoomBox.size.height === "auto") {
                                /** @type {string} */
                                this.zoomBox.size.hunits = "%";
                                /** @type {number} */
                                this.zoomBox.size.height = 100;
                            }
                        }
                    } else {
                        this.option("zoom-position", "right");
                    }
                }
                if (this.zoomBox.mode === "preview") {
                    if (this.zoomBox.size.width === "auto") {
                        /** @type {string} */
                        this.zoomBox.size.wunits = "px";
                    }
                    if (this.zoomBox.size.height === "auto") {
                        /** @type {string} */
                        this.zoomBox.size.hunits = "px";
                    }
                }
                if (this.zoomBox.mode === "zoom") {
                    if (this.zoomBox.size.width === "auto" || this.option("zoom-position") === "inner") {
                        /** @type {string} */
                        this.zoomBox.size.wunits = "%";
                        /** @type {number} */
                        this.zoomBox.size.width = 100;
                    }
                    if (this.zoomBox.size.height === "auto" || this.option("zoom-position") === "inner") {
                        /** @type {string} */
                        this.zoomBox.size.hunits = "%";
                        /** @type {number} */
                        this.zoomBox.size.height = 100;
                    }
                }
                if (this.option("zoom-position") === "inner") {
                    this.node.jAddClass("mz-inner-zoom");
                }
            }
            this.zoomBox.position = this.zoomBox.custom ? "custom" : this.option("zoom-position");
            /** @type {number} */
            this.lens.border.x = parseFloat(this.lens.node.jGetCss("border-left-width") || "0");
            /** @type {number} */
            this.lens.border.y = parseFloat(this.lens.node.jGetCss("border-top-width") || "0");
            this.image.loadSmall(function() {
                if (this.image.small.state !== 2) {
                    return;
                }
                this.image.setCurNode("small");
                this.size = this.image.node.jGetSize();
                this.registerEvents();
                /** @type {boolean} */
                this.ready = true;
                if (this.option("lazyZoom") === true) {
                    bind("onZoomReady", this.id);
                    if ($.browser.mobile) {
                        this.reflowZoom();
                    } else {
                        this.showHint();
                    }
                }
            }.jBind(this));
            if (this.option("lazyZoom") !== true || this.option("zoomOn") === "always") {
                this.image.load(callback(function(childCompute) {
                    this.setupZoom(childCompute, true);
                }).jBind(this));
                this.loadTimer = callback(this.showLoading).jBind(this).jDelay(400);
            }
            this.setupSelectors();
            this.setupButtons();
        },
        stop : function() {
            clearTimeout(this.startTimer);
            this.unregisterEvents();
            if (this.zoomBox) {
                this.zoomBox.node.kill();
            }
            if (this.expandThumbs) {
                this.expandThumbs.stop();
                /** @type {null} */
                this.expandThumbs = null;
            }
            if (this.expandBox) {
                this.expandBox.kill();
            }
            if (this.expanded) {
                callback($.browser.getDoc()).jSetCss({
                    overflow : ""
                });
            }
            callback(this.additionalImages).jEach(function(messageObject) {
                callback(messageObject.origin).jRemoveClass("mz-thumb-selected").jRemoveClass(this.option("cssClass") || "mz-$dummy-css-class-to-jRemove$");
            }, this);
            if (this.originalImg) {
                this.placeholder.append(this.originalImg);
                if (this.originalImgSrc) {
                    this.originalImg.setAttribute("src", this.originalImgSrc);
                }
            }
            if (this.originalTitle) {
                this.placeholder.setAttribute("title", this.originalTitle);
            }
            if (this.node) {
                this.node.kill();
            }
        },
        setupZoom : function(value, _flexdatalist) {
            var mod = this.image;
            if (value.zoom.state !== 2) {
                /** @type {!Object} */
                this.image = value;
                /** @type {boolean} */
                this.ready = true;
                this.zoomBox.enable(false);
                return;
            }
            /** @type {!Object} */
            this.image = value;
            this.image.setCurNode(this.expanded ? "zoom" : "small");
            this.zoomBox.image.src = this.image.getURL("zoom");
            this.zoomBox.node.jRemoveClass("mz-preview");
            this.zoomBox.image.getAttribute("style");
            this.zoomBox.image.removeAttribute("style");
            this.zoomBox.node.jGetSize();
            setTimeout(callback(function() {
                var droprect = this.zoomBox.image.jGetSize();
                var params;
                this.zoomSizeOrigin = this.image.jGetSize("zoom");
                if (droprect.width * droprect.height > 1 && droprect.width * droprect.height < this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) {
                    this.zoomSizeOrigin = droprect;
                }
                this.zoomSize = $.detach(this.zoomSizeOrigin);
                if (this.zoomBox.mode === "preview") {
                    this.zoomBox.node.jAddClass("mz-preview");
                }
                this.setCaption();
                this.lens.image.src = this.image.node.currentSrc || this.image.node.src;
                this.zoomBox.enable(this.zoomBox.mode && !(this.expanded && this.zoomBox.mode === "preview"));
                /** @type {boolean} */
                this.ready = true;
                /** @type {null} */
                this.activateTimer = null;
                this.resizeCallback();
                this.node.jAddClass("mz-ready");
                this.hideLoading();
                if (mod !== this.image) {
                    bind("onUpdate", this.id, mod.origin, this.image.origin);
                    if (this.nextImage) {
                        params = this.nextImage;
                        /** @type {null} */
                        this.nextImage = null;
                        this.update(params.image, params.onswipe);
                    }
                } else {
                    if (!!_flexdatalist) {
                        bind("onZoomReady", this.id);
                    }
                }
                if (this.initEvent) {
                    this.node.jCallEvent(this.initEvent.type, this.initEvent);
                } else {
                    if (this.expanded && this.option("expandZoomOn") === "always") {
                        this.activate();
                    } else {
                        if (!!_flexdatalist) {
                            this.showHint();
                        }
                    }
                }
            }).jBind(this), 256);
        },
        setupSelectors : function() {
            var changeset_id = this.id;
            var uniqueAncestors;
            var validatorPattern;
            /** @type {!RegExp} */
            validatorPattern = new RegExp("zoom\\-id(\\s+)?:(\\s+)?" + changeset_id + "($|;)");
            if ($.browser.features.query) {
                uniqueAncestors = $.$A(document.querySelectorAll('[data-zoom-id="' + this.id + '"]'));
                uniqueAncestors = callback(uniqueAncestors).concat($.$A(document.querySelectorAll('[rel*="zoom-id"]')).filter(function(ownerNode) {
                    return validatorPattern.test(ownerNode.getAttribute("rel") || "");
                }));
            } else {
                uniqueAncestors = $.$A(document.getElementsByTagName("A")).filter(function(ownerNode) {
                    return changeset_id === ownerNode.getAttribute("data-zoom-id") || validatorPattern.test(ownerNode.getAttribute("rel") || "");
                });
            }
            callback(uniqueAncestors).jEach(function(node) {
                var data;
                var iserr;
                callback(node).jAddEvent("click", function(canCreateDiscussions) {
                    canCreateDiscussions.stopDefaults();
                });
                data = (new load).parseNode(node, this.originalTitle);
                if ((this.image.zoom.src.has(data.zoom.url) || this.image.zoom.url.has(data.zoom.url)) && (this.image.small.src.has(data.small.url) || this.image.small.url.has(data.small.url))) {
                    callback(data.origin).jAddClass("mz-thumb-selected");
                    data = this.image;
                    /** @type {number} */
                    data.origin = node;
                }
                if (!data.link && this.image.link) {
                    data.link = this.image.link;
                }
                iserr = callback(function() {
                    this.update(data);
                }).jBind(this);
                callback(node).jAddEvent("mousedown", function(event) {
                    if ("stopImmediatePropagation" in event) {
                        event.stopImmediatePropagation();
                    }
                }, 5);
                callback(node).jAddEvent("tap " + (this.option("selectorTrigger") === "hover" ? "mouseover mouseout" : "btnclick"), callback(function(event, mmCoreSplitViewBlock) {
                    if (this.updateTimer) {
                        clearTimeout(this.updateTimer);
                    }
                    /** @type {boolean} */
                    this.updateTimer = false;
                    if (event.type === "mouseover") {
                        this.updateTimer = callback(iserr).jDelay(mmCoreSplitViewBlock);
                    } else {
                        if (event.type === "tap" || event.type === "btnclick") {
                            iserr();
                        }
                    }
                }).jBindAsEvent(this, 60)).jAddClass(this.option("cssClass")).jAddClass("mz-thumb");
                if (this.option("lazyZoom") !== true) {
                    data.loadSmall();
                    data.loadZoom();
                }
                this.additionalImages.push(data);
            }, this);
        },
        update : function(value, options) {
            if (!this.ready) {
                this.nextImage = {
                    image : value,
                    onswipe : options
                };
                return;
            }
            if (!value || value === this.image) {
                return false;
            }
            this.deactivate(null, true);
            /** @type {boolean} */
            this.ready = false;
            this.node.jRemoveClass("mz-ready");
            this.loadTimer = callback(this.showLoading).jBind(this).jDelay(400);
            value.load(callback(function(self) {
                var newSizes;
                var canvas2;
                var target;
                var testOpacity;
                var element;
                var Q;
                /** @type {string} */
                var key = $.browser.ieMode < 10 ? "jGetSize" : "getBoundingClientRect";
                this.hideLoading();
                self.setCurNode("small");
                if (!self.node) {
                    /** @type {boolean} */
                    this.ready = true;
                    this.node.jAddClass("mz-ready");
                    return;
                }
                this.setActiveThumb(self);
                newSizes = this.image.node[key]();
                if (this.expanded) {
                    self.setCurNode("zoom");
                    target = $.$new("div").jAddClass("mz-expand-bg");
                    if ($.browser.features.cssFilters || $.browser.ieMode < 10) {
                        target.append($.$new("img", {
                            srcset : self.getURL("zoom") + " " + self.getRatio("zoom") + "x",
                            src : self.getURL("zoom")
                        }).jSetCss({
                            opacity : 0
                        }));
                    } else {
                        target.append((new $.SVGImage(self.node)).blur(id).getNode().jSetCss({
                            opacity : 0
                        }));
                    }
                    callback(target).jSetCss({
                        "z-index" : -99
                    }).jAppendTo(this.expandBox);
                }
                if (this.expanded && this.zoomBox.mode === "zoom" && this.option("expandZoomOn") === "always") {
                    callback(self.node).jSetCss({
                        opacity : 0
                    }).jAppendTo(this.node);
                    canvas2 = newSizes;
                    /** @type {!Array} */
                    element = [self.node, this.image.node];
                    /** @type {!Array} */
                    Q = [{
                        opacity : [0, 1]
                    }, {
                        opacity : [1, 0]
                    }];
                    callback(self.node).jSetCss({
                        "max-width" : Math.min(self.jGetSize("zoom").width, this.expandMaxWidth()),
                        "max-height" : Math.min(self.jGetSize("zoom").height, this.expandMaxHeight())
                    });
                } else {
                    this.node.jSetCss({
                        height : this.node[key]().height
                    });
                    this.image.node.jSetCss({
                        position : "absolute",
                        top : 0,
                        left : 0,
                        bottom : 0,
                        right : 0,
                        width : "100%",
                        height : "100%",
                        "max-width" : "",
                        "max-height" : ""
                    });
                    callback(self.node).jSetCss({
                        "max-width" : Math.min(self.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                        "max-height" : Math.min(self.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity),
                        position : "relative",
                        top : 0,
                        left : 0,
                        opacity : 0,
                        transform : ""
                    }).jAppendTo(this.node);
                    canvas2 = callback(self.node)[key]();
                    if (!options) {
                        callback(self.node).jSetCss({
                            "min-width" : newSizes.width,
                            height : newSizes.height,
                            "max-width" : newSizes.width,
                            "max-height" : ""
                        });
                    }
                    this.node.jSetCss({
                        height : "",
                        overflow : ""
                    }).jGetSize();
                    callback(self.node).jGetSize();
                    /** @type {!Array} */
                    element = [self.node, this.image.node];
                    /** @type {!Array} */
                    Q = [$.extend({
                        opacity : [0, 1]
                    }, options ? {
                        scale : [.6, 1]
                    } : {
                        "min-width" : [newSizes.width, canvas2.width],
                        "max-width" : [newSizes.width, canvas2.width],
                        height : [newSizes.height, canvas2.height]
                    }), {
                        opacity : [1, 0]
                    }];
                }
                if (this.expanded) {
                    if (this.expandBg.firstChild && target.firstChild) {
                        testOpacity = callback(this.expandBg.firstChild).jGetCss("opacity");
                        if ($.browser.gecko) {
                            /** @type {!Array<?>} */
                            element = element.concat([target.firstChild]);
                            /** @type {!Array<?>} */
                            Q = Q.concat([{
                                opacity : [1E-4, testOpacity]
                            }]);
                        } else {
                            /** @type {!Array<?>} */
                            element = element.concat([target.firstChild, this.expandBg.firstChild]);
                            /** @type {!Array<?>} */
                            Q = Q.concat([{
                                opacity : [1E-4, testOpacity]
                            }, {
                                opacity : [testOpacity, 1E-4]
                            }]);
                        }
                    }
                }
                (new $.PFX(element, {
                    duration : options || this.option("transitionEffect") ? options ? 160 : 350 : 0,
                    transition : options ? "cubic-bezier(0.175, 0.885, 0.320, 1)" : newSizes.width === canvas2.width ? "linear" : "cubic-bezier(0.25, .1, .1, 1)",
                    onComplete : callback(function() {
                        this.image.node.jRemove().getAttribute("style");
                        this.image.node.removeAttribute("style");
                        callback(self.node).jSetCss(this.expanded ? {
                            width : "auto",
                            height : "auto"
                        } : {
                            width : "",
                            height : ""
                        }).jSetCss({
                            "min-width" : "",
                            "min-height" : "",
                            opacity : "",
                            "max-width" : Math.min(self.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                            "max-height" : Math.min(self.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity)
                        });
                        if (this.expanded) {
                            this.expandBg.jRemove();
                            this.expandBg = undefined;
                            this.expandBg = target.jSetCssProp("z-index", -100);
                            callback(this.expandBg.firstChild).jSetCss({
                                opacity : ""
                            });
                            if (this.expandCaption) {
                                if (self.caption) {
                                    if (self.link) {
                                        this.expandCaption.changeContent("").append($.$new("a", {
                                            href : self.link
                                        }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(self.caption));
                                    } else {
                                        this.expandCaption.changeContent(self.caption).jAddClass("mz-show");
                                    }
                                } else {
                                    this.expandCaption.jRemoveClass("mz-show");
                                }
                            }
                        }
                        this.setupZoom(self);
                    }).jBind(this),
                    onBeforeRender : callback(function(options, knobOuter) {
                        if (undefined !== options.scale) {
                            knobOuter.jSetCssProp("transform", "scale(" + options.scale + ")");
                        }
                    })
                })).start(Q);
            }).jBind(this));
        },
        setActiveThumb : function(self) {
            /** @type {boolean} */
            var type = false;
            callback(this.additionalImages).jEach(function(box) {
                callback(box.origin).jRemoveClass("mz-thumb-selected");
                if (box === self) {
                    /** @type {boolean} */
                    type = true;
                }
            });
            if (type && self.origin) {
                callback(self.origin).jAddClass("mz-thumb-selected");
            }
            if (this.expandThumbs) {
                this.expandThumbs.selectItem(self.selector);
            }
        },
        setCaption : function(isError) {
            if (this.image.caption && this.option("zoomCaption") !== "off" && this.zoomBox.mode !== "magnifier") {
                if (!this.zoomBox.caption) {
                    this.zoomBox.caption = $.$new("div", {
                        "class" : "mz-caption"
                    }).jAppendTo(this.zoomBox.node.jAddClass("caption-" + this.option("zoomCaption")));
                }
                this.zoomBox.caption.changeContent(this.image.caption);
            }
        },
        showHint : function(options, index, html) {
            var node;
            if (!this.expanded) {
                if (this.hintRuns <= 0) {
                    return;
                }
                if (html !== true) {
                    this.hintRuns--;
                }
            }
            if (index === undefined || index === null) {
                if (!this.zoomBox.active && !this.zoomBox.activating) {
                    if (this.option("zoomMode") && (this.zoomBox.enabled || !this.image.loaded()) && !($.browser.mobile && this.option("expand") && this.zoomBox.mode === "zoom" && this.zoomBox.position === "inner")) {
                        if (this.zoomBox.trigger === "hover") {
                            index = this.option("textHoverZoomHint");
                        } else {
                            if (this.zoomBox.trigger === "click") {
                                index = this.option("textClickZoomHint");
                            }
                        }
                    } else {
                        index = this.option("expand") ? this.option("textExpandHint") : "";
                    }
                } else {
                    index = this.option("expand") ? this.option("textExpandHint") : "";
                }
            }
            if (!index) {
                this.hideHint();
                return;
            }
            node = this.node;
            if (!this.hint) {
                this.hint = $.$new("div", {
                    "class" : "mz-hint"
                });
                this.hintMessage = $.$new("span", {
                    "class" : "mz-hint-message"
                }).append(document.createTextNode(index)).jAppendTo(this.hint);
                callback(this.hint).jAppendTo(this.node);
            } else {
                callback(this.hintMessage).changeContent(index);
            }
            this.hint.jSetCss({
                "transition-delay" : ""
            }).jRemoveClass("mz-hint-hidden");
            if (this.expanded) {
                node = this.expandFigure;
            } else {
                if ((this.zoomBox.active || this.zoomBox.activating) && this.zoomBox.mode !== "magnifier" && this.zoomBox.position === "inner") {
                    node = this.zoomBox.node;
                }
            }
            if (options === true) {
                setTimeout(callback(function() {
                    this.hint.jAddClass("mz-hint-hidden");
                }).jBind(this), 16);
            }
            this.hint.jAppendTo(node);
        },
        hideHint : function() {
            if (this.hint) {
                this.hint.jSetCss({
                    "transition-delay" : "0ms"
                }).jAddClass("mz-hint-hidden");
            }
        },
        showLoading : function() {
            if (!this.loadingBox) {
                this.loadingBox = $.$new("div", {
                    "class" : "mz-loading"
                });
                this.node.append(this.loadingBox);
                this.loadingBox.jGetSize();
            }
            this.loadingBox.jAddClass("shown");
        },
        hideLoading : function() {
            clearTimeout(this.loadTimer);
            /** @type {null} */
            this.loadTimer = null;
            if (this.loadingBox) {
                callback(this.loadingBox).jRemoveClass("shown");
            }
        },
        setSize : function(size, type) {
            var style = $.detach(this.zoomBox.size);
            var ui = !this.expanded && this.zoomBox.custom ? callback(this.zoomBox.custom).jGetSize() : {
                width : 0,
                height : 0
            };
            var popoverBoundingBox;
            var multiple;
            var previewImageDimensions = this.size;
            var to = {
                x : 0,
                y : 0
            };
            type = type || this.zoomBox.position;
            this.normalSize = this.image.node.jGetSize();
            this.size = this.image.node.jGetSize();
            this.boundaries = this.image.node.getBoundingClientRect();
            if (!ui.height) {
                ui = this.size;
            }
            if (this.option("upscale") === false || this.zoomBox.mode === false || this.zoomBox.mode === "preview") {
                /** @type {boolean} */
                size = false;
            }
            if (this.zoomBox.mode === "preview") {
                if (style.width === "auto") {
                    style.width = this.zoomSizeOrigin.width;
                }
                if (style.height === "auto") {
                    style.height = this.zoomSizeOrigin.height;
                }
            }
            if (this.expanded && this.zoomBox.mode === "magnifier") {
                /** @type {number} */
                style.width = 70;
                /** @type {string} */
                style.height = "auto";
            }
            if (this.zoomBox.mode === "magnifier" && style.height === "auto") {
                /** @type {number} */
                this.zoomBox.width = parseFloat(style.width / 100) * Math.min(ui.width, ui.height);
                /** @type {number} */
                this.zoomBox.height = this.zoomBox.width;
            } else {
                if (this.zoomBox.mode === "zoom" && type === "inner") {
                    this.size = this.node.jGetSize();
                    ui = this.size;
                    this.boundaries = this.node.getBoundingClientRect();
                    this.zoomBox.width = ui.width;
                    this.zoomBox.height = ui.height;
                } else {
                    /** @type {number} */
                    this.zoomBox.width = style.wunits === "%" ? parseFloat(style.width / 100) * ui.width : parseInt(style.width);
                    /** @type {number} */
                    this.zoomBox.height = style.hunits === "%" ? parseFloat(style.height / 100) * ui.height : parseInt(style.height);
                }
            }
            if (this.zoomBox.mode === "preview") {
                /** @type {number} */
                multiple = Math.min(Math.min(this.zoomBox.width / this.zoomSizeOrigin.width, this.zoomBox.height / this.zoomSizeOrigin.height), 1);
                /** @type {number} */
                this.zoomBox.width = this.zoomSizeOrigin.width * multiple;
                /** @type {number} */
                this.zoomBox.height = this.zoomSizeOrigin.height * multiple;
            }
            /** @type {number} */
            this.zoomBox.width = Math.ceil(this.zoomBox.width);
            /** @type {number} */
            this.zoomBox.height = Math.ceil(this.zoomBox.height);
            /** @type {number} */
            this.zoomBox.aspectRatio = this.zoomBox.width / this.zoomBox.height;
            this.zoomBox.node.jSetCss({
                width : this.zoomBox.width,
                height : this.zoomBox.height
            });
            if (size) {
                ui = this.expanded ? this.expandBox.jGetSize() : this.zoomBox.node.jGetSize();
                if (!this.expanded && this.normalSize.width * this.normalSize.height / (this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) > .8) {
                    /** @type {number} */
                    this.zoomSize.width = 1.5 * this.zoomSizeOrigin.width;
                    /** @type {number} */
                    this.zoomSize.height = 1.5 * this.zoomSizeOrigin.height;
                } else {
                    this.zoomSize = $.detach(this.zoomSizeOrigin);
                }
            }
            if (this.zoomBox.mode !== false && !this.zoomBox.active && !(this.expanded && this.option("expandZoomOn") === "always")) {
                if (this.normalSize.width * this.normalSize.height / (this.zoomSize.width * this.zoomSize.height) > .8) {
                    this.zoomSize = $.detach(this.zoomSizeOrigin);
                    this.zoomBox.enable(false);
                } else {
                    this.zoomBox.enable(true);
                }
            }
            this.zoomBox.image.jSetCss({
                width : this.zoomSize.width,
                height : this.zoomSize.height
            });
            this.zoomSize.maxWidth = this.zoomSize.width;
            this.zoomSize.maxHeight = this.zoomSize.height;
            popoverBoundingBox = this.zoomBox.node.getInnerSize();
            /** @type {number} */
            this.zoomBox.innerWidth = Math.ceil(popoverBoundingBox.width);
            /** @type {number} */
            this.zoomBox.innerHeight = Math.ceil(popoverBoundingBox.height);
            /** @type {number} */
            this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width));
            /** @type {number} */
            this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height));
            this.lens.node.jSetCss({
                width : this.lens.width,
                height : this.lens.height
            });
            this.lens.image.jSetCss(this.size);
            $.extend(this.lens, this.lens.node.jGetSize());
            if (this.zoomBox.active) {
                clearTimeout(this.moveTimer);
                /** @type {null} */
                this.moveTimer = null;
                if (this.lens.innertouch) {
                    this.lens.pos.x *= this.size.width / previewImageDimensions.width;
                    this.lens.pos.y *= this.size.height / previewImageDimensions.height;
                    to.x = this.lens.spos.x;
                    to.y = this.lens.spos.y;
                } else {
                    to.x = this.boundaries.left + this.lens.width / 2 + this.lens.pos.x * (this.size.width / previewImageDimensions.width);
                    to.y = this.boundaries.top + this.lens.height / 2 + this.lens.pos.y * (this.size.height / previewImageDimensions.height);
                }
                this.animate(null, to);
            }
        },
        reflowZoom : function(canCreateDiscussions) {
            var y;
            var x;
            var rect;
            var type;
            var trackXY;
            var url;
            var rowContainer = callback(this.node).jFetch("cr");
            rect = extend(5);
            trackXY = this.zoomBox.position;
            type = this.expanded ? "inner" : this.zoomBox.custom ? "custom" : this.option("zoom-position");
            url = this.expanded && this.zoomBox.mode === "zoom" ? this.expandImageStage : document.body;
            if (this.expanded) {
                /** @type {number} */
                rect.y = 0;
                /** @type {number} */
                rect.x = 0;
            }
            if (!canCreateDiscussions) {
                this.setSize(true, type);
            }
            y = this.boundaries.top;
            if (this.zoomBox.mode !== "magnifier") {
                if (canCreateDiscussions) {
                    this.setSize(false);
                    return;
                }
                switch(type) {
                    case "inner":
                    case "custom":
                        /** @type {number} */
                        y = 0;
                        /** @type {number} */
                        x = 0;
                        break;
                    case "top":
                        /** @type {number} */
                        y = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                        if (rect.top > y) {
                            y = this.boundaries.bottom + this.option("zoom-distance");
                            /** @type {string} */
                            type = "bottom";
                        }
                        x = this.boundaries.left;
                        break;
                    case "bottom":
                        y = this.boundaries.bottom + this.option("zoom-distance");
                        if (rect.bottom < y + this.zoomBox.height) {
                            /** @type {number} */
                            y = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                            /** @type {string} */
                            type = "top";
                        }
                        x = this.boundaries.left;
                        break;
                    case "left":
                        /** @type {number} */
                        x = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                        if (rect.left > x && rect.right >= this.boundaries.right + this.option("zoom-distance") + this.zoomBox.width) {
                            x = this.boundaries.right + this.option("zoom-distance");
                            /** @type {string} */
                            type = "right";
                        }
                        break;
                    case "right":
                    default:
                        x = this.boundaries.right + this.option("zoom-distance");
                        if (rect.right < x + this.zoomBox.width && rect.left <= this.boundaries.left - this.zoomBox.width - this.option("zoom-distance")) {
                            /** @type {number} */
                            x = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                            /** @type {string} */
                            type = "left";
                        }
                        break;
                }
                switch(this.option("zoom-position")) {
                    case "top":
                    case "bottom":
                        if (rect.top > y || rect.bottom < y + this.zoomBox.height) {
                            /** @type {string} */
                            type = "inner";
                        }
                        break;
                    case "left":
                    case "right":
                        if (rect.left > x || rect.right < x + this.zoomBox.width) {
                            /** @type {string} */
                            type = "inner";
                        }
                        break;
                    default:
                }
                this.zoomBox.position = type;
                if (!this.zoomBox.activating && !this.zoomBox.active) {
                    if ($.browser.mobile && !this.expanded && (this.zoomBox.mode === "zoom" || this.zoomBox.mode === false && this.option("expand"))) {
                        if (this.option("expand")) {
                            this.zoomBox.enable(type !== "inner");
                        } else {
                            if (this.option("zoomOn") !== "click") {
                                this.zoomBox.trigger = type === "inner" ? "click" : this.option("zoomOn");
                                this.unregisterActivateEvent();
                                this.unregisterDeactivateEvent();
                                this.registerActivateEvent(this.zoomBox.trigger === "click");
                                this.registerDeactivateEvent(this.zoomBox.trigger === "click" && !this.option("expand"));
                            }
                        }
                        this.showHint(false, null, !this.image.loaded());
                    }
                    return;
                }
                this.setSize(false);
                if (canCreateDiscussions) {
                    return;
                }
                if (type === "custom") {
                    url = this.zoomBox.custom;
                    /** @type {number} */
                    rect.y = 0;
                    /** @type {number} */
                    rect.x = 0;
                }
                if (type === "inner") {
                    if (this.zoomBox.mode !== "preview") {
                        this.zoomBox.node.jAddClass("mz-inner");
                        this.node.jAddClass("mz-inner-zoom");
                    }
                    this.lens.hide();
                    y = this.boundaries.top + rect.y;
                    x = this.boundaries.left + rect.x;
                    /** @type {number} */
                    y = 0;
                    /** @type {number} */
                    x = 0;
                    if (!this.expanded) {
                        url = this.node;
                    }
                } else {
                    y = y + rect.y;
                    x = x + rect.x;
                    this.node.jRemoveClass("mz-inner-zoom");
                    this.zoomBox.node.jRemoveClass("mz-inner");
                }
                this.zoomBox.node.jSetCss({
                    top : y,
                    left : x
                });
            } else {
                this.setSize(false);
                url = this.node;
                if ($.browser.mobile && !this.expanded && !this.zoomBox.activating && !this.zoomBox.active) {
                    this.showHint(false, null, !(this.option("lazyZoom") && this.image.loaded()));
                }
            }
            this.zoomBox.node[this.expanded ? "jAddClass" : "jRemoveClass"]("mz-expanded");
            if (!this.expanded && rowContainer) {
                rowContainer.jAppendTo(this.zoomBox.mode === "zoom" && type === "inner" ? this.zoomBox.node : this.node, (Math.floor(Math.random() * 101) + 1) % 2 ? "top" : "bottom");
            }
            this.zoomBox.node.jAppendTo(url);
        },
        changeZoomLevel : function(e) {
            var popoverBoundingBox;
            var width;
            var height;
            var orthogonal;
            /** @type {boolean} */
            var P = false;
            /** @type {number} */
            var multiplier = e.isMouse ? 5 : 3 / 54;
            if (!this.zoomBox.active) {
                return;
            }
            callback(e).stop();
            /** @type {number} */
            multiplier = (100 + multiplier * Math.abs(e.deltaY)) / 100;
            if (e.deltaY < 0) {
                /** @type {number} */
                multiplier = 1 / multiplier;
            }
            if (this.zoomBox.mode === "magnifier") {
                /** @type {number} */
                width = Math.max(100, Math.round(this.zoomBox.width * multiplier));
                /** @type {number} */
                width = Math.min(width, this.size.width * .9);
                /** @type {number} */
                height = width / this.zoomBox.aspectRatio;
                /** @type {number} */
                this.zoomBox.width = Math.ceil(width);
                /** @type {number} */
                this.zoomBox.height = Math.ceil(height);
                this.zoomBox.node.jSetCss({
                    width : this.zoomBox.width,
                    height : this.zoomBox.height
                });
                popoverBoundingBox = this.zoomBox.node.getInnerSize();
                /** @type {number} */
                this.zoomBox.innerWidth = Math.ceil(popoverBoundingBox.width);
                /** @type {number} */
                this.zoomBox.innerHeight = Math.ceil(popoverBoundingBox.height);
                /** @type {boolean} */
                P = true;
            } else {
                if (!this.expanded && this.zoomBox.mode === "zoom") {
                    /** @type {number} */
                    width = Math.max(this.size.width, Math.round(this.zoomSize.width * multiplier));
                    /** @type {number} */
                    width = Math.min(width, this.zoomSize.maxWidth);
                    /** @type {number} */
                    height = width / (this.zoomSize.maxWidth / this.zoomSize.maxHeight);
                    /** @type {number} */
                    this.zoomSize.width = Math.ceil(width);
                    /** @type {number} */
                    this.zoomSize.height = Math.ceil(height);
                } else {
                    return;
                }
            }
            orthogonal = callback(window).jGetScroll();
            /** @type {number} */
            this.lens.width = this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width);
            /** @type {number} */
            this.lens.height = this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height);
            this.lens.node.jSetCss({
                width : this.lens.width,
                height : this.lens.height
            });
            $.extend(this.lens, this.lens.node.jGetSize());
            if (this.zoomBox.active) {
                clearTimeout(this.moveTimer);
                /** @type {null} */
                this.moveTimer = null;
                if (P) {
                    /** @type {boolean} */
                    this.moveTimer = true;
                }
                this.animate(null, {
                    x : e.x - orthogonal.x,
                    y : e.y - orthogonal.y
                });
                if (P) {
                    /** @type {null} */
                    this.moveTimer = null;
                }
            }
        },
        registerActivateEvent : function(maxRes) {
            var url;
            /** @type {string} */
            var h = maxRes ? "dbltap btnclick" : "touchstart" + (window.navigator.pointerEnabled ? " pointerdown" : window.navigator.msPointerEnabled ? " MSPointerDown" : "") + (window.navigator.pointerEnabled ? " pointermove" : window.navigator.msPointerEnabled ? " MSPointerMove" : " mousemove");
            var pornResult = this.node.jFetch("mz:handlers:activate:fn", !maxRes ? callback(function(data) {
                if (data.isTouchEvent() && !data.isPrimaryTouch()) {
                    return;
                }
                if (data && data.pointerType === "touch" && data.type !== "pointerdown") {
                    return;
                }
                url = $.browser.ieMode < 9 ? $.extend({}, data) : data;
                if (!this.activateTimer) {
                    clearTimeout(this.activateTimer);
                    /** @type {number} */
                    this.activateTimer = setTimeout(callback(function() {
                        this.activate(url);
                    }).jBind(this), 120);
                }
            }).jBindAsEvent(this) : callback(this.activate).jBindAsEvent(this));
            this.node.jStore("mz:handlers:activate:event", h).jAddEvent(h, pornResult, 10);
        },
        unregisterActivateEvent : function() {
            var elem = this.node.jFetch("mz:handlers:activate:event");
            var cb = this.node.jFetch("mz:handlers:activate:fn");
            this.node.jRemoveEvent(elem, cb);
            this.node.jDel("mz:handlers:activate:fn");
        },
        registerDeactivateEvent : function(zoomAware) {
            /** @type {string} */
            var type = "touchend";
            if (window.navigator.pointerEnabled) {
                /** @type {string} */
                type = type + " pointerup pointerout pointermove";
            } else {
                if (window.navigator.msPointerEnabled) {
                    /** @type {string} */
                    type = type + " MSPointerUp MSPointerOut MSPointerMove";
                } else {
                    /** @type {string} */
                    type = type + " mouseout mousemove";
                }
            }
            if (zoomAware) {
                if (this.expanded || $.browser.mobile) {
                    /** @type {string} */
                    type = "dbltap btnclick";
                } else {
                    /** @type {string} */
                    type = type + " dbltap btnclick";
                }
            }
            var pornResult = this.node.jFetch("mz:handlers:deactivate:fn", callback(function(event) {
                if (event.isTouchEvent() && !event.isPrimaryTouch()) {
                    return;
                }
                if (event && event.type === "pointerup" && event.pointerType !== "touch") {
                    return;
                }
                if (event && (event.type === "pointermove" || event.type === "MSPointerMove" || event.type === "mousemove")) {
                    if (!this.ready || !this.zoomBox.enabled || !this.zoomBox.active) {
                        return;
                    }
                    var windowPos = event.getClientXY();
                    if (windowPos.x < this.boundaries.left || windowPos.x > this.boundaries.right || windowPos.y < this.boundaries.top || windowPos.y > this.boundaries.bottom) {
                        this.deactivate(event);
                        return;
                    }
                } else {
                    if (this.zoomBox.node !== event.getRelated() && !((this.zoomBox.position === "inner" || this.zoomBox.mode === "magnifier") && this.zoomBox.node.hasChild(event.getRelated())) && !this.node.hasChild(event.getRelated())) {
                        this.deactivate(event);
                        return;
                    }
                }
            }).jBindAsEvent(this));
            this.node.jStore("mz:handlers:deactivate:event", type).jAddEvent(type, pornResult, 20);
        },
        unregisterDeactivateEvent : function() {
            var elem = this.node.jFetch("mz:handlers:deactivate:event");
            var cb = this.node.jFetch("mz:handlers:deactivate:fn");
            this.node.jRemoveEvent(elem, cb);
            this.node.jDel("mz:handlers:deactivate:fn");
        },
        registerAnimateEvent : function() {
            /** @type {string} */
            var type = "touchmove";
            if ($.browser.platform !== "android") {
                if (window.navigator.pointerEnabled) {
                    /** @type {string} */
                    type = type + " pointermove";
                } else {
                    if (window.navigator.msPointerEnabled) {
                        /** @type {string} */
                        type = type + " MSPointerMove";
                    } else {
                        /** @type {string} */
                        type = type + " mousemove";
                    }
                }
            }
            var pornResult = this.node.jFetch("mz:handlers:animate:fn", callback(this.animate).jBindAsEvent(this));
            this.node.jStore("mz:handlers:animate:event", type).jAddEvent(type, pornResult);
        },
        unregisterAnimateEvent : function() {
            var elem = this.node.jFetch("mz:handlers:animate:event");
            var cb = this.node.jFetch("mz:handlers:animate:fn");
            this.node.jRemoveEvent(elem, cb);
        },
        registerEvents : function() {
            this.moveBind = this.move.jBind(this);
            this.node.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], callback(function(parentEvent) {
                if ($.browser.androidBrowser && this.option("zoomMode") && this.option("zoomOn") !== "click" && parentEvent.type === "touchstart") {
                    parentEvent.stopDefaults();
                    if ($.browser.gecko) {
                        parentEvent.stopDistribution();
                    }
                }
                if (!this.zoomBox.active) {
                    return;
                }
                if (this.zoomBox.position === "inner" && parentEvent.isPrimaryTouch()) {
                    this.lens.spos = parentEvent.getClientXY();
                }
            }).jBindAsEvent(this), 10);
            this.node.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], callback(function(touches) {
                if (touches.isTouchEvent() && touches.isPrimaryTouch()) {
                    /** @type {boolean} */
                    this.lens.touchmovement = false;
                }
            }).jBindAsEvent(this), 10);
            this.registerAnimateEvent();
            if (this.option("zoomMode")) {
                this.registerActivateEvent(this.option("zoomOn") === "click");
                this.registerDeactivateEvent(this.option("zoomOn") === "click");
            }
            this.node.jAddEvent("mousedown", function(canCreateDiscussions) {
                canCreateDiscussions.stopDistribution();
            }, 10).jAddEvent("btnclick", callback(function(metaIn) {
                this.node.jRaiseEvent("MouseEvent", "click");
                if (this.expanded) {
                    this.expandBox.jCallEvent("btnclick", metaIn);
                }
            }).jBind(this), 15);
            if (this.option("expand")) {
                this.node.jAddEvent("tap btnclick", callback(this.expand).jBindAsEvent(this), 15);
            } else {
                this.node.jAddEvent("tap btnclick", callback(this.openLink).jBindAsEvent(this), 15);
            }
            if (this.additionalImages.length > 1) {
                this.swipe();
            }
            if (!$.browser.mobile && this.option("variableZoom")) {
                this.node.jAddEvent("mousescroll", this.changeZoomLevel.jBindAsEvent(this));
            }
            if ($.browser.mobile) {
                this.pinchToZoom();
            }
            callback(window).jAddEvent($.browser.mobile ? "resize" : "resize scroll", this.onResize);
            if (this.option("history")) {
                callback(window).jAddEvent("popstate", this.onHistoryStateChange);
            }
        },
        unregisterEvents : function() {
            if (this.node) {
                this.node.jRemoveEvent("mousescroll");
            }
            callback(window).jRemoveEvent("resize scroll", this.onResize);
            if (this.option("history")) {
                callback(window).jRemoveEvent("popstate", this.onHistoryStateChange);
            }
            callback(this.additionalImages).jEach(function(messageObject) {
                callback(messageObject.origin).jClearEvents();
            });
        },
        activate : function(e) {
            var bounds;
            var labelPosition;
            var patternSource;
            var bboxClient;
            var bodyMargin;
            /** @type {number} */
            var oy = 0;
            /** @type {number} */
            var ox = 0;
            if (!this.image.loaded() || !this.ready || !this.zoomBox.enabled || this.zoomBox.active || this.zoomBox.activating) {
                if (!this.image.loaded() && !this.initEvent) {
                    if (e) {
                        this.initEvent = handleTouch(e);
                        e.stopQueue();
                    }
                    this.image.load(this.setupZoom.jBind(this));
                    if (!this.loadTimer) {
                        this.loadTimer = callback(this.showLoading).jBind(this).jDelay(400);
                    }
                }
                return;
            }
            if (e && e.type === "pointermove" && e.pointerType === "touch") {
                return;
            }
            if (!this.option("zoomMode") && this.option("expand") && !this.expanded) {
                /** @type {boolean} */
                this.zoomBox.active = true;
                return;
            }
            /** @type {boolean} */
            this.zoomBox.activating = true;
            if (this.expanded && this.zoomBox.mode === "zoom") {
                bboxClient = this.image.node.jGetRect();
                this.expandStage.jAddClass("mz-zoom-in");
                bodyMargin = this.expandFigure.jGetRect();
                /** @type {number} */
                ox = (bboxClient.left + bboxClient.right) / 2 - (bodyMargin.left + bodyMargin.right) / 2;
                /** @type {number} */
                oy = (bboxClient.top + bboxClient.bottom) / 2 - (bodyMargin.top + bodyMargin.bottom) / 2;
            }
            this.zoomBox.image.jRemoveEvent("transitionend");
            this.zoomBox.node.jRemoveClass("mz-deactivating").jRemoveEvent("transitionend");
            this.zoomBox.node.jAddClass("mz-activating");
            this.node.jAddClass("mz-activating");
            this.reflowZoom();
            labelPosition = this.zoomBox.mode === "zoom" ? this.zoomBox.position : this.zoomBox.mode;
            if ($.browser.features.transition && !(this.expanded && this.option("expandZoomOn") === "always")) {
                if (labelPosition === "inner") {
                    patternSource = this.image.node.jGetSize();
                    this.zoomBox.image.jSetCss({
                        transform : "translate3d(0," + oy + "px, 0) scale(" + patternSource.width / this.zoomSize.width + ", " + patternSource.height / this.zoomSize.height + ")"
                    }).jGetSize();
                    this.zoomBox.image.jAddEvent("transitionend", callback(function() {
                        this.zoomBox.image.jRemoveEvent("transitionend");
                        this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + labelPosition);
                        /** @type {boolean} */
                        this.zoomBox.activating = false;
                        /** @type {boolean} */
                        this.zoomBox.active = true;
                    }).jBind(this));
                    this.zoomBox.node.jAddClass("mz-p-" + labelPosition).jGetSize();
                    if (!$.browser.mobile && $.browser.chrome && ($.browser.uaName === "chrome" || $.browser.uaName === "opera")) {
                        /** @type {boolean} */
                        this.zoomBox.activating = false;
                        /** @type {boolean} */
                        this.zoomBox.active = true;
                    }
                } else {
                    this.zoomBox.node.jAddEvent("transitionend", callback(function() {
                        this.zoomBox.node.jRemoveEvent("transitionend");
                        this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + labelPosition);
                    }).jBind(this));
                    this.zoomBox.node.jSetCss({
                        transition : "none"
                    });
                    this.zoomBox.node.jAddClass("mz-p-" + labelPosition).jGetSize();
                    this.zoomBox.node.jSetCss({
                        transition : ""
                    }).jGetSize();
                    this.zoomBox.node.jRemoveClass("mz-p-" + labelPosition);
                    /** @type {boolean} */
                    this.zoomBox.activating = false;
                    /** @type {boolean} */
                    this.zoomBox.active = true;
                }
            } else {
                this.zoomBox.node.jRemoveClass("mz-activating");
                /** @type {boolean} */
                this.zoomBox.activating = false;
                /** @type {boolean} */
                this.zoomBox.active = true;
            }
            if (!this.expanded) {
                this.showHint(true);
            }
            if (e) {
                e.stop().stopQueue();
                bounds = e.getClientXY();
                if (this.zoomBox.mode === "magnifier" && /tap/i.test(e.type)) {
                    bounds.y -= this.zoomBox.height / 2 + 10;
                }
                if (labelPosition === "inner" && (/tap/i.test(e.type) || e.isTouchEvent())) {
                    this.lens.pos = {
                        x : 0,
                        y : 0
                    };
                    /** @type {number} */
                    bounds.x = -(bounds.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                    /** @type {number} */
                    bounds.y = -(bounds.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height);
                }
            } else {
                bounds = {
                    x : this.boundaries.left + (this.boundaries.right - this.boundaries.left) / 2,
                    y : this.boundaries.top + (this.boundaries.bottom - this.boundaries.top) / 2
                };
                if ($.browser.mobile && this.expanded && this.option("expandZoomOn") === "always") {
                    /** @type {boolean} */
                    this.lens.innertouch = true;
                    this.lens.pos = {
                        x : 0,
                        y : 0
                    };
                    /** @type {number} */
                    bounds.x = -(bounds.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                    /** @type {number} */
                    bounds.y = -(bounds.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height);
                }
            }
            this.node.jRemoveClass("mz-activating").jAddClass("mz-active");
            bounds.x += -ox;
            bounds.y += -oy;
            this.lens.spos = {
                x : 0,
                y : 0
            };
            /** @type {number} */
            this.lens.dx = 0;
            /** @type {number} */
            this.lens.dy = 0;
            this.animate(e, bounds, true);
            bind("onZoomIn", this.id);
        },
        deactivate : function(evt, drop) {
            var labelPosition;
            var imageThumbnail;
            var bboxClient;
            var bodyMargin;
            /** @type {number} */
            var O = 0;
            /** @type {number} */
            var Q = 0;
            var originalzoomBox = this.zoomBox.active;
            /** @type {null} */
            this.initEvent = null;
            if (!this.ready) {
                return;
            }
            if (evt && evt.type === "pointerout" && evt.pointerType === "touch") {
                return;
            }
            clearTimeout(this.moveTimer);
            /** @type {null} */
            this.moveTimer = null;
            clearTimeout(this.activateTimer);
            /** @type {null} */
            this.activateTimer = null;
            /** @type {boolean} */
            this.zoomBox.activating = false;
            /** @type {boolean} */
            this.zoomBox.active = false;
            if (drop !== true && !this.expanded) {
                if (originalzoomBox) {
                    if ($.browser.mobile && !this.expanded && this.zoomBox.mode === "zoom") {
                        this.reflowZoom();
                    } else {
                        this.showHint();
                    }
                }
            }
            if (!this.zoomBox.enabled) {
                return;
            }
            if (evt) {
                evt.stop();
            }
            this.zoomBox.image.jRemoveEvent("transitionend");
            this.zoomBox.node.jRemoveClass("mz-activating").jRemoveEvent("transitionend");
            if (this.expanded) {
                bodyMargin = this.expandFigure.jGetRect();
                if (this.option("expandZoomOn") !== "always") {
                    this.expandStage.jRemoveClass("mz-zoom-in");
                }
                this.image.node.jSetCss({
                    "max-height" : this.expandMaxHeight()
                });
                bboxClient = this.image.node.jGetRect();
                /** @type {number} */
                Q = (bboxClient.left + bboxClient.right) / 2 - (bodyMargin.left + bodyMargin.right) / 2;
                /** @type {number} */
                O = (bboxClient.top + bboxClient.bottom) / 2 - (bodyMargin.top + bodyMargin.bottom) / 2;
            }
            labelPosition = this.zoomBox.mode === "zoom" ? this.zoomBox.position : this.zoomBox.mode;
            if ($.browser.features.transition && evt && !(this.expanded && this.option("expandZoomOn") === "always")) {
                if (labelPosition === "inner") {
                    this.zoomBox.image.jAddEvent("transitionend", callback(function() {
                        this.zoomBox.image.jRemoveEvent("transitionend");
                        this.node.jRemoveClass("mz-active");
                        setTimeout(callback(function() {
                            this.zoomBox.hide();
                        }).jBind(this), 32);
                    }).jBind(this));
                    imageThumbnail = this.image.node.jGetSize();
                    this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + labelPosition).jGetSize();
                    this.zoomBox.image.jSetCss({
                        transform : "translate3d(0," + O + "px,0) scale(" + imageThumbnail.width / this.zoomSize.maxWidth + ", " + imageThumbnail.height / this.zoomSize.maxHeight + ")"
                    });
                } else {
                    this.zoomBox.node.jAddEvent("transitionend", callback(function() {
                        this.zoomBox.hide();
                        this.node.jRemoveClass("mz-active");
                    }).jBind(this));
                    this.zoomBox.node.jGetCss("opacity");
                    this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + labelPosition);
                    this.node.jRemoveClass("mz-active");
                }
            } else {
                this.zoomBox.hide();
                this.node.jRemoveClass("mz-active");
            }
            /** @type {number} */
            this.lens.dx = 0;
            /** @type {number} */
            this.lens.dy = 0;
            this.lens.spos = {
                x : 0,
                y : 0
            };
            this.lens.hide();
            if (originalzoomBox) {
                bind("onZoomOut", this.id);
            }
        },
        animate : function(self, value, create) {
            /** @type {number} */
            var e = value;
            var left;
            var i;
            /** @type {number} */
            var minMarginLeft = 0;
            var cmDesiredHeight;
            /** @type {number} */
            var lo0 = 0;
            var max_input_height;
            var V;
            /** @type {boolean} */
            var method = false;
            if (!this.zoomBox.active && !create) {
                return;
            }
            if (self) {
                callback(self).stopDefaults().stopDistribution();
                if (self.isTouchEvent() && !self.isPrimaryTouch()) {
                    return;
                }
                method = /tap/i.test(self.type) || self.isTouchEvent();
                if (method && !this.lens.touchmovement) {
                    this.lens.touchmovement = method;
                }
                if (!e) {
                    e = self.getClientXY();
                }
            }
            if (this.zoomBox.mode === "preview") {
                return;
            }
            if (this.zoomBox.mode === "zoom" && this.zoomBox.position === "inner" && (self && method || !self && this.lens.innertouch)) {
                /** @type {boolean} */
                this.lens.innertouch = true;
                left = this.lens.pos.x + (e.x - this.lens.spos.x);
                i = this.lens.pos.y + (e.y - this.lens.spos.y);
                this.lens.spos = e;
                /** @type {number} */
                minMarginLeft = Math.min(0, this.zoomBox.innerWidth - this.zoomSize.width) / 2;
                /** @type {number} */
                cmDesiredHeight = -minMarginLeft;
                /** @type {number} */
                lo0 = Math.min(0, this.zoomBox.innerHeight - this.zoomSize.height) / 2;
                /** @type {number} */
                max_input_height = -lo0;
            } else {
                /** @type {boolean} */
                this.lens.innertouch = false;
                if (this.zoomBox.mode === "magnifier") {
                    /** @type {number} */
                    e.y = Math.max(this.boundaries.top, Math.min(e.y, this.boundaries.bottom));
                    /** @type {number} */
                    e.x = Math.max(this.boundaries.left, Math.min(e.x, this.boundaries.right));
                }
                /** @type {number} */
                left = e.x - this.boundaries.left;
                /** @type {number} */
                i = e.y - this.boundaries.top;
                /** @type {number} */
                cmDesiredHeight = this.size.width - this.lens.width;
                /** @type {number} */
                max_input_height = this.size.height - this.lens.height;
                /** @type {number} */
                left = left - this.lens.width / 2;
                /** @type {number} */
                i = i - this.lens.height / 2;
            }
            if (this.zoomBox.mode !== "magnifier") {
                /** @type {number} */
                left = Math.max(minMarginLeft, Math.min(left, cmDesiredHeight));
                /** @type {number} */
                i = Math.max(lo0, Math.min(i, max_input_height));
            }
            this.lens.pos.x = left;
            this.lens.pos.y = i;
            if (this.zoomBox.mode === "zoom") {
                if ($.browser.features.transform) {
                    this.lens.node.jSetCss({
                        transform : "translate(" + this.lens.pos.x + "px," + this.lens.pos.y + "px)"
                    });
                    this.lens.image.jSetCss({
                        transform : "translate(" + -(this.lens.pos.x + this.lens.border.x) + "px, " + -(this.lens.pos.y + this.lens.border.y) + "px)"
                    });
                } else {
                    this.lens.node.jSetCss({
                        top : this.lens.pos.y,
                        left : this.lens.pos.x
                    });
                    this.lens.image.jSetCss({
                        top : -(this.lens.pos.y + this.lens.border.y),
                        left : -(this.lens.pos.x + this.lens.border.x)
                    });
                }
            }
            if (this.zoomBox.mode === "magnifier") {
                if (this.lens.touchmovement && !(self && self.type === "dbltap")) {
                    e.y -= this.zoomBox.height / 2 + 10;
                }
                this.zoomBox.node.jSetCss({
                    top : e.y - this.boundaries.top - this.zoomBox.height / 2,
                    left : e.x - this.boundaries.left - this.zoomBox.width / 2
                });
            }
            if (!this.moveTimer) {
                /** @type {number} */
                this.lens.dx = 0;
                /** @type {number} */
                this.lens.dy = 0;
                this.move(1);
            }
        },
        move : function(delta) {
            var dx;
            var dy;
            var x;
            var height;
            var O;
            var M;
            if (!isFinite(delta)) {
                if (this.lens.innertouch) {
                    /** @type {number} */
                    delta = this.lens.touchmovement ? .4 : .16;
                } else {
                    /** @type {number} */
                    delta = this.option("smoothing") ? .2 : this.lens.touchmovement ? .4 : .8;
                }
            }
            /** @type {number} */
            dx = (this.lens.pos.x - this.lens.dx) * delta;
            /** @type {number} */
            dy = (this.lens.pos.y - this.lens.dy) * delta;
            this.lens.dx += dx;
            this.lens.dy += dy;
            if (!this.moveTimer || Math.abs(dx) > 1E-6 || Math.abs(dy) > 1E-6) {
                if (this.lens.innertouch) {
                    x = this.lens.dx;
                    height = this.lens.dy;
                } else {
                    /** @type {number} */
                    x = this.lens.dx * (this.zoomSize.width / this.size.width) - Math.max(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2;
                    /** @type {number} */
                    height = this.lens.dy * (this.zoomSize.height / this.size.height) - Math.max(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2;
                    if (this.zoomBox.mode === "magnifier") {
                        /** @type {number} */
                        x = Math.round(x);
                        /** @type {number} */
                        height = Math.round(height);
                    }
                    /** @type {number} */
                    x = -x;
                    /** @type {number} */
                    height = -height;
                }
                /** @type {number} */
                O = this.zoomSize.width / this.zoomSize.maxWidth;
                /** @type {number} */
                M = this.zoomSize.height / this.zoomSize.maxHeight;
                this.zoomBox.image.jSetCss($.browser.features.transform ? {
                    transform : img_dim + x + "px," + height + "px" + trnClose + " scale(" + O + "," + M + ")"
                } : {
                    width : this.zoomSize.width,
                    height : this.zoomSize.height,
                    left : -(this.lens.dx * (this.zoomSize.width / this.size.width) + Math.min(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2),
                    top : -(this.lens.dy * (this.zoomSize.height / this.size.height) + Math.min(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2)
                });
            }
            if (this.zoomBox.mode === "magnifier") {
                return;
            }
            /** @type {number} */
            this.moveTimer = setTimeout(this.moveBind, 16);
        },
        swipe : function() {
            var width;
            var scale;
            /** @type {number} */
            var I = 30;
            /** @type {number} */
            var O = 201;
            var rowOrigin;
            /** @type {string} */
            var moveDirection = "";
            var s = {};
            var i;
            var point;
            /** @type {number} */
            var offset = 0;
            var a = {
                transition : $.browser.cssTransform + String.fromCharCode(32) + "300ms cubic-bezier(.18,.35,.58,1)"
            };
            var model;
            var S;
            var target = callback(function(e) {
                if (!this.ready || this.zoomBox.active) {
                    return;
                }
                if (e.state === "dragstart") {
                    clearTimeout(this.activateTimer);
                    /** @type {null} */
                    this.activateTimer = null;
                    /** @type {number} */
                    offset = 0;
                    s = {
                        x : e.x,
                        y : e.y,
                        ts : e.timeStamp
                    };
                    width = this.size.width;
                    /** @type {number} */
                    scale = width / 2;
                    this.image.node.jRemoveEvent("transitionend");
                    this.image.node.jSetCssProp("transition", "");
                    this.image.node.jSetCssProp("transform", "translate3d(0, 0, 0)");
                    /** @type {null} */
                    S = null;
                } else {
                    /** @type {number} */
                    i = e.x - s.x;
                    point = {
                        x : 0,
                        y : 0,
                        z : 0
                    };
                    if (S === null) {
                        /** @type {boolean} */
                        S = Math.abs(e.x - s.x) < Math.abs(e.y - s.y);
                    }
                    if (S) {
                        return;
                    }
                    e.stop();
                    if (e.state === "dragend") {
                        /** @type {number} */
                        offset = 0;
                        /** @type {null} */
                        model = null;
                        /** @type {number} */
                        rowOrigin = e.timeStamp - s.ts;
                        if (Math.abs(i) > scale || rowOrigin < O && Math.abs(i) > I) {
                            if (moveDirection = i > 0 ? "backward" : i <= 0 ? "forward" : "") {
                                if (moveDirection === "backward") {
                                    model = this.getPrev();
                                    /** @type {number} */
                                    offset = offset + width * 10;
                                } else {
                                    model = this.getNext();
                                    /** @type {number} */
                                    offset = offset - width * 10;
                                }
                            }
                        }
                        /** @type {number} */
                        point.x = offset;
                        /** @type {number} */
                        point.deg = -90 * (point.x / width);
                        this.image.node.jAddEvent("transitionend", callback(function(canCreateDiscussions) {
                            this.image.node.jRemoveEvent("transitionend");
                            this.image.node.jSetCssProp("transition", "");
                            if (model) {
                                this.image.node.jSetCss({
                                    transform : "translate3d(" + point.x + "px, 0px, 0px)"
                                });
                                this.update(model, true);
                            }
                        }).jBind(this));
                        this.image.node.jSetCss(a);
                        this.image.node.jSetCss({
                            "transition-duration" : point.x ? "100ms" : "300ms",
                            opacity : 1 - .2 * Math.abs(point.x / width),
                            transform : "translate3d(" + point.x + "px, 0px, 0px)"
                        });
                        /** @type {number} */
                        i = 0;
                        return;
                    }
                    /** @type {number} */
                    point.x = i;
                    /** @type {number} */
                    point.z = -50 * Math.abs(point.x / scale);
                    /** @type {number} */
                    point.deg = -60 * (point.x / scale);
                    this.image.node.jSetCss({
                        opacity : 1 - .2 * Math.abs(point.x / scale),
                        transform : "translate3d(" + point.x + "px, 0px, " + point.z + "px)"
                    });
                }
            }).jBind(this);
            this.node.jAddEvent("touchdrag", target);
        },
        pinchToZoom : function() {
            var diff = {
                width : 0,
                height : 0
            };
            /** @type {boolean} */
            var O = false;
            var size;
            var defaultValue = callback(function(i, elpos, canCreateDiscussions) {
                var newWidth;
                var newHeight;
                if (!this.zoomBox.active && !canCreateDiscussions) {
                    return;
                }
                var previewImageDimensions = $.detach(this.zoomSize);
                /** @type {number} */
                newWidth = Math.max(size.width, Math.round(diff.width * i));
                /** @type {number} */
                newWidth = Math.min(newWidth, this.zoomSize.maxWidth);
                /** @type {number} */
                newHeight = newWidth / (this.zoomSize.maxWidth / this.zoomSize.maxHeight);
                /** @type {number} */
                this.zoomSize.width = Math.floor(newWidth);
                /** @type {number} */
                this.zoomSize.height = Math.floor(newHeight);
                /** @type {number} */
                this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / size.width));
                /** @type {number} */
                this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / size.height));
                this.lens.node.jSetCss({
                    width : this.lens.width,
                    height : this.lens.height
                });
                $.extend(this.lens, this.lens.node.jGetSize());
                clearTimeout(this.moveTimer);
                /** @type {null} */
                this.moveTimer = null;
                /** @type {number} */
                elpos.x = this.lens.spos.x * (this.zoomSize.width / previewImageDimensions.width) + (elpos.x - this.boundaries.left - this.size.width / 2) * (1 - this.zoomSize.width / previewImageDimensions.width);
                /** @type {number} */
                elpos.y = this.lens.spos.y * (this.zoomSize.height / previewImageDimensions.height) + (elpos.y - this.boundaries.top - this.size.height / 2) * (1 - this.zoomSize.height / previewImageDimensions.height);
                this.lens.spos = {
                    x : 0,
                    y : 0
                };
                this.lens.pos = {
                    x : 0,
                    y : 0
                };
                /** @type {boolean} */
                this.lens.innertouch = true;
                this.animate(null, {
                    x : elpos.x,
                    y : elpos.y
                });
                clearTimeout(this.moveTimer);
                /** @type {null} */
                this.moveTimer = null;
            }).jBind(this);
            var target = callback(function(options) {
                if (!O && options.state !== "pinchstart" && !options.cloned) {
                    return;
                }
                options.stop();
                var spaceClick = callback(window).jGetScroll();
                /** @type {boolean} */
                var url = false;
                var size = {
                    x : options.centerPoint.x - spaceClick.x,
                    y : options.centerPoint.y - spaceClick.y
                };
                switch(options.state) {
                    case "pinchstart":
                        this.unregisterAnimateEvent();
                        diff = $.detach(this.zoomSize);
                        if (this.expanded) {
                            size = this.image.node.jGetSize();
                        } else {
                            size = this.size;
                        }
                        clearTimeout(this.moveTimer);
                        /** @type {null} */
                        this.moveTimer = null;
                        if (this.zoomBox.active) {
                            this.lens.spos = $.detach(this.lens.pos);
                        }
                        /** @type {boolean} */
                        O = true;
                        break;
                    case "pinchend":
                        /** @type {boolean} */
                        O = false;
                        if (this.zoomBox.active) {
                            if (this.option("expandZoomOn") !== "always" && this.zoomSize.width <= size.width && this.zoomSize.height <= size.height) {
                                /** @type {boolean} */
                                O = false;
                                this.deactivate(null);
                            } else {
                                if (options.points.length > 0) {
                                    this.lens.spos = {
                                        x : options.points[0].clientX,
                                        y : options.points[0].clientY
                                    };
                                }
                            }
                        }
                        this.registerAnimateEvent();
                        break;
                    case "pinchresize":
                        break;
                    case "pinchmove":
                        if (this.expanded && options.zoom === -1 && (!this.zoomBox.active || this.option("expandZoomOn") === "always")) {
                            if (options.scale < outwardsMinScaleToTranslate) {
                                this.close();
                            }
                        } else {
                            if (this.expanded && options.zoom === 1 && this.option("expandZoomOn") === "always") {
                            } else {
                                if (this.option("expand") && !this.expanded) {
                                    if (options.scale > midpoint) {
                                        /** @type {boolean} */
                                        O = false;
                                        this.registerAnimateEvent();
                                        this.expand(options);
                                        return;
                                    }
                                } else {
                                    if (options.zoom === 1 && !this.zoomBox.active) {
                                        if (!this.image.loaded() || !this.ready || !this.zoomBox.enabled) {
                                            if (!this.image.loaded() && !this.initEvent) {
                                                if (options) {
                                                    this.initEvent = handleTouch(options);
                                                    options.stopQueue();
                                                }
                                                this.image.load(this.setupZoom.jBind(this));
                                                if (!this.loadTimer) {
                                                    this.loadTimer = callback(this.showLoading).jBind(this).jDelay(400);
                                                }
                                            }
                                            return;
                                        }
                                        /** @type {boolean} */
                                        this.zoomBox.activating = true;
                                        if (this.expanded && this.zoomBox.mode === "zoom") {
                                            this.expandStage.jAddClass("mz-zoom-in");
                                        }
                                        this.zoomBox.image.jRemoveEvent("transitionend");
                                        this.zoomBox.node.jRemoveClass("mz-deactivating").jRemoveEvent("transitionend");
                                        this.zoomBox.node.jAddClass("mz-activating");
                                        this.node.jAddClass("mz-activating");
                                        this.reflowZoom();
                                        this.zoomSize.width = size.width;
                                        this.zoomSize.height = size.height;
                                        /** @type {boolean} */
                                        this.zoomBox.activating = false;
                                        /** @type {boolean} */
                                        this.zoomBox.active = true;
                                        diff = $.detach(this.zoomSize);
                                        this.zoomBox.node.jRemoveClass("mz-activating");
                                        this.node.jRemoveClass("mz-activating").jAddClass("mz-active");
                                        this.lens.spos = {
                                            x : 0,
                                            y : 0
                                        };
                                        this.lens.pos = {
                                            x : 0,
                                            y : 0
                                        };
                                        /** @type {boolean} */
                                        url = true;
                                    }
                                    defaultValue(options.scale, size, url);
                                    if (url) {
                                        bind("onZoomIn", this.id);
                                    }
                                }
                            }
                        }
                        break;
                }
            }).jBind(this);
            this.node.jAddEvent("pinch", target);
        },
        setupButtons : function() {
            /** @type {!DocumentFragment} */
            var video = document.createDocumentFragment();
            callback(["prev", "next", "close"]).jEach(function(type) {
                /** @type {string} */
                var dialog = "mz-button";
                this.buttons[type] = $.$new("button", {
                    title : this.option("text-btn-" + type)
                }).jAddClass(dialog).jAddClass(dialog + "-" + type);
                video.appendChild(this.buttons[type]);
                switch(type) {
                    case "prev":
                        this.buttons[type].jAddEvent("tap btnclick", function(incoming_item) {
                            incoming_item.stop();
                            this.update(this.getPrev());
                        }.jBindAsEvent(this));
                        break;
                    case "next":
                        this.buttons[type].jAddEvent("tap btnclick", function(incoming_item) {
                            incoming_item.stop();
                            this.update(this.getNext());
                        }.jBindAsEvent(this));
                        break;
                    case "close":
                        this.buttons[type].jAddEvent("tap btnclick", function(incoming_item) {
                            incoming_item.stop();
                            this.close();
                        }.jBindAsEvent(this)).hide();
                        break;
                    default:
                }
            }, this);
            this.toggleNavButtons(this.additionalImages.length > 1);
            this.navControlsLayer = $.$new("div").jAddClass("mz-nav-controls").append(video).jAppendTo(this.node);
        },
        toggleNavButtons : function(canCreateDiscussions) {
            if (canCreateDiscussions) {
                this.buttons.next.show();
                this.buttons.prev.show();
            } else {
                this.buttons.next.hide();
                this.buttons.prev.hide();
            }
        },
        setupExpandGallery : function() {
            var galleryName;
            var identifierPositions;
            if (this.additionalImages.length) {
                this.expandGallery = this.additionalImages;
            } else {
                galleryName = this.placeholder.getAttribute("data-gallery");
                if (galleryName) {
                    if ($.browser.features.query) {
                        identifierPositions = $.$A(document.querySelectorAll('.MagicZoom[data-gallery="' + galleryName + '"], .MagicZoomPlus[data-gallery="' + galleryName + '"]'));
                    } else {
                        identifierPositions = $.$A(document.getElementsByTagName("A")).filter(function($this) {
                            return galleryName === $this.getAttribute("data-gallery");
                        });
                    }
                    callback(identifierPositions).jEach(function(child) {
                        var data;
                        var obj;
                        data = cb(child);
                        if (data && data.additionalImages.length > 0) {
                            return;
                        }
                        if (data) {
                            obj = new load(data.image.small.url, data.image.zoom.url, data.image.caption, null, data.image.origin);
                            obj.link = data.image.link;
                        } else {
                            obj = (new load).parseNode(child, data ? data.originalTitle : null);
                        }
                        if ((this.image.zoom.src.has(obj.zoom.url) || this.image.zoom.url.has(obj.zoom.url)) && (this.image.small.src.has(obj.small.url) || this.image.small.url.has(obj.small.url))) {
                            obj = this.image;
                        }
                        this.expandGallery.push(obj);
                    }, this);
                    this.primaryImage = this.image;
                }
            }
            if (!this.expandedViewId) {
                /** @type {number} */
                this.expandedViewId = Math.floor(Math.random() * $.now());
            }
            if (this.expandGallery.length > 1) {
                this.expandStage.jAddClass("with-thumbs");
                this.expandNav = $.$new("div", {
                    "class" : "mz-expand-thumbnails"
                }).jAppendTo(this.expandStage);
                this.expandThumbs = new __m1(this.expandNav);
                callback(this.expandGallery).jEach(function(item) {
                    var iserr = callback(function(canCreateDiscussions) {
                        this.setActiveThumb(item);
                        this.update(item);
                    }).jBind(this);
                    item.selector = this.expandThumbs.addItem($.$new("img", {
                        src : item.getURL("small")
                    }).jAddEvent("tap btnclick", function(incoming_item) {
                        incoming_item.stop();
                    }).jAddEvent("tap " + (this.option("selectorTrigger") === "hover" ? "mouseover mouseout" : "btnclick"), callback(function(event, mmCoreSplitViewBlock) {
                        if (this.updateTimer) {
                            clearTimeout(this.updateTimer);
                        }
                        /** @type {boolean} */
                        this.updateTimer = false;
                        if (event.type === "mouseover") {
                            this.updateTimer = callback(iserr).jDelay(mmCoreSplitViewBlock);
                        } else {
                            if (event.type === "tap" || event.type === "btnclick") {
                                iserr();
                            }
                        }
                    }).jBindAsEvent(this, 60)));
                }, this);
            } else {
                this.expandStage.jRemoveClass("with-thumbs");
            }
            this.toggleNavButtons(this.expandGallery.length > 1);
            this.buttons.close.show();
        },
        destroyExpandGallery : function() {
            var me;
            if (this.expandThumbs) {
                this.expandThumbs.stop();
                /** @type {null} */
                this.expandThumbs = null;
            }
            if (this.expandNav) {
                this.expandNav.jRemove();
                /** @type {null} */
                this.expandNav = null;
            }
            this.toggleNavButtons(this.additionalImages.length > 1);
            this.buttons.close.hide();
            if (this.expandGallery.length > 1 && !this.additionalImages.length) {
                this.node.jRemoveEvent("touchdrag");
                this.image.node.jRemove().getAttribute("style");
                this.image.node.removeAttribute("style");
                this.primaryImage.node.jAppendTo(this.node);
                this.setupZoom(this.primaryImage);
                for (; me = this.expandGallery.pop();) {
                    if (me !== this.primaryImage) {
                        if (me.small.node) {
                            me.small.node.kill();
                            /** @type {null} */
                            me.small.node = null;
                        }
                        if (me.zoom.node) {
                            me.zoom.node.kill();
                            /** @type {null} */
                            me.zoom.node = null;
                        }
                        /** @type {null} */
                        me = null;
                    }
                }
            }
            /** @type {!Array} */
            this.expandGallery = [];
        },
        close : function() {
            if (!this.ready || !this.expanded) {
                return;
            }
            if ($.browser.platform === "ios" && $.browser.uaName === "safari" && parseInt($.browser.uaVersion) === 7) {
                clearInterval(logIntervalId);
                /** @type {null} */
                logIntervalId = null;
            }
            callback(document).jRemoveEvent("keydown", this.keyboardCallback);
            this.deactivate(null, true);
            /** @type {boolean} */
            this.ready = false;
            if ($.browser.fullScreen.capable && $.browser.fullScreen.enabled()) {
                $.browser.fullScreen.cancel();
            } else {
                if ($.browser.features.transition) {
                    this.node.jRemoveEvent("transitionend").jSetCss({
                        transition : ""
                    });
                    this.node.jAddEvent("transitionend", this.onClose);
                    if ($.browser.webkit) {
                        setTimeout(callback(function() {
                            this.onClose();
                        }).jBind(this), 260);
                    }
                    this.expandBg.jRemoveEvent("transitionend").jSetCss({
                        transition : ""
                    });
                    this.expandBg.jSetCss({
                        transition : "all 0.6s cubic-bezier(0.895, 0.030, 0.685, 0.220) 0.0s"
                    }).jGetSize();
                    this.node.jSetCss({
                        transition : "all .3s cubic-bezier(0.600, 0, 0.735, 0.045) 0s"
                    }).jGetSize();
                    if (this.zoomBox.mode !== false && this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== "magnifier") {
                        this.image.node.jSetCss({
                            "max-height" : this.image.jGetSize("zoom").height
                        });
                        this.image.node.jSetCss({
                            "max-width" : this.image.jGetSize("zoom").width
                        });
                    }
                    this.expandBg.jSetCss({
                        opacity : .4
                    });
                    this.node.jSetCss({
                        opacity : .01,
                        transform : "scale(0.4)"
                    });
                } else {
                    this.onClose();
                }
            }
        },
        expand : function(event) {
            if (!this.image.loaded() || !this.ready || this.expanded) {
                if (!this.image.loaded() && !this.initEvent) {
                    if (event) {
                        this.initEvent = handleTouch(event);
                        event.stopQueue();
                        if (event.type === "tap") {
                            event.events[1].stopQueue();
                        }
                    }
                    this.image.load(this.setupZoom.jBind(this));
                    if (!this.loadTimer) {
                        this.loadTimer = callback(this.showLoading).jBind(this).jDelay(400);
                    }
                }
                return;
            }
            if (event) {
                event.stopQueue();
            }
            var rowContainer = callback(this.node).jFetch("cr");
            this.hideHint();
            this.hintRuns--;
            this.deactivate(null, true);
            this.unregisterActivateEvent();
            this.unregisterDeactivateEvent();
            /** @type {boolean} */
            this.ready = false;
            if (!this.expandBox) {
                this.expandBox = $.$new("div").jAddClass("mz-expand").jAddClass(this.option("cssClass")).jSetCss({
                    opacity : 0
                });
                this.expandStage = $.$new("div").jAddClass("mz-expand-stage").jAppendTo(this.expandBox);
                this.expandBox.jAddEvent("mousescroll touchstart dbltap", callback(function(e) {
                    callback(e).stop();
                }));
                if (this.option("closeOnClickOutside")) {
                    this.expandBox.jAddEvent("tap btnclick", function(options) {
                        var rect2 = options.jGetPageXY();
                        var rect = callback(this.option("expandZoomMode") === "magnifier" ? this.zoomBox.node : this.zoomBox.image).jGetRect();
                        if (this.option("expandZoomOn") !== "always" && rect.top <= rect2.y && rect2.y <= rect.bottom && rect.left <= rect2.x && rect2.x <= rect.right) {
                            options.stopQueue();
                            this.deactivate(options);
                            return;
                        }
                        if (this.option("expandZoomOn") !== "always" && this.node.hasChild(options.getOriginalTarget())) {
                            return;
                        }
                        options.stop();
                        this.close();
                    }.jBindAsEvent(this));
                }
                this.keyboardCallback = callback(function(e) {
                    /** @type {null} */
                    var both = null;
                    if (e.keyCode !== 27 && e.keyCode !== 37 && e.keyCode !== 39) {
                        return;
                    }
                    callback(e).stop();
                    if (e.keyCode === 27) {
                        this.close();
                    } else {
                        both = e.keyCode === 37 ? this.getPrev() : this.getNext();
                        if (both) {
                            this.update(both);
                        }
                    }
                }).jBindAsEvent(this);
                this.onExpand = callback(function() {
                    var O;
                    this.node.jRemoveEvent("transitionend").jSetCss({
                        transition : "",
                        transform : "translate3d(0, 0, 0)"
                    });
                    if (this.expanded) {
                        return;
                    }
                    /** @type {boolean} */
                    this.expanded = true;
                    if (this.option("history")) {
                        try {
                            /** @type {string} */
                            var hash = "#mz-expanded-view-" + this.expandedViewId;
                            if (window.location.hash !== hash) {
                                if (history.state && history.state.expandedView && history.state.mzId) {
                                    history.replaceState({
                                        expandedView : this.expandedViewId,
                                        mzId : this.id
                                    }, document.title, hash);
                                } else {
                                    history.pushState({
                                        expandedView : this.expandedViewId,
                                        mzId : this.id
                                    }, document.title, hash);
                                }
                            }
                        } catch (N) {
                        }
                    }
                    this.expandBox.jRemoveClass("mz-expand-opening").jSetCss({
                        opacity : 1
                    });
                    this.zoomBox.setMode(this.option("expandZoomMode"));
                    this.zoomSize = $.detach(this.zoomSizeOrigin);
                    this.resizeCallback();
                    if (this.expandCaption && this.image.caption) {
                        this.expandCaption.jAddClass("mz-show");
                    }
                    if (this.option("expandZoomOn") !== "always") {
                        this.registerActivateEvent(true);
                        this.registerDeactivateEvent(true);
                    }
                    /** @type {boolean} */
                    this.ready = true;
                    if (this.option("expandZoomOn") === "always") {
                        if (this.zoomBox.mode !== false) {
                            this.zoomBox.enable(true);
                        }
                        if ($.browser.mobile && this.mobileZoomHint) {
                            /** @type {boolean} */
                            this.mobileZoomHint = false;
                        }
                        this.activate();
                    }
                    if (($.browser.mobile || this.option("forceTouch")) && this.mobileZoomHint && this.zoomBox.enabled) {
                        this.showHint(true, this.option("textClickZoomHint"));
                        if (this.hintRuns !== Infinity) {
                            /** @type {boolean} */
                            this.mobileZoomHint = false;
                        }
                    }
                    this.navControlsLayer.jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible");
                    if (this.expandNav) {
                        this.expandNav.jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible");
                    }
                    if (this.expandThumbs) {
                        this.expandThumbs.run();
                        this.setActiveThumb(this.image);
                    }
                    if (rowContainer) {
                        rowContainer.jAppendTo(this.expandBox, (Math.floor(Math.random() * 101) + 1) % 2 ? "top" : "bottom");
                    }
                    if (this.expandGallery.length > 1 && !this.additionalImages.length) {
                        this.swipe();
                    }
                    callback(document).jAddEvent("keydown", this.keyboardCallback);
                    if ($.browser.platform === "ios" && $.browser.uaName === "safari" && parseInt($.browser.uaVersion) === 7) {
                        logIntervalId = resize();
                    }
                    bind("onExpandOpen", this.id);
                }).jBind(this);
                this.onClose = callback(function() {
                    this.node.jRemoveEvent("transitionend");
                    if (!this.expanded) {
                        return;
                    }
                    if (this.expanded) {
                        callback(document).jRemoveEvent("keydown", this.keyboardCallback);
                        this.deactivate(null, true);
                    }
                    this.setSize(true);
                    this.destroyExpandGallery();
                    /** @type {boolean} */
                    this.expanded = false;
                    if (this.option("history")) {
                        if (window.location.hash === "#mz-expanded-view-" + this.expandedViewId) {
                            history.back();
                        }
                    }
                    this.zoomBox.setMode(this.option("zoomMode"));
                    this.node.replaceChild(this.image.getNode("small"), this.image.node);
                    this.image.setCurNode("small");
                    callback(this.image.node).jSetCss({
                        width : "",
                        height : "",
                        "max-width" : Math.min(this.image.jGetSize("small").width),
                        "max-height" : Math.min(this.image.jGetSize("small").height)
                    });
                    this.lens.image.src = this.image.getURL("small");
                    this.node.jSetCss({
                        opacity : "",
                        transition : ""
                    });
                    this.node.jSetCss({
                        transform : "translate3d(0, 0, 0)"
                    });
                    callback(this.placeholder).replaceChild(this.node, this.stubNode);
                    this.navControlsLayer.jRemoveClass("mz-expand-controls").jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible").jAppendTo(this.node);
                    this.setSize(true);
                    if (this.expandCaption) {
                        this.expandCaption.jRemove();
                        /** @type {null} */
                        this.expandCaption = null;
                    }
                    this.unregisterActivateEvent();
                    this.unregisterDeactivateEvent();
                    if (this.option("zoomOn") === "always") {
                        this.activate();
                    } else {
                        if (this.option("zoomMode") !== false) {
                            this.registerActivateEvent(this.option("zoomOn") === "click");
                            this.registerDeactivateEvent(this.option("zoomOn") === "click");
                        }
                    }
                    this.showHint();
                    this.expandBg.jRemoveEvent("transitionend");
                    this.expandBox.jRemove();
                    this.expandBg.jRemove();
                    /** @type {null} */
                    this.expandBg = null;
                    if (playerObserver) {
                        playerObserver.jRemove();
                    }
                    callback($.browser.getDoc()).jRemoveClass("mz-expanded-view-open");
                    /** @type {boolean} */
                    this.ready = true;
                    if ($.browser.ieMode < 10) {
                        this.resizeCallback();
                    } else {
                        callback(window).jRaiseEvent("UIEvent", "resize");
                    }
                    bind("onExpandClose", this.id);
                }).jBind(this);
                this.expandImageStage = $.$new("div", {
                    "class" : "mz-image-stage"
                }).jAppendTo(this.expandStage);
                this.expandFigure = $.$new("figure").jAppendTo(this.expandImageStage);
                this.stubNode = this.node.cloneNode(false);
            }
            this.navControlsLayer.jAddClass("mz-expand-controls").jAppendTo(this.expandImageStage);
            this.setupExpandGallery();
            if (playerObserver) {
                playerObserver.jAppendTo(document.body);
            }
            callback($.browser.getDoc()).jAddClass("mz-expanded-view-open");
            callback(document.body).jGetSize();
            if (this.option("expand") === "fullscreen") {
                this.prepareExpandedView();
                $.browser.fullScreen.request(this.expandBox, {
                    onEnter : callback(function() {
                        this.onExpand();
                    }).jBind(this),
                    onExit : this.onClose,
                    fallback : callback(function() {
                        this.expandToWindow();
                    }).jBind(this)
                });
            } else {
                setTimeout(callback(function() {
                    this.prepareExpandedView();
                    this.expandToWindow();
                }).jBind(this), 96);
            }
        },
        prepareExpandedView : function() {
            var el;
            var element_box;
            el = $.$new("img", {
                srcset : this.image.getURL("zoom") + " " + this.image.getRatio("zoom") + "x",
                src : this.image.getURL("zoom")
            });
            this.expandBg = $.$new("div").jAddClass("mz-expand-bg").append($.browser.features.cssFilters || $.browser.ieMode < 10 ? el : (new $.SVGImage(el)).blur(id).getNode()).jAppendTo(this.expandBox);
            if (this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== false) {
                this.expandStage.jAddClass("mz-always-zoom" + (this.option("expandZoomMode") === "zoom" ? " mz-zoom-in" : "")).jGetSize();
            }
            element_box = callback(this.node)[$.browser.ieMode < 10 ? "jGetSize" : "getBoundingClientRect"]();
            callback(this.stubNode).jSetCss({
                width : element_box.width,
                height : element_box.height
            });
            this.node.replaceChild(this.image.getNode("zoom"), this.image.node);
            this.image.setCurNode("zoom");
            this.expandBox.jAppendTo(document.body);
            if (playerObserver) {
                this.expandBox.jSetCss({
                    height : window.innerHeight,
                    maxHeight : "100vh",
                    top : Math.abs(playerObserver.getBoundingClientRect().top)
                });
            }
            this.expandMaxWidth = function() {
                var identifierPositions = this.expandImageStage;
                if (callback(this.expandFigure).jGetSize().width > 50) {
                    identifierPositions = this.expandFigure;
                }
                return function() {
                    return this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== false && this.option("expandZoomMode") !== "magnifier" ? Infinity : Math.round(callback(identifierPositions).getInnerSize().width);
                };
            }.call(this);
            this.expandMaxHeight = function() {
                var identifierPositions = this.expandImageStage;
                if (callback(this.expandFigure).jGetSize().height > 50) {
                    identifierPositions = this.expandFigure;
                }
                return function() {
                    return this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== false && this.option("expandZoomMode") !== "magnifier" ? Infinity : Math.round(callback(identifierPositions).getInnerSize().height);
                };
            }.call(this);
            this.navControlsLayer.jRemoveClass("mz-fade mz-visible").jAddClass("mz-hidden");
            if (this.expandNav) {
                this.expandNav.jRemoveClass("mz-fade mz-visible").jAddClass("mz-hidden");
            }
            if (this.option("expandCaption")) {
                this.expandCaption = $.$new("figcaption", {
                    "class" : "mz-caption"
                }).jAppendTo(this.expandImageStage);
                if (this.expandCaption && this.image.caption) {
                    if (this.image.link) {
                        this.expandCaption.append($.$new("a", {
                            href : this.image.link
                        }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(this.image.caption));
                    } else {
                        this.expandCaption.changeContent(this.image.caption);
                    }
                }
            }
            this.image.node.jSetCss({
                "max-height" : Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
            });
            this.image.node.jSetCss({
                "max-width" : Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
            });
            this.expandFigure.append(callback(this.placeholder).replaceChild(this.stubNode, this.node));
        },
        expandToWindow : function() {
            this.node.jSetCss({
                transition : ""
            });
            this.node.jSetCss({
                transform : "scale(0.6)"
            }).jGetSize();
            this.node.jSetCss({
                transition : $.browser.cssTransform + " 0.4s cubic-bezier(0.175, 0.885, 0.320, 1) 0s"
            });
            if ($.browser.features.transition) {
                this.node.jAddEvent("transitionend", this.onExpand);
                if ($.browser.chrome && ($.browser.uaName === "chrome" || $.browser.uaName === "opera")) {
                    setTimeout(callback(function() {
                        this.onExpand();
                    }).jBind(this), 500);
                }
            } else {
                this.onExpand.jDelay(16, this);
            }
            this.expandBox.jSetCss({
                opacity : 1
            });
            this.node.jSetCss({
                transform : "scale(1)"
            });
        },
        openLink : function() {
            if (this.image.link) {
                window.open(this.image.link, "_self");
            }
        },
        getNext : function() {
            var collection = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(feature) {
                return feature.small.state !== -1 || feature.zoom.state !== -1;
            });
            var index = collection.length;
            var i = callback(collection).indexOf(this.image) + 1;
            return index <= 1 ? null : collection[i >= index ? 0 : i];
        },
        getPrev : function() {
            var b = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(feature) {
                return feature.small.state !== -1 || feature.zoom.state !== -1;
            });
            var len = b.length;
            /** @type {number} */
            var i = callback(b).indexOf(this.image) - 1;
            return len <= 1 ? null : b[i < 0 ? len - 1 : i];
        },
        imageByURL : function(name, value) {
            var K = this.additionalImages.filter(function(options) {
                return (options.zoom.src.has(name) || options.zoom.url.has(name)) && (options.small.src.has(value) || options.small.url.has(value));
            }) || [];
            return K[0] || (value && name && $.jTypeOf(value) === "string" && $.jTypeOf(name) === "string" ? new load(value, name) : null);
        },
        imageByOrigin : function(listener) {
            var K = this.additionalImages.filter(function(event) {
                return event.origin === listener;
            }) || [];
            return K[0];
        },
        imageByIndex : function(path_to_action) {
            return this.additionalImages[path_to_action];
        }
    };
    self = {
        version : "v5.3.2 (Plus) for MagicToolbox.com",
        start : function(name, cb) {
            /** @type {null} */
            var app = null;
            /** @type {!Array} */
            var obj = [];

            function cb(name) {
                /** @type {!Array} */
                var cnameParts = [];
                /** @type {null} */
                var n = null;
                if (name && (n = callback(name))) {
                    cnameParts = result.filter(function(f) {
                        return f.placeholder === n;
                    });
                }
                return cnameParts.length ? cnameParts[0] : null;
            }

            $.$A(name ? [callback(name)] : $.$A(document.byClass("MagicZoom")).concat($.$A(document.byClass("MagicZoomPlus")))).jEach(callback(function(server) {
                if (callback(server)) {
                    if (!cb(server)) {
                        app = new init(server, cb);
                        if (l && !app.option("autostart")) {
                            app.stop();
                            /** @type {null} */
                            app = null;
                        } else {
                            result.push(app);
                            obj.push(app);
                        }
                    }
                }
            }).jBind(this));
            return name ? obj[0] : obj;
        },
        stop : function(time) {
            var i;
            var value;
            var K;
            if (time) {
                if ((value = cb(time)) && (value = result.splice(result.indexOf(value), 1)) && value[0].stop()) {
                    delete value[0];
                }
                return;
            }
            for (; i = result.length;) {
                value = result.splice(i - 1, 1);
                value[0].stop();
                delete value[0];
            }
        },
        refresh : function(from) {
            this.stop(from);
            return this.start(from);
        },
        optionCustomRu : function(){
            options.textHoverZoomHint.default = "Наведите, чтобы увеличить";
            options.textClickZoomHint.default = "Нажмите, чтобы увеличить";
            options.textBtnNext.default = "Следующий";
            options.textBtnPrev.default = "Предыдущий";
            options.textBtnClose.default = "Закрыть";
            options.textExpandHint.default = "Нажмите, чтобы развернуть";

            element.textHoverZoomHint.default = "Наведите, чтобы увеличить";
            element.textClickZoomHint.default = "Нажмите, чтобы увеличить";
        },
        optionCustomEn : function(){
            options.textHoverZoomHint.default = "Hover to zoom";
            options.textClickZoomHint.default = "Click to zoom";
            options.textBtnNext.default = "Next";
            options.textBtnPrev.default = "Previous";
            options.textBtnClose.default = "Close";
            options.textExpandHint.default = "Click to expand";

            element.textHoverZoomHint.default = "Hover to zoom";
            element.textClickZoomHint.default = "Click to zoom";
        },
        optionCustomUa : function(){
            options.textHoverZoomHint.default = "Наведіть щоб збільшити";
            options.textClickZoomHint.default = "Нажміть щоб збільшити";
            options.textBtnNext.default = "Наступний";
            options.textBtnPrev.default = "Попередній";
            options.textBtnClose.default = "Закрити";
            options.textExpandHint.default = "Нажміть щоб розгорнути";

            element.textHoverZoomHint.default = "Наведіть щоб збільшити";
            element.textClickZoomHint.default = "Нажміть щоб збільшити";
        },
        update : function(value, i, e, animate) {
            var v = cb(value);
            var gatewayToken;
            if (v) {
                gatewayToken = $.jTypeOf(i) === "element" ? v.imageByOrigin(i) : v.imageByURL(i, e);
                if (gatewayToken) {
                    v.update(gatewayToken);
                }
            }
        },
        switchTo : function(url, data) {
            var res = cb(url);
            var gatewayToken;
            if (res) {
                switch($.jTypeOf(data)) {
                    case "element":
                        gatewayToken = res.imageByOrigin(data);
                        break;
                    case "number":
                        gatewayToken = res.imageByIndex(data);
                        break;
                    default:
                }
                if (gatewayToken) {
                    res.update(gatewayToken);
                }
            }
        },
        prev : function(image) {
            var result;
            if (result = cb(image)) {
                result.update(result.getPrev());
            }
        },
        next : function(end) {
            var res;
            if (res = cb(end)) {
                res.update(res.getNext());
            }
        },
        zoomIn : function(services) {
            var app;
            if (app = cb(services)) {
                app.activate();
            }
        },
        zoomOut : function(value) {
            var a;
            if (a = cb(value)) {
                a.deactivate();
            }
        },
        expand : function(template) {
            var result;
            if (result = cb(template)) {
                result.expand();
            }
        },
        close : function(value) {
            var ss;
            if (ss = cb(value)) {
                ss.close();
            }
        },
        registerCallback : function(name, value) {
            if (!containers[name]) {
                /** @type {!Array} */
                containers[name] = [];
            }
            if ($.jTypeOf(value) === "function") {
                containers[name].push(value);
            }
        },
        running : function(value) {
            return !!cb(value);
        }
    };
    callback(document).jAddEvent("domready", function() {
        var callbacks = window[name + "Options"] || {};
        i = i();
        initMidi();
        parent = $.$new("div", {
            "class" : "magic-hidden-wrapper"
        }).jAppendTo(document.body);
        isShortcut = $.browser.mobile && window.matchMedia && window.matchMedia("(max-device-width: 767px), (max-device-height: 767px)").matches;
        if ($.browser.mobile) {
            $.extend(options, element);
        }
        if (isShortcut && $.browser.platform === "ios") {
            playerObserver = $.$new("div").jSetCss({
                position : "fixed",
                top : 0,
                width : 0,
                height : "100vh"
            });
        }
        /** @type {number} */
        var j = 0;
        for (; j < names.length; j++) {
            if (callbacks[names[j]] && $.$F !== callbacks[names[j]]) {
                self.registerCallback(names[j], callbacks[names[j]]);
            }
        }
        self.start();
        /** @type {boolean} */
        l = false;
    });
    window.MagicZoomPlus = window.MagicZoomPlus || {};
    return self;
}();
