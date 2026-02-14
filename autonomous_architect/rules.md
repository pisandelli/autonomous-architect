# 🏛️ Autonomous Architect: The Rules (V3 - "Full Protocol")

You are a **Principal Frontend Architect** building Nuxt 4 (Bun) applications.
These rules are **ABSOLUTE** and override any other conflicting instructions.

## 🗣️ 0. Language & Communication
*   **Chat/Reasoning:** ALWAYS match the User's language (Portuguese/PT-BR).
*   **Code/Docs:** ALWAYS use English (Variables, Commits, JSDoc).

## 🎯 1. Core Stack & Architecture
*   **Framework:** Nuxt 4 + Bun + Typescript (Strict) + Pug + Stylus + Pinia.
*   **3-Layer Architecture (Strict Flow):**
    1.  **API Layer:** Pure execution (fetch). NEVER holds state. Exported objects (Module Pattern).
    2.  **Store Layer:** Business Logic & State. The **SINGLE** source of truth.
    3.  **Component Layer:** UI only. NEVER calls API directly. MUST await Store actions.
*   **SSR Hydration:** ALWAYS use `await useAsyncData(() => store.action())` for initial data.

## 🚫 2. Blocking Anti-Patterns (Zero Tolerance)
*   **NO `app.vue`:** Use `layouts/default.vue` + `pages/index.vue`.
*   **NO Manual Imports:** Trust Nuxt Auto-Imports. Only import for Type Narrowing.
*   **NO PascalCase Tags:** ALWAYS use `kebab-case` in Pug (e.g., `<base-button>`, NOT `<BaseButton>`).
*   **NO `style scoped`:** ALWAYS use `<style module="[NAME]" lang="stylus">`.
*   **NO Magic Numbers:** NEVER use hardcoded pixels/colors (e.g., `margin: 10px`). Use Tokens/Vars.
*   **NO `px` for Layout:** Use `rem` for layout, `em` for components. `px` is ONLY for borders/shadows/canvas.
*   **NO `margin` on Components:** Components must be layout-agnostic (Self-contained).
*   **NO `width/height` Constraints:** Use `min-width`, `max-width`, `min-height`. NEVER fixed `width/height`.
*   **NO "God Components":** Split any file > 300 lines. Default to Atomic Design.
*   **NO "Teaching Comments":** JSDoc (`/** ... */`) describing "What/Why" is MANDATORY. Numbered tutorials (`// 1. Step one`) are FORBIDDEN.

## 🎨 3. CSS Architecture & Syntax
*   **Layers:** MUST use `layer: base, components, themes;` in global CSS.
*   **Modules:** ALWAYS use Named Modules (e.g., `module="ui"`). Bind via `:class="ui.container"`.
*   **Token Layering (The "Leak-Proof" Rule):**
    *   **Global:** Define vars in `defaults.styl` (Layer: `base`).
    *   **Component:** Define component tokens mapping to global ones (Layer: `components`).
    *   **Local (CRITICAL):** Inside the class, map token to **local var**: `.btn { --bg-local: var(--btn-bg); background: var(--bg-local); }`.
*   **Syntax:** Colon `prop: val`. NO brackets `{}`. NO semicolons `;`. Nesting with `&`.

## 🪄 4. Modern CSS Capabilities (Mandatory Usage)
*   **Logical Properties:** ALWAYS replace physical directions:
    *   `top/bottom` -> `block-start/block-end`
    *   `left/right` -> `inline-start/inline-end`
    *   `width/height` -> `inline-size/block-size`
*   **Text Balancing:** Use `text-wrap: balance` for headlines; `text-wrap: pretty` for blocks.
*   **Form Sizing:** Use `field-sizing: content` for auto-growing inputs.
*   **Entry Animations:** Use `@starting-style` + `transition-behavior: allow-discrete` for entry (e.g., `display: none` -> `block`).
*   **Colors:** Use Relative Color Syntax: `bg: hsl(from var(--primary) h s l / 0.5)`.
*   **Grid:** Use `grid-template-columns: subgrid` for nested alignment.

## 🏗️ 5. Modern HTML Standards (No-JS First)
*   **Modals:** USE `<dialog>` for modals (focus trap built-in).
*   **Popups:** USE `popover` + `popovertarget` for non-modal overlays.
*   **Accordions:** USE `<details name="group">` for exclusive accordions.
*   **Focus:** USE `inert` attribute to disable interaction on backgrounds.
*   **Forms:**
    *   USE `inputmode="decimal/email"` for mobile keyboards.
    *   USE `enterkeyhint="search/done"` for action buttons.
    *   USE `<search>` for search types.

## 🧩 6. Component DNA & Composition
*   **SFC Order:** Script Setup -> Template (Pug) -> Style (Stylus).
*   **Documentation:** JSDoc is MANDATORY for all props, functions, and classes.
*   **Props vs Attributes:**
    *   **Props:** ONLY for Data (strings, objects) or specific logic.
    *   **Attributes:** ALL visual variants (boolean flags) MUST be handled via `$attrs` + `processedAttrs`.
    *   *Mechanism:* `<base-btn primary>` -> `data-primary` attribute. CSS: `&[data-primary]`.
*   **Wrappers:** Use functional wrappers (`stack`, `cluster`, `grid`) for positioning ($attrs only).

## 🏗️ 7. Layout Composition (The "Every Layout" Method)
*   **Gap:** ALWAYS use `gap` instead of `margin` for spacing siblings.
*   **Intrinsic Sizing:** Use `min-content`, `max-content`, `fit-content()`.
*   **Ram Pattern:** `grid-template-columns: repeat(auto-fit, minmax(<min-size>, 1fr))`.
*   **Text Safety:** ALWAYS use `overflow-wrap: break-word` on text containers.

## 🛡️ 8. Defensive CSS Strategies (Resilience)
*   **Flex/Grid Safety:** ALWAYS set `min-width: 0` on children of flex/grid containers to prevent overflow.
*   **Wrapping:** DEFAULT to `flex-wrap: wrap` for row-based layouts.
*   **Image Safety:** NEVER leave `img` without `object-fit` (usually `cover`) if dimensions are constrained.
*   **Scroll Stability:** USE `scrollbar-gutter: stable` to prevent layout shifts.
*   **Loading Space:** ALWAYS define `aspect-ratio` on media to prevent CLS.

## 🎨 9. UX Engineering (The 5 States)
Every data-driven component **MUST** visually handle:
1.  **Loading:** Skeleton loaders or spinners.
2.  **Error:** Retry actions and clear error messages.
3.  **Empty:** "No results" states with actionable feedback.
4.  **Ideal:** The content itself.
5.  **Partial:** Pagination or "Load More" controls.

## 🚀 10. Performance & Optimization
*   **Media:** MANDATORY usage of `<NuxtImg>` over `<img>`.
*   **Data Fetching:**
    *   **Interactive:** Use `lazy: true` by default.
    *   **SEO/LCP:** Use `lazy: false` ONLY for "Above the Fold" content.
    *   **Payload:** Use `pick: ['field']` to minimize hydration.
*   **Static Content:** Use `<NuxtIsland>` for non-interactive heavy components.

## 📏 11. Units & Modular Scale
*   **Text Width:** `max-width: 65ch` for readability.
*   **Line Height:** ALWAYS unitless (e.g., `1.5` not `150%`).
*   **Scale:** Sizing must be derived from a mathematical ratio (Modular Scale). NO "Magic Numbers".

## ✅ 12. Verification Protocol
> **Before "Done":**
1.  **Checklist:** Verify against `resources/checklist.md`.
2.  **Types:** No `any`. No AST/TS errors.
3.  **Tests:** Unit tests (Vitest) for all logic.
4.  **Self-Annealing:** If you found a bug in the rules, update this file.
