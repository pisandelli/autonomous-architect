# ✅ Military-Grade Validation Checklist

> **PROTOCOL:** This checklist MUST be executed before marking any task as complete.

## 1. CSS Architecture (The "Leak-Proof" Standard)
- [ ] **Layers:** Does `tokens.css` declare `@layer base, components, themes;`?
- [ ] **Fallbacks:** Do ALL `var()` usages have a fallback? (e.g., `var(--token, #default)`).
- [ ] **Immutability:** Did I ensure NO global tokens are reassigned locally? (e.g., no `.card { --color-primary: red }`).
- [ ] **Modules:** Are ALL styles using CSS Modules? (`<style module>`).
- [ ] **Nesting & Syntax:** Is CSS Nesting used? Are blocks free of `{}` and `;`?

## 2. Component DNA
- [ ] **SFC Order:** Is it strictly `Script` -> `Template` -> `Style`?
- [ ] **Props vs Attrs:** Did I use `defineProps` ONLY for data? Are styling booleans handled via `$attrs`?
- [ ] **Template Casing:** Is it `kebab-case` (`<[prefix]-button>`)? (PascalCase `<[Prefix]Button>` is FORBIDDEN).
- [ ] **Imports:** Did I rely on Auto-Import for components (even internal composition)?
- [ ] **Aliases:** Did I use strict aliases (`@utils`, `@types`) instead of relative paths?

## 3. State & Logic
- [ ] **Store DNA:** Does the state follow the shape `{ data, loading, error }`?
- [ ] **No Ad-Hoc Flags:** Did I avoid creating redundant flags like `isSubmitting`?

## 4. Accessibility & Motion
- [ ] **Reduced Motion:** Is there a `@media (prefers-reduced-motion)` override?
- [ ] **High-Fidelity:** Are Layout animations (`width`, `height`) separated from Paint animations (`opacity`)?
- [ ] **Semantics:** Did I use the correct HTML tags?
