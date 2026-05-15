<template>
  <div class="bw-field" :class="{ 'bw-field--disabled': disabled }">
    <div v-if="$slots.label || label" class="bw-field__label">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="bw-field__body">
      <div v-if="$slots.left-icon || leftIcon" class="bw-field__left-icon" @click="$emit('click-icon', 'left')">
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
        :placeholder-style="placeholderStyle"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @confirm="handleConfirm"
      />
      <div v-if="$slots.right-icon || rightIcon" class="bw-field__right-icon" @click="$emit('click-icon', 'right')">
        <slot name="right-icon">
          <bw-icon :name="rightIcon" />
        </slot>
      </div>
      <div v-if="clearable && modelValue && isFocus" class="bw-field__clear" @click="handleClear">
        <bw-icon name="cross-circle" size="14px" />
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
  placeholderStyle?: string
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
  emit('update:modelValue', event.detail.value)
  emit('change', event.detail.value)
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
  emit('confirm', event.detail.value)
}
</script>

<style lang="scss" scoped>
.bw-field {
  padding: $bw-padding-md $bw-padding-md;
  background-color: $bw-bg-color;

  &--disabled {
    opacity: $bw-disabled-opacity;
  }

  &__label {
    margin-bottom: $bw-padding-xs;
    font-size: $bw-font-size-md;
    color: $bw-text-color;
  }

  &__body {
    display: flex;
    align-items: center;
    min-height: $bw-input-height-md;
  }

  &__left-icon,
  &__right-icon {
    display: flex;
    align-items: center;
    color: $bw-text-color-2;
  }

  &__left-icon {
    margin-right: $bw-padding-xs;
  }

  &__right-icon {
    margin-left: $bw-padding-xs;
  }

  &__input {
    flex: 1;
    min-height: $bw-input-height-md;
    padding: 0;
    font-size: $bw-font-size-md;
    color: $bw-text-color;
    background-color: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: $bw-text-color-3;
    }
  }

  &__clear {
    display: flex;
    align-items: center;
    margin-left: $bw-padding-xs;
    color: $bw-text-color-3;
  }

  &__footer {
    margin-top: $bw-padding-xs;
    font-size: $bw-font-size-sm;
    color: $bw-danger-color;
  }
}
</style>
