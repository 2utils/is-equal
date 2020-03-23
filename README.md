## @2utils/is-equal

An ordinary isEqual function.

```
npm i @2utils/is-equal
```

## Test
Tests were brazenly stolen from ```lodash```

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
- [ ] should compare arrays with circular references
- [ ] should have transitive equivalence for circular references of arrays
- [ ] should compare objects with circular references
- [ ] should have transitive equivalence for circular references of objects
- [ ] should compare objects with multiple circular references
- [ ] should compare objects with complex circular references
- [x] should compare objects with shared property values
- [ ] should treat objects created by `Object.create(null)` like plain objects
- [x] should avoid common type coercions
- [x] should compare `arguments` objects
