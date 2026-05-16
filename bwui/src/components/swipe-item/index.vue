<template>
  <div class="bw-swipe-item" :style="itemStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

const swipe = inject<{
  itemCount: ReturnType<typeof import('vue').ref<number>>
  swipeWidth: ReturnType<typeof import('vue').ref<number>>
  swipeHeight: ReturnType<typeof import('vue').ref<number>>
}>('swipe')

const itemStyle = computed(() => {
  if (!swipe) return {}
  return {
    width: swipe.swipeWidth.value ? swipe.swipeWidth.value + 'px' : '100%',
    height: swipe.swipeHeight.value ? swipe.swipeHeight.value + 'px' : '100%',
    flexShrink: '0'
  }
})
</script>

<style lang="scss" scoped>
.bw-swipe-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>