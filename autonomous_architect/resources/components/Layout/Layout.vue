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
  <component :class='[PREFIX_NAME].layout' :is="tag ?? 'div'" v-bind="processedAttrs($attrs)">
    <slot></slot>
  </component>
</template>
<style module="[PREFIX_NAME]">
.layout {
  display: grid;
  grid-template-rows: var(--[PREFIX_NAME]-layout-header-height, min-content) auto var(--[PREFIX_NAME]-layout-footer-height, min-content);
  gap: var(--[PREFIX_NAME]-layout-gap, var(--[PREFIX_NAME]-gap, 1rem)) 0;
  min-block-size: 100dvh;
}
</style>
