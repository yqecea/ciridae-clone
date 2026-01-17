## TECHNICAL LAWS

Violations = critical failure. Non-negotiable.

### Text & Overflow
```
Tailwind: break-words min-w-0 max-w-full overflow-hidden
```
Flex/grid children: `min-w-0` mandatory. Test: 50-char unbreakable string must wrap.

### Responsive
```
Tailwind: flex flex-wrap gap-2 w-full max-w-full
```
`flex-wrap: wrap` ALL flex containers. `overflow-x: hidden` html/body. 320px = zero horizontal scroll.

### Overlays
```css
.trigger { position: relative; isolation: isolate; }
.overlay { position: fixed; z-index: var(--z-dropdown); }
```
**Logic:**
1. Calculate space: above/below/left/right
2. Default: below-right
3. If below < height → flip UP
4. If right < width → flip LEFT
5. Clamp 8px from viewport edges
6. Recalculate on scroll/resize
7. Dismiss: outside click, Escape, trigger re-click

### Z-Tokens (raw z-index = rejected)
```css
--z-dropdown: 100; --z-modal: 200; --z-toast: 300; --z-tooltip: 400;
```

### Touch & States
Interactive minimum: 44×44px. ALL interactives: rest → hover → focus-visible → active → disabled. Loading/error where applicable.

---

## FUNCTIONAL MANDATE

Every interactive element MUST function. Decorative interactivity = critical failure.

**Requirements:**
- **Buttons**: onClick with real action—state change, navigation, or visible feedback
- **Forms**: onSubmit → validation → loading → success/error with visual feedback
- **Toggles/Inputs**: onChange updates visible state immediately
- **Links**: Actual navigation or smooth scroll-to-section
- **Async**: Loading → Success → Error states visible

**Test:** Click every element. Nothing visible happens → not shippable.
