/* ====== namespace.js ====== */

/**
 * Declares a namespace in JavaScript.
 *
 * @param {String} ns
 *  The name of the namespace to declare.
 * @returns {Object}
 *  A namespace definition. This will be an object that declares the following
 *  methods:
 *   * using - adds one or more objects to the using list.
 *   * using.namespace - adds a namespace object to the using list.
 *   * define - defines the contents of the namespace.
 */

function namespace(ns) {
    "use strict";

    function NamespaceDefinition(ns, container) {
        var usings = [];
        var self = this;

        function getNamespaceObject(namespaceToGet) {
            var path = namespaceToGet.split('.');
            var target = container;
            for (var i = 0; i < path.length; i++) {
                var part = path[i];
                if (target.hasOwnProperty(part)) {
                    target = target[part];
                }
                else {
                    target = target[part] = {};
                }
            }
            return target;
        }

        self.using = function() {
            usings = usings.concat([].slice.call(arguments));
            return self;
        };

        self.using.namespace = function(namespaceName) {
            usings.push(getNamespaceObject(namespaceName));
            return self;
        };

        self.define = function(fn) {
            var target = getNamespaceObject(ns);
            if (typeof fn === "function") {
                fn.apply(target, usings);
            }
            else {
                for (var key in fn) {
                    if (fn.hasOwnProperty(key)) {
                        target[key] = fn[key];
                    }
                }
            }
            return self;
        };
    }

    return new NamespaceDefinition(ns, window);
}
