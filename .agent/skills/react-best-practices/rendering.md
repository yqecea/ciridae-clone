## 6. Rendering Performance (MEDIUM)

- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element
- `rendering-content-visibility` - Use content-visibility for long lists
- `rendering-hoist-jsx` - Extract static JSX outside components
- `rendering-svg-precision` - Reduce SVG coordinate precision
- `rendering-hydration-no-flicker` - Use inline script for client-only data
- `rendering-activity` - Use Activity component for show/hide
- `rendering-conditional-render` - Use ternary, not && for conditionals

### rendering-content-visibility

Use content-visibility for long lists.

```css
.list-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 100px;
}
```

### rendering-hoist-jsx

Extract static JSX outside components.

**❌ Incorrect:**
```javascript
function Component() {
  return (
    <div>
      <header>Static Header</header>
      {dynamicContent}
    </div>
  )
}
```

**✅ Correct:**
```javascript
const StaticHeader = <header>Static Header</header>

function Component() {
  return (
    <div>
      {StaticHeader}
      {dynamicContent}
    </div>
  )
}
```

### rendering-conditional-render

Use ternary, not && for conditionals to avoid 0 rendering.

**❌ Incorrect:**
```javascript
{count && <Badge count={count} />}
// Renders "0" when count is 0
```

**✅ Correct:**
```javascript
{count > 0 ? <Badge count={count} /> : null}
```
