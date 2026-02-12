import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductStore } from './store-dna'; // Importing the store to test

// Mocking the API Layer (Dependency Injection/Isolation)
const mockGetByCategory = vi.fn();

vi.mock('~/app/api/ProductModule', () => ({
  ProductModule: {
    getByCategory: (id: string) => mockGetByCategory(id),
  },
}));

describe('Store DNA: ProductStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('should have initial state', () => {
    const store = useProductStore();
    expect(store.data).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });

  it('fetchByCategory: success path', async () => {
    const store = useProductStore();
    const mockData = [{ id: '1', name: 'Widget' }];

    // Setup Mock
    mockGetByCategory.mockResolvedValue(mockData);

    // Execute Action
    const promise = store.fetchByCategory('cat-1');

    // Assert Loading State during execution
    expect(store.loading).toBe(true);

    await promise;

    // Assert Final State
    expect(store.data).toEqual(mockData);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
    expect(mockGetByCategory).toHaveBeenCalledWith('cat-1');
  });

  it('fetchByCategory: error path', async () => {
    const store = useProductStore();
    const mockError = new Error('Network Error');

    // Setup Mock
    mockGetByCategory.mockRejectedValue(mockError);

    // Execute & Assert Rejection
    await expect(store.fetchByCategory('cat-1')).rejects.toThrow(
      'Network Error',
    );

    // Assert Final State
    expect(store.data).toEqual([]); // Should remain empty
    expect(store.loading).toBe(false);
    expect(store.error).toEqual(mockError);
  });
});
