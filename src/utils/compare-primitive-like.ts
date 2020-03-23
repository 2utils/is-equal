import { isNan } from "./index";

export default function(a: any, b: any) {
  if (isNan(a)) {
    return isNan(b);
  }

  return a === b;
}
