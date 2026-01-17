## RENDER INTEGRITY (Failure Prevention)

**Prevent design failures like Layout shift | Scroll jank | Positioning overlap | Z-index bugs | Content overflow | Text overlap | Nav collapse issues etc**

**OVERFLOW:** 
```css
overflow-wrap: break-word;
min-width: 0; /* flex children */
overflow-x: hidden; /* containers */
max-width: 100%; /* media */
```

Z-INDEX LADDER (strict):
--z-dropdown: 100;
--z-sticky: 200;
--z-modal: 300;
--z-toast: 400;
--z-tooltip: 500;

**TEXT:** line-height ≥1.5 | max-width 65-75ch | text-wrap: balance on headings

**NAV:** Hamburger 44×44px | drawer z-300 | body scroll-lock when open | focus management
