<script setup lang="ts">
/**
 * @name Component DNA
 * @description
 *  Standard Component showing Strict Layout Composition.
 *  - Uses <[prefix]-stack> and <[prefix]-cluster> for structural layout.
 *  - Uses CSS Modules ONLY for aesthetics (colors, borders, typography).
 *  - NOTE: Replace '[prefix]' with your project's component prefix (e.g., 'base', 'app').
 */

// Props
interface Props {
  title: string;
  count?: number;
  isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  isActive: false,
});

// Emits
const emit = defineEmits<{
  (e: 'click:action', value: number): void;
}>();

// Computed
const displayTitle = computed(() => `${props.title} (${props.count})`);

// Methods
function handleClick() {
  if (props.isActive) {
    emit('click:action', props.count + 1);
  }
}
</script>

<template>
  <!-- Root Layout -->
  <[prefix]-stack tag="article" :class="[ui.card, { [ui.isActive]: isActive }]" data-testid="dna-component">
    <!-- Header Layout -->
    <[prefix]-cluster tag="header" between center>
      <h2 :class="ui.title">{{ displayTitle }}</h2>

      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </[prefix]-cluster>

    <!-- Body content flows naturally in the Stack -->
    <div :class="ui.body">
      <slot />
    </div>

    <!-- Footer: Right-aligned button -->
    <[prefix]-cluster tag="footer" end>
      <button type="button" :class="ui.button" @click="handleClick">
        Action
      </button>
    </[prefix]-cluster>
  </[prefix]-stack>
</template>

<style lang="stylus" module="ui">

.card {
  padding: var(--space-unit-lg, 1.5rem);
  border: 1px solid var(--color-border, #ccc);
  border-radius: var(--radius-md, 0.5rem);
  background: var(--color-surface, #fff);
  transition: all 0.2s ease;
  
  /* Defensive */
  max-inline-size: 100%; /* Logical Property */
  overflow: hidden;

  /* Layout Config */
  --[prefix]-stack-gap: 1rem;
}

.isActive {
  border-color: var(--color-primary, #007bff);
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1));
}

.title {
  font-size: var(--font-size-lg, 1.25rem);
  font-weight: 600;
  color: var(--color-text-primary, #333);
  line-height: 1.2;
}

.body {
  color: var(--color-text-secondary, #555);
}

.button {
  padding: 0.5rem 1rem;
  background: var(--color-primary, #007bff);
  color: white;
  border-radius: var(--radius-sm, 0.25rem);
  cursor: pointer;
  border: none;
  
  &:hover {
    opacity: 0.9;
  }
}
</style>
