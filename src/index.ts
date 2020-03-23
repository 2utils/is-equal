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

  a = a.valueOf();
  b = b.valueOf();

  if (!isObject(a)) {
    return comparePrimitiveLike(a, b);
  }

  if (!isObject(b)) {
    return false;
  }

  if (isInstancesOfDifferentClass(a, b)) {
    return false;
  }

  const isArrayA = Array.isArray(a);
  const isArrayB = Array.isArray(b);

  if (isArrayA !== isArrayB) {
    return false;
  }

  const objAKeys = isArrayA ? getArrayKeys(a) : Object.keys(a);
  const objBKeys = isArrayB ? getArrayKeys(b) : Object.keys(b);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  for (const key of objAKeys) {
    const result = isEqual(a[key], b[key]);

    if (!result) {
      return false;
    }
  }

  return true;
}
