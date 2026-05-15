<template>
  <view class="bw-checkbox" :class="{ 'bw-checkbox--disabled': disabled }">
    <view class="bw-checkbox__icon" :class="{ 'bw-checkbox__icon--checked': isChecked }" @tap="toggle">
      <text v-if="isChecked" class="bw-checkbox__icon-check">✓</text>
    </view>
    <view class="bw-checkbox__label" @tap="toggle">
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  name: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' },
  shape: { type: String, default: 'round' },
  checkedColor: { type: String, default: '#1989fa' }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isChecked = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const toggle = () => {
  if (props.disabled) return;
  isChecked.value = !isChecked.value;
  emit('change', isChecked.value);
};
</script>

<style scoped lang="scss">
.bw-checkbox {
  display: inline-flex;
  align-items: center;
  &--disabled { opacity: 0.5; cursor: not-allowed; }
  &__icon {
    width: 20px;
    height: 20px;
    border: 1px solid #c8c9cc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    &--checked {
      background: #1989fa;
      border-color: #1989fa;
    }
  }
  &__icon-check { color: #fff; font-size: 12px; font-weight: bold; }
  &__label { margin-left: 8px; font-size: 14px; color: #323233; }
}
</style>
