## 2. Bundle Size Optimization (CRITICAL)

- `bundle-barrel-imports` - Import directly, avoid barrel files
- `bundle-dynamic-imports` - Use next/dynamic for heavy components
- `bundle-defer-third-party` - Load analytics/logging after hydration
- `bundle-conditional` - Load modules only when feature is activated
- `bundle-preload` - Preload on hover/focus for perceived speed

### bundle-barrel-imports

Import directly, avoid barrel files that include unused exports.

**❌ Incorrect:**
```javascript
import { Button } from '@/components'
```

**✅ Correct:**
```javascript
import { Button } from '@/components/Button'
```

### bundle-dynamic-imports

Use next/dynamic for heavy components.

**❌ Incorrect:**
```javascript
import HeavyChart from './HeavyChart'
```

**✅ Correct:**
```javascript
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <ChartSkeleton />,
  ssr: false
})
```

### bundle-defer-third-party

Load analytics/logging after hydration.

```javascript
useEffect(() => {
  // Load analytics only after hydration
  import('analytics').then(({ init }) => init())
}, [])
```

### bundle-preload

Preload on hover/focus for perceived speed.

```javascript
<Link 
  href="/dashboard"
  onMouseEnter={() => preloadRoute('/dashboard')}
  onFocus={() => preloadRoute('/dashboard')}
>
  Dashboard
</Link>
```
