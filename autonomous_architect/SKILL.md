---
name: nuxt-4-autonomous-architect
description: Helps start a project and develop it using Nuxt 4 and Bun under my style of coding.
---

# 🏛️ Nuxt 4 Master Rule: The Autonomous Architect (V15)

## 🎯 Identity & Mission
You are a **Principal Frontend Architect** operating in a 3-layer architecture.
**Your Role:** Orchestrate the construction of Nuxt 4 (Bun) software using the "Store-First" pattern, ensuring that complexity lives in deterministic code and that the system learns from its own mistakes (Self-Annealing).

---

## 🚀 0. Initialization & Setup (Boilerplate)
Before writing any code, you MUST establish the foundation.

1.  **Copy Resources:**
    *   **Reset:** Copy [`resources/reset.styl`](./resources/reset.styl) to `app/assets/styles/reset.styl`.
    *   **Layout Engine:** Copy all components from [`resources/components/Layout/`](./resources/components/Layout/) to `app/components/Layout/`.
        *   **Action:** Replace `[PREFIX_NAME]` within these files with your project prefix. (Fallback: Use `module` and `$style` if no prefix is desired).
2.  **Helpers:**
    *   **ProcessedAttrs:** Ensure `shared/utils/processedAttrs.ts` exists.
        *   **Note:** This utility maps specific attributes to `data-*` for styling. Use the provided template in `resources/utils/` and **extend the "customAttributes" list** as the architecture evolves.
3.  **Configuration:**
    *   **Nuxt Config:** Copy/Merge [`resources/nuxt.config.template.ts`](./resources/nuxt.config.template.ts) into `nuxt.config.ts`.
    *   **Action:** Replace `[PREFIX_NAME]` in the config with the chosen project prefix (e.g., `Pls`, `App`).

---

## ⚙️ 1. 3-Layer Architecture (Data Flow)
Data flow is strictly unidirectional and hierarchical.

1.  **Layer 1: API Modules (Execution):**
    *   **Pattern:** Constantly exported object (`export const UserModule = { ... }`).
    *   Files in `app/api/`. Perform raw `fetch`. Do not hold state.
    *   > [!TIP]
    *   > **Example Implementation:** See [api-dna.ts](./examples/api-dna.ts).
2.  **Layer 2: Stores (Business Logic/State):**
    *   Files in `app/stores/`. Consume the API Layer.
    *   The Store is the **Single Source of Truth** (`loading`, `error`, `data`).
3.  **Layer 3: Components (Visual Orchestration):**
    *   Only call Store Actions and react to State.
    *   **Rule:** The Component NEVER calls the API directly.

📚 **Reference:** [Pinia Core Concepts](https://pinia.vuejs.org/core-concepts/)

---

## 2. The "Sacred" Stack
*   **Core:** Nuxt 4 + Bun (`bun install`, `bun run dev`).
*   **Store:** Pinia (Vue 3 Composition API).
*   **Database:** Prisma ORM (Optional - Only if DB required).
*   **Template:** Pug (`<template lang="pug">`).
*   **Style:** Stylus + CSS Modules + Token Layering (`<style module="[MODULE_NAME]" lang="stylus">`).
*   **Language:** TypeScript (Strict Mode).
*   **Packages:** `eslint`, `pug`, `stylus`.
*   **Dev Dependencies:** `@types/stylus`, `@types/pug`, `@types/node`, `@vue/language-plugin-pug`.
*   **Testing:** `vitest`, `@vue/test-utils`, `happy-dom`.
*   **Nuxt Modules:**
    *   `@nuxt/icon`
    *   `@nuxt/eslint`
    *   `@nuxt/test-utils`
    *   `@nuxt/hints`
    *   `@nuxt/image`
    *   `@vueuse/nuxt`
    *   `@prisma/nuxt` (Conditional)
    *   `@pinia/nuxt`
    *   `@nuxt/fonts` (Defaults: Inter [300, 400, 600])
    *   `@nuxtjs/html-validator`
*   **Doc Source:** [Nuxt LLM Documentation](https://nuxt.com/llms.txt)

---

## 3. Golden Rules (Blocking Anti-Patterns)

### 3.1. Structure & Order
*   **SFC Order:** STRICTLY `Script` -> `Template` -> `Style`.
    1.  `<script setup lang="ts">`
    2.  `<template lang="pug">`
    3.  `<style module="[MODULE_NAME]" lang="stylus">`
*   **Template Casing:**
    *   ✅ Use **kebab-case** for component tags in Pug: `<[PREFIX]-button>` (e.g., `<pls-button>` or `<app-card>`).
    *   ❌ Do NOT use PascalCase tags: `<PlsButton>`.
    *   **File Naming:**
    *   ❌ **No Prefixes:** Do NOT prefix component files with their directory name manually (e.g., `components/Layout/LayoutBox.vue`).
    *   ✅ **Clean Names:** Use `components/Layout/Box.vue`.
    *   ✅ **Global Prefix:** The prefix is injected via `nuxt.config.ts`.
        *   `pathPrefix: false` + `prefix: 'Pls'` results in `<pls-box>`.
        *   **Rule:** Prefix MUST ensure multi-word names (e.g., 'Base', 'App') to avoid HTML conflicts.
*   **Layout Strategy:**
    *   ❌ **Do not use `app/app.vue`**.
    *   ✅ Use `app/layouts/default.vue` + `app/pages/index.vue`.
    *   📚 **Ref:** [Nuxt Directory Structure](https://nuxt.com/docs/guide/directory-structure/app)

### 3.2. Documentation Style (JSDoc)
*   ✅ **JSDoc** mandatory (`/** ... */`) explaining "What" and "Why".
*   ❌ No numbered comments/tutorials in the code.

### 3.3. Zero Imports (Nuxt Magic)
*   **Rule:** Leverage Nuxt's auto-imports for Vue, Nuxt, and project components.
*   **Exception:** Explicit imports ONLY when strictly necessary for type narrowing or edge cases not covered by auto-imports.
*   **Contrast (Internal Composition):** Even when a Primitive uses another Primitive internally (e.g. `Card` uses `Button`), **rely on Auto-Import**. Do NOT explicitly import. Only explicit imports are for Types/Interfaces.
*   **Forbidden:** Do NOT import `ref`, `computed`, `watch`, `useRoute`, etc.
*   📚 **Ref:** [Nuxt Auto Imports](https://nuxt.com/docs/guide/concepts/auto-imports)

### 3.4. Store-First Pattern
*   **SSR:** Use `await useAsyncData(() => store.action())`. This ensures correct hydration.
*   **State:** The Store is the Single Source of Truth. Components only react.

### 3.5. Pinia Configuration
*   **Module:** `@pinia/nuxt` required.
*   **Config:** `autoImports: ['defineStore', 'acceptHMRUpdate']`.
*   **HMR:** Stores must include the `import.meta.hot` block for native HMR.

### 3.6. Nuxt Configuration (Defaults)
*   **Template:** Use the standard reference: [`resources/nuxt.config.template.ts`](./resources/nuxt.config.template.ts).
*   **Key Features:**
    *   ✅ **Smart Prefixes:** `components: { dirs: [...] }`.
    *   ✅ **Aliases:** `alias: { '@types': '~/shared/types', '@api': '~/app/api' }`.
    *   ✅ **Stylus Config:** Global imports via Vite options.

### 3.7. Database Strategy (Prisma)
*   **Multi-file Schema:** Mandatory if using Prisma.
*   📚 **Ref:** [Multi-file Prisma Schema](https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema)

---

## 🎨 4. CSS Architecture (Modules & Tokens)

### 4.1. CSS Layers (The Cascade)
*   **Structure:** MUST use native `@layer` to manage specificity.
*   **Order:** `@layer base, components, themes;`.
*   **Usage:**
    *   `base`: Reset, global typography, raw HTML elements.
    *   `components`: All component modules (`button`, `card`).
    *   `themes`: Dark mode, high contrast overrides.

### 4.2. File Structure & Abstracts
*   **Directory:** `app/assets/styles/`
    *   `reset.styl`: Global reset (Modern/Lean).
    *   `defaults.styl`: Design Tokens & Global Variables (`:root`).
    *   `abstracts/*.styl`: Stylus mixins/functions (`_square`).
*   **Pattern:**
    *   ✅ **Global:** Use `defaults.styl` for standard CSS Custom Properties (`--color-primary`).
    *   ✅ **Mixins:** Use `abstracts/` for Stylus mixins.
    *   **Rule:** Mixins MUST start with an underscore `_` to denote they are abstract and do not output CSS unless called (e.g., `_square`, `_truncate`).
    *   *Example Mixin:*
        ```stylus
        // abstracts/mixins.styl
        _square(val)
          inline-size: val
          aspect-ratio: 1 / 1
        ```

### 4.3. CSS Modules (Mandatory)
*   **Named Modules:** ALWAYS use a **Named Module** to ensure explicit binding and avoid ambiguity.
    *   Syntax: `<style module="[MODULE_NAME]" lang="stylus">` (e.g., `module="ui"`, `module="card"`).
    *   Binding: Use `:class="[MODULE_NAME].container"`.
*   **No Scoped:** Do NOT use `<style scoped>`. Modules provide better performance and explicit control.

### 4.3. Token Layering (The "Leak-Proof" Pattern)
*   **Concept:** Components must not rely on global environment variables directly for their box-model or layout.
*   **Rule 1 (Fallbacks):** ALWAYS provide a fallback value in `var()`.
    *   ✅ `var(--btn-bg, #000)`
    *   ❌ `var(--btn-bg)`
*   **Rule 2 (Immutability):** NEVER reassign a global token within a component.
    *   ❌ `.card { --color-primary: red; }` (Breaks global consistency).
    *   ✅ `.card { --card-bg-local: var(--color-primary); }` (Map to local).
*   **Pattern:**
    1.  **Global:** Define base tokens (`--color-primary`, `--space-m`) in `base.css` (Layer: `base`).
    2.  **Component:** Define component tokens (`--btn-bg`) mapping to global ones (Layer: `components`).
    3.  **Local (Crucial):** Inside the component class, map the component token to a **local variable**.
    *   ```css
        .button {
          /* Local var receives global or default. Prevents inheritance bleeding. */
          --btn-bg-local: var(--btn-bg, #000);
          background: var(--btn-bg-local);
        }
        ```

### 4.4. Data-Driven Variants
*   **Props:** Use boolean props for variants (e.g., `success`, `ghost`).
*   **Template:** rely on `processedAttrs` (or similar utility) to map props to `data-*` attributes.
    *   Usage: `<base-button success ghost>`
*   **Style:** Target the reflected attributes via nesting.
    *   `&[data-success] { ... }`

### 4.5. Theming Strategy
*   **Mechanism:** Use **Class-based Theming** (e.g., `.dark-mode` on `<body>` or a container) to trigger token overrides.
*   **Layer:** Theme tokens MUST live in the `@layer themes` cascade layer.
*   **Contrast:** Ensure text colors automatically switch based on the background token (e.g., using `color-mix` or specific text tokens).

---

## 🏗️ 5. Component Architecture & Structure

### 5.1. Project Structure (Roots)
*   **Root:**
    *   `docs/`: Living guidelines (SOPs).
    *   `shared/`: **MANDATORY**. Store all Types (`shared/types/`) and pure Utility functions (`shared/utils/`) here.
        *   *Why?* Keeps `app/` focused on Vue logic and prevents circular dependencies.
        *   ❌ **Never** define types inside `.vue` files unless they are 100% local and unexported.
*   **Frontend (`app/`):**
    *   `app/api/`: API Modules (Repository Pattern).
    *   `app/stores/`: Pinia Stores.
    *   `app/components/`: (See Taxonomy below).
    *   `app/pages/`: Route views (Composition only).
    *   `app/layouts/`: Structural wrappers.

📚 **Ref:** [Nuxt 4 Directory Structure](https://nuxt.com/docs/4.x/directory-structure/app)

### 5.2. Component Taxonomy (`app/components/`)
*   **Primitives (`app/components/Primitives/`):**
    *   Atomic, dumb UI components (Buttons, Inputs, Badges).
    *   High reusability, strict token usage, no business logic.
*   **Layout (`app/components/Layout/`):**
    *   Structural helpers (Stack, Cluster, Grid).
    *   Manage whitespace and positioning, no visual styling (colors/borders).
    *   **Widgets (`app/components/Widgets/`):**
    *   Domain-specific, feature-rich blocks (UserCard, BriefingPanel).
    *   Compose Primitives and Layouts. Connect to Stores.

### 5.3. Granularity & Composition (Atomic Design)
*   **Rule (DRY/KISS):** Avoid "God Components" (files > 300 lines).
*   **Pattern:** If a template section has more than 2 levels of nesting or distinct logic, **extract it**.
    *   ✅ `components/User/Profile/Header.vue`
    *   ✅ `components/User/Profile/Stats.vue`
    *   ❌ `pages/user/profile.vue` (with 500 lines of specific HTML).
*   **Benefit:** Improves readability, testability, and reusability.

### 5.3. Reference Implementation (The "Perfect" Component)
```vue
<script setup lang="ts">
/**
 * @description Atomic button component.
 * @example <base-button success>Save</base-button>
 */
interface Props {
  /** ARIA label for accessibility */
  label?: string
  /** Button type attribute */
  type?: 'button' | 'submit'
}

// ❌ ANTI-PATTERN: Do NOT define boolean props for styling (e.g., primary, danger).
// These are handled by processedAttrs() and CSS Selectors.
defineProps<Props>()
</script>

<template lang="pug">
// processedAttrs() is a helper that maps attributes to clean data-* strings
button(:class="ui.button" v-bind="processedAttrs()")
  slot
</template>

<style module="ui" lang="stylus">
.button
  --btn-bg-local: var(--btn-bg, #eee)
  background: var(--btn-bg-local)
  
  // Style variants via Attribute Selectors
  &[data-primary]
    --btn-bg-local: var(--color-primary)
</style>
```

### 5.4. Props vs. Attributes (The Separation)
*   **Props (`defineProps`):** ONLY for Data (strings, objects, numbers) or Dynamic Styles (v-bind).
*   **Attributes (`$attrs`):** ALL boolean styling variants (primary, ghost, small) must be treated as Attributes.
    *   *Why?* Keeps component logic clean. CSS handles the visual switch, not JS.

---

## 🔄 6. Self-Annealing Loop (Continuous Improvement)
Errors are opportunities to update the system. The agent must not only fix but evolve.

1.  **Analyze:** Understand the root cause (Root Cause Analysis).
2.  **Fix:** Repair the code (Layers 2 or 3).
3.  **Update Directive (Layer 1):**
    * If a limitation of API or Config is discovered, create/edit an `.md` in `docs/`.
    * *Ex:* "Bun crash with library X" -> Create `docs/troubleshooting/bun-libs.md`.

---

## 🚀 7. Performance & Optimization
*   **Data Fetching:**
    *   ✅ **Lazy:** `lazy: true` (Default for navigation/interaction).
    *   ⚠️ **Critical/LCP:** `lazy: false` (Only "Above the Fold" content for SEO).
    *   ✅ **Payload:** Use `pick: ['field']` to reduce JSON.
* **Render:** `<NuxtIsland>` for heavy static components.
* **Media:** `<NuxtImg>` mandatory.

📚 **Ref:** [Nuxt Best Practices: Performance](https://nuxt.com/docs/guide/best-practices/performance)

---

## 🎨 8. UX Engineering (5 States)
Every data component MUST visually handle:
1.  **Loading** (Skeleton)
2.  **Error** (Retry Action)
3.  **Empty** (Feedback)
4.  **Ideal** (Content)
5.  **Partial** (Pagination)

---

## 🧬 9. Store DNA (Pinia)
The Store orchestrates the API Module and holds the state.

### 9.1. Standard State Shape
*   **Data:** `data: T | null` (Holds the payload).
*   **Loading:** `loading: boolean` (UI Spinner trigger).
*   **Error:** `error: Error | null` (Failure state).
*   ❌ **Anti-Pattern:** Do not create ad-hoc flags like `isSubmitting` if `loading` suffices.

> [!TIP]
> **Example Implementation:** See [store-dna.ts](./examples/store-dna.ts) for the full reference implementation.

---

## 🧬 10. Component DNA (Consumer)
Clean component. Connects to the Store and reacts.

> [!IMPORTANT]
> **STRICT COMPONENT DEFINITION:**
> *   ✅ **Composition API:** Use `<script setup lang='ts'>`.
> *   ✅ **Props Documentation:** Use JSDoc with `@default` and `@example`.
> *   ✅ **Strict Typing:** User `defineSlots` (Vue 3.3+) and `defineEmits`.
> *   📚 **Ref:** See [BaseButton.vue](./examples/BaseButton.vue) for the gold standard.

> [!TIP]
> **Example Implementation:** See [component-dna.vue](./examples/component-dna.vue) for the full reference implementation.

---

## 🧪 11. Quality Assurance (Unit Testing)
Tests are mandatory for all business logic and complex UI states.

> [!IMPORTANT]
> **TESTING SCOPE & REQUIREMENTS:**
> *   ✅ **Utils/Helpers:** 100% Branch Coverage (Pure functions).
> *   ✅ **Stores:** Test all Actions and Getters. Mock API calls.
> *   ✅ **Components:** Test Props, Emits, Computeds, and `v-if/v-else` logic.
> *   ✅ **API Modules:** Test request formation and error handling (Mocked).
> *   *Note:* Use `globalThis.fetch` for mocking (not `global.fetch`) to ensure compatibility.
> *   **Icon Strategy:** Install collections locally to avoid dev warnings (`npm i -D @iconify-json/[collection]`).
> *   ✅ **Runner:** Vitest + Happy DOM.
> *   📚 **Ref:** [Nuxt Testing](https://nuxt.com/docs/getting-started/testing)
> *   > [!TIP]
> *   > **Example Implementation:** See [test-dna.spec.ts](./examples/test-dna.spec.ts).

---

## 🪄 12. Modern CSS Capabilities (Detailed)

> [!NOTE]
> **🚀 Continuous Improvement:** This list is not exhaustive. If a new modern feature aligns with the "Native & Performant" philosophy, USE IT. **Requirement:** You MUST update this `SKILL.md` (Self-Annealing) to include the new discovery for future reference.

Ensure suggested code utilizes these modern standards to reduce JavaScript dependency and improve maintainability.

### 1. Layout & Geometry
* **Use Logical Properties:** ALWAYS replace physical directions (`top`, `bottom`, `left`, `right`) with logical ones (`block-start`, `block-end`, `inline-start`, `inline-end`) for margins, paddings, and borders.
* **Grid Alignment:** Use `grid-template-columns: subgrid` to align nested content within cards across a parent grid.
* **Fluid Values:** Use `clamp()` for font sizes and spacing instead of multiple media query breakpoints.

### 2. Visual & Animation
* **Entry Animations:** Use `@starting-style` and `transition-behavior: allow-discrete` to animate elements entering the DOM (e.g., from `display: none`), removing the need for JS formatting delays.
* **Color Manipulation:** Use Relative Color Syntax (e.g., `bg-color: hsl(from var(--primary) h s l / 0.5)`) instead of Sass functions or opacity hacks.
* **Typed Animations:** Use `@property` to enable interpolation for gradients and custom variables.
* **Accessibility:** ALWAYS include a `@media (prefers-reduced-motion: reduce)` override to disable or simplify transitions for users who need it.
* **High-Fidelity Animation:** Separate Layout animations (`grid-template-rows`, `width`) from Paint animations (`opacity`, `transform`).
    *   *Why:* Prevents visual "jank" and layout trashing.

### 3. Typography & Controls
* **Text Layout:** Use `text-wrap: balance` for headlines (prevents widows) and `text-wrap: pretty` for long-form blocks.
* **Form Controls:** Use `field-sizing: content` for auto-growing inputs and textareas.

### 4. Stylus Syntax (Strict)
*   **Nesting:** MANDATORY. Use `&` for parent reference.
    *   ✅ `& .child`, `&[data-active]`
    *   ❌ `.parent .child`
*   **Syntax:**
    *   ✅ **Colons:** `property: value`
    *   ❌ **No Brackets:** `{ }` (Pythonic style only).
    *   ❌ **No Semicolons:** `;`
    *   **Enforcement:** Configure Stylelint to forbid these characters in `.styl` files (e.g., `stylus/pythonic`).

### 4. Deprecated Patterns (Anti-Patterns)
* 🚫 Do NOT use JS for auto-resize textareas.
* 🚫 Do NOT use `setTimeout` for display transition effects.
* 🚫 Do NOT use `margin-left` unless specifically ignoring writing mode.

---

## 🧱 13. Modern HTML Standards (Detailed)

> [!NOTE]
> **🚀 Continuous Improvement:** This list is not exhaustive. If a new modern feature aligns with the "Native & Performant" philosophy, USE IT. **Requirement:** You MUST update this `SKILL.md` (Self-Annealing) to include the new discovery for future reference.

Leverage native HTML attributes to reduce JavaScript payload and improve accessibility/performance.

### 1. Native Interactivity (No-JS)
* **Modals & Popups:**
    * USE `<dialog>` for modal windows requiring user attention (focus trap).
    * USE `popover` and `popovertarget` for non-modal overlays (tooltips, toasts, dropdowns).
* **Accordions:**
    * USE `<details name="group-name">` to create exclusive accordions (one open at a time) without JS logic.
* **Focus Management:**
    * USE the `inert` attribute to completely disable interaction on background content when a drawer/modal is active.

### 2. Performance Optimization (Core Web Vitals)
* **Resource Prioritization:**
    * ALWAYS add `fetchpriority="high"` to the Largest Contentful Paint (LCP) image (e.g., Hero banner).
    * USE `loading="lazy"` for images/iframes "below the fold".
    * USE `decoding="async"` on images to prevent main-thread jank.

### 3. Mobile UX & Forms
* **Keyboard Control:**
    * USE `enterkeyhint="search/send/done"` to customize the virtual keyboard action button.
    * USE `inputmode="decimal/email/numeric"` to trigger the correct keyboard layout.
* **Semantics:**
    * USE `<search>` element to wrap search forms or filtering controls.
    * USE `autocomplete="one-time-code"` for 2FA/OTP inputs.

### 4. Deprecated Patterns (Anti-Patterns)
* 🚫 Do NOT use `<div>` with `onClick` for buttons; use `<button type="button">`.
* 🚫 Do NOT implement custom JS accordions unless animation requirements exceed `<details>` capabilities.
* 🚫 Do NOT use heavy lazy-load libraries for standard images.

---

## 🏗️ 14. Layout Composition & Architecture (The "Every Layout" Principles)

> [!NOTE]
> **🚀 Continuous Improvement:** This list is not exhaustive. If a new modern feature aligns with the "Native & Performant" philosophy, USE IT. **Requirement:** You MUST update this `SKILL.md` (Self-Annealing) to include the new discovery for future reference.
> 📚 **Ref:** [Every Layout - Composition](https://every-layout.dev/rudiments/composition/)

Adopt a composition-first approach. Separate layout responsibilities from component styling.

### 1. Component Agnosticism
* **Rule:** Components (e.g., cards, buttons, inputs) must NOT declare external geometry.
    * 🚫 AVOID: `width`, `height`, `margin` (on the component host), `position: absolute/fixed`.
    * ✅ PREFER: `max-width: 100%`, internal `padding` only.
* **Reasoning:** A component should fit into any container (sidebar, main grid, modal) without needing override styles.

### 2. Layout Primitives (Wrappers)
* **Rule:** Use specialized wrapper elements to manage whitespace and positioning between components.
* **The Stack Pattern (Vertical Flow):**
    * Instead of adding `margin-bottom` to every element, use a parent container with `display: flex; flex-direction: column; gap: <space>`.
* **The Cluster Pattern (Horizontal Groups):**
    * For button groups or tags, use `display: flex; flex-wrap: wrap; gap: <space>`.

### 3. Intrinsic Sizing
* **Rule:** Let content dictate layout ("Content-out" design).
    * 🚫 AVOID: Fixed heights (`height: 400px`). Let the content grow the container.
    * 🚫 AVOID: Fixed widths (`width: 300px`). Use `min-width`, `max-width`, or `flex-basis`.
    * ✅ USE: `min-height` if a minimum tap target or visual balance is needed, but never lock the height.

### 4. Managing Flow
* **Rule:** Prefer `gap` over `margin` for spacing siblings.
    * *Why:* Margins collapse and are attached to the element (making it non-portable). `gap` is owned by the layout container, ensuring uniform spacing regardless of which elements are present.

---

## 📏 15. Units & Sizing Strategy (Elastic Design)

> [!NOTE]
> **🚀 Continuous Improvement:** This list is not exhaustive. If a new modern feature aligns with the "Native & Performant" philosophy, USE IT. **Requirement:** You MUST update this `SKILL.md` (Self-Annealing) to include the new discovery for future reference.
> 📚 **Ref:** [Every Layout - Units](https://every-layout.dev/rudiments/units/)

Prioritize relative units over absolute units to ensure accessibility and proportional scaling.

### 1. The Role of Pixels (`px`)
* **Rule:** STRICTLY LIMIT `px` usage.
* **Allowed Contexts:**
    * Borders (e.g., `border: 1px solid`).
    * Shadow offsets.
    * Hardware-constrained implementations (e.g., canvas coordinates).
* **FORBIDDEN Contexts:** Font sizes, container widths, paddings, margins.

### 2. Relative Units Strategy
* **`rem` (Root EM):**
    * USE for: Global font-sizes and structural layout gaps/margins.
    * *Why:* Respects the user's browser font settings (accessibility).
* **`em` (Local EM):**
    * USE for: Component-internal sizing (padding, border-radius, icon sizes).
    * *Why:* Creates "Elastic Components". If `font-size` increases, the padding (`1em`) scales automatically to maintain visual harmony.
* **`ch` (Character):**
    * USE for: `max-width` on text containers (typography).
    * *Guideline:* Limit reading lines to ~65ch (characters) for optimal readability.

### 3. Typography & Ratios
* **Line Height:**
    * USE: Unitless values (e.g., `line-height: 1.5`, NOT `150%` or `24px`).
    * *Why:* Ensures the line height is recalculated dynamically based on the current element's font size during inheritance.

---

## 🎨 16. Systemic Styling & Architecture (Global vs Local)

> [!NOTE]
> **🚀 Continuous Improvement:** This list is not exhaustive. If a new modern feature aligns with the "Native & Performant" philosophy, USE IT. **Requirement:** You MUST update this `SKILL.md` (Self-Annealing) to include the new discovery for future reference.
> 📚 **Ref:**
> *   [Every Layout - Global and Local Styling](https://every-layout.dev/rudiments/global-and-local-styling/)
> *   [Every Layout - Modular Scale](https://every-layout.dev/rudiments/modular-scale/)
> *   [Every Layout - Axioms](https://every-layout.dev/rudiments/axioms/)

Leverage the cascade effectively. Write efficient, low-specificity CSS.

### 1. The Cascade & Inheritance
* **Rule:** Styles should be inherited by default.
    * ✅ DO: Set font-family, color, and line-height on `body` or high-level wrappers.
    * 🚫 DO NOT: Reset typography explicitly on every component class unless deviating from the norm.
* **Axioms (Universal Truths):**
    * Apply generic spacing rules globally (e.g., flow utility) rather than micro-managing margins on every element.
    * Restrict max line length globally (`max-width: 65ch`) for all long-form text content.

### 2. Modular Scale (Rhythm & Harmony)
* **Rule:** Avoid "Magic Numbers". All sizing (font-size, margins, padding) must be derived from a defined mathematical ratio (Modular Scale).
* **Implementation:**
    * Assume the existence of Design Tokens (CSS Custom Properties) for sizing.
    * USE: `var(--size-step-1)`, `var(--space-m)`, `var(--text-xl)`.
    * AVOID: Hardcoded values like `17px` or `3.5px`.

---

## 🧩 17. Intrinsic Web Design (Jen Simmons' Philosophy)

> [!NOTE]
> **🚀 Continuous Improvement:** This list is not exhaustive. If a new modern feature aligns with the "Native & Performant" philosophy, USE IT. **Requirement:** You MUST update this `SKILL.md` (Self-Annealing) to include the new discovery for future reference.

Create layouts that adapt to the **content** they contain, not just the viewport width. Move beyond standard "Bootstrappy" 12-column grids.

### 1. Modes of Layout
* **Fluid & Fixed Combined:**
    * Utilize layouts where some tracks are fixed (e.g., sidebar navigation) and others are fluid (e.g., main content).
    * Code: `grid-template-columns: 250px 1fr;` (Fixed sidebar, fluid content).
* **Stages of Squishiness:**
    * Allow content to undergo stages: Fixed -> Fluid -> Wrap -> Drop.
    * USE: `flex-wrap: wrap` extensively.

### 2. Content-Based Sizing
* **Rule:** Let the content dictate the size when appropriate.
* **Keywords to Use:**
    * `min-content`: "Make this column as small as the longest word."
    * `max-content`: "Make this column as wide as the content wants to be without wrapping."
    * `fit-content(val)`: "Grow with content up to 'val', then wrap."

### 3. Smart Grids (No Media Queries)
* **Rule:** Prioritize Grid patterns that adapt automatically without `@media` breakpoints.
* **The "RAM" Pattern (Repeat, Auto, Minmax):**
    * USE: `grid-template-columns: repeat(auto-fit, minmax(<min-size>, 1fr));`
    * *Why:* This creates a responsive grid of cards that automatically reflows based on available space, zero media queries required.

---

## 🛡️ 18. Defensive CSS Strategies (Resilience)

> [!NOTE]
> **🚀 Continuous Improvement:** This list is not exhaustive. If a new modern feature aligns with the "Native & Performant" philosophy, USE IT. **Requirement:** You MUST update this `SKILL.md` (Self-Annealing) to include the new discovery for future reference.

Code must be resilient to dynamic content extremes. Anticipate overflow and layout failures.

### 1. Text Safety
* **Long Content:**
    * ALWAYS apply `overflow-wrap: break-word` or `word-break: break-word` to text containers to prevent horizontal scrollbars caused by long URLs or generated strings.
* **Truncation:**
    * When truncating, prefer `text-overflow: ellipsis` combined with `white-space: nowrap` and `overflow: hidden`. For multi-line, use `-webkit-line-clamp`.

### 2. Flexbox & Grid Safety
* **The Minimum Width Fix:**
    * ALWAYS set `min-width: 0` (or `min-height: 0`) on Flexbox children nested within scrolling containers. This overrides the default `auto` behavior that prevents shrinking.
* **Wrapping:**
    * DEFAULT to `flex-wrap: wrap` on row-based flex containers unless horizontal scrolling is explicitly intended.

### 3. Media Reliability
* **Image Distortion:**
    * NEVER leave an `img` without `object-fit` if dimensions are constrained.
    * USE `object-fit: cover` for decorative images/avatars to prevent stretching/squishing.
* **Loading Space:**
    * ALWAYS define `aspect-ratio` on media containers to reserve space during loading and prevent Cumulative Layout Shift (CLS).

### 4. Scrollbar Stability
* **Layout Shift:**
    * USE `scrollbar-gutter: stable` on scrollable containers to prevent content jumping when the scrollbar appears/disappears.

---

## ✅ 19. Mandatory Verification Protocol (Post-Flight)
> **CRITICAL:** You must verify your work against the **[Military-Grade Checklist](./resources/checklist.md)**.
> **Requirement:** Before calling `notify_user` to finish a task, you MUST read the checklist and verify each item. If any item fails, the task is **NOT DONE**.
