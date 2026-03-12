# Notisaver Website Improvement Plan

> Target: Make notisaver.pages.dev Reddit-launch ready.  
> File: `notisaver-publish/index.html` + `assets/css/styles.css` + `assets/js/site.js`  
> Codex executes. Copilot audits after.

---

## Task 1: Remove Fake Reviews Section

**Priority:** CRITICAL — Reddit will destroy credibility if they see fabricated reviews on a new app.

**What to do:**
- Delete the entire `<section class="section section-alt" id="reviews">` block from `index.html` (roughly lines 296–337).
- This includes the 6 review cards with names like "Aarav K.", "Nadia S.", "Rohan M.", "Fatima Z.", "Meera T.", "Bilal R." and their 4.7–5.0 scores.
- Also delete the corresponding CSS classes that become unused: `.review-card`, `.review-score`, `.review-grid` references.
- Remove `review-grid` from any grouped CSS selectors (it appears in selectors alongside `.feature-grid`, `.steps-grid`, etc.).

**Replace with:** Nothing. Just delete it. The "How it works" section flows fine directly after "Free vs Pro".

---

## Task 2: Fix Third-Person Language → Second Person ("you")

**Priority:** HIGH — Makes the site feel like a corporate template instead of a personal indie product.

**What to change (exact text replacements in `index.html`):**

| Current text | Replace with |
|---|---|
| `"help users spot signal when the inbox is overloaded."` | `"help you spot signal when the inbox is overloaded."` |
| `"the user wants speed, structure, or print."` | `"you want speed, structure, or print."` |
| `"Users can decide exactly which apps are allowed into the vault and which apps stay excluded."` | `"You decide exactly which apps are allowed into the vault and which stay excluded."` |
| `"turn notification history into something users can actually measure."` | `"turn notification history into something you can actually measure."` |

These are inside the feature cards (section `#features`) and screenshot carousel slide descriptions.

---

## Task 3: Add CTA Buttons to Pricing Cards

**Priority:** HIGH — Users read the pricing comparison and then have nothing to click.

**What to do in `index.html`:**
- Inside the FREE pricing card (`<article class="pricing-card">`), after the `<ul class="plan-list">` closing tag, add:
  ```html
  <a class="button button-secondary" href="downloads/notisaver-v1.0.1.apk" download>Download Free</a>
  ```
- Inside the PRO pricing card (`<article class="pricing-card pricing-card-featured">`), after its `<ul class="plan-list">` closing tag, add:
  ```html
  <a class="button button-primary" href="downloads/notisaver-v1.0.1.apk" download>Get Pro (in-app)</a>
  ```

**What to do in `styles.css`:**
- Add this rule so the button sits nicely at the bottom of the card:
  ```css
  .pricing-card .button {
    display: block;
    width: 100%;
    margin-top: 1.5rem;
    text-align: center;
  }
  ```

---

## Task 4: Add FAQ Expand/Collapse Chevron Indicators

**Priority:** HIGH — Without visual indicators, users don't know FAQ items are clickable.

**What to do in `styles.css`:**
- Add a chevron indicator using a CSS pseudo-element on `.faq-button`:
  ```css
  .faq-button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
  }

  .faq-button::after {
    content: "";
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    border-right: 2px solid var(--muted);
    border-bottom: 2px solid var(--muted);
    transform: rotate(45deg);
    transition: transform 250ms ease;
  }

  .faq-button[aria-expanded="true"]::after {
    transform: rotate(-135deg);
  }
  ```
- Note: The existing `.faq-button` styles already set `width: 100%`, `padding`, `border: 0`, `text-align: left`, and `background: transparent`. The new rules should ADD `display: flex`, `align-items: center`, `justify-content: space-between`, `gap: 1rem`, and `cursor: pointer` to the existing `.faq-button` block — not create a duplicate. Merge them.

---

## Task 5: Replace OG Image with PNG

**Priority:** MEDIUM — SVG og:image won't render properly on Reddit, Twitter, or Facebook link previews.

**What to do:**
1. Create a 1200×630px PNG image at `assets/images/og-cover.png`. Design: dark background (#0f0d0c), Notisaver logo centered-left, tagline "Notification history with a vault mindset." on the right, gold accent (#f8c15c) underline. Simple and clean.
2. In `index.html`, update these 2 meta tags:
   - Change `<meta property="og:image" content="/assets/images/og-cover.svg">` → `content="/assets/images/og-cover.png"`
   - Change `<meta name="twitter:image" content="/assets/images/og-cover.svg">` → `content="/assets/images/og-cover.png"`

**Note for Codex:** The PNG must actually be created/placed in the assets folder. If Codex can't generate images, flag this and I'll create it manually. Just make the HTML changes.

---

## Task 6: Improve Download Section QR Card

**Priority:** MEDIUM — Currently shows logo + raw file path. Looks placeholder-ish.

**Current HTML (in `<aside class="qr-card">`):**
```html
<img src="assets/icons/logo-mark.svg" alt="" width="120" height="120">
<strong>Version 1.0.1 APK</strong>
<p>File: <code>notisaver-v1.0.1.apk</code></p>
<p>Android 8.0 and above</p>
<p>Direct path: <code>/downloads/notisaver-v1.0.1.apk</code></p>
<a class="button button-secondary" href="downloads/notisaver-v1.0.1.apk" download>Direct file link</a>
```

**Replace with:**
```html
<img src="assets/icons/logo-mark.svg" alt="" width="80" height="80">
<strong>Notisaver v1.0.1</strong>
<ul class="download-meta">
  <li>📦 Size: 6.82 MB</li>
  <li>📱 Android 8.0+</li>
  <li>🔒 Signed release build</li>
  <li>✅ VirusTotal: Clean</li>
</ul>
<a class="button button-secondary" href="downloads/notisaver-v1.0.1.apk" download>Download APK</a>
```

**Add to `styles.css`:**
```css
.download-meta {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 1rem;
  text-align: left;
}

.download-meta li {
  padding: 0.4rem 0;
  color: var(--muted-strong);
  font-size: 0.95rem;
  border-bottom: 1px solid rgba(255, 227, 166, 0.08);
}

.download-meta li:last-child {
  border-bottom: none;
}
```

---

## Task 7: Add "Why I Built This" Section

**Priority:** MEDIUM — Reddit loves indie developer stories. Adds authenticity.

**Where:** Add a new section AFTER the "How it works" section and BEFORE the FAQ section.

**HTML to add:**
```html
<section class="section" id="story">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">The story</p>
      <h2>Built by one developer who kept losing notifications.</h2>
      <p>I built Notisaver because I was tired of swiping away notifications and regretting it five minutes later. Important messages from banking apps, delivery updates, work alerts — all gone in a flick.</p>
      <p>No existing app handled it the way I wanted: private, fast, and actually searchable. So I built one. Notisaver runs entirely on your device, never uploads your data, and treats your notification history like it matters — because it does.</p>
      <p>This is a solo indie project. No VC funding, no data harvesting, no 47-person growth team. Just a useful app that does what it says.</p>
      <p style="margin-top: 1rem; color: var(--accent);">— Quazi Sahil</p>
    </div>
  </div>
</section>
```

**No CSS changes needed** — the existing `.section`, `.section-heading`, `.eyebrow` classes handle styling perfectly.

---

## Task 8: Add Carousel Prev/Next Arrow Buttons

**Priority:** LOW — Dots alone aren't obvious as navigation. Arrows make it discoverable.

**HTML changes in `index.html`:**
- Inside the `.carousel-controls` div, add two arrow buttons (before the dots):
  ```html
  <button class="carousel-arrow carousel-prev" type="button" aria-label="Previous screenshot">‹</button>
  <!-- existing dot-buttons stay here -->
  <button class="carousel-arrow carousel-next" type="button" aria-label="Next screenshot">›</button>
  ```

**CSS to add in `styles.css`:**
```css
.carousel-controls {
  position: relative;
  align-items: center;
}

.carousel-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--stroke);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease;
}

.carousel-arrow:hover {
  background: rgba(255, 227, 166, 0.1);
  border-color: var(--stroke-strong);
}
```

**JS changes in `site.js`:**
- Inside the `if (carousel)` block, after the `dots.forEach(...)` listener setup, add:
  ```js
  const prevBtn = carousel.querySelector(".carousel-prev");
  const nextBtn = carousel.querySelector(".carousel-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide((activeIndex - 1 + slides.length) % slides.length);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      showSlide((activeIndex + 1) % slides.length);
    });
  }
  ```

---

## Task 9: Add Scroll-Reveal Animations

**Priority:** LOW — Polish. Makes the site feel more premium as users scroll.

**CSS to add in `styles.css`:**
```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**JS to add at the end of `site.js`:**
```js
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}
```

**HTML changes:** Add `class="reveal"` to these elements in `index.html`:
- Each `.feature-card` (9 cards)
- Each `.step-card` (3 cards)
- Each `.pricing-card` (2 cards)
- The `.qr-card`
- The story section `.section-heading` (if Task 7 is implemented)

Example: `<article class="feature-card">` → `<article class="feature-card reveal">`

---

## Execution Order

| Order | Task | Priority |
|-------|------|----------|
| 1 | Task 1: Remove fake reviews | CRITICAL |
| 2 | Task 2: Fix third-person language | HIGH |
| 3 | Task 3: Add pricing card CTAs | HIGH |
| 4 | Task 4: FAQ chevron indicators | HIGH |
| 5 | Task 7: "Why I Built This" section | MEDIUM |
| 6 | Task 6: Improve download card | MEDIUM |
| 7 | Task 5: OG image to PNG | MEDIUM (needs manual image) |
| 8 | Task 8: Carousel arrows | LOW |
| 9 | Task 9: Scroll-reveal animations | LOW |

---

## Post-Codex Audit Checklist

After Codex implements, Copilot will verify:
- [ ] Reviews section fully removed (no leftover CSS/HTML)
- [ ] All "users" → "you" replacements done correctly
- [ ] Pricing buttons download correct APK version
- [ ] FAQ chevrons rotate on expand/collapse
- [ ] OG meta tags point to PNG (if image created)
- [ ] Download card shows trust signals
- [ ] Story section renders with correct styling
- [ ] Carousel arrows work (prev/next)
- [ ] Reveal animations trigger on scroll
- [ ] Mobile responsive — all changes work at 320px, 680px, 860px breakpoints
- [ ] No console errors
- [ ] Git diff is clean (no unintended changes)
