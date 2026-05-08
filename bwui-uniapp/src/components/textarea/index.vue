<template>
  <view class="bw-textarea" :class="{ 'bw-textarea--disabled': disabled, 'bw-textarea--error': error }">
    <textarea
      class="bw-textarea__inner"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      :focus="focus"
      :auto-height="autoHeight"
      :fixed="fixed"
      :cursor="cursor"
      :show-confirm-bar="showConfirmBar"
      :adjust-position="adjustPosition"
      :cursor-spacing="cursorSpacing"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @confirm="handleConfirm"
      @linechange="handleLineChange"
    />
    <view v-if="showWordCount || maxlength > 0" class="bw-textarea__count">
      {{ modelValue ? modelValue.length : 0 }}/{{ maxlength > 0 ? maxlength : '无限制' }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

export interface TextareaProps {
  modelValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number;
  focus?: boolean;
  autoHeight?: boolean;
  fixed?: boolean;
  cursor?: number;
  showConfirmBar?: boolean;
  adjustPosition?: boolean;
  cursorSpacing?: number;
  showWordCount?: boolean;
  error?: boolean;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  readonly: false,
  maxlength: -1,
  focus: false,
  autoHeight: false,
  fixed: false,
  cursor: -1,
  showConfirmBar: true,
  adjustPosition: true,
  cursorSpacing: 0,
  showWordCount: false,
  error: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  'focus': [event: Event];
  'blur': [event: Event];
  'change': [value: string];
  'confirm': [value: string];
  'linechange': [event: Event];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
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
  const target = event.target as HTMLTextAreaElement;
  emit('confirm', target.value);
};

const handleLineChange = (event: Event) => {
  emit('linechange', event);
};
</script>

<style lang="scss" scoped>
.bw-textarea {
  position: relative;
  width: 100%;
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

  &__inner {
    display: block;
    width: 100%;
    min-height: 80px;
    padding: $padding-sm;
    font-size: $font-size-md;
    color: $text-color;
    line-height: 1.5;
    background: transparent;
    border: none;
    outline: none;
    resize: none;
    box-sizing: border-box;

    &::placeholder {
      color: $text-color-3;
    }
  }

  &__count {
    position: absolute;
    right: $padding-sm;
    bottom: $padding-xs;
    font-size: $font-size-sm;
    color: $text-color-3;
  }
}
</style>
