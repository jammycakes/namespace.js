Namespaces in JavaScript
========================

This is a little function that gives you a nice, easy syntax for declaring and
consuming namespaces in JavaScript. It doesn't do anything other than handling
namespaces: it doesn't attempt to load in other scripts or modules, for example.

Usage
-----

Using namespace.js is quite simple. A namespace declaration looks like this:

    namespace("My.Namespace", [jQuery, Backbone], function($, bb) {
        "use strict";

        this.showMessage = function(msg) {
            $('#message').html(msg).show();
        };
    });

So...what's going on here then? The `namespace()` method takes three arguments:

  * The first argument is the name of your namespace.
  * The second argument is optional. It will be an array of namespace objects
    that this module will be using.
  * The third argument is your declaring function. This function receives your
    namespace itself in its `this` object, and the items in your usings as its
    own arguments.

Passing arguments to your namespace declaration in this way allows you to
declare aliases for other namespaces or objects. For instance, in the example
above, `$` will be declared as an alias for the `jQuery` instance, and `bb` will
be declared as an alias for the `Backbone` namespace of backbone.js.

You can spread a namespace definition over several files if you like: the
members of each definition will be merged together.

Calling the `namespace` function with only the namespace name will return the
namespace object. This is useful if your namespaces need to have circular
references to each other:

    namespace ("My.First.Namespace",
        [jQuery, namespace("My.Other.Namespace")],
        function ($, other) {

        /* whatever */
    });

    namespace ("My.Other.Namespace",
        [jQuery, namespace("My.First.Namespace")],
        function ($, first) {

        /* whatever */
    });