## 5. Re-render Optimization (MEDIUM)

- `rerender-defer-reads` - Don't subscribe to state only used in callbacks
- `rerender-memo` - Extract expensive work into memoized components
- `rerender-dependencies` - Use primitive dependencies in effects
- `rerender-derived-state` - Subscribe to derived booleans, not raw values
- `rerender-functional-setstate` - Use functional setState for stable callbacks
- `rerender-lazy-state-init` - Pass function to useState for expensive values
- `rerender-transitions` - Use startTransition for non-urgent updates

### rerender-lazy-state-init

Pass function to useState for expensive initial values.

**❌ Incorrect (runs on every render):**
```javascript
const [config] = useState(JSON.parse(localStorage.getItem('config')))
```

**✅ Correct (runs only once):**
```javascript
const [config] = useState(() => JSON.parse(localStorage.getItem('config')))
```

### rerender-memo

Extract expensive work into memoized components.

```javascript
const ExpensiveList = memo(function ExpensiveList({ items }) {
  return items.map(item => <ExpensiveItem key={item.id} {...item} />)
})
```

### rerender-functional-setstate

Use functional setState for stable callbacks.

**❌ Incorrect (new function each render):**
```javascript
const increment = () => setCount(count + 1)
```

**✅ Correct (stable reference):**
```javascript
const increment = useCallback(() => setCount(c => c + 1), [])
```
