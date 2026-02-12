# The "Autonomous Architect" Skill

This document provides a detailed analysis and recommendation for the `autonomous_architect/SKILL.md` file.

---

## 1. In-Depth Analysis

This skill document defines a highly rigorous and opinionated set of rules for an AI agent (or a human developer) to act as a **Principal Frontend Architect**. The primary goal is to build Nuxt 4 applications in a standardized, performant, and maintainable way, adhering to a very specific coding philosophy.

### Core Philosophy & Mission

The agent's mission is to orchestrate software construction using the **"Store-First"** pattern within a **3-Layer Architecture**. Two key concepts stand out:

-   **Deterministic Complexity:** Business logic and complex rules must reside in predictable locations (Stores, API modules), not scattered across visual components.
-   **Self-Annealing:** The system (and the agent) must learn from its own mistakes. When a limitation is discovered, the documentation (`SKILL.md`) must be updated to prevent the error from recurring. This is a powerful continuous improvement mechanism.

### Architecture and Design Patterns

The document imposes a strict, hierarchical architecture:

*   **3-Layer Architecture:**
    1.  **API Layer (`app/api/`):** Handles raw HTTP calls. Stateless and execution-only.
    2.  **Store Layer (`app/stores/`):** The heart of the application. Consumes the API layer, manages all state (`loading`, `error`, `data`), and contains all business logic. It is the **Single Source of Truth**.
    3.  **Component Layer (`app/components/`):** The visual layer. Only calls Store actions and reacts to state changes. **Must never call the API directly.**

*   **Component Taxonomy (Adapted Atomic Design):**
    *   `Primitives`: Dumb, reusable UI elements (Button, Input).
    *   `Layout`: Structural components for spacing and positioning (Stack, Grid).
    *   `Widgets`: Domain-specific blocks that compose Primitives and Layouts, connected to Stores.

*   **CSS Architecture:**
    *   **CSS Layers (`@layer`):** Mandatory for controlling specificity.
    *   **CSS Modules:** Enforced for explicit class scoping; `scoped` styles are forbidden.
    *   **Token Layering ("Leak-Proof" Pattern):** A defensive pattern where components use local variables mapped to global design tokens, always with a fallback. This prevents style conflicts and ensures components are self-contained.

### Technology Stack ("The Sacred Stack")

The choice of technologies is non-negotiable:
*   **Core:** Nuxt 4 + Bun
*   **State:** Pinia
*   **Styling:** Stylus with CSS Modules
*   **Templating:** Pug
*   **Language:** TypeScript (Strict Mode)

### Golden Rules & Anti-Patterns

The skill explicitly forbids certain practices:
*   Using `<style scoped>`.
*   Deviating from the `script`, `template`, `style` order.
*   Using `app.vue` instead of the `layouts/` + `pages/` structure.
*   Manually importing Vue/Nuxt APIs (relies on "Nuxt Magic" auto-imports).
*   Handling stylistic variations with props instead of HTML attributes (`data-*`).

---

## 2. Recommendation

**Use this skill, *if* your goal is to build robust, scalable, and high-quality applications, especially in a team setting or for long-term projects.**

However, it's crucial to understand that this is not a one-size-fits-all solution.

### ✅ When You SHOULD Use This Skill:

1.  **For Team-Based and Long-Term Projects:** The strict standardization is its greatest asset. It ensures a cohesive, predictable, and maintainable codebase.
2.  **When Quality and Performance are Critical:** The skill enforces modern best practices (native CSS/HTML features, performance optimizations), leading to a superior end product.
3.  **For Building Complex Systems:** The architecture is ideal for managing the complexity of large applications like dashboards or design systems.
4.  **To Onboard and Standardize Development:** It acts as an executable architecture manual, ensuring even junior developers adhere to senior-level standards.

### 🚫 When You Should AVOID This Skill:

1.  **For Rapid Prototypes or Small Projects:** The setup overhead and strict rules can be excessive for simple projects that need to be built quickly.
2.  **If Your Team Prefers a Different Stack:** The "Sacred Stack" is non-negotiable. If your team prefers Tailwind CSS, for example, this skill will cause friction.
3.  **For Solo Developers with an Established Workflow:** The rigidity might be frustrating for a developer who is already productive with their own style and tools.

### Conclusion

Think of this skill as a **high-precision engineering blueprint**. You wouldn't use it to build a simple wooden shed, but it's indispensable for building a skyscraper.

**If your project is serious, intended to grow, and will be maintained over time, then absolutely adopt this skill.** The initial investment in adhering to its rules will pay dividends in the form of a cleaner, more performant, and vastly more maintainable codebase.
