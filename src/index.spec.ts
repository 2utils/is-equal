import isEqual from ".";

const noop = function() {};

describe("isEqual", () => {
  // @ts-ignore
  const symbol1 = Symbol ? Symbol("a") : true;
  // @ts-ignore
  const symbol2 = Symbol ? Symbol("b") : false;

  test("should compare primitives", function() {
    const pairs = [
      [1, 1, true],
      [1, Object(1), true],
      [1, "1", false],
      [1, 2, false],
      [-0, -0, true],
      [0, 0, true],
      [0, Object(0), true],
      [Object(0), Object(0), true],
      [-0, 0, true],
      [0, "0", false],
      [0, null, false],
      [NaN, NaN, true],
      [NaN, Object(NaN), true],
      [Object(NaN), Object(NaN), true],
      [NaN, "a", false],
      [NaN, Infinity, false],
      ["a", "a", true],
      ["a", Object("a"), true],
      [Object("a"), Object("a"), true],
      ["a", "b", false],
      ["a", ["a"], false],
      [true, true, true],
      [true, Object(true), true],
      [Object(true), Object(true), true],
      [true, 1, false],
      [true, "a", false],
      [false, false, true],
      [false, Object(false), true],
      [Object(false), Object(false), true],
      [false, 0, false],
      [false, "", false],
      [symbol1, symbol1, true],
      [symbol1, Object(symbol1), true],
      [Object(symbol1), Object(symbol1), true],
      [symbol1, symbol2, false],
      [null, null, true],
      [null, undefined, false],
      [null, {}, false],
      [null, "", false],
      [undefined, undefined, true],
      [undefined, null, false],
      [undefined, "", false]
    ];

    const result = pairs.every(([a, b, isEqualActual]) => {
      return isEqual(a, b) === isEqualActual;
    });

    expect(result).toBe(true);
  });

  test("should compare arrays", function() {
    let array1: any[] = [true, null, 1, "a", undefined];
    let array2: any[] = [true, null, 1, "a", undefined];

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];
    array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [1];
    array1[2] = 3;

    array2 = [1];
    array2[1] = undefined;
    array2[2] = 3;

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [
      Object(1),
      false,
      Object("a"),
      /x/,
      new Date(2012, 4, 23),
      ["a", "b", [Object("c")]],
      { a: 1 }
    ];
    array2 = [
      1,
      Object(false),
      "a",
      /x/,
      new Date(2012, 4, 23),
      ["a", Object("b"), ["c"]],
      { a: 1 }
    ];

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [1, 2, 3];
    array2 = [3, 2, 1];

    expect(isEqual(array1, array2)).toBe(false);

    array1 = [1, 2];
    array2 = [1, 2, 3];

    expect(isEqual(array1, array2)).toBe(false);
  });

  test("should treat arrays with identical values but different non-index properties as equal", function() {
    let array1: any = [1, 2, 3];
    let array2: any = [1, 2, 3];

    array1.every = array1.filter = array1.forEach = array1.indexOf = array1.lastIndexOf = array1.map = array1.some = array1.reduce = array1.reduceRight = null;

    array2.concat = array2.join = array2.pop = array2.reverse = array2.shift = array2.slice = array2.sort = array2.splice = array2.unshift = null;

    expect(isEqual(array1, array2)).toBe(true);

    array1 = [1, 2, 3];
    array1.a = 1;

    array2 = [1, 2, 3];
    array2.b = 1;

    expect(isEqual(array1, array2)).toBe(true);

    array1 = /c/.exec("abcde");
    array2 = ["c"];

    expect(isEqual(array1, array2)).toBe(true);
  });

  test("should compare sparse arrays", function() {
    const array = Array(1);

    expect(isEqual(array, Array(1))).toBe(true);
    expect(isEqual(array, [undefined])).toBe(true);
    expect(isEqual(array, Array(2))).toBe(false);
  });

  test("should compare plain objects", function() {
    let object1: any = { a: true, b: null, c: 1, d: "a", e: undefined };
    let object2: any = { a: true, b: null, c: 1, d: "a", e: undefined };

    expect(isEqual(object1, object2)).toBe(true);

    object1 = { a: [1, 2, 3], b: new Date(2012, 4, 23), c: /x/, d: { e: 1 } };
    object2 = { a: [1, 2, 3], b: new Date(2012, 4, 23), c: /x/, d: { e: 1 } };

    expect(isEqual(object1, object2)).toBe(true);

    object1 = { a: 1, b: 2, c: 3 };
    object2 = { a: 3, b: 2, c: 1 };

    expect(isEqual(object1, object2)).toBe(false);

    object1 = { a: 1, b: 2, c: 3 };
    object2 = { d: 1, e: 2, f: 3 };

    expect(isEqual(object1, object2)).toBe(false);

    object1 = { a: 1, b: 2 };
    object2 = { a: 1, b: 2, c: 3 };

    expect(isEqual(object1, object2)).toBe(false);
  });

  test("should compare objects regardless of key order", function() {
    const object1 = { a: 1, b: 2, c: 3 };
    const object2 = { c: 3, a: 1, b: 2 };

    expect(isEqual(object1, object2)).toBe(true);
  });

  test("should compare nested objects", function() {
    const object1 = {
      a: [1, 2, 3],
      b: true,
      c: Object(1),
      d: "a",
      e: {
        f: ["a", Object("b"), "c"],
        g: Object(false),
        h: new Date(2012, 4, 23),
        i: noop,
        j: "a"
      }
    };

    const object2 = {
      a: [1, Object(2), 3],
      b: Object(true),
      c: 1,
      d: Object("a"),
      e: {
        f: ["a", "b", "c"],
        g: false,
        h: new Date(2012, 4, 23),
        i: noop,
        j: "a"
      }
    };

    expect(isEqual(object1, object2)).toBe(true);
  });

  test("should compare object instances", function() {
    class Foo {
      a = 1;
    }
    Foo.prototype.a = 1;

    class Bar {
      a = 1;
    }
    Bar.prototype.a = 2;

    expect(isEqual(new Foo(), new Foo())).toBe(true);
    expect(isEqual(new Foo(), new Bar())).toBe(false);
    expect(isEqual({ a: 1 }, new Foo())).toBe(false);
    expect(isEqual({ a: 2 }, new Bar())).toBe(false);
  });

  test("should compare functions", function() {
    function a() {
      return 1 + 2;
    }
    function b() {
      return 1 + 2;
    }

    expect(isEqual(a, a)).toBe(true);
    expect(isEqual(a, b)).toBe(false);
  });

  test("should compare objects with constructor properties", function() {
    expect(isEqual({ constructor: 1 }, { constructor: 1 })).toBe(true);
    expect(isEqual({ constructor: 1 }, { constructor: "1" })).toBe(false);
    expect(isEqual({ constructor: [1] }, { constructor: [1] })).toBe(true);
    expect(isEqual({ constructor: [1] }, { constructor: ["1"] })).toBe(false);
    expect(isEqual({ constructor: Object }, {})).toBe(false);
  });

  // test("should compare arrays with circular references", function() {
  //   let array1: any[] = [];
  //   let array2: any[] = [];
  //
  //   array1.push(array1);
  //   array2.push(array2);
  //
  //   expect(isEqual(array1, array2)).toBe(true);
  //
  //   array1.push("b");
  //   array2.push("b");
  //
  //   expect(isEqual(array1, array2)).toBe(true);
  //
  //   array1.push("c");
  //   array2.push("d");
  //
  //   expect(isEqual(array1, array2)).toBe(false);
  //
  //   array1 = ["a", "b", "c"];
  //   array1[1] = array1;
  //   array2 = ["a", ["a", "b", "c"], "c"];
  //
  //   expect(isEqual(array1, array2)).toBe(false);
  // });

  // test("should have transitive equivalence for circular references of arrays", function() {
  //   const array1: any[] = [];
  //   const array2: any[] = [array1];
  //   const array3: any[] = [array2];
  //
  //   array1[0] = array1;
  //
  //   expect(isEqual(array1, array2)).toBe(true);
  //   expect(isEqual(array2, array3)).toBe(true);
  //   expect(isEqual(array1, array3)).toBe(true);
  // });

  // test("should compare objects with circular references", function() {
  //   let object1: any = {};
  //   let object2: any = {};
  //
  //   object1.a = object1;
  //   object2.a = object2;
  //
  //   expect(isEqual(object1, object2)).toBe(true);
  //
  //   object1.b = 0;
  //   object2.b = Object(0);
  //
  //   expect(isEqual(object1, object2)).toBe(true);
  //
  //   object1.c = Object(1);
  //   object2.c = Object(2);
  //
  //   expect(isEqual(object1, object2)).toBe(false);
  //
  //   object1 = { a: 1, b: 2, c: 3 };
  //   object1.b = object1;
  //   object2 = { a: 1, b: { a: 1, b: 2, c: 3 }, c: 3 };
  //
  //   expect(isEqual(object1, object2)).toBe(false);
  // });

  // test("should have transitive equivalence for circular references of objects", function() {
  //   const object1: any = {};
  //   const object2: any = { a: object1 };
  //   const object3: any = { a: object2 };
  //
  //   object1.a = object1;
  //
  //   expect(isEqual(object1, object2)).toBe(true);
  //   expect(isEqual(object2, object3)).toBe(true);
  //   expect(isEqual(object1, object3)).toBe(true);
  // });

  // test("should compare objects with multiple circular references", function() {
  //   const array1: any = [{}];
  //   const array2: any = [{}];
  //
  //   (array1[0].a = array1).push(array1);
  //   (array2[0].a = array2).push(array2);
  //
  //   expect(isEqual(array1, array2)).toBe(true);
  //
  //   array1[0].b = 0;
  //   array2[0].b = Object(0);
  //
  //   expect(isEqual(array1, array2)).toBe(true);
  //
  //   array1[0].c = Object(1);
  //   array2[0].c = Object(2);
  //
  //   expect(isEqual(array1, array2)).toBe(false);
  // });

  // test("should compare objects with complex circular references", function() {
  //   const object1: any = {
  //     foo: { b: { c: { d: {} } } },
  //     bar: { a: 2 }
  //   };
  //
  //   const object2: any = {
  //     foo: { b: { c: { d: {} } } },
  //     bar: { a: 2 }
  //   };
  //
  //   object1.foo.b.c.d = object1;
  //   object1.bar.b = object1.foo.b;
  //
  //   object2.foo.b.c.d = object2;
  //   object2.bar.b = object2.foo.b;
  //
  //   expect(isEqual(object1, object2)).toBe(true);
  // });

  test("should compare objects with shared property values", function() {
    const object1: any = {
      a: [1, 2]
    };

    const object2: any = {
      a: [1, 2],
      b: [1, 2]
    };

    object1.b = object1.a;

    expect(isEqual(object1, object2)).toBe(true);
  });

  // test("should treat objects created by `Object.create(null)` like plain objects", function() {
  //   class Foo {
  //     a = 1;
  //   }
  //   // @ts-ignore
  //   Foo.prototype.constructor = null;
  //
  //   const object1 = Object.create(null);
  //   object1.a = 1;
  //
  //   const object2 = { a: 1 };
  //
  //   expect(isEqual(object1, object2)).toBe(true);
  //   expect(isEqual(new Foo(), object2)).toBe(false);
  // });

  test("should avoid common type coercions", function() {
    expect(isEqual(true, Object(false))).toBe(false);
    expect(isEqual(Object(false), Object(0))).toBe(false);
    expect(isEqual(false, Object(""))).toBe(false);
    expect(isEqual(Object(36), Object("36"))).toBe(false);
    expect(isEqual(0, "")).toBe(false);
    expect(isEqual(1, true)).toBe(false);
    expect(isEqual(1337756400000, new Date(2012, 4, 23))).toBe(false);
    expect(isEqual("36", 36)).toBe(false);
    expect(isEqual(36, "36")).toBe(false);
  });

  test("should compare `arguments` objects", function() {
    const args1 = (function() {
      return arguments;
    })();

    const args2 = (function() {
      return arguments;
    })();

    const args3 = (function(...args) {
      return arguments;
    })(1, 2);

    expect(isEqual(args1, args2)).toBe(true);
    expect(isEqual(args1, args3)).toBe(false);
  });
});
