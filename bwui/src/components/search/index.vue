<template>
  <div
    class="bw-search"
    :class="[`bw-search--${shape}`, { 'bw-search--show-action': showAction }]"
    :style="{ backgroundColor: background }"
  >
    <div class="bw-search__content">
      <div class="bw-search__field" :class="{ 'bw-search__field--disabled': disabled }">
        <div v-if="leftIcon || $slots['left-icon']" class="bw-search__left-icon">
          <slot name="left-icon">
            <span v-if="leftIcon" class="bw-search__icon-search">🔍</span>
          </slot>
        </div>
        <input
          ref="inputRef"
          class="bw-search__input"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @confirm="handleConfirm"
        />
        <div
          v-if="clearable && modelValue"
          class="bw-search__clear"
          @click="handleClear"
        >
          <span class="bw-search__clear-icon">✕</span>
        </div>
      </div>
    </div>
    <div v-if="showAction" class="bw-search__action" @click="handleAction">
      <slot name="action">
        <span>{{ actionText }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface SearchProps {
  modelValue?: string | number
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showAction?: boolean
  actionText?: string
  background?: string
  shape?: 'square' | 'round'
  leftIcon?: string
}

const props = withDefaults(defineProps<SearchProps>(), {
  modelValue: '',
  placeholder: '请输入搜索关键词',
  disabled: false,
  readonly: false,
  clearable: false,
  showAction: false,
  actionText: '搜索',
  background: '#ffffff',
  shape: 'square',
  leftIcon: 'search'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'change': [value: string]
  'search': [value: string]
  'focus': [event: Event]
  'blur': [event: Event]
  'clear': []
  'cancel': []
}>()

const inputRef = ref<HTMLInputElement | null>(null)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
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

const handleConfirm = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('search', target.value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  inputRef.value?.focus()
}

const handleAction = () => {
  if (props.showAction) {
    emit('search', String(props.modelValue))
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-search {
  display: flex;
  align-items: center;
  padding: 8px 16px;

  &--show-action {
    padding-right: 0;
  }

  &--square {
    .bw-search__field {
      border-radius: $bw-border-radius-md;
    }
  }

  &--round {
    .bw-search__field {
      border-radius: $bw-border-radius-round;
    }
  }

  &__content {
    flex: 1;
  }

  &__field {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    background-color: $bw-bg-color-light;
    border-radius: $bw-border-radius-md;

    &--disabled {
      opacity: $bw-disabled-opacity;
    }
  }

  &__left-icon {
    display: flex;
    align-items: center;
    margin-right: 6px;
    color: $bw-text-color-3;
    font-size: $bw-font-size-md;
  }

  &__icon-search {
    font-size: $bw-font-size-lg;
    line-height: 1;
  }

  &__input {
    flex: 1;
    padding: 0;
    font-size: $bw-font-size-md;
    color: $bw-text-color;
    background-color: transparent;
    border: none;
    outline: none;
    line-height: 1.5;

    &::placeholder {
      color: $bw-text-color-3;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &[readonly] {
      cursor: default;
    }
  }

  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 6px;
    padding: 2px;
    color: $bw-text-color-3;
    cursor: pointer;
    border-radius: 50%;
    background-color: $bw-text-color-3;
    width: 16px;
    height: 16px;
  }

  &__clear-icon {
    font-size: 10px;
    color: $bw-white;
    line-height: 1;
  }

  &__action {
    padding: 0 12px;
    font-size: $bw-font-size-md;
    color: $bw-text-color;
    line-height: $bw-button-height-md;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
  }
}
</style>