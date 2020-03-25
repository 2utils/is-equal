const hasToValue: any = {
  Number: true,
  String: true,
  Boolean: true,
  Date: true,
  Symbol: true
};

function getArrayKeys(array: any[]): number[] {
  const keys = [];
  for (let i = 0; i <= array.length; i++) {
    keys.push(i);
  }

  return keys;
}

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

  a = hasToValue[typeA] ? a.valueOf() : a;
  b = hasToValue[typeB] ? b.valueOf() : b;

  if (typeof a !== "object") {
    if (a !== a) {
      return b !== b;
    }

    return a === b;
  }
  if (typeA === "RegExp") {
    return a.source === b.source && a.flags === b.flags;
  }

  if (typeA === "Map") {
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

  const objKeysA = typeA === "Array" ? getArrayKeys(a) : Object.keys(a);
  const objKeysB = typeB === "Array" ? getArrayKeys(b) : Object.keys(b);

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
