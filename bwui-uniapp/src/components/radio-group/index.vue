<template>
  <view class="bw-radio-group">
    <slot></slot>
  </view>
</template>

<script setup>
import { provide, watch } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: '' },
  disabled: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'change']);

provide('radioGroup', {
  disabled: props.disabled,
  value: props.modelValue,
  toggle: (name) => {
    emit('update:modelValue', name);
    emit('change', name);
  }
});

watch(() => props.modelValue, (val) => {
  provide('radioGroup', {
    disabled: props.disabled,
    value: val,
    toggle: (name) => {
      emit('update:modelValue', name);
      emit('change', name);
    }
  });
});
</script>
