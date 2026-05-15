<template>
  <view class="bw-checkbox-group">
    <slot></slot>
  </view>
</template>

<script setup>
import { provide, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'change']);

provide('checkboxGroup', {
  disabled: props.disabled,
  value: props.modelValue,
  toggle: (name) => {
    const newValue = [...props.modelValue];
    const index = newValue.indexOf(name);
    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(name);
    }
    emit('update:modelValue', newValue);
    emit('change', newValue);
  }
});

watch(() => props.modelValue, (val) => {
  provide('checkboxGroup', {
    disabled: props.disabled,
    value: val,
    toggle: (name) => {
      const newValue = [...props.modelValue];
      const index = newValue.indexOf(name);
      if (index > -1) {
        newValue.splice(index, 1);
      } else {
        newValue.push(name);
      }
      emit('update:modelValue', newValue);
      emit('change', newValue);
    }
  });
}, { deep: true });
</script>
