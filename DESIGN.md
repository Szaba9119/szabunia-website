# DESIGN.md — System projektowy szabunia.pl

> Plik jest **źródłem prawdy o wizualu i wzorcach komponentów**. Każda sesja
> AI/agenta edytująca widoczną warstwę strony ma go przeczytać przed zmianą.
> Aktualizacje tylko przez brief od orchestratora.

---

## 0. Filozofia designu

- Marka: Marcin Szabunia, B2B fotograf + twórca wideo, Poznań.
- Ton: profesjonalny, minimalistyczny, zaufanie przez powściągliwość.
- Jeden twórca, nie agencja — nigdy "my", zawsze "ja".
- Dark mode jest pierwszorzędny, jasny motyw równorzędny.

---

## 1. Paleta kolorów

### 1.1 Light mode (tokeny z `@theme inline` w `globals.css`)

| Nazwa tokenu | Klasa Tailwind | Hex | Używane w |
|---|---|---|---|
| `--color-navy` | `navy` | `#0F172A` | Główny tekst, tła sekcji (CTA, Footer), `text-navy` bardzo szeroko |
| `--color-navy-light` | `navy-light` | `#1E293B` | Obramowania w dark bg, ikony kontaktowe w CTA, `ThemeToggle.tsx` |
| `--color-gray-bg` | `gray-bg` | `#F9FAFB` | Tło body (`bg-gray-bg`), tło sekcji Pricing (`Pricing.tsx:64`) |
| `--color-blue` | `blue` | `#2563EB` | Akcenty CTA, linki, aktywne stany nav, gradienty przycisków, focus ring |
| `--color-blue-light` | `blue-light` | `#3B82F6` | Gradienty (`from-blue to-blue-light`), dark mode akcentów |
| `--color-blue-pale` | `blue-pale` | `#EFF6FF` | Tła icon wrapperów (`bg-blue-pale`), ThemeToggle light bg |
| `--color-steel` | `steel` | `#64748B` | Tekst drugoplanowy (`text-steel`), placeholdery, labele formularzy |
| `--color-steel-light` | `steel-light` | `#94A3B8` | Tekst trzecioplanowy, linki w stopce, social proof |
| `--color-border` | `border` | `#E2E8F0` | Obramowania kart, separatory (`border-border`) |
| `--color-text-body` | `text-body` | `#334155` | Używany rzadko bezpośrednio; główny body text zwykle `text-navy` |

### 1.2 Dark mode (tokeny z `@theme inline` w `globals.css`)

| Nazwa tokenu | Klasa Tailwind | Hex | Używane w |
|---|---|---|---|
| `--color-dark-bg` | `dark-bg` | `#0B0F1A` | Tło strony `dark:bg-dark-bg`, sekcja Pricing dark |
| `--color-dark-card` | `dark-card` | `#141B2D` | Tła kart `dark:bg-dark-card` — uniwersalny, zastępuje `bg-white` |
| `--color-dark-card-hover` | `dark-card-hover` | `#1A2340` | Zdefiniowany, ale rzadko używany bezpośrednio w komponentach |
| `--color-dark-border` | `dark-border` | `#1E293B` | Obramowania kart `dark:border-dark-border` |
| `--color-dark-text` | `dark-text` | `#E2E8F0` | Główny tekst dark `dark:text-dark-text` |
| `--color-dark-text-muted` | `dark-text-muted` | `#94A3B8` | Tekst drugoplanowy dark, odpowiednik `steel` |

### 1.3 Gradienty i efekty specjalne

**Scroll progress bar** (`globals.css:107`):
```css
background: linear-gradient(90deg, #2563EB, #3B82F6);
/* → from-blue to-blue-light */
```

**`btn-glow`** (`globals.css:133`) — klasa CSS, NIE Tailwind:
```css
/* light */ box-shadow: 0 0 24px rgba(37, 99, 235, 0.25);
/* dark  */ box-shadow: 0 0 28px rgba(59, 130, 246, 0.35);
/* hover */ box-shadow: 0 0 32px/40px rgba(..., 0.4/0.5);
```
Używana na: primary CTA button, nav contact button (`Navigation.tsx:143`, `Hero.tsx:33`, `CTA.tsx:483`).

**`.glass`** (`globals.css:114`) — glassmorphism navbar:
```css
background: rgba(255, 255, 255, 0.72);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.25);
/* dark: */ background: rgba(11, 15, 26, 0.82);
```
Używana wyłącznie w: `Navigation.tsx:93`.

**`.glass-dark`** (`globals.css:125`) — panel formularza kontaktowego:
```css
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.1);
```
Używana wyłącznie w: `CTA.tsx:281`.

**Background glow blobs** (dekoracyjne, bez klas CSS):
```jsx
<div className="absolute top-[20%] left-[10%] w-[500px] h-[500px]
  rounded-full bg-blue/[0.04] dark:bg-blue/[0.08] blur-[100px]" />
```
Pattern w: `Hero.tsx:10-11`, `CTA.tsx:130-131`.

### 1.4 Zasada "nie używać"

Jeśli kolor nie jest w `@theme inline` — nie dodawać. Agent, który potrzebuje
nowego koloru, zgłasza to w raporcie i czeka na decyzję orchestratora.

**RED FLAGS — kolory poza tokenami (obecny stan):**

| Kolor | Gdzie | Uzasadnienie |
|---|---|---|
| `text-amber-500` | `ThemeToggle.tsx:23` | Ikona słońca — Tailwind built-in, celowy wybór |
| `bg-[rgba(11,15,26,0.96)]` | `Navigation.tsx:181` | Dark-bg z opacity 0.96, brak tokenu dla opacity variant |
| `text-red-400` | `CTA.tsx:345,369,475` | Błędy walidacji — Tailwind built-in, brak tokenu error |
| `fill="#4285F4/#34A853/#FBBC05/#EA4335"` | `Testimonials.tsx:159-162` | Logo Google — brand requirement, nie zmieniać |

---

## 2. Typografia

### 2.1 Fonty

- **Heading:** Barlow — wagi `600, 700, 800, 900` — CSS var `--font-barlow` — klasa `font-barlow`
- **Body:** Inter — wagi `400, 600` — CSS var `--font-inter` — klasa `font-inter`
- Ładowane przez `next/font/google` z `display: swap` i `subsets: ["latin", "latin-ext"]`
- Body element domyślnie: `font-inter antialiased` (`layout.tsx:209`)
- **Zakaz** `<link>` do Google Fonts w `<head>` — fonty są hostowane lokalnie przez Next.js

### 2.2 Skala typograficzna (z realnych użyć w komponentach)

| Rola | Klasy Tailwind | Gdzie używane |
|---|---|---|
| **H1** | `font-barlow font-black text-[clamp(40px,7vw,80px)] leading-[0.95] tracking-[-2px]` | `Hero.tsx:20` — tylko Hero, fluid typ |
| **H2 standard** | `font-barlow font-extrabold text-3xl md:text-[48px] leading-tight tracking-tight` | `About.tsx:33`, `Services.tsx:12`, `Process.tsx:54`, `Testimonials.tsx:88` |
| **H2 CTA** | `font-barlow font-black text-3xl md:text-[36px] leading-[1.1] tracking-tight` | `CTA.tsx:137` — wariant na ciemnym tle |
| **H2 Pricing/sub** | `font-barlow font-bold text-xl` | `Pricing.tsx:134` — subheader sekcji wewnętrznej |
| **H3 karta** | `font-barlow font-bold text-base` | `Services.tsx:33`, `Process.tsx:84` |
| **H3 mała** | `font-barlow font-bold text-sm` | `Process.tsx:119` |
| **H4 karta cennikowa** | `font-barlow font-bold text-lg` | `Pricing.tsx:115,130,...` |
| **Body lead** | `font-inter text-[15px] md:text-base leading-relaxed` | `Hero.tsx:27`, `Services.tsx:15` |
| **Body small** | `text-[13px] leading-relaxed` | Opisy kart, listy cech: `Services.tsx:36`, `Pricing.tsx:248` |
| **Label / badge** | `text-[11px] font-barlow font-semibold uppercase tracking-wide` | Labele formularzy `CTA.tsx:327` |
| **Caption / meta** | `text-xs text-steel-light` | Stopka, social proof |
| **Badge pill** | `text-[10px] font-barlow font-bold uppercase tracking-wider` | Badges na kartach cennikowych `Pricing.tsx:152` |

### 2.3 Tracking i line-height patterny

- `tracking-tight` — H2 standard (często z `leading-tight`)
- `tracking-[-2px]` — H1 wyłącznie
- `tracking-wide` — logo/brand wordmark (`font-barlow font-extrabold text-sm tracking-wide`)
- `tracking-widest` — uppercase labele akcji (`text-xs uppercase tracking-widest`)
- `tracking-wider` — badge pille
- `leading-relaxed` — body text, dla czytelności
- `leading-[0.95]` — H1 wyłącznie (bardzo ciasny, kondensuje nagłówek)
- `leading-[1.1]` — H2 CTA wariant

---

## 3. Spacing i layout

### 3.1 Kontenery

**Główny kontener strony głównej i subpages z treścią:**
```html
max-w-6xl mx-auto px-4
```
Używany w: `CTA.tsx:125`, `Services.tsx:10`, `Pricing.tsx:65`, `Testimonials.tsx:86`, `Footer.tsx:13`, `Hero.tsx:14`

**Węższy kontener (podstrony usług/portfolio):**
```html
max-w-5xl mx-auto
```
Używany w: `PortfolioProcess.tsx:13`, `PortfolioGallery.tsx:49`, `PortfolioPricing.tsx:136`, `PortfolioHero.tsx:18`

> **Niespójność (red flag):** CLAUDE.md §3 wzmiankuje `max-w-7xl` ale ten rozmiar NIE
> pojawia się w żadnym komponencie. Faktyczna skala to `max-w-6xl` (home) i `max-w-5xl`
> (subpages). Przy dodawaniu nowych sekcji — dopasuj do sąsiadów.

### 3.2 Sekcje — spacing

**Standardowy wrapper każdej sekcji (bardzo konsekwentny):**
```html
py-12 md:py-24 px-4
```
Używany w: `Services.tsx:9`, `Pricing.tsx:64`, `CTA.tsx:124`, `Showreel.tsx:10`, `Testimonials.tsx:85`, `PortfolioProcess.tsx:12`, `PortfolioFAQ.tsx:15`, `PortfolioGallery.tsx:48`

**Hero — wyjątek (offset pod fixed navbar):**
```html
pt-28 pb-16 md:pt-36 md:pb-24 px-4
```
Używany w: `Hero.tsx:8`

**Footer — wyjątek:**
```html
px-4 pb-8   ← outer wrapper
px-8 py-10 md:px-12 md:py-14   ← inner card
```

### 3.3 Gridy i kolumny

| Layout | Klasy | Gdzie |
|---|---|---|
| 3-kolumnowa siatka kart | `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4` | `Services.tsx:23` |
| 3-kolumnowa cennik | `grid grid-cols-1 md:grid-cols-3 gap-4` | `Pricing.tsx:127,203` |
| 2-kolumnowa CTA | `grid md:grid-cols-2 gap-10 items-start` | `CTA.tsx:134` |
| 4-kolumnowa stopka | `grid grid-cols-2 md:grid-cols-4 gap-8` | `Footer.tsx:14` |
| Hero asymetryczny | `grid md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-12` | `Hero.tsx:14` |

---

## 4. Komponenty — biblioteka patternów

### 4.1 Section wrapper

Każda nowa sekcja na stronie głównej:
```jsx
// src/components/Services.tsx:9-10
<section id="uslugi" className="py-12 md:py-24 px-4">
  <div className="max-w-6xl mx-auto">
    {/* treść */}
  </div>
</section>
```
Sekcja ze zmienionym tłem (np. Pricing):
```jsx
// src/components/Pricing.tsx:64
<section id="cennik" className="py-12 md:py-24 px-4 bg-gray-bg dark:bg-dark-bg">
```
**Zakaz** używania `py-24 md:py-32` — nie ma takiego patternu w projekcie.

### 4.2 Card

Standardowa karta (usługa, post, krok procesu):
```jsx
// src/components/Services.tsx:27-43
<div className="bg-white dark:bg-dark-card rounded-2xl border border-border
  dark:border-dark-border hover:border-blue dark:hover:border-blue
  transition-all hover:-translate-y-0.5 group">
  <div className="p-6">
    {/* ikona + tytuł + opis */}
  </div>
</div>
```

Karta wyróżniona / "Rekomendowana":
```jsx
// src/components/Pricing.tsx:151
<div className="bg-white dark:bg-dark-card rounded-2xl p-6 border-2
  border-blue dark:border-blue-light h-full flex flex-col relative
  shadow-lg shadow-blue/5">
  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue text-white
    px-3 py-0.5 rounded-full text-[10px] font-barlow font-bold uppercase
    tracking-wider" role="note">
    Rekomendowany
  </div>
  {/* zawartość */}
</div>
```

Karta na ciemnym tle (CTA sekcja + wewnętrzne karty na dark bg):
```jsx
// src/components/CTA.tsx:127
<div className="relative rounded-[20px] overflow-hidden bg-navy dark:bg-dark-card
  dark:border dark:border-dark-border px-6 py-12 md:px-10 md:py-16">
```

### 4.3 Button primary

Pełnowymiarowy (Hero, CTA):
```jsx
// src/components/Hero.tsx:32-37
<a href="#kontakt"
  className="inline-flex items-center gap-2 bg-gradient-to-br from-blue
    to-blue-light text-white px-7 py-3.5 rounded-xl font-barlow font-bold
    text-[15px] btn-glow transition-transform hover:scale-[1.02]">
  Wyślij brief — odezwę się w 24h
  <span className="text-white/80">→</span>
</a>
```

Kompaktowy nawigacyjny (`rounded-full` zamiast `rounded-xl`):
```jsx
// src/components/Navigation.tsx:141-146
<a href="#kontakt"
  className="bg-gradient-to-br from-blue to-blue-light text-white px-5 py-2
    rounded-full font-barlow font-semibold text-xs btn-glow">
  Kontakt
</a>
```

Submit button formularza (`w-full`, `rounded-xl`):
```jsx
// src/components/CTA.tsx:480-494
<button type="submit"
  className="w-full bg-gradient-to-br from-blue to-blue-light text-white
    py-3.5 rounded-xl font-barlow font-bold text-sm btn-glow
    hover:scale-[1.01] transition-transform disabled:opacity-70">
  Wyślij zapytanie — odezwę się w 24h
</button>
```

### 4.4 Button secondary

> **Brak ustalonego wzorca.** Nie istnieje dedykowany "button secondary" w projekcie.
> Linki tekstowe używają `text-blue hover:text-blue-light transition-colors`.
> Do ustalenia w osobnym briefie.

### 4.5 Input / Textarea / Select

Używane wyłącznie w sekcji CTA (ciemne tło `bg-navy`):
```jsx
// src/components/CTA.tsx:330-343
<input
  className="w-full bg-white/[0.08] border border-navy-light rounded-xl
    px-3.5 py-3 text-[13px] text-white placeholder-steel font-inter
    transition-colors focus:border-blue"
/>
// błąd walidacji: border-red-400 (off-token, patrz red flags)
```

> **Uwaga:** Ten wzorzec jest silnie powiązany z ciemnym tłem CTA.
> Dla inputów na jasnym tle — wzorzec do ustalenia w osobnym briefie.

### 4.6 Badge / Pill

```jsx
// src/components/Pricing.tsx:152
<div className="absolute -top-3 right-4 bg-blue text-white px-3 py-0.5
  rounded-full text-[10px] font-barlow font-bold uppercase tracking-wider">
  NOWOŚĆ
</div>
// Wariant wyśrodkowany: left-1/2 -translate-x-1/2 zamiast right-4
```

### 4.7 Icon wrapper

Standardowy kwadratowy kontener na ikonę SVG:
```jsx
// src/components/Services.tsx:30
<div className="w-10 h-10 rounded-xl bg-blue-pale dark:bg-blue/15
  flex items-center justify-center mb-4 group-hover:scale-110
  transition-transform" aria-hidden="true">
  {/* SVG icon */}
</div>
```

Wariant na ciemnym tle (CTA):
```jsx
// src/components/CTA.tsx:153
<div className="w-10 h-10 rounded-xl border border-navy-light
  dark:border-dark-border flex items-center justify-center
  group-hover:border-blue transition-colors">
  {/* SVG icon */}
</div>
```

---

## 5. Dark mode

- **Strategia:** class-based — klasa `.dark` na `<html>`
- **Custom variant:** `@custom-variant dark (&:where(.dark, .dark *))` w `globals.css:3`
- **localStorage key:** `theme` (wartości: `"dark"` / `"light"`)
- **Toggle:** `ThemeToggle.tsx` (przycisk w nav) + `ThemeProvider.tsx` (context + logika)

**Inline script w `layout.tsx:95-99` — nie usuwać:**
```js
(function(){
  var t=localStorage.getItem('theme');
  if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme='dark';
  }
})();
```
Script działa przed hydracją React — bez niego byłby flash jasnego tła w dark mode.

**ThemeProvider** startuje ze stanem `"light"` (dopasowanie do SSR HTML), po hydration
synchronizuje stan z `localStorage` lub `prefers-color-scheme`.

**Konwencja:** każdy kolor tła musi mieć wariant `dark:`. Przykład:
```
bg-white dark:bg-dark-card
border-border dark:border-dark-border
text-navy dark:text-white
text-steel dark:text-dark-text-muted
```

---

## 6. Animacje i motion

### 6.1 AnimatedSection — entrance animation

Plik: `src/components/AnimatedSection.tsx`

```jsx
// Entrance: fade-in + slide-up, na viewport scroll
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
```

Stagger (kolejkowanie): przez `delay` prop (np. `delay={0.1}`, `delay={0.2}`).

**Reduced motion:** `useReducedMotion()` z framer-motion — gdy aktywne, komponent
zwraca zwykły `<div>` bez animacji.

### 6.2 PageTransition — przejście między stronami

Plik: `src/components/PageTransition.tsx`, wywołany przez `src/app/template.tsx`

```jsx
initial={{ opacity: 0, y: 8 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3, ease: "easeOut" }}
```

Reduced motion: zwraca `<>{children}</>` bez animacji.

### 6.3 Hero animations — bezpośrednia motion.div

Plik: `src/components/Hero.tsx:15-16`

```jsx
// Tekst
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}

// Zdjęcie
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
```

### 6.4 CSS prefers-reduced-motion

`globals.css:38-48` — globalne wyłączenie animacji i transitions gdy reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 6.5 Easing i tokeny ruchu

Standardowy easing projektu: `[0.16, 1, 0.3, 1]` (spring-like, używany w Hero i AnimatedSection).
PageTransition: `"easeOut"` (prostszy, bo to przejście całostronicowe).

**Źródło prawdy tokenów ruchu: `src/lib/motion.ts`** — `EASE`, `DURATION`, `PARALLAX`,
`PARALLAX_MIN_WIDTH`. `AnimatedSection`, `Hero` i `Parallax` importują z tego pliku.
Zmiana „czucia" całej strony = zmiana wartości tutaj.

### 6.6 Zakazy

- Auto-play video hero
- Karuzele z autoplayem < 5s przerwy
- Parallax / ruch na blokach tekstu i kartach treści — czytelność. Parallax dozwolony
  wyłącznie na tłach, mediach i akcentach nagłówków (patrz §6.7)

### 6.7 Parallax — system ruchu na scroll

> Decyzja właściciela (2026-05-31): wcześniejszy zakaz parallaxu **zniesiony**.
> Strona ma „żyć" jednym, subtelnym, spójnym systemem ruchu (parallax + wjazdy).

Plik: `src/components/Parallax.tsx`. Tokeny: `src/lib/motion.ts`. Hook: `src/hooks/useMediaQuery.ts`.

- Subtelny drift w pionie, gdy element przechodzi przez ekran (`useScroll` + `useTransform`,
  offset `["start end", "end start"]`).
- **Dystanse (`PARALLAX`, px):** `accent` 24 (nagłówki/numery sekcji), `subtle` 40
  (media nad foldem, drift całych kart), `base` 64 (zdjęcia w ramkach), `strong` 88
  (duże rozmyte tła).
- **Wyciszenie (twarde):** `prefers-reduced-motion` → brak ruchu; `< 768px` (mobile) →
  brak ruchu. Wjazdy (`AnimatedSection`) grają dalej w obu przypadkach.
- **Gdzie stosować:** tła dekoracyjne (plamy blur), główne zdjęcia/media, akcenty
  nagłówków. **Nie** na blokach tekstu ani kartach treści.
- **Technika „in-frame"** dla mediów w ramce `overflow-hidden`: na wewnętrznym divie
  `scale-[1.15]` (oversize), żeby drift nie odsłaniał krawędzi ramki.
  - **Ograniczenie:** zapas oversize na każdą krawędź = `(scale-1)/2 × wysokość_ramki`
    (dla `scale-1.15` ≈ 7,5% wysokości). Musi być **≥ dystans parallaxu**, inaczej przy
    szczycie scrolla widać krawędź. Niskie ramki → mniejszy token (np. kafel wiodący
    Portfolio 360 px używa `accent` 24, nie `subtle` 40). Alternatywa: większy `scale`,
    ale uważać na nadmierne kadrowanie grafik z tekstem.

**Stan wdrożenia:** referencja na `Hero` (tła + portret), `About` (foto in-frame +
akcent nagłówka), `Portfolio` (akcent + kafel wiodący). Pełny rollout na pozostałe
sekcje po kalibracji „czucia" z Marcinem.

---

## 7. Dostępność (a11y) — baseline

- **Skip-to-content:** link `.skip-to-content` w `layout.tsx:210`, target `#main` — nie usuwać
- **Focus-visible:** `globals.css:70` — `2px solid #2563EB`, `outline-offset: 2px`, `border-radius: 4px`; dark: `#3B82F6`
- **Semantic HTML:** `<main id="main">`, `<nav aria-label="...">`, `<section>`, `<footer>` — zachować
- **`prefers-reduced-motion`:** obsługa w CSS (globals.css) i JS (useReducedMotion w framer-motion)
- **ARIA:** `aria-label` na ikonicznych przyciskach, `aria-expanded` na hamburger, `aria-live="polite"` na potwierdzeniu formularza, `aria-invalid` i `aria-describedby` na inputach
- **Kontrast:** minimum WCAG AA (4.5:1 tekst, 3:1 duży) — navy (#0F172A) na white: ~16:1 ✓
- **Alt text:** obowiązkowy na każdym `<Image>` — brak `alt=""` bez uzasadnienia
- **Focus trap:** implementowany w mobile menu (`Navigation.tsx:183-198`)

---

## 8. Obrazy

- `next/image` zawsze — zakaz `<img>`
- **Formaty:** AVIF → WebP → fallback (`next.config.ts:8` — `formats: ["image/avif", "image/webp"]`)
- **Cache TTL:** 1 rok (`next.config.ts:9` — `minimumCacheTTL: 31536000`)
- **Lokalne:** `/public/images/...` — brak `remotePatterns`, zakaz zewnętrznych URL bez wpisu w config
- **Hero image:** `/images/marcin-hero.jpg` — używany w About, Hero, OpenGraph
- **Blur placeholder:** hero image ma inline base64 SVG (`Hero.tsx:74`)
- **`priority`:** Hero image ma `priority` prop — pozostałe nie (lazy load)
- **SVG:** `dangerouslyAllowSVG: true` w `next.config.ts:5` — pliki portfolio/blog są SVG

---

## 9. Wzorce strukturalne

### ErrorBoundary

Każda sekcja na home page (`page.tsx:113-125`) opakowana w `<ErrorBoundary>`:
```jsx
<ErrorBoundary><Hero /></ErrorBoundary>
<ErrorBoundary><Services /></ErrorBoundary>
// itd.
```
Wyjątki bez ErrorBoundary: `<ScrollProgress />`, `<Navigation />`, `<Footer />`, `<MobileFAB />`

**Zakaz usuwania** ErrorBoundary wrapperów — izolacja błędów komponentów.

### Server vs Client components

- Domyślnie: Server Component
- `"use client"` wymagane gdy: stany (`useState`), efekty (`useEffect`), event handlery, framer-motion interactive
- Praktycznie wszystkie komponenty w `src/components/` są `"use client"` (interaktywne)
- Wyjątek: `BlogContent.tsx` i komponenty czysto prezentacyjne mogą być server

### Path alias

`@/*` → `./src/*` (z `tsconfig.json`) — zawsze używać, zakaz ścieżek `../../`

### TypeScript

`strict: true` — zakaz `any` bez komentarza z uzasadnieniem

### Tailwind v4

Brak `tailwind.config.js` — Tailwind v4 działa przez `@theme inline` w `globals.css`.
Zakaz tworzenia `tailwind.config.js`.

---

## 10. Checklist przed commitem dowolnej zmiany wizualnej

- [ ] Kolory tylko z `@theme inline` (lub uzasadniony wyjątek z komentarzem)
- [ ] Fonty przez klasy `font-barlow` / `font-inter`, nie bezpośrednio
- [ ] Spacing sekcji: `py-12 md:py-24 px-4` (lub Hero exception)
- [ ] Container: `max-w-6xl mx-auto` (home) lub `max-w-5xl` (subpages)
- [ ] Dark mode równorzędny — każdy nowy element ma `dark:` wariant
- [ ] `prefers-reduced-motion` uwzględnione jeśli jest animacja
- [ ] `ErrorBoundary` wokół nowej sekcji na home page
- [ ] Obraz przez `next/image` z `alt` text
- [ ] `"use client"` tylko gdy naprawdę potrzebne
- [ ] `npm run lint` → 0 errors, 0 warnings
- [ ] `npm run build` → PASS

---

*Wygenerowano przez Claude Code — Brief #10. Zmiany tylko przez brief od orchestratora.*
