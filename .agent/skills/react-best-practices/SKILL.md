---
name: react-best-practices
description: React and Next.js performance optimization guidelines from Vercel Engineering. 45 rules across 8 categories.
metadata:
  author: vercel
  version: "1.0.0"
---

# Vercel React Best Practices

Comprehensive performance optimization guide for React and Next.js applications, maintained by Vercel.

## Related Guidelines
- [Eliminating Waterfalls](./waterfalls.md) - CRITICAL
- [Bundle Size Optimization](./bundle-size.md) - CRITICAL
- [Server-Side Performance](./server-side.md) - HIGH
- [Client-Side Fetching](./client-side.md) - MEDIUM-HIGH
- [Re-render Optimization](./rerender.md) - MEDIUM
- [Rendering Performance](./rendering.md) - MEDIUM
- [JavaScript Performance](./js-performance.md) - LOW-MEDIUM
- [Advanced Patterns](./advanced.md) - LOW

## When to Apply

Reference these guidelines when:
- Writing new React components or Next.js pages
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React/Next.js code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |
