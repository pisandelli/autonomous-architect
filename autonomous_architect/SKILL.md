---
name: nuxt-4-autonomous-architect
description: Reference Manual and Implementation Guide for the Autonomous Architect stack.
---

# 📘 Autonomous Architect: Reference Manual

## 📖 Overview
This document serves as the **Reference Manual** and **Implementation Guide** for the Autonomous Architect stack. It complements the strict **Rules** (found in your agent configuration) by providing context, examples, and setup instructions.

---

## 🚀 1. Initialization & Setup
Follow these steps to establish the project foundation.

### 1.1. Resource Installation
1.  **Copy Resources:**
    *   **Reset:** [`resources/reset.styl`](./resources/reset.styl) acts as the global reset.
    *   **Layout Engine:** The [`resources/components/Layout/`](./resources/components/Layout/) directory contains the core functional wrappers (Stack, Cluster, Grid, Center).
2.  **Configuration:**
    *   **Nuxt Config:** Use [`resources/nuxt.config.template.ts`](./resources/nuxt.config.template.ts) as the base `nuxt.config.ts`.
    *   *Action:* Replace `[PREFIX_NAME]` with the project prefix (e.g., `App`).

### 1.2. Helper Utilities
*   **ProcessedAttrs:** `shared/utils/processedAttrs.ts` is required for mapping boolean props/attributes to `data-*` attributes for styling.

---

## 🏗️ 2. Architectural Patterns

### 2.1. The 3-Layer Architecture
Data flow is strictly unidirectional.

1.  **Layer 1: API Modules (`app/api/`)**
    *   **Purpose:** Raw execution of network requests.
    *   **Behavior:** Stateless. Just returns data or throws errors.
    *   *Reference:* [api-dna.ts](./examples/api-dna.ts)
2.  **Layer 2: Stores (`app/stores/`)**
    *   **Purpose:** Business Logic and State Management.
    *   **Behavior:** Consumes API Layer. Holds `loading`, `error`, `data`.
    *   *Reference:* [store-dna.ts](./examples/store-dna.ts)
3.  **Layer 3: Components (`app/components/`)**
    *   **Purpose:** Visual Orchestration.
    *   **Behavior:** Consumes Stores. NEVER calls API directly.
    *   *Reference:* [component-dna.vue](./examples/component-dna.vue)

### 2.2. The "Store-First" Pattern
*   **SSR Hydration:** We use `await useAsyncData(() => store.action())` in `pages/` or top-level components to ensure data is fetched on the server and hydrated on the client.
*   **Single Source of Truth:** Components should read from `store.data`, not local state, for shared data.

### 2.3. Pinia Configuration
*   **HMR:** Stores must include `import.meta.hot` to enable Hot Module Replacement without reloading.
*   **Auto-Imports:** Configured for `defineStore` and `acceptHMRUpdate`.
*   **Persist:** Use `pinia-plugin-persistedstate` if local storage is needed.

### 2.4. Database Strategy (Prisma)
Only if a database is required.
*   **Multi-file Schema:** Mandatory for organization.
    *   *Reference:* [Prisma Multi-file Docs](https://www.prisma.io/docs/orm/prisma-schema/overview/location#multi-file-prisma-schema)
*   **Extensions:** Use Prisma Client Extensions for computed fields, not the global `$extends`.

---

## 🎨 3. CSS & Stylus Architecture

### 3.1. File Structure (`app/assets/styles/`)
*   `reset.styl`: Modern CSS reset.
*   `defaults.styl`: Global Design Tokens (CSS Custom Properties). defined in `@layer base`.
*   `abstracts/*.styl`: Stylus mixins/functions (purely build-time).

### 3.2. The Token Layering System
This system prevents "CSS Bleeding" and ensures component encapsulation without Shadow DOM.

1.  **Global Layer (Base):** Defines the theme.
    *   `--color-primary: #3b82f6`
2.  **Component Layer:** Defines the component's semantic tokens.
    *   `--btn-bg: var(--color-primary)`
3.  **Local Layer (The "Magic"):** Re-assigns the token to a local variable *inside* the component class.
    *   ```stylus
        .button
          --bg-local: var(--btn-bg)
          background: var(--bg-local)
        ```

### 3.3. Data-Driven Styling
We use **Data Attributes** (`data-variant="..."`) instead of modifier classes (`.btn--primary`).
*   **Mechanism:** `processedAttrs()` maps Vue `$attrs` to HTML `data-*` attributes.
*   **Styling:** CSS selectors target these attributes (`&[data-primary]`).

### 3.4. Defensive CSS Strategy
Ensure resilience against dynamic content.
*   **Flex Safety:** `min-width: 0` prevents flex items from overflowing their containers.
*   **Image Safety:** `aspect-ratio` prevents layout shifts (CLS) while images load.
*   **Scroll Safety:** `scrollbar-gutter: stable` prevents content jumping when scrollbars toggle.

### 3.5. Theming Strategy
*   **Mechanism:** Use **Class-based Theming** (e.g., `.dark-mode` on `<body>`).
*   **Layer:** Override tokens in the `@layer themes` cascade layer.
*   **Contrast:** Ensure text colors automatically switch based on background tokens.

---

## 🧩 4. Component Taxonomy

### 4.1. Directory Structure
*   `app/components/Primitives/`: Atomic, dumb UI elements (Buttons, Inputs). High reusability.
*   `app/components/Layout/`: Functional wrappers (Stack, Grid). No visual styling (borders/colors), only whitespace/positioning.
*   `app/components/Widgets/`: Domain-specific features (UserProfile, DashboardChart). Connected to Stores.

### 4.2. Atomic Design Principles
*   **Composition:** Build complex interfaces by nesting simple Primitives inside Layout wrappers.
*   **Separation of Concerns:**
    *   **Review:** Logic goes in `<script>`.
    *   **Structure:** Semantics go in `<template>`.
    *   **Style:** Visuals go in `<style>`.

### 4.3 Documentation Standards (JSDoc)
While `rules` mandate documentation, this is the reference format:
*   **Components:** Describe purpose and usage.
*   **Props:** Use `@default` and `@example` tags.
*   **No Tutorials:** Do not write numbered comments (`// 1. Fetch data`) inside code blocks. Code should be self-documenting; JSDoc explains the "Why".

---

## 🧬 5. Code DNA (Reference Implementations)
Use these files as the "Gold Standard" for new code.

*   **API Module:** [`examples/api-dna.ts`](./examples/api-dna.ts)
*   **Pinia Store:** [`examples/store-dna.ts`](./examples/store-dna.ts)
*   **Vue Component:** [`examples/component-dna.vue`](./examples/component-dna.vue)
*   **Unit Test:** [`examples/test-dna.spec.ts`](./examples/test-dna.spec.ts)

---

## 🧪 6. Quality Assurance Strategy

### 6.1. Testing Scope
*   **Utils:** 100% Coverage (Logic is pure).
*   **Stores:** Mock API calls, test state mutations.
*   **Components:** Test Props, Events, and Conditional Rendering (Visual logic).

### 6.2. The Self-Annealing Loop
Errors are opportunities to update the system.
1.  **Analyze** the root cause.
2.  **Fix** the code.
3.  **Update** this documentation or the `rules` if a systemic issue is found.
