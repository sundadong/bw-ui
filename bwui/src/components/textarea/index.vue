<template>
  <div class="bw-textarea" :class="{ 'bw-textarea--disabled': disabled }">
    <textarea
      class="bw-textarea__inner"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :rows="rows"
      :style="textareaStyle"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <div v-if="showWordLimit && maxlength && maxlength > 0" class="bw-textarea__word-limit">
      {{ currentLength }}/{{ maxlength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface TextareaProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  autosize?: boolean | { maxHeight?: number; minHeight?: number }
  maxlength?: number
  showWordLimit?: boolean
  rows?: number
}

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  disabled: false,
  readonly: false,
  autosize: false,
  maxlength: -1,
  showWordLimit: false,
  rows: 3
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'focus': [event: Event]
  'blur': [event: Event]
}>()

const currentLength = computed(() => {
  return (props.modelValue || '').length
})

const textareaStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.autosize) {
    style.resize = 'none'
    if (typeof props.autosize === 'object') {
      if (props.autosize.minHeight !== undefined) {
        style.minHeight = `${props.autosize.minHeight}px`
      }
      if (props.autosize.maxHeight !== undefined) {
        style.maxHeight = `${props.autosize.maxHeight}px`
      }
    }
  }

  return style
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const value = target.value
  emit('update:modelValue', value)
  emit('change', value)
}

const handleFocus = (event: Event) => {
  emit('focus', event)
}

const handleBlur = (event: Event) => {
  emit('blur', event)
}
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-textarea {
  position: relative;
  padding: @bw-padding-sm  @bw-padding-md;

  &--disabled {
    opacity: @bw-disabled-opacity;
  }

  &__inner {
    display: block;
    width: 100%;
    min-height: 72px;
    padding: 0;
    font-size: @bw-font-size-md;
    line-height: @bw-line-height-md;
    color: @bw-text-color;
    background-color: transparent;
    border: none;
    outline: none;
    resize: vertical;
    box-sizing: border-box;

    &::placeholder {
      color: @bw-text-color-3;
    }

    &:disabled {
      cursor: not-allowed;
      background-color: transparent;
    }

    &[readonly] {
      cursor: default;
    }
  }

  &__word-limit {
    text-align: right;
    font-size: @bw-font-size-sm;
    color: @bw-text-color-2;
    margin-top: 4px;
    line-height: 1.5;
  }
}
</style>