## 8. Advanced Patterns (LOW)

- `advanced-event-handler-refs` - Store event handlers in refs
- `advanced-use-latest` - useLatest for stable callback refs

### advanced-event-handler-refs

Store event handlers in refs for stable references.

```javascript
function useEventCallback(fn) {
  const ref = useRef(fn)
  useLayoutEffect(() => {
    ref.current = fn
  })
  return useCallback((...args) => ref.current(...args), [])
}

// Usage
const handleClick = useEventCallback((e) => {
  // Can use latest state/props without stale closures
  console.log(count)
})
```

### advanced-use-latest

useLatest for stable callback refs.

```javascript
function useLatest(value) {
  const ref = useRef(value)
  ref.current = value
  return ref
}

// Usage
function Component({ onSubmit }) {
  const onSubmitRef = useLatest(onSubmit)
  
  useEffect(() => {
    // Always calls latest onSubmit without re-subscribing
    socket.on('message', () => onSubmitRef.current())
    return () => socket.off('message')
  }, []) // Empty deps, but always latest callback
}
```
