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
  <component :class='[PREFIX_NAME].grid' :is="tag ?? 'div'" v-bind="processedAttrs($attrs)">
    <slot></slot>
  </component>
</template>
<style module="[PREFIX_NAME]">
.grid {
  display: grid;
  gap: var(--[PREFIX_NAME]-grid-gap, var(--[PREFIX_NAME]-gap, 1rem));
  grid-template-columns: repeat(auto-fit, minmax(min(var(--[PREFIX_NAME]-grid-column-min-width, 15.625rem), 100%), 1fr));
}
</style>
