export default function(a: any, b: any) {
  return a.constructor.name !== b.constructor.name;
}
