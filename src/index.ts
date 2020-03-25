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

  let typeA = a.constructor.name;
  let typeB = b.constructor.name;

  if (typeA !== typeB) {
    return false;
  }

  a = hasToValue[typeA] ? a.valueOf() : a;
  b = hasToValue[typeB] ? b.valueOf() : b;

  let isNanA = a !== a;
  let isNanB = b !== b;

  if (isNanA) {
    return isNanB;
  }

  if (typeof a !== "object") {
    return a === b;
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
