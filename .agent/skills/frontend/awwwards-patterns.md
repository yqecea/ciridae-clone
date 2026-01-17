## AWWWARDS PATTERNS (2025 Full Pack)

**Goal:** Every pattern that differentiates SOTD winners from regular sites.

---

### MOTION & SCROLL

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Smooth Scroll** | Buttery momentum scrolling | Lenis + GSAP ticker sync |
| **Parallax** | Layers move at different speeds | ScrollTrigger scrub |
| **Scroll Reveals** | Elements fade/blur in on scroll | ScrollTrigger toggleActions |
| **Pinned Sections** | Sections stick during scroll | ScrollTrigger pin |
| **Horizontal Scroll** | Sideways scroll sections | ScrollTrigger + xPercent |
| **Scroll Progress** | Progress bar/indicator | ScrollTrigger onUpdate |
| **Scroll Velocity** | Speed-based effects | Lenis velocity + GSAP |

---

### CURSOR & INTERACTION

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Custom Cursor** | Replace default with circle/dot | CSS + JS position tracking |
| **Magnetic Buttons** | Elements attract to cursor | gsap.to on mousemove |
| **Cursor Morph** | Cursor changes on hover (text/arrow) | State-based cursor component |
| **Hover Distortion** | Image warps on hover | WebGL/Three.js shaders |
| **Drag Interactions** | Draggable elements | GSAP Draggable or Framer |

---

### TYPOGRAPHY

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Kinetic Typography** | Moving/animated text | GSAP timeline on chars |
| **Split Text** | Letters animate individually | SplitText or manual split |
| **Text Reveal** | Mask/clip reveals text | clip-path + ScrollTrigger |
| **Blur-to-Focus** | Text unblurs on scroll | filter: blur() + scrub |
| **Variable Font Animation** | Weight/width morphs | CSS font-variation-settings |
| **Scramble Text** | Letters randomize then settle | GSAP ScrambleTextPlugin |

---

### LAYOUT

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Bento Grid** | Asymmetric card layouts | CSS Grid with span variations |
| **Anti-Grid** | Intentionally broken alignment | Absolute positioning + rotation |
| **Masonry** | Pinterest-style stacking | CSS columns or Masonry.js |
| **Stacked Cards** | Cards layer on scroll | position: sticky + z-index |
| **Floating Elements** | Items positioned off-grid | Absolute + parallax |

---

### TRANSITIONS & LOADING

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Page Transitions** | Smooth between pages | Framer Motion or Barba.js |
| **Preloader** | Animated loading screen | gsap.timeline + onComplete |
| **Skeleton Loading** | UI shape placeholders | CSS animation pulse |
| **Reveal Transitions** | Curtain/mask page reveals | clip-path animation |
| **Route Animation** | Content animates on navigate | Next.js App Router + motion |

---

### VISUAL EFFECTS

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Grain/Noise** | Film grain texture overlay | CSS background + opacity |
| **Glassmorphism** | Frosted glass effect | backdrop-filter: blur |
| **Glow Effects** | Neon/soft glows | box-shadow + filter |
| **Light Leaks** | Gradient color overlays | radial-gradient + blend |
| **3D Elements** | WebGL objects | Three.js / React Three Fiber |
| **Mesh Gradients** | Organic color blobs | SVG or canvas gradients |

---

### MICRO-INTERACTIONS

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Button Hover** | Scale + background shift | CSS transition 0.3s |
| **Link Underline** | Animated underline | ::after + transform |
| **Icon Animation** | Icons morph on state | SVG path animation |
| **Ripple Effect** | Material-style ripples | CSS ::after + animation |
| **Tooltip Animation** | Smooth tooltip appear | opacity + translateY |

---

### MULTIMEDIA

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Video Backgrounds** | Full-screen video | video autoplay muted loop |
| **Marquee/Ticker** | Infinite scrolling text | CSS animation or GSAP |
| **Image Galleries** | Lightbox with gestures | React Spring or Framer |
| **Lazy Media** | Load on scroll near | Intersection Observer |
| **WebGL Transitions** | Shader-based image swaps | Three.js + custom shaders |

---

### RESPONSIVE PREMIUM

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| **Mobile-First Motion** | Reduced motion on mobile | gsap.matchMedia |
| **Touch Gestures** | Swipe/pinch support | Hammer.js or native |
| **Adaptive Performance** | Disable effects on low-end | navigator.hardwareConcurrency |

---

## IMPLEMENTATION PRIORITY

1. **Essential (Every Site):** Smooth Scroll, Parallax, Scroll Reveals, Custom Cursor, Hover States
2. **High Impact:** Page Transitions, Preloader, Magnetic Buttons, Text Split, Grain Overlay
3. **Signature (Pick 1-2):** Kinetic Typography, 3D Elements, Hover Distortion, Anti-Grid

---

## LIBRARIES

- **Scroll:** Lenis, GSAP ScrollTrigger, Locomotive Scroll
- **Animation:** GSAP, Framer Motion, Motion One
- **3D:** Three.js, React Three Fiber, Spline
- **Transitions:** Barba.js, Framer Motion (React)
- **Cursor:** Custom or use react-cursor-fx
