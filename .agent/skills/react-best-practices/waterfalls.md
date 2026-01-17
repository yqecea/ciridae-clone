## 1. Eliminating Waterfalls (CRITICAL)

- `async-defer-await` - Move await into branches where actually used
- `async-parallel` - Use Promise.all() for independent operations
- `async-dependencies` - Use better-all for partial dependencies
- `async-api-routes` - Start promises early, await late in API routes
- `async-suspense-boundaries` - Use Suspense to stream content

### async-defer-await

Move await into branches where actually used. Don't block unused code paths.

**❌ Incorrect (blocks both branches):**
```javascript
async function handleRequest(userId, skipProcessing) {
  const userData = await fetchUserData(userId)
  
  if (skipProcessing) {
    // Returns immediately but still waited for userData
    return { skipped: true }
  }
  
  // Only this branch uses userData
  return processUserData(userData)
}
```

**✅ Correct (only blocks when needed):**
```javascript
async function handleRequest(userId, skipProcessing) {
  if (skipProcessing) {
    return { skipped: true }
  }
  
  const userData = await fetchUserData(userId)
  return processUserData(userData)
}
```

### async-parallel

Use Promise.all() for independent operations.

**❌ Incorrect (sequential):**
```javascript
const user = await getUser(id)
const orders = await getOrders(id)
const settings = await getSettings(id)
```

**✅ Correct (parallel):**
```javascript
const [user, orders, settings] = await Promise.all([
  getUser(id),
  getOrders(id),
  getSettings(id)
])
```
