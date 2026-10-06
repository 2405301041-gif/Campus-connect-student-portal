---
name: Campus Pulse
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464554'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#712ae2'
  on-tertiary: '#ffffff'
  tertiary-container: '#8a4cfc'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system embodies an energetic, modern collegiate experience that balances institutional credibility with vibrant student ambition. Designed for high-performing students, faculty, and campus organizations, the interface feels forward-thinking, organized, and motivating.

The visual style blends refined **Modern Corporate** structure with **Subtle Glassmorphism** and ambient luminescence:
- Crisp white and deep navy surfaces provide an authoritative, high-contrast structural backbone.
- Energetic purple/violet gradients infuse momentum and youthfulness without compromising legibility.
- Translucent surface panels with fine border highlights create depth and layered organization suitable for dashboards, event directories, and academic tracking.
- Interactive states feature subtle radiant glows to guide student attention effortlessly.

## Colors
The color hierarchy is engineered for accessibility, visual focus, and category differentiation:

- **Primary (`#6366F1`) & Tertiary (`#7C3AED`):** The electric indigo-violet core. Used for main action flows, primary navigation indicators, interactive focus rings, and primary interactive card accents.
- **Secondary (`#0EA5E9`):** Fresh sky-blue. Serves as a dynamic accent for secondary metrics, active notifications, and progressive disclosure links.
- **Neutral Core (`#0F172A`, `#1E293B`):** Deep collegiate navy serving as high-contrast display text, base headers, and dark surface framing.
- **Surface & Backgrounds:** The base canvas uses crisp white (`#FFFFFF`) backed by cool off-white tints (`#F8FAFC`, `#F1F5F9`) for secondary layered modules.

### Category Color System (Badges & Tags)
Pastel backgrounds with high-contrast text ensure instant categorization across timetables and event discoverability:
- **Academic:** Soft Indigo (`#EEF2FF` bg, `#4338CA` text)
- **Tech:** Soft Cyan/Sky (`#E0F2FE` bg, `#0369A1` text)
- **Cultural:** Soft Violet (`#F3E8FF` bg, `#6D28D9` text)
- **Sports:** Soft Amber (`#FEF3C7` bg, `#B45309` text)
- **Workshop:** Soft Emerald (`#ECFDF5` bg, `#047857` text)

## Typography
The typography pairing combines the geometry and warmth of **Plus Jakarta Sans** for headers, titles, and tags with the high-density legibility of **Inter** for sustained reading, tabular data, and academic records.

- **Headlines & Display:** Set tightly with slight negative letter tracking to create punchy, editorial impact.
- **Body:** Neutral and balanced with generous line heights to prevent visual fatigue during research, study assignments, and portal document navigation.
- **Labels & Metadata:** Employs uppercase or medium-weight tracking to establish clarity on small badge chips, status indicators, and course code tags.

## Layout & Spacing
The layout follows a fluid-responsive 12-column grid system calibrated to support rich dashboards, side navigation rails, and expansive content feeds:

- **Desktop (1200px+):** 12 columns, 24px (`gutter: 1.5rem`) column gaps, 32px (`margin: 2rem`) viewport safe margins. Maximum container width capped at 1440px with auto-centering.
- **Tablet (768px - 1199px):** 8 columns, 20px gutters, 24px margins. Sidebar navigation shifts into a collapsible drawer or slim vertical rail.
- **Mobile (< 768px):** 4 columns, 16px (`gutter-mobile: 1rem`) gutters, 16px (`margin-mobile: 1rem`) margins. Multi-column cards collapse to single-column full-width stacks.

Use strict multiples of 4px/8px via the space tokens for all internal padding and layout offsets to preserve structured visual rhythm.

## Elevation & Depth
Elevation creates a physical sense of interactive tiers without introducing visual clutter or heavy shadows:

- **Surface Level 0 (Base Canvas):** `#F8FAFC`. Neutral, quiet background canvas.
- **Surface Level 1 (Default Cards & Shelves):** Pure `#FFFFFF` with a crisp, low-contrast outline (`1px solid #E2E8F0`) and an ultra-diffused shadow: `box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05)`.
- **Surface Level 2 (Glassmorphic Floating Panels):** Semi-opaque white (`rgba(255, 255, 255, 0.85)`), layered with `backdrop-filter: blur(12px)` and a subtle light-catching edge (`1px solid rgba(255, 255, 255, 0.6)`).
- **Surface Level 3 (Modals, Overlays & Popovers):** `#FFFFFF` paired with deep ambient elevation: `box-shadow: 0 20px 30px -6px rgba(15, 23, 42, 0.12), 0 10px 12px -4px rgba(15, 23, 42, 0.06)`.
- **Active Glows:** Interactive focal points (e.g., active CTA hover or primary card selection) cast a soft indigo aura: `box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.3)`.

## Shapes
The design adopts an approachable, modern curvature that feels friendly yet engineered:

- **Cards & Primary Modules:** 16px to 20px curvature (`rounded-lg` to `rounded-xl`), creating welcoming bounds for student feeds, event flyers, and widget modules.
- **Form Controls & Inputs:** 10px to 12px curvature for comfortable touch and cursor interaction.
- **Buttons, Badges & Chips:** Completely rounded pills (`9999px` / `rounded-full`) for categorical tags, status chips, and primary micro-actions, generating clear affordance contrast against squarer cards.

## Components

### Buttons
- **Primary:** Gradient from Indigo to Violet (`linear-gradient(135deg, #6366F1 0%, #7C3AED 100%)`), pure white bold typography, rounded-xl padding (`12px 24px`). On hover: subtle vertical lift (`translateY(-1px)`) and a focused indigo bloom shadow.
- **Secondary:** Clean white background, 1.5px border (`#E2E8F0`), `#1E293B` text. Hover transitions to `#F8FAFC` surface with `#6366F1` border.
- **Ghost/Tertiary:** No border, transparent background, `#6366F1` text with sky-blue hover feedback.

### Category Chips & Badges
- Compact pill-shaped pills with uppercase or bold labels.
- Implemented with low-saturation backgrounds (e.g., `#EEF2FF`) and high-saturation corresponding text (`#4338CA`) to pass WCAG AA standards cleanly while visually categorizing student activities at a glance.

### Cards
- Base background `#FFFFFF` with 16px-20px rounded corners and a 1px perimeter border (`#E2E8F0`).
- Hoverable cards (e.g., Student Clubs, Announcements) elevate via `translateY(-3px)` and apply a soft dual shadow tinted with `#0F172A` and `#6366F1`.
- Header areas within cards maintain strict 20px internal padding.

### Form Inputs & Search Fields
- Crisp `#F8FAFC` background resting in a 1px `#CBD5E1` frame.
- Focus state instantly clears to pure white, framed by a 2px `#6366F1` outline with a 4px ambient outer ring (`rgba(99, 102, 241, 0.15)`).
- Clear integrated leading icons (e.g., magnifying glass, calendar) rendered in `#64748B`.

### Checkboxes & Radio Buttons
- 20px custom controls with smooth 6px roundedness for checkboxes and full circles for radio buttons.
- Checked state utilizes the primary `#6366F1` fill with crisp white vector checkmarks and an accessible high-contrast border offset.

### Domain-Specific Components
- **Student Schedule Bar:** Slim horizontal timeline card with progressive time markers and color-coded course status indicators.
- **Event Countdown Tile:** Glass-backed module featuring large tabular numbers and vibrant gradient badges for upcoming campus deadlines and sports matches.
- **Grade & Attendance Progress Ring:** High-contrast sky-blue and indigo circular progress meters over neutral muted track rings.