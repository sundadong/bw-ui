<template>
  <view class="bw-checkbox" :class="{ 'bw-checkbox--disabled': isDisabled }" @tap="handleClick">
    <view
      class="bw-checkbox__icon"
      :class="[
        `bw-checkbox__icon--${shape}`,
        { 'bw-checkbox__icon--checked': isChecked },
        { 'bw-checkbox__icon--disabled': isDisabled },
        { 'bw-checkbox__icon--indeterminate': indeterminate }
      ]"
    >
      <slot v-if="isChecked" name="icon" :checked="isChecked" :disabled="isDisabled">
        <text class="bw-checkbox__icon-check">✓</text>
      </slot>
    </view>
    <view class="bw-checkbox__label" :class="{ 'bw-checkbox__label--disabled': isDisabled }" @tap.stop="handleLabelClick">
      <slot :checked="isChecked" :disabled="isDisabled">{{ label }}</slot>
    </view>
  </view>
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  name: { type: [String, Number], default: '' },
  shape: { type: String, default: 'round' },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' },
  labelPosition: { type: String, default: 'right' },
  labelDisabled: { type: Boolean, default: false },
  iconSize: { type: [Number, String], default: 20 },
  checkedColor: { type: String, default: '#1989fa' },
  bindGroup: { type: Boolean, default: true },
  indeterminate: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'change', 'click']);

const checkboxGroup = inject('checkboxGroup', null);

const isDisabled = computed(() => {
  return props.disabled || (checkboxGroup?.disabled?.value ?? false);
});

const isChecked = computed({
  get: () => {
    if (checkboxGroup?.value?.value?.value) {
      return checkboxGroup.value.value.value.includes(props.name);
    }
    return props.modelValue;
  },
  set: (val) => {
    if (checkboxGroup?.toggle) {
      checkboxGroup.toggle(props.name);
    } else {
      emit('update:modelValue', val);
      emit('change', val);
    }
  }
});

const handleClick = () => {
  if (isDisabled.value) return;
  emit('click');
  isChecked.value = !isChecked.value;
};

const handleLabelClick = () => {
  if (!props.labelDisabled) {
    handleClick();
  }
};
</script>

<style scoped lang="scss">
.bw-checkbox {
  display: inline-flex;
  align-items: center;
  
  &--disabled { opacity: 0.5; cursor: not-allowed; }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid #c8c9cc;
    background: #fff;
    transition: all 0.2s;
    
    &--round { border-radius: 50%; }
    &--square { border-radius: 2px; }
    
    &--checked {
      background: #1989fa;
      border-color: #1989fa;
      .bw-checkbox__icon-check { color: #fff; }
    }
    
    &--indeterminate {
      background: #1989fa;
      border-color: #1989fa;
    }
    
    &--disabled {
      background: #ebedf0;
      border-color: #c8c9cc;
    }
  }
  
  &__icon-check { font-size: 12px; font-weight: bold; }
  
  &__label {
    margin-left: 8px;
    font-size: 14px;
    color: #323233;
    
    &--disabled { color: #969799; }
  }
}
</style>
