/* ====== namespace.js ====== */

/**
 * Declares a namespace in JavaScript.
 *
 * This function can be called in one of two ways:
 *
 * namespace(ns, obj)
 *  Declares a namespace, by ensuring that a global variable called ns exists,
 *  and appending all the properties of obj to it.
 *
 * namespace(ns, [usings], fn)
 *  Declares a namespace, by ensuring that a global variable called ns exists,
 *  and calls fn passing it the arguments in usings.
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
