import isEqual from ".";

const noop = function() {};

function _(obj: any) {
  return {
    isEqual: (obj2: any) => isEqual(obj, obj2)
  };
}

describe("isEqual", () => {
  // @ts-ignore
  const symbol1 = Symbol("a");
  // @ts-ignore
  const symbol2 = Symbol("b");

  test("should compare primitives", function() {
    const pairs = [
      [1, 1, true],
      [1, Number(1), true],
      [1, "1", false],
      [1, 2, false],
      [-0, -0, true],
      [0, 0, true],
      [0, Number(0), true],
      [Number(0), Number(0), true],
      [-0, 0, true],
      [0, "0", false],
      [0, null, false],
      [NaN, NaN, true],
      [NaN, Number(NaN), true],
      [Number(NaN), Number(NaN), true],
      [NaN, "a", false],
      [NaN, Infinity, false],
      ["a", "a", true],
      ["a", String("a"), true],
      [String("a"), String("a"), true],
      ["a", "b", false],
      ["a", ["a"], false],
      [true, true, true],
      [true, Boolean(true), true],
      [Boolean(true), Boolean(true), true],
      [true, 1, false],
      [true, "a", false],
      [false, false, true],
      [false, Boolean(false), true],
      [Boolean(false), Boolean(false), true],
      [false, 0, false],
      [false, "", false],
      [symbol1, symbol1, true],
      // [symbol1, Symbol(symbol1), true],
      // [Symbol(symbol1), Symbol(symbol1), true],
      [symbol1, symbol2, false],
      [null, null, true],
      [null, undefined, false],
      [null, {}, false],
      [null, "", false],
      [undefined, undefined, true],
      [undefined, null, false],
      [undefined, "", false]
    ];

    pairs.forEach(([a, b, isEqualActual]) => {
      expect(isEqual(a, b)).toBe(isEqualActual);
    });
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
      Number(1),
      false,
      String("a"),
      /x/,
      new Date(2012, 4, 23),
      ["a", "b", [String("c")]],
      { a: 1 }
    ];
    array2 = [
      1,
      Boolean(false),
      "a",
      /x/,
      new Date(2012, 4, 23),
      ["a", String("b"), ["c"]],
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
      c: Number(1),
      d: "a",
      e: {
        f: ["a", String("b"), "c"],
        g: Boolean(false),
        h: new Date(2012, 4, 23),
        i: noop,
        j: "a"
      }
    };

    const object2 = {
      a: [1, Number(2), 3],
      b: Boolean(true),
      c: 1,
      d: String("a"),
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

  // test("should compare array buffers", function() {
  //   if (ArrayBuffer) {
  //     const buffer = new Int8Array([-1]).buffer;
  //
  //     expect(isEqual(buffer, new Uint8Array([255]).buffer)).toStrictEqual(true);
  //     expect(isEqual(buffer, new ArrayBuffer(1))).toStrictEqual(false);
  //   }
  // });

  // test('should compare array views', function() {
  //   lodashStable.times(2, function(index) {
  //     var ns = index ? realm : root;
  //
  //     var pairs = lodashStable.map(arrayViews, function(type, viewIndex) {
  //       var otherType = arrayViews[(viewIndex + 1) % arrayViews.length],
  //         CtorA = ns[type] || function(n) { this.n = n; },
  //         CtorB = ns[otherType] || function(n) { this.n = n; },
  //         bufferA = ns[type] ? new ns.ArrayBuffer(8) : 8,
  //         bufferB = ns[otherType] ? new ns.ArrayBuffer(8) : 8,
  //         bufferC = ns[otherType] ? new ns.ArrayBuffer(16) : 16;
  //
  //       return [new CtorA(bufferA), new CtorA(bufferA), new CtorB(bufferB), new CtorB(bufferC)];
  //     });
  //
  //     var expected = lodashStable.map(pairs, lodashStable.constant([true, false, false]));
  //
  //     var actual = lodashStable.map(pairs, function(pair) {
  //       return [isEqual(pair[0], pair[1]), isEqual(pair[0], pair[2]), isEqual(pair[2], pair[3])];
  //     });
  //
  //     assert.deepStrictEqual(actual, expected);
  //   });
  // });
  //

  // test("should compare buffers", function() {
  //   if (Buffer) {
  //     var buffer = new Buffer([1]);
  //
  //     expect(isEqual(buffer, new Buffer([1]))).toBe(true);
  //     expect(isEqual(buffer, new Buffer([2]))).toBe(false);
  //     expect(isEqual(buffer, new Uint8Array([1]))).toBe(false);
  //   }
  // });

  test("should compare date objects", function() {
    const date = new Date(2012, 4, 23);

    expect(isEqual(date, new Date(2012, 4, 23))).toBe(true);
    expect(isEqual(new Date("a"), new Date("b"))).toBe(true);
    expect(isEqual(date, new Date(2013, 3, 25))).toBe(false);
    // expect(isEqual(date, { getTime: lodashStable.constant(+date) })).toBe(
    //   false
    // );
  });

  // test('should compare error objects', function() {
  //   var pairs = lodashStable.map([
  //     'Error',
  //     'EvalError',
  //     'RangeError',
  //     'ReferenceError',
  //     'SyntaxError',
  //     'TypeError',
  //     'URIError'
  //   ], function(type, index, errorTypes) {
  //     var otherType = errorTypes[++index % errorTypes.length],
  //       CtorA = root[type],
  //       CtorB = root[otherType];
  //
  //     return [new CtorA('a'), new CtorA('a'), new CtorB('a'), new CtorB('b')];
  //   });
  //
  //   var expected = lodashStable.map(pairs, lodashStable.constant([true, false, false]));
  //
  //   var actual = lodashStable.map(pairs, function(pair) {
  //     return [isEqual(pair[0], pair[1]), isEqual(pair[0], pair[2]), isEqual(pair[2], pair[3])];
  //   });
  //
  //   assert.deepStrictEqual(actual, expected);
  // });

  test("should compare maps", function() {
    // @ts-ignore
    const map1 = new Map();
    // @ts-ignore
    const map2 = new Map();

    map1.set("a", 1);
    map2.set("b", 2);
    expect(isEqual(map1, map2)).toStrictEqual(false);

    map1.set("b", 2);
    map2.set("a", 1);
    expect(isEqual(map1, map2)).toStrictEqual(true);

    map1.delete("a");
    map1.set("a", 1);
    expect(isEqual(map1, map2)).toStrictEqual(true);

    map2.delete("a");
    expect(isEqual(map1, map2)).toStrictEqual(false);

    map1.clear();
    map2.clear();
  });

  // test("should compare maps with circular references", function() {
  //   // @ts-ignore
  //   const map1 = new Map();
  //   // @ts-ignore
  //   const map2 = new Map();
  //
  //   map1.set("a", map1);
  //   map2.set("a", map2);
  //   expect(isEqual(map1, map2)).toStrictEqual(true);
  //
  //   map1.set("b", 1);
  //   map2.set("b", 2);
  //   expect(isEqual(map1, map2)).toStrictEqual(false);
  // });

  // test("should compare promises by reference", function() {
  //   // @ts-ignore
  //   const promise = Promise.resolve(1);
  //   const realm: any = {};
  //
  //   // TODO(andrey): не совсем понял правльно ли переписал лодашевский тест
  //   // @ts-ignore
  //   expect(isEqual(promise, Promise.resolve(1))).toStrictEqual(false);
  //   expect(isEqual(promise, realm.promise)).toStrictEqual(false);
  //   expect(isEqual(promise, promise)).toStrictEqual(true);
  // });

  test("should compare regexes", function() {
    expect(isEqual(/x/gim, /x/gim)).toStrictEqual(true);
    expect(isEqual(/x/gi, /x/g)).toStrictEqual(false);
    expect(isEqual(/x/, /y/)).toStrictEqual(false);
    expect(
      isEqual(/x/g, {
        global: true,
        ignoreCase: false,
        multiline: false,
        source: "x"
      })
    ).toStrictEqual(false);
  });

  test("should compare sets", function() {
    // @ts-ignore
    const set1 = new Set();
    // @ts-ignore
    const set2 = new Set();

    set1.add(1);
    set2.add(2);
    expect(isEqual(set1, set2)).toStrictEqual(false);

    set1.add(2);
    set2.add(1);
    expect(isEqual(set1, set2)).toStrictEqual(true);

    set1.delete(1);
    set1.add(1);
    expect(isEqual(set1, set2)).toStrictEqual(true);

    set2.delete(1);
    expect(isEqual(set1, set2)).toStrictEqual(false);

    set1.clear();
    set2.clear();
  });

  // test("should compare sets with circular references", function() {
  //   // @ts-ignore
  //   const set1 = new Set();
  //   // @ts-ignore
  //   const set2 = new Set();
  //
  //   set1.add(set1);
  //   set2.add(set2);
  //   expect(isEqual(set1, set2)).toStrictEqual(true);
  //
  //   set1.add(1);
  //   set2.add(2);
  //   expect(isEqual(set1, set2)).toStrictEqual(false);
  // });

  // test("should compare symbol properties", function() {
  //   const object1 = { a: 1 };
  //   const object2 = { a: 1 };
  //
  //   object1[symbol1] = { a: { b: 2 } };
  //   object2[symbol1] = { a: { b: 2 } };
  //
  //   defineProperty(object2, symbol2, {
  //     configurable: true,
  //     enumerable: false,
  //     writable: true,
  //     value: 2
  //   });
  //
  //   expect(isEqual(object1, object2)).toStrictEqual(true);
  //
  //   object2[symbol1] = { a: 1 };
  //   expect(isEqual(object1, object2)).toStrictEqual(false);
  //
  //   delete object2[symbol1];
  //   // @ts-ignore
  //   object2[Symbol("a")] = { a: { b: 2 } };
  //   expect(isEqual(object1, object2)).toStrictEqual(false);
  // });

  // test('should compare wrapped values', function() {
  //   var stamp = +new Date;
  //
  //   var values = [
  //     [[1, 2], [1, 2], [1, 2, 3]],
  //     [true, true, false],
  //     [new Date(stamp), new Date(stamp), new Date(stamp - 100)],
  //     [{ 'a': 1, 'b': 2 }, { 'a': 1, 'b': 2 }, { 'a': 1, 'b': 1 }],
  //     [1, 1, 2],
  //     [NaN, NaN, Infinity],
  //     [/x/, /x/, /x/i],
  //     ['a', 'a', 'A']
  //   ];
  //
  //   lodashStable.each(values, function(vals) {
  //     var wrapped1 = _(vals[0]),
  //       wrapped2 = _(vals[1]),
  //       actual = wrapped1.isEqual(wrapped2);
  //
  //     assert.strictEqual(actual, true);
  //     assert.strictEqual(isEqual(_(actual), _(true)), true);
  //
  //     wrapped1 = _(vals[0]);
  //     wrapped2 = _(vals[2]);
  //
  //     actual = wrapped1.isEqual(wrapped2);
  //     assert.strictEqual(actual, false);
  //     assert.strictEqual(isEqual(_(actual), _(false)), true);
  //   });
  // });

  // test("should compare wrapped and non-wrapped values", function() {
  //   let object1 = _({ a: 1, b: 2 });
  //   let object2 = { a: 1, b: 2 };
  //
  //   expect(object1.isEqual(object2)).toStrictEqual(true);
  //   expect(isEqual(object1, object2)).toStrictEqual(true);
  //
  //   object1 = _({ a: 1, b: 2 });
  //   object2 = { a: 1, b: 1 };
  //
  //   expect(object1.isEqual(object2)).toStrictEqual(false);
  //   expect(isEqual(object1, object2)).toStrictEqual(false);
  // });

  // test('should work as an iteratee for `_.every`', function() {
  //   var actual = lodashStable.every([1, 1, 1], lodashStable.partial(isEqual, 1));
  //   assert.ok(actual);
  // });

  // test("should not error on DOM elements", function() {
  //   const element1 = document.createElement("div"),
  //     element2 = element1.cloneNode(true);
  //
  //   try {
  //     expect(isEqual(element1, element2)).toStrictEqual(false);
  //   } catch (e) {
  //    // посмотреть этот тест в лодаше
  //     expect(e.message).toBe(false);
  //   }
  // });

  // test('should return `true` for like-objects from different documents', function() {
  //   if (realm.object) {
  //     assert.strictEqual(isEqual([1], realm.array), true);
  //     assert.strictEqual(isEqual([2], realm.array), false);
  //     assert.strictEqual(isEqual({ 'a': 1 }, realm.object), true);
  //     assert.strictEqual(isEqual({ 'a': 2 }, realm.object), false);
  //   }
  // });

  // test('should return `false` for objects with custom `toString` methods', function() {
  //   var primitive,
  //     object = { 'toString': function() { return primitive; } },
  //     values = [true, null, 1, 'a', undefined],
  //     expected = lodashStable.map(values, stubFalse);
  //
  //   var actual = lodashStable.map(values, function(value) {
  //     primitive = value;
  //     return isEqual(object, value);
  //   });
  //
  //   assert.deepStrictEqual(actual, expected);
  // });

  test("should return an unwrapped value when implicitly chaining", function() {
    expect(_("a").isEqual("a")).toStrictEqual(true);
  });

  // test("should return a wrapped value when explicitly chaining", function() {
  //   assert.ok(
  //     _("a")
  //       .chain()
  //       .isEqual("a") instanceof _
  //   );
  // });
});
