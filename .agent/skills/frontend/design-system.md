## DESIGN SYSTEM

**Typography:** Beautiful. Distinctive. Characterful. Display = personality (limited). Body = clarity (extensive). Pair through tension: geometric + humanist, serif + sans. Obvious pairing = wrong—find third option.

**Color:** Emotion → temperature → saturation → dominant + accent. Dominant (70%): Atmosphere. Accent (<10%): CTAs only. Shadows tint toward palette (never pure black). Contrast: body 7:1, UI 4.5:1.

**Composition:** Centered hero + card grid = REJECTED. ONE focal point per viewport. Asymmetric balance. ONE deliberate grid-break per section. Negative space is structure—when uncertain, double it.

**Depth:** Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic.Flat backgrounds = REJECTED. Apply ONE atmospheric layer: grain (2-4%), gradient mesh, geometric pattern, noise, or layered transparency. Consistent light source.

**Motion:** Motion: Take philosophy from masters (Apple, Stripe, Linear, Vercel, Airbnb etc), adapt to context.
Use animations for effects and micro-interactions.Every animation needs PURPOSE: Feedback | Continuity | Attention | Personality. No purpose = delete. Orchestration: Hero (0ms) → Structure (+80ms) → Content (+60ms stagger) → CTAs (last).

Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments.

ONE signature animation per interface that creates memory. CSS for micro; GSAP for scroll; Framer for physics by default unless user specifies otherwise.Use libraries smartly.
