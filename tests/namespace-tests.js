test("Can declare namespace without usings", function() {

    var ns = namespace("My.Namespace.One", function() {
        this.message = 'Hello world';
    });

    equal('Hello world', My.Namespace.One.message);
    delete My;
});

test("Can declare namespace with usings", function() {
    var msg = "Hello world";

    var ns = namespace("My.Namespace.Two", [msg], function(m) {
        this.message = m;
    });

    equal(msg, My.Namespace.Two.message);
    delete My;
});

test("Can declare empty namespace", function() {
    var ns = namespace("My.Namespace.Three");
    strictEqual("object", typeof My.Namespace.Three);
    delete My;
});

test("Disallow a non-array for our usings", function() {

    throws(function() {
        var ns = namespace("My.Namespace.Four", "Hello world", function(x) {
            this.message = x;
        });
    });
});
