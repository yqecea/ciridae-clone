## 4. Client-Side Data Fetching (MEDIUM-HIGH)

- `client-swr-dedup` - Use SWR for automatic request deduplication
- `client-event-listeners` - Deduplicate global event listeners

### client-swr-dedup

Use SWR for automatic request deduplication.

```javascript
import useSWR from 'swr'

function useUser(id) {
  const { data, error, isLoading } = useSWR(
    `/api/users/${id}`,
    fetcher,
    { dedupingInterval: 2000 }
  )
  return { user: data, error, isLoading }
}

// Multiple components can call useUser(id)
// SWR deduplicates requests automatically
```

### client-event-listeners

Deduplicate global event listeners.

**❌ Incorrect:**
```javascript
function Component() {
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
}
```

**✅ Correct (shared listener):**
```javascript
const resizeCallbacks = new Set()
let resizeListener = null

function subscribeResize(callback) {
  resizeCallbacks.add(callback)
  if (!resizeListener) {
    resizeListener = () => resizeCallbacks.forEach(cb => cb())
    window.addEventListener('resize', resizeListener)
  }
  return () => {
    resizeCallbacks.delete(callback)
    if (resizeCallbacks.size === 0) {
      window.removeEventListener('resize', resizeListener)
      resizeListener = null
    }
  }
}
```
