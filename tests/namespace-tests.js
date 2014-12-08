test("Can declare namespace without usings", function() {
    var ns = namespace("My.Namespace.One")
        .define(function() {
            this.message = 'Hello world';
        });

    equal('Hello world', My.Namespace.One.message);
    delete My;
});

test("Can declare namespace with usings", function() {
    var msg = "Hello world";

    var ns = namespace("My.Namespace.Two")
        .using(msg)
        .define(function(m) {
            this.message = m;
        });

    equal(msg, My.Namespace.Two.message);
    delete My;
});

test("Can declare empty namespace", function() {
    var ns = namespace("My.Namespace.Three").define();
    strictEqual("object", typeof My.Namespace.Three);
    delete My;
});

test("Circular references between namespaces", function() {

    namespace ("My.First.Namespace")
        .using.namespace("My.Other.Namespace")
        .define(function (other) {

        this.getName = function() {
            return "My.First.Namespace";
        };

        this.getOtherName = function() {
            return other.getName();
        };
    });

    namespace ("My.Other.Namespace")
        .using.namespace("My.First.Namespace")
        .define(function (first) {

        this.getName = function() {
            return "My.Other.Namespace";
        };

        this.getOtherName = function() {
            return first.getName();
        };
    });

    equal("My.Other.Namespace", My.First.Namespace.getOtherName());
    equal("My.First.Namespace", My.Other.Namespace.getOtherName());

    delete My;
});

test("Anonymous namespace", function() {
    var testData = '';

    var nsOther = namespace("My.Other.Namespace")
        .define(function() {
            this.testData = 'Test';
        });

    var nsAnon = namespace().using.namespace("My.Other.Namespace")
        .define(function(other) {

            testData = other.testData;
        });

    equal("Test", testData);

    delete My;

});
