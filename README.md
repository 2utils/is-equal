## @2utils/is-equal

An ordinary isEqual function.

```
npm i @2utils/is-equal
```

## Tests
Tests were brazenly stolen from ```lodash```

#### Passed
- [x] should compare primitives
- [x] should compare arrays
- [x] should treat arrays with identical values but different non-index properties as equal
- [x] should compare sparse arrays
- [x] should compare plain objects
- [x] should compare objects regardless of key order
- [x] should compare nested objects
- [x] should compare object instances
- [x] should compare functions
- [x] should compare objects with constructor properties
- [x] should compare objects with shared property values
- [x] should avoid common type coercions
- [x] should compare `arguments` objects
- [x] should compare date objects
- [x] should compare functions
- [x] should return an unwrapped value when implicitly chaining
- [x] should compare maps

#### Not passed
- [ ] should compare arrays with circular references
- [ ] should have transitive equivalence for circular references of arrays
- [ ] should compare objects with circular references
- [ ] should have transitive equivalence for circular references of objects
- [ ] should compare objects with multiple circular references
- [ ] should compare objects with complex circular references
- [ ] should treat objects created by `Object.create(null)` like plain objects
- [ ] should compare array buffers
- [ ] should compare array views
- [ ] should compare buffers
- [ ] should compare error objects
- [ ] should compare maps with circular references
- [ ] should compare promises by reference
- [ ] should compare regexes
- [ ] should compare sets
- [ ] should compare sets with circular references
- [ ] should compare symbol properties
- [ ] should compare wrapped values
- [ ] should compare wrapped and non-wrapped values
- [ ] should work as an iteratee for `_.every`
- [ ] should not error on DOM elements
- [ ] should return `true` for like-objects from different documents
- [ ] should return `false` for objects with custom `toString` methods
- [ ] should return a wrapped value when explicitly chaining

| fast-deep-equal|       | x 192,807 ops/sec ±4.70% (74 runs sampled) |
| fast-equals            | x 184,628 ops/sec ±3.08% (82 runs sampled) |
| fast-deep-equal/es6    | x 174,303 ops/sec ±2.97% (80 runs sampled) |
| nano-equal             | x 117,140 ops/sec ±2.71% (80 runs sampled) |
| shallow-equal-fuzzy    | x 108,784 ops/sec ±2.30% (81 runs sampled) |
| 💩 @2utils/is-equal    | x 74,711 ops/sec ±2.97% (83 runs sampled) |
| underscore.isEqual     | x 61,908 ops/sec ±2.00% (86 runs sampled) |
| util.isDeepStrictEqual | x 41,996 ops/sec ±2.06% (86 runs sampled) |
| deep-eql               | x 29,872 ops/sec ±2.27% (82 runs sampled) |
| lodash.isEqual         | x 29,244 ops/sec ±11.17% (82 runs sampled) |
| deep-equal             | x 62.60 ops/sec ±4.23% (47 runs sampled) |
| assert.deepStrictEqual | x 248 ops/sec ±2.01% (82 runs sampled) |
| ramda.equals           | x 9,763 ops/sec ±2.94% (85 runs sampled) |
