# 🎭 Parallax & Smooth Scroll Implementation Plan

## Что такое Parallax?
**Parallax** — это визуальный эффект глубины, где разные слои контента двигаются с разной скоростью при скролле. Как когда смотришь из окна поезда: близкие деревья пролетают быстро, далёкие горы — медленно.

**Результат:** Сайт ощущается живым, премиальным, как у awwwards-победителей.

---

## Статус: ✅ Smooth Scroll Внедрён

### Что сделано:
1. **Lenis 1.3.4** — установлена библиотека для "масляного" скролла
2. **ReactLenis** — официальный React-компонент (из Context7 документации)
3. **GSAP Ticker Sync** — идеальная синхронизация с анимациями
4. **CSS для Lenis** — стили в globals.css внутри @layer base

### Файлы изменены:
- `src/components/SmoothScroll.tsx` — провайдер smooth scroll
- `src/app/layout.tsx` — интеграция провайдера
- `src/app/globals.css` — Lenis CSS классы
- `package.json` — добавлен lenis

---

## 🎯 Следующие шаги: Parallax Эффекты

### Фаза 1: Hero Section Parallax
**Цель:** Фоновый слой двигается медленнее текста при скролле

**Реализация:**
```tsx
// В Hero.tsx добавить:
useGSAP(() => {
  // Parallax for background layers
  gsap.to(".hero-background", {
    yPercent: 30, // Двигается на 30% от контейнера
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true, // Связано с позицией скролла
    },
  });

  // Parallax for title (moves faster than background)  
  gsap.to(titleRef.current, {
    y: -100,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
    },
  });
}, { scope: sectionRef });
```

### Фаза 2: Gallery Section Parallax (уже частично есть!)
**Текущий код работает**, но нужно убедиться что он используется с Lenis:
- ✅ scrub: 1.5 уже настроен
- ✅ depth формула: `0.1 + (i * 0.05)`
- ⚠️ Нужно мигрировать с useEffect на useGSAP для cleanup

### Фаза 3: Services/Team Cards Parallax
**Цель:** Карточки "плавают" с разной скоростью

```tsx
gsap.utils.toArray('.service-card').forEach((card, i) => {
  gsap.to(card, {
    y: -50 * (1 + i * 0.2),
    ease: "none",
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });
});
```

### Фаза 4: Responsive Parallax (из Context7)
**Важно:** На мобилках parallax должен быть мягче

```tsx
const mm = gsap.matchMedia();

mm.add("(min-width: 800px)", () => {
  // Desktop: полный parallax
  gsap.to(".hero", { y: 300, scrub: true });
});

mm.add("(max-width: 799px)", () => {
  // Mobile: легкий parallax
  gsap.to(".hero", { y: 100, scrub: true });
});
```

---

## Приоритет согласно react-best-practices

| Правило | Применение |
|---------|-----------|
| `rerender-memo` | Мемоизировать GalleryCard |
| `rerender-lazy-state-init` | Использовать ленивую инициализацию для тяжёлых вычислений |
| `rendering-css-over-js` | CSS transforms вместо JS где возможно |

---

## План действий

1. [ ] Добавить parallax в Hero Section
2. [ ] Мигрировать Gallery с useEffect на useGSAP
3. [ ] Добавить parallax в Services cards
4. [ ] Добавить responsive parallax через matchMedia
5. [ ] Протестировать на mobile
6. [ ] Задеплоить и сравнить с оригиналом

---

## Хочешь чтобы я реализовал это сейчас?
