import { defineStore } from 'pinia';
import { ProductModule } from '@api/ProductModule';
import type { ProductSummary } from '@types/product';

/**
 * @description Standard Store DNA implementation.
 * Follows { data, loading, error } shape.
 */
export const useProductStore = defineStore('product', () => {
  // State (Standard Shape)
  const data = ref<ProductSummary[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  // Actions
  async function fetchByCategory(categoryId: string) {
    loading.value = true;
    error.value = null;

    try {
      const payload = await ProductModule.getByCategory(categoryId);
      data.value = payload;
      return payload;
    } catch (err) {
      error.value = err as Error;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    data,
    loading,
    error,
    fetchByCategory,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
