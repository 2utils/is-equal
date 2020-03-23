import {
  comparePrimitiveLike,
  getArrayKeys,
  isInstancesOfDifferentClass,
  isObject
} from "./utils";

export default function isEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  const valueOfA = a.valueOf();
  const valueOfB = b.valueOf();

  if (!isObject(valueOfA)) {
    return comparePrimitiveLike(valueOfA, valueOfB);
  }

  if (!isObject(valueOfB)) {
    return false;
  }

  if (isInstancesOfDifferentClass(valueOfA, valueOfB)) {
    return false;
  }

  const isArrayA = Array.isArray(valueOfA);
  const isArrayB = Array.isArray(valueOfB);

  if (isArrayA !== isArrayB) {
    return false;
  }

  const objAKeys = isArrayA ? getArrayKeys(valueOfA) : Object.keys(valueOfA);
  const objBKeys = isArrayB ? getArrayKeys(valueOfB) : Object.keys(valueOfB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  for (const key of objAKeys) {
    const result = isEqual(valueOfA[key], valueOfB[key]);

    if (!result) {
      return false;
    }
  }

  return true;
}
