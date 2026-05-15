<template>
  <view class="bw-radio-group" :class="{ 'bw-radio-group--horizontal': direction === 'horizontal' }">
    <slot></slot>
  </view>
</template>

<script setup>
import { provide, ref, watch } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
  direction: { type: String, default: 'vertical' },
  iconSize: { type: [Number, String], default: 20 },
  checkedColor: { type: String, default: '#1989fa' }
});

const emit = defineEmits(['update:modelValue', 'change']);

const valueRef = ref(props.modelValue);

const updateValue = (val) => {
  valueRef.value = val;
  emit('update:modelValue', val);
  emit('change', val);
};

provide('radioGroup', {
  disabled: props.disabled,
  value: valueRef,
  updateValue
});

watch(() => props.modelValue, (val) => {
  valueRef.value = val;
});
</script>

<style scoped lang="scss">
.bw-radio-group {
  &--horizontal {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
