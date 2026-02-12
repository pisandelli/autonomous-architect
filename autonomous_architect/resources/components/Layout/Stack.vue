<script lang="ts" setup>
import { processedAttrs } from '@utils/processedAttrs'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  tag?: string
}>()
</script>

<template>
  <component :class='[PREFIX_NAME].stack' :is="tag ?? 'div'" v-bind="processedAttrs($attrs)">
    <slot></slot>
  </component>
</template>
<style module="[PREFIX_NAME]">
.stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &>*,
  &[data-recursive]:not([data-recursive='false']) * {
    margin-block: 0;
  }

  &>*+*,
  &[data-recursive]:not([data-recursive='false']) *+* {
    margin-block-start: var(--[PREFIX_NAME]-stack-gap, var(--[PREFIX_NAME]-gap, 1rem));
  }

  &[data-nogap]:not([data-nogap='false'])>*+*,
  &[data-no-gap]:not([data-no-gap='false'])>*+* {
    margin-block-start: 0;
  }

  &[data-compact]:not([data-compact='false'])>*+* {
    margin-block-start: calc(var(--[PREFIX_NAME]-stack-gap, var(--[PREFIX_NAME]-gap, 1rem)) / 2);
  }

  &[data-spaced]:not([data-spaced='false'])>*+* {
    margin-block-start: calc(var(--[PREFIX_NAME]-stack-gap, var(--[PREFIX_NAME]-gap, 1rem)) * 3);
  }

  &[data-reverse]:not([data-reverse='false']) {
    flex-direction: column-reverse;
  }

  &[data-center]:not([data-center='false']) {
    align-items: center;
  }

  &[data-end]:not([data-end='false']) {
    align-items: end;
  }
}
</style>
