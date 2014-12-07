Namespaces in JavaScript
========================

This is a little function that gives you a nice, easy syntax for declaring and
consuming namespaces in JavaScript. It doesn't do anything other than handling
namespaces: it doesn't attempt to load in other scripts or modules, for example.

It follows a few design criteria that I had:

  1. I wanted to have a single IIFE-style closure for each file. This is so that
     I can have a single `"use strict";` statement in each file, without it
     interfering with other files that don't use strict mode when they are
     concatenated and minified.
  2. I wanted to be able to pass other namespaces and objects into the top level
     closure as namespace aliases, so that if another rogue script sneaks in a
     `jQuery.noConflict()` statement, the `$` identifier can still be made
     available regardless. Also, so that I can declare shortcuts to other
     namespaces elsewhere and save on typing.

Usage
-----

Using namespace.js is quite simple. A namespace declaration looks like this:

    namespace("My.Namespace")
    .using(jQuery)
    .using(Backbone)
    .define(function($, bb) {
        "use strict";

        this.showMessage = function(msg) {
            $('#message').html(msg).show();
        };
    });

So...what's going on here then?

  * The argument to the `namespace` function is the name of your namespace.
  * The `using` method calls are optional and can be chained. They will define
    objects that the module is using.
  * The `define` method call is your declaring function This function receives
    your namespace itself in its `this` object, and the items in your usings as
    its own arguments.

Passing arguments to your namespace declaration in this way allows you to
declare aliases for other namespaces or objects. For instance, in the example
above, `$` will be declared as an alias for the `jQuery` instance, and `bb` will
be declared as an alias for the `Backbone` namespace of backbone.js.

You can spread a namespace definition over several files if you like: the
members of each definition will be merged together.

If you want to pass other namespace objects to your module definition, you can
use the `.using.namespace(...)` approach. This is useful if you need to have
circular references between your namespaces, or if the order of definition of
your namespaces is nondeterministic (e.g. in bundling/minification):

    namespace("My.First.Namespace")
    .using(jQuery)
    .using.namespace("My.Other.Namespace")
    .define(function($, other) {
        /* whatever */
    });

    namespace ("My.Other.Namespace")
    .using(jQuery)
    .using.namespace("My.First.Namespace")
    .define(function($, first) {
        /* whatever */
    });
