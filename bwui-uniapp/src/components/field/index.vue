<template>
  <view
    class="bw-field"
    :class="{
      'bw-field--disabled': disabled,
      'bw-field--readonly': readonly,
      'bw-field--error': error,
      'bw-field--center': center,
      'bw-field--multiple': type === 'textarea'
    }"
  >
    <view v-if="label || useSlot('label')" class="bw-field__label" :style="labelStyle">
      <slot name="label">
        <text>{{ label }}</text>
      </slot>
    </view>
    <view class="bw-field__body">
      <view class="bw-field__control-wrap">
        <view v-if="leftIcon" class="bw-field__icon bw-field__icon--left" @tap="handleIconClick('left')">
          {{ leftIcon }}
        </view>
        <slot v-if="useSlot('input')" name="input"></slot>
        <textarea
          v-else-if="type === 'textarea'"
          class="bw-field__control bw-field__textarea"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled || readonly"
          :maxlength="maxlength"
          :rows="rows"
          :autosize="autosize"
          :focus="focus"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
        />
        <input
          v-else
          class="bw-field__control"
          :type="inputType"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled || readonly"
          :maxlength="maxlength"
          :focus="focus"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
        />
        <view v-if="clearable && modelValue && !disabled && !readonly" class="bw-field__icon bw-field__icon--clear" @tap="handleClear">
          ✕
        </view>
        <view v-if="rightIcon" class="bw-field__icon bw-field__icon--right" @tap="handleIconClick('right')">
          {{ rightIcon }}
        </view>
        <slot name="button"></slot>
      </view>
    </view>
    <view v-if="showWordLimit && maxlength" class="bw-field__word-limit">
      <text>{{ modelValue?.length || 0 }}</text>/{{ maxlength }}
    </view>
    <view v-if="errorMessage" class="bw-field__error-message">{{ errorMessage }}</view>
  </view>
</template>

<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  name: { type: String, default: '' },
  type: { type: String, default: 'text' },
  size: { type: String, default: '' },
  maxlength: { type: [Number, String], default: -1 },
  placeholder: { type: String, default: '' },
  border: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  colon: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  clickable: { type: Boolean, default: false },
  isLink: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  showWordLimit: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  errorMessage: { type: String, default: '' },
  formatter: { type: Function, default: null },
  formatTrigger: { type: String, default: 'onChange' },
  labelAlign: { type: String, default: 'left' },
  labelWidth: { type: [Number, String], default: '6.2em' },
  inputAlign: { type: String, default: 'left' },
  autosize: { type: [Boolean, Object], default: false },
  leftIcon: { type: String, default: '' },
  rightIcon: { type: String, default: '' },
  rows: { type: [Number, String], default: 1 },
  focus: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'clear', 'click', 'click-input', 'click-left-icon', 'click-right-icon']);

const slots = useSlots();

const useSlot = (name) => slots[name];

const labelStyle = computed(() => ({
  width: typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : props.labelWidth,
  textAlign: props.labelAlign
}));

const inputType = computed(() => {
  if (props.type === 'number') return 'text';
  if (props.type === 'digit') return 'tel';
  return props.type;
});

const handleInput = (e) => {
  let value = e.detail.value;
  if (props.formatter && props.formatTrigger === 'onChange') {
    value = props.formatter(value);
  }
  emit('update:modelValue', value);
};

const handleFocus = (e) => { emit('focus', e); };
const handleBlur = (e) => {
  if (props.formatter && props.formatTrigger === 'onBlur') {
    const formatted = props.formatter(props.modelValue);
    emit('update:modelValue', formatted);
  }
  emit('blur', e);
};
const handleClear = (e) => {
  emit('update:modelValue', '');
  emit('clear', e);
};
const handleConfirm = (e) => {};
const handleIconClick = (position) => {
  emit(position === 'left' ? 'click-left-icon' : 'click-right-icon');
};
</script>

<style scoped lang="scss">
.bw-field {
  display: flex;
  align-items: flex-start;
  padding: 10px 16px;
  background: #fff;
  &--disabled { opacity: 0.5; }
  &--error { }
  &--center { align-items: center; }
  &--multiple { align-items: flex-start; }
  
  &__label {
    flex-shrink: 0;
    font-size: 14px;
    color: #323233;
    &::after { content: ':'; }
  }
  
  &__body { flex: 1; }
  
  &__control-wrap {
    display: flex;
    align-items: center;
  }
  
  &__control {
    flex: 1;
    padding: 0;
    font-size: 14px;
    color: #323233;
    background: transparent;
    border: none;
    outline: none;
    &::placeholder { color: #c8c9cc; }
  }
  
  &__textarea {
    min-height: 24px;
    resize: none;
  }
  
  &__icon {
    font-size: 16px;
    color: #c8c9cc;
    &--clear, &--right { margin-left: 8px; }
    &--left { margin-right: 8px; }
  }
  
  &__word-limit {
    text-align: right;
    font-size: 12px;
    color: #969799;
    margin-top: 4px;
  }
  
  &__error-message {
    font-size: 12px;
    color: #ee0a24;
    margin-top: 4px;
  }
}
</style>
