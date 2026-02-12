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
  <component :class='[PREFIX_NAME].center' :is="tag ?? 'div'" v-bind="processedAttrs($attrs)">
    <slot></slot>
  </component>
</template>
<style module="[PREFIX_NAME]">
.center {
  box-sizing: content-box;
  margin-inline: auto;
  max-inline-size: var(--[PREFIX_NAME]-center-max-width, var(--[PREFIX_NAME]-max-width, 80rem));
  padding-inline: var(--[PREFIX_NAME]-center-gap, var(--[PREFIX_NAME]-gap, 1rem));

  &[data-intrinsic]:not([data-intrinsic='false']) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
