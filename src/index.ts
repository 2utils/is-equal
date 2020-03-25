import { comparePrimitiveLike, getArrayKeys, isObject } from "./utils";

const toValueOfArray = ["Number", "String", "Boolean", "Date", "Symbol"];

const hasToValue: any = {
  Number: true,
  String: true,
  Boolean: true,
  Date: true,
  Symbol: true
};

export default function isEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  let constructorNameA = a.constructor.name;
  let constructorNameB = b.constructor.name;

  if (constructorNameA !== constructorNameB) {
    return false;
  }

  a = hasToValue[constructorNameA] ? a.valueOf() : a;
  b = hasToValue[constructorNameB] ? b.valueOf() : b;

  let isNanA = a !== a;
  let isNanB = b !== b;

  if (isNanA) {
    return isNanB;
  }

  if (isNanB) {
    return isNanA;
  }

  if (typeof a !== "object") {
    return a === b;
  }

  if (typeof b !== "object") {
    return false;
  }

  if (constructorNameA === "Map") {
    if (a.size !== b.size) {
      return false;
    }

    for (const key of [...a.keys()]) {
      const result = isEqual(a.get(key), b.get(key));

      if (!result) {
        return false;
      }
    }

    return true;
  }

  const objKeysA =
    constructorNameA === "Array" ? getArrayKeys(a) : Object.keys(a);
  const objKeysB =
    constructorNameB === "Array" ? getArrayKeys(b) : Object.keys(b);

  if (objKeysA.length !== objKeysB.length) {
    return false;
  }

  for (const key of objKeysA) {
    const result = isEqual(a[key], b[key]);

    if (!result) {
      return false;
    }
  }

  return true;
}
