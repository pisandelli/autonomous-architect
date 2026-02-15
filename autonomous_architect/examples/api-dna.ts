import type { ProductSummary } from '@types/product';

/**
 * @description API Module DNA.
 * Responsible for raw data fetching. Stateless.
 * Returns Promises of typed data.
 */
export const ProductModule = {
  /**
   * Fetches products by category ID.
   * @param categoryId - The category UUID.
   */
  async getByCategory(categoryId: string): Promise<ProductSummary[]> {
    const response = await $fetch<ProductSummary[]>(`/api/products`, {
      method: 'GET',
      query: { category_id: categoryId },
    });

    return response;
  },

  /**
   * Creates a new product.
   * @param payload - The product data.
   */
  async create(payload: Partial<ProductSummary>): Promise<ProductSummary> {
    const response = await $fetch<ProductSummary>('/api/products', {
      method: 'POST',
      body: payload,
    });

    return response;
  },
};
