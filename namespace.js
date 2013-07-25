/* ====== namespace.js ====== */

/**
 * Declares a namespace in JavaScript.
 *
 * @param {String} ns
 *  The name of the namespace to declare.
 * @param {Array} usings
 *  An array of objects (e.g. other namespaces) for which we want to create
 *  aliases in our namespace declaration. This parameter is optional.
 * @param {function(aliases...)} fn
 *  A function which is called to set up the namespace. It will receive the
 *  namespace object as its value for `this`, and the elements of the `usings`
 *  array as its arguments. To add new functions, classes etc to the namespace,
 *  assign them as properties of `this`.
 * @returns {Object}
 *  The namespace object.
 */

function namespace(ns) {
    "use strict";

    var path = ns.split('.');
    var target = window;
    for (var i = 0; i < path.length; i++) {
        var part = path[i];
        if (target.hasOwnProperty(part)) {
            target = target[part];
        }
        else {
            target = target[part] = {};
        }
    }

    var args, obj;

    switch (arguments.length) {
        case 1:
            return target;
        case 2:
            args = [];
            obj = arguments[1];
            break;
        default:
            args = arguments[1];
            obj = arguments[2];
            break;
    }

    if (typeof obj === "function") {
        obj = obj.apply(target, args);
    }
    else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                target[key] = obj[key];
            }
        }
    }
    return target;
}
