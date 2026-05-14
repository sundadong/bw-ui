<template>
  <view
    class="bw-switch"
    :class="[`bw-switch--${size}`, { 'bw-switch--checked': isChecked }, { 'bw-switch--disabled': disabled }]"
    @tap="handleClick"
  >
    <view class="bw-switch__node"></view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  size: { type: String, default: 'medium' },
  activeColor: { type: String, default: '#1989fa' },
  inactiveColor: { type: String, default: '#ebedf0' }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isChecked = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const handleClick = () => {
  if (props.disabled) return;
  isChecked.value = !isChecked.value;
  emit('change', isChecked.value);
};
</script>

<style scoped lang="scss">
.bw-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  border-radius: 999px;
  background: #ebedf0;
  transition: background-color 0.2s;

  &--small { width: 36px; height: 20px; }
  &--medium { width: 44px; height: 24px; }
  &--large { width: 52px; height: 28px; }

  &--checked { background: #1989fa; }

  &--disabled { opacity: 0.5; cursor: not-allowed; }

  &__node {
    position: absolute;
    top: 2px;
    left: 2px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s;

    .bw-switch--small & { width: 16px; height: 16px; }
    .bw-switch--medium & { width: 20px; height: 20px; }
    .bw-switch--large & { width: 24px; height: 24px; }
  }

  &--checked &__node { transform: translateX(100%); }
  &--small.bw-switch--checked &__node { transform: translateX(16px); }
  &--medium.bw-switch--checked &__node { transform: translateX(20px); }
  &--large.bw-switch--checked &__node { transform: translateX(24px); }
}
</style>
