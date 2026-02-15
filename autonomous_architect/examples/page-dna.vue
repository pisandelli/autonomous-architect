<script setup lang="ts">
/**
 * @name Page DNA
 * @description
 *  Standard Page showing Data Fetching, SEO, and the 5 UX States.
 *  MUST use `useAsyncData` for SSR and Hydration.
 */

// Imports
import { useProductStore } from '@stores/product';

// SEO & Meta
useHead({
  title: 'Products | Autonomous Architect',
  meta: [
    { name: 'description', content: 'Browse our high-quality products.' },
  ],
});

definePageMeta({
  layout: 'default',
  // middleware: ['auth'], // Example
});

// Store & State
const productStore = useProductStore();
const route = useRoute();

// Data Fetching (SSR Safe)
// aggressive: true means it blocks navigation until resolved (optional)
// lazy: true is preferred for better TTI if skeleton is used.
const { data, status, error, refresh } = await useAsyncData(
  'products-list',
  () => productStore.fetchByCategory(route.params.categoryId as string),
  {
    lazy: true, // Non-blocking navigation
    watch: [() => route.params.categoryId], // Refetch on param change
  }
);

// Computed States (For Easier Template Logic)
const isLoading = computed(() => status.value === 'pending');
const isError = computed(() => status.value === 'error');
const isEmpty = computed(() => !isLoading.value && !isError.value && (!data.value || data.value.length === 0));
const isIdeal = computed(() => !isLoading.value && !isError.value && data.value && data.value.length > 0);
</script>

<template>
  <!-- 
    Layout First: <[prefix]-stack> 
    Strict adherence to 'NO Ad-Hoc Layouts'.
  -->
  <[prefix]-stack tag="main" gap="2rem" :class="ui.page">
    <header :class="ui.header">
      <h1 :class="ui.title">Products</h1>
    </header>

    <!-- 
      UX State 1: Loading 
      Use Skeleton loaders to prevent layout shift.
    -->
    <[prefix]-grid v-if="isLoading" :class="ui.productsGrid">
      <div v-for="i in 6" :key="i" :class="ui.skeletonCard" />
    </[prefix]-grid>

    <!-- 
      UX State 2: Error 
      Provide actionable feedback (Retry).
    -->
    <[prefix]-center v-else-if="isError" intrinsic :class="ui.stateError">
      <[prefix]-stack gap="1rem" center>
        <p>Failed to load products.</p>
        <button @click="refresh">Retry</button>
      </[prefix]-stack>
    </[prefix]-center>

    <!-- 
      UX State 3: Empty 
      Guide the user on what to do next.
    -->
    <[prefix]-center v-else-if="isEmpty" intrinsic :class="ui.stateEmpty">
      <[prefix]-stack gap="1rem" center>
        <p>No products found in this category.</p>
        <NuxtLink to="/categories">Browse Categories</NuxtLink>
      </[prefix]-stack>
    </[prefix]-center>

    <!-- 
      UX State 4: Ideal 
      The actual content.
    -->
    <[prefix]-grid v-else-if="isIdeal" :class="ui.productsGrid">
      <article v-for="product in data" :key="product.id" :class="ui.card">
        <!-- Mandatory NuxtImg usage -->
        <NuxtImg :src="product.image" :alt="product.name" width="300" height="200" :class="ui.image" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </article>

      <!-- 
        UX State 5: Partial (Pagination/Load More)
        Show below the list if applicable.
      -->
      <div v-if="data.length > 20" :class="ui.pagination">
        <button>Load More</button>
      </div>
    </[prefix]-grid>
  </[prefix]-stack>
</template>

<style lang="stylus" module="ui">
.page {
  padding: var(--space-unit-xl, 2rem);
  max-inline-size: 75rem; /* Logical Property (1200px) */
  margin-inline: auto;     /* Logical Property */
}

.header {
  margin-block-end: var(--space-unit-lg, 1.5rem); /* Logical Property */
}

/* 
  States Styling 
  (Layout handled by Stack/Center/Grid components)
*/
.stateError, .stateEmpty {
  min-block-size: 25rem; /* Logical Property, min-height replacement (400px) */
  text-align: center;
  color: var(--color-text-secondary, #666);
}

.skeletonCard {
  block-size: 18.75rem; /* Logical Property (300px) */
  background: var(--color-surface-variant, #f0f0f0);
  border-radius: var(--radius-md, 0.5rem);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* 
  Layout Overrides (Local Token Layering) 
  Rule: Use CSS Variables to configure Layout Components.
*/
.productsGrid {
  --[prefix]-grid-gap: 1.5rem;
  --[prefix]-grid-column-min-width: 18.75rem;
}
</style>
