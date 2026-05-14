<template>
  <view class="bw-space" :style="gapStyle">
    <slot></slot>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  direction: { type: String, default: 'horizontal' },
  size: { type: [Number, String], default: 8 },
  wrap: { type: Boolean, default: true }
});

const gapStyle = computed(() => {
  const gap = typeof props.size === 'number' ? `${props.size}px` : props.size;
  if (props.direction === 'vertical') {
    return { display: 'flex', flexDirection: 'column', gap };
  }
  return {
    display: props.wrap ? 'flex' : 'inline-flex',
    flexWrap: props.wrap ? 'wrap' : 'nowrap',
    gap
  };
});
</script>

<style scoped lang="scss">
.bw-space { align-items: center; }
</style>
