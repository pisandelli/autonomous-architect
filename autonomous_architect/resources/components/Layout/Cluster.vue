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
  <component :class='[PREFIX_NAME].cluster' :is="tag ?? 'div'" v-bind="processedAttrs($attrs)">
    <slot></slot>
  </component>
</template>
<style module='[PREFIX_NAME]'>
.cluster {
  display: flex;
  flex-wrap: wrap;
  gap: var(--[PREFIX_NAME]-cluster-gap, var(--[PREFIX_NAME]-gap, 1rem));
  justify-content: flex-start;
  align-items: center;

  /* Justify options */
  &[data-center]:not([data-center='false']) {
    justify-content: center;
  }

  &[data-end]:not([data-end='false']) {
    justify-content: flex-end;
  }

  &[data-between]:not([data-between='false']) {
    justify-content: space-between;
  }

  &[data-around]:not([data-around='false']) {
    justify-content: space-around;
  }

  &[data-evenly]:not([data-evenly='false']) {
    justify-content: space-evenly;
  }

  /* Gap options */
  &[data-narrow]:not([data-narrow='false']) {
    gap: calc(var(--[PREFIX_NAME]-cluster-gap, var(--[PREFIX_NAME]-gap, 1rem)) * 0.666666667);
  }

  &[data-wide]:not([data-wide='false']) {
    gap: calc(var(--[PREFIX_NAME]-cluster-gap, var(--[PREFIX_NAME]-gap, 1rem)) * 2);
  }
}
</style>
