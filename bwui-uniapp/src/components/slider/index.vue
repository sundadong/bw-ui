<template>
  <view class="bw-slider">
    <view class="bw-slider__track" @tap="handleClick">
      <view class="bw-slider__bar" :style="{ width: percentage + '%' }"></view>
      <view class="bw-slider__thumb" :style="{ left: percentage + '%' }" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  activeColor: { type: String, default: '#1989fa' },
  inactiveColor: { type: String, default: '#ebedf0' }
});

const emit = defineEmits(['update:modelValue', 'change']);
const dragging = ref(false);

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100;
});

const updateValue = (clientX, target) => {
  if (props.disabled) return;
  const rect = target.getBoundingClientRect();
  const x = clientX - rect.left;
  const p = Math.max(0, Math.min(1, x / rect.width));
  const value = props.min + p * (props.max - props.min);
  const stepped = Math.round(value / props.step) * props.step;
  const clamped = Math.max(props.min, Math.min(props.max, stepped));
  emit('update:modelValue', clamped);
};

const handleClick = (e) => {
  updateValue(e.touches[0].clientX, e.currentTarget);
};

const handleTouchStart = () => { dragging.value = true; };
const handleTouchMove = (e) => {
  if (dragging.value) {
    updateValue(e.touches[0].clientX, e.currentTarget.parentElement);
  }
};
const handleTouchEnd = () => {
  if (dragging.value) {
    dragging.value = false;
    emit('change', props.modelValue);
  }
};
</script>

<style scoped lang="scss">
.bw-slider {
  padding: 8px 0;
  &__track {
    position: relative;
    height: 4px;
    background: #ebedf0;
    border-radius: 999px;
    cursor: pointer;
  }
  &__bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #1989fa;
    border-radius: 999px;
  }
  &__thumb {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
    cursor: grab;
    &:active { cursor: grabbing; transform: translate(-50%, -50%) scale(1.1); }
  }
}
</style>
