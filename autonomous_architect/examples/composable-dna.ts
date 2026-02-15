/**
 * @name Composable DNA
 * @description
 *  Standard Composable Pattern.
 *  Encapsulates logic, state, and methods.
 *  Returns a specific interface.
 */

import {
  type Ref,
  ref,
  computed,
  readonly,
  toValue,
  type MaybeRefOrGetter,
} from 'vue';

// Types & Interfaces
interface UseCounterOptions {
  initialValue?: MaybeRefOrGetter<number>;
  step?: MaybeRefOrGetter<number>;
}

interface UseCounterReturn {
  count: Readonly<Ref<number>>; // Readonly state to prevent mutation outside
  double: ComputedRef<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

/**
 * useCounter
 * @param options - Configuration options
 */
export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  // State
  // Use `toValue` to unwrap refs/getters for initial values
  const stepValue = toValue(options.step) ?? 1;
  const initialValue = toValue(options.initialValue) ?? 0;

  const count = ref(initialValue);

  // Computed
  const double = computed(() => count.value * 2);

  // Methods
  function increment() {
    count.value += stepValue;
  }

  function decrement() {
    count.value -= stepValue;
  }

  function reset() {
    count.value = initialValue;
  }

  // Return
  // Return readonly state to enforce unidirectional data flow
  return {
    count: readonly(count),
    double,
    increment,
    decrement,
    reset,
  };
}
