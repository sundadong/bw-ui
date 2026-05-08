<template>
  <view class="bw-stepper" :class="{ 'bw-stepper--disabled': disabled }">
    <view
      class="bw-stepper__minus"
      :class="{ 'is-disabled': disabled || modelValue <= min }"
      @click="handleMinus"
    ></view>
    <input
      class="bw-stepper__input"
      type="number"
      :value="displayValue"
      :disabled="disabled || disableInput"
      @input="handleInput"
      @blur="handleBlur"
    />
    <view
      class="bw-stepper__plus"
      :class="{ 'is-disabled': disabled || modelValue >= max }"
      @click="handlePlus"
    ></view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

export interface StepperProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  disableInput?: boolean;
  integer?: boolean;
  decimalLength?: number;
}

const props = withDefaults(defineProps<StepperProps>(), {
  modelValue: 0,
  min: 0,
  max: Infinity,
  step: 1,
  disabled: false,
  disableInput: false,
  integer: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
  'change': [value: number];
  'overlimit': [type: 'minus' | 'plus'];
}>();

const displayValue = computed(() => {
  return props.modelValue;
});

const checkRange = (value: number): number => {
  let newValue = value;
  if (newValue < props.min) {
    newValue = props.min;
  }
  if (newValue > props.max) {
    newValue = props.max;
  }
  if (props.integer) {
    newValue = Math.round(newValue);
  }
  if (props.decimalLength !== undefined) {
    newValue = parseFloat(newValue.toFixed(props.decimalLength));
  }
  return newValue;
};

const handleMinus = () => {
  if (props.disabled || props.modelValue <= props.min) {
    emit('overlimit', 'minus');
    return;
  }
  const newValue = checkRange(props.modelValue - props.step);
  emit('update:modelValue', newValue);
  emit('change', newValue);
};

const handlePlus = () => {
  if (props.disabled || props.modelValue >= props.max) {
    emit('overlimit', 'plus');
    return;
  }
  const newValue = checkRange(props.modelValue + props.step);
  emit('update:modelValue', newValue);
  emit('change', newValue);
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value);
  if (!isNaN(value)) {
    const newValue = checkRange(value);
    emit('update:modelValue', newValue);
    emit('change', newValue);
  }
};

const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = parseFloat(target.value);
  if (!isNaN(value)) {
    const newValue = checkRange(value);
    if (newValue !== props.modelValue) {
      emit('update:modelValue', newValue);
      emit('change', newValue);
    }
  } else {
    target.value = String(props.modelValue);
  }
};
</script>

<style lang="scss" scoped>
.bw-stepper {
  display: inline-flex;
  align-items: center;
  height: 32px;
  background-color: #f7f8fa;
  border-radius: $border-radius-md;
  overflow: hidden;

  &--disabled {
    opacity: 0.6;
  }

  &__minus,
  &__plus,
  &__input {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: $font-size-lg;
    color: $text-color;
    text-align: center;
    vertical-align: middle;
    background-color: #f7f8fa;
  }

  &__minus,
  &__plus {
    position: relative;
    width: 32px;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 2px;
      background-color: $text-color;
      transform: translate(-50%, -50%);
      transition: background-color $animation-duration-fast;
    }

    &.is-disabled {
      &::before {
        background-color: $text-color-3;
      }
    }

    &:active:not(.is-disabled) {
      &::before {
        background-color: $primary-color;
      }
    }
  }

  &__plus {
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 2px;
      height: 16px;
      background-color: $text-color;
      transform: translate(-50%, -50%);
      transition: background-color $animation-duration-fast;
    }

    &.is-disabled {
      &::after {
        background-color: $text-color-3;
      }
    }

    &:active:not(.is-disabled) {
      &::after {
        background-color: $primary-color;
      }
    }
  }

  &__input {
    width: 48px;
    margin: 0 2px;
    font-size: $font-size-md;
    background-color: #ffffff;
    border: none;
    border-radius: 0;

    &[disabled] {
      background-color: #f7f8fa;
    }
  }
}
</style>
