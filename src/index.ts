export default function isEqual(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  const typeA = a.constructor.name;
  const typeB = b.constructor.name;

  if (typeA !== typeB) {
    return false;
  }

  if (typeof a !== "object") {
    if (a !== a) {
      return b !== b;
    }

    return a === b;
  }

  if (typeA === "Date") {
    return a.toString() === b.toString();
  }

  if (typeA === "Map") {
    if (a.size !== b.size) {
      return false;
    }

    for (const key of [...a.keys()]) {
      if (!isEqual(a.get(key), b.get(key))) {
        return false;
      }
    }

    return true;
  }

  if (typeA === "Set") {
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

  if (typeA === "Array") {
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

  if (typeA === "RegExp") {
    return a.source === b.source && a.flags === b.flags;
  }

  const objKeysA = Object.keys(a);
  const objKeysB = Object.keys(b);

  if (objKeysA.length !== objKeysB.length) {
    return false;
  }

  for (const key of objKeysA) {
    if (!isEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
