import isEqual from ".";

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

});
