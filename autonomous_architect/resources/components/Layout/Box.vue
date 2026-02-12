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
  <component :class='[PREFIX_NAME].box' :is="tag ?? 'div'" v-bind="processedAttrs($attrs)">
    <slot></slot>
  </component>
</template>
<style module="[PREFIX_NAME]">
.box {
  padding: var(--[PREFIX_NAME]-box-gap, var(--[PREFIX_NAME]-gap, 1rem));

  &[data-nogap]:not([data-nogap='false']),
  &[data-no-gap]:not([data-no-gap='false']) {
    overflow: clip;
    padding: 0;
  }
}
</style>
