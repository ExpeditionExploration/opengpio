class A {
    static param = { a: 1 };

    // The explicit 'this' parameter allows us to capture the calling class type.
    static method<T extends typeof A>(opt: keyof T["param"]) {
        console.log(opt);
    }
}

class B extends A {
    static param = { a: 1, b: 2 };
}

// var a = new A()
// a.method('a');

// var b = new B()
// b.method('b');

A.method('a');
B.method('b');