<template>
  <view class="bw-input" :class="{ 'bw-input--disabled': disabled, 'bw-input--error': error }">
    <view v-if="$slots.prefix || prefixIcon" class="bw-input__prefix">
      <slot name="prefix">
        <text v-if="prefixIcon" :class="`bw-icon bw-icon-${prefixIcon}`"></text>
      </slot>
    </view>
    <input
      class="bw-input__inner"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :focus="focus"
      :confirm-type="confirmType"
      :adjust-position="adjustPosition"
      :cursor-spacing="cursorSpacing"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @confirm="handleConfirm"
    />
    <view v-if="$slots.suffix || suffixIcon || clearable && modelValue" class="bw-input__suffix">
      <text
        v-if="clearable && modelValue"
        class="bw-input__clear"
        @click="handleClear"
      >
        <text class="bw-icon bw-icon-close-circle"></text>
      </text>
      <slot name="suffix">
        <text v-if="suffixIcon" :class="`bw-icon bw-icon-${suffixIcon}`"></text>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

export interface InputProps {
  modelValue?: string;
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'password';
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number;
  focus?: boolean;
  clearable?: boolean;
  prefixIcon?: string;
  suffixIcon?: string;
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done';
  adjustPosition?: boolean;
  cursorSpacing?: number;
  error?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  readonly: false,
  maxlength: -1,
  focus: false,
  clearable: false,
  confirmType: 'done',
  adjustPosition: true,
  cursorSpacing: 0,
  error: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'focus': [event: Event];
  'blur': [event: Event];
  'change': [value: string];
  'confirm': [value: string];
  'clear': [];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('change', target.value);
};

const handleFocus = (event: Event) => {
  emit('focus', event);
};

const handleBlur = (event: Event) => {
  emit('blur', event);
};

const handleConfirm = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('confirm', target.value);
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<style lang="scss" scoped>
.bw-input {
  display: flex;
  align-items: center;
  height: $input-height-md;
  padding: 0 $padding-sm;
  background-color: #ffffff;
  border: 1px solid $border-color;
  border-radius: $border-radius-md;
  box-sizing: border-box;

  &--disabled {
    opacity: 0.6;
    background-color: $background-color-light;
  }

  &--error {
    border-color: $danger-color;
  }

  &__prefix {
    margin-right: $padding-xs;
    color: $text-color-2;
  }

  &__inner {
    flex: 1;
    height: 100%;
    font-size: $font-size-md;
    color: $text-color;
    background: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: $text-color-3;
    }
  }

  &__suffix {
    display: flex;
    align-items: center;
    margin-left: $padding-xs;
    color: $text-color-2;
  }

  &__clear {
    padding: 4px;
    color: $text-color-3;

    &:active {
      opacity: 0.7;
    }
  }
}
</style>
