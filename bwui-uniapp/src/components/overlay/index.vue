<template>
  <view class="bw-overlay" :class="{ 'bw-overlay--show': show }" :style="overlayStyle" @tap="handleClick">
    <slot></slot>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  zIndex: { type: Number, default: 1 },
  duration: { type: [Number, Object], default: 300 },
  color: { type: String, default: 'rgba(0, 0, 0, 0.7)' }
});

const emit = defineEmits(['click']);

const overlayStyle = computed(() => ({
  zIndex: props.zIndex,
  backgroundColor: props.color,
  transitionDuration: typeof props.duration === 'number' ? `${props.duration}ms` : `${props.duration.enter}ms`
}));

const handleClick = () => { emit('click'); };
</script>

<style scoped lang="scss">
.bw-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  &--show { opacity: 1; pointer-events: auto; }
}
</style>
