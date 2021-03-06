export default function isEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (a === null || b === null) {
    return false;
  }

  if (typeof a !== "object") {
    return a !== a && b !== b; // isNaN || false
  }

  if (
    a.constructor !== b.constructor &&
    "constructor" in a &&
    "constructor" in b
  ) {
    return false;
  }

  if (a instanceof Array) {
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  if (a instanceof Date) {
    return a.valueOf() === b.valueOf();
  }

  if (a instanceof Map) {
    if (a.size !== b.size) {
      return false;
    }

    for (const key of a.keys()) {
      if (!b.has(key)) {
        return false;
      }

      if (!isEqual(a.get(key), b.get(key))) {
        return false;
      }
    }

    return true;
  }

  if (a instanceof Set) {
    if (a.size !== b.size) {
      return false;
    }

    for (const val of a.values()) {
      if (!b.has(val)) {
        return false;
      }
    }

    return true;
  }

  if (a instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  if (a instanceof ArrayBuffer) {
    if (a.byteLength !== b.byteLength) {
      return false;
    }

    const intA = new Int8Array(a);
    const intB = new Int8Array(b);

    for (let i = 0; i < a.byteLength; i++) {
      if (intA[i] !== intB[i]) {
        return false;
      }
    }

    return true;
  }

  const objKeysA = Object.keys(a);

  if (objKeysA.length !== Object.keys(b).length) {
    return false;
  }

  for (const key of objKeysA) {
    if (!b.hasOwnProperty(key)) {
      return false;
    }

    if (!isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
