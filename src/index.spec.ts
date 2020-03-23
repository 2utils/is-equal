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
});
