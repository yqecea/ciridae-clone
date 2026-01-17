## 3. Server-Side Performance (HIGH)

- `server-cache-react` - Use React.cache() for per-request deduplication
- `server-cache-lru` - Use LRU cache for cross-request caching
- `server-serialization` - Minimize data passed to client components
- `server-parallel-fetching` - Restructure components to parallelize fetches
- `server-after-nonblocking` - Use after() for non-blocking operations

### server-cache-react

Use React.cache() for per-request deduplication.

```javascript
import { cache } from 'react'

const getUser = cache(async (id) => {
  return await db.user.findUnique({ where: { id } })
})

// Can call getUser(id) multiple times in same request
// Only one DB query will be made
```

### server-serialization

Minimize data passed to client components.

**❌ Incorrect:**
```javascript
// Server Component
const user = await getUser(id) // 50 fields
return <ClientComponent user={user} />
```

**✅ Correct:**
```javascript
// Server Component
const user = await getUser(id)
return <ClientComponent 
  name={user.name} 
  avatar={user.avatar} 
/>
```
