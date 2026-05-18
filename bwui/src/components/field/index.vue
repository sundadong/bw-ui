<template>
  <div class="bw-field" :class="{ 'bw-field--disabled': disabled, 'bw-field--focused': isFocus, 'bw-field--error': !!errorMessage }">
    <div v-if="$slots.label || label" class="bw-field__label">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="bw-field__body">
      <div v-if="$slots['left-icon'] || leftIcon" class="bw-field__left-icon" @click="$emit('click-icon', 'left')">
        <slot name="left-icon">
          <bw-icon :name="leftIcon" />
        </slot>
      </div>
      <input
        class="bw-field__input"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
      />
      <div v-if="clearable && modelValue && isFocus" class="bw-field__clear" @click="handleClear">
        <bw-icon name="cross" size="14px" />
      </div>
      <div v-if="$slots['right-icon'] || rightIcon" class="bw-field__right-icon" @click="$emit('click-icon', 'right')">
        <slot name="right-icon">
          <bw-icon :name="rightIcon" />
        </slot>
      </div>
    </div>
    <div v-if="$slots.footer || errorMessage" class="bw-field__footer">
      <slot name="footer">{{ errorMessage }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BwIcon from '../icon/index.vue'

export interface FieldProps {
  modelValue?: string | number
  type?: 'text' | 'number' | 'idcard' | 'digit' | 'tel' | 'password' | 'search'
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  maxlength?: number | string
  leftIcon?: string
  rightIcon?: string
  errorMessage?: string
}

const props = withDefaults(defineProps<FieldProps>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  readonly: false,
  clearable: false,
  maxlength: -1
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'focus': [event: Event]
  'blur': [event: Event]
  'clear': []
  'click-icon': [type: 'left' | 'right']
  'confirm': [value: string]
}>()

const isFocus = ref(false)

const handleInput = (event: any) => {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('change', value)
}

const handleFocus = (event: Event) => {
  isFocus.value = true
  emit('focus', event)
}

const handleBlur = (event: Event) => {
  isFocus.value = false
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
}

const handleConfirm = (event: any) => {
  emit('confirm', event.target.value)
}
</script>

<style lang="less" scoped>
.bw-field {
  padding: 12px 16px;
  background-color: @bw-white;

  &--disabled {
    opacity: 0.5;
  }

  &--error {
    .bw-field__label,
    .bw-field__input {
      color: @bw-danger-color;
    }
  }

  &__label {
    margin-bottom: 4px;
    font-size: 14px;
    color: @bw-text-color;
  }

  &__body {
    display: flex;
    align-items: center;
    min-height: 24px;
  }

  &__left-icon,
  &__right-icon {
    display: flex;
    align-items: center;
    color: @bw-text-color-2;
  }

  &__left-icon {
    margin-right: 8px;
  }

  &__right-icon {
    margin-left: 8px;
  }

  &__input {
    flex: 1;
    min-height: 24px;
    padding: 0;
    font-size: 14px;
    color: @bw-text-color;
    background-color: transparent;
    border: none;
    outline: none;
    resize: none;

    &::placeholder {
      color: @bw-text-color-3;
    }
  }

  &__clear {
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: @bw-text-color-3;
  }

  &__footer {
    margin-top: 4px;
    font-size: 12px;
    color: @bw-danger-color;
  }
}
</style>
