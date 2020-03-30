## @2utils/is-equal

An ordinary isEqual function.

```
npm i @2utils/is-equal
```

## Tests

Tests were brazenly stolen from `lodash`

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
- [x] should compare regexes
- [x] should compare sets
- [x] should compare buffers
- [x] should compare array buffers
- [x] should treat objects created by `Object.create(null)` like plain objects

#### Not passed

*Circular*
- [ ] should compare arrays with circular references
- [ ] should have transitive equivalence for circular references of arrays
- [ ] should compare objects with circular references
- [ ] should have transitive equivalence for circular references of objects
- [ ] should compare objects with multiple circular references
- [ ] should compare objects with complex circular references
- [ ] should compare maps with circular references
- [ ] should compare sets with circular references

---
- [ ] should compare array views
- [ ] should compare error objects
- [ ] should compare promises by reference
- [ ] should compare symbol properties
- [ ] should compare wrapped values
- [ ] should compare wrapped and non-wrapped values
- [ ] should work as an iteratee for `_.every`
- [ ] should not error on DOM elements
- [ ] should return `true` for like-objects from different documents
- [ ] should return `false` for objects with custom `toString` methods
- [ ] should return a wrapped value when explicitly chaining

## Benchmark

Tests were run from the `fast-deep-equal` package. They don 't show the real picture because I don 't cover all test cases. Just for fun.

| pos.   | package                 | results                                     |
| :----- | :---------------------- | :------------------------------------------ |
| 1.     | fast-deep-equal         | 218,604 ops/sec ±2.32% (80 runs sampled)    |
| **2.** | 🐢 **@2utils/is-equal** | **201,469 ops/sec ±2.59% (83 runs sampled)** |
| 3.     | fast-equals             | 195,025 ops/sec ±3.06% (79 runs sampled)    |
| 4.     | fast-deep-equal/es6     | 192,544 ops/sec ±2.60% (82 runs sampled)    |
| 5.     | nano-equal              | 126,143 ops/sec ±2.68% (79 runs sampled)    |
| 6.     | shallow-equal-fuzzy     | 112,192 ops/sec ±1.96% (83 runs sampled)    |
| 7.     | underscore.isEqual      | 62,441 ops/sec ±1.78% (86 runs sampled)     |
| 8.     | util.isDeepStrictEqual  | 45,652 ops/sec ±1.69% (85 runs sampled)     |
| 9.    | lodash.isEqual          | 34,102 ops/sec ±1.55% (87 runs sampled)    |
| 10.     | deep-eql                | 28,662 ops/sec ±5.36% (78 runs sampled)     |
| 11.    | ramda.equals            | 10,623 ops/sec ±1.84% (86 runs sampled)      |
| 12.    | assert.deepStrictEqual  | 271 ops/sec ±1.22% (82 runs sampled)        |
| 13.    | deep-equal              | 61.11 ops/sec ±4.58% (40 runs sampled)      |
