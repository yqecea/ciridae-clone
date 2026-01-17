## 7. JavaScript Performance (LOW-MEDIUM)

- `js-batch-dom-css` - Group CSS changes via classes or cssText
- `js-index-maps` - Build Map for repeated lookups
- `js-cache-property-access` - Cache object properties in loops
- `js-cache-function-results` - Cache function results in module-level Map
- `js-cache-storage` - Cache localStorage/sessionStorage reads
- `js-combine-iterations` - Combine multiple filter/map into one loop
- `js-length-check-first` - Check array length before expensive comparison
- `js-early-exit` - Return early from functions
- `js-hoist-regexp` - Hoist RegExp creation outside loops
- `js-min-max-loop` - Use loop for min/max instead of sort
- `js-set-map-lookups` - Use Set/Map for O(1) lookups
- `js-tosorted-immutable` - Use toSorted() for immutability

### js-combine-iterations

Combine multiple filter/map into one loop.

**❌ Incorrect:**
```javascript
const results = items
  .filter(x => x.active)
  .map(x => x.value)
  .filter(x => x > 0)
```

**✅ Correct:**
```javascript
const results = []
for (const item of items) {
  if (item.active && item.value > 0) {
    results.push(item.value)
  }
}
```

### js-set-map-lookups

Use Set/Map for O(1) lookups.

**❌ Incorrect (O(n) for each lookup):**
```javascript
const isSelected = selectedIds.includes(id)
```

**✅ Correct (O(1) lookup):**
```javascript
const selectedSet = new Set(selectedIds)
const isSelected = selectedSet.has(id)
```

### js-early-exit

Return early from functions.

```javascript
function process(items) {
  if (!items?.length) return []
  if (items.length === 1) return [transform(items[0])]
  // Heavy processing only when needed
  return items.map(transform)
}
```
