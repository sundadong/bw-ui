<template>
  <component
    :is="href ? 'a' : 'button'"
    :type="href ? undefined : nativeType"
    :href="href"
    :class="buttonClass"
    :style="buttonStyle"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <div v-if="loading" class="bw-button__loading">
      <bw-loading :size="loadingSize" :type="loadingType" />
    </div>
    <div v-else-if="$slots.icon || icon" class="bw-button__icon">
      <slot name="icon">
        <bw-icon v-if="icon" :name="icon" :class-prefix="iconPrefix" />
      </slot>
    </div>
    <div class="bw-button__text">
      <slot></slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import BwLoading from '../loading/index.vue'
import BwIcon from '../icon/index.vue'

export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'default'
  size?: 'small' | 'medium' | 'large'
  icon?: string
  iconPrefix?: string
  color?: string
  block?: boolean
  round?: boolean
  square?: boolean
  plain?: boolean
  loading?: boolean
  loadingType?: 'spinner' | 'circular'
  loadingSize?: string | number
  disabled?: boolean
  hairline?: boolean
  text?: boolean
  nativeType?: 'button' | 'submit' | 'reset'
  href?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  iconPrefix: 'bwicon',
  block: false,
  round: false,
  square: false,
  loading: false,
  loadingType: 'circular',
  loadingSize: '20px',
  disabled: false,
  hairline: false,
  text: false
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const slots = useSlots()

const buttonClass = computed(() => {
  return [
    'bw-button',
    `bw-button--${props.type}`,
    `bw-button--${props.size}`,
    {
      'bw-button--block': props.block,
      'bw-button--round': props.round,
      'bw-button--square': props.square,
      'bw-button--plain': props.plain,
      'bw-button--disabled': props.disabled,
      'bw-button--hairline': props.hairline,
      'bw-button--text': props.text,
      'bw-button--loading': props.loading
    }
  ]
})

const buttonStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.color = props.text ? props.color : '#fff'
    if (!props.text && !props.loading) {
      style.backgroundColor = props.color
    }
    if (props.hairline) {
      style.borderColor = props.color
    }
  }
  return style
})

const hoverClass = computed(() => {
  if (props.disabled || props.loading || props.text) {
    return ''
  }
  return 'bw-button--active'
})

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss">
.bw-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &--small {
    height: 32px;
    padding: 0 8px;
    font-size: 12px;
  }

  &--medium {
    height: 44px;
    padding: 0 12px;
    font-size: 14px;
  }

  &--large {
    height: 50px;
    padding: 0 16px;
    font-size: 16px;
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &--round {
    border-radius: 999px;
  }

  &--square {
    border-radius: 0;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--loading {
    cursor: default;
  }

  &--hairline {
    border-width: 1px;
  }

  &--text {
    background-color: transparent;
    border-color: transparent;
  }

  &--primary {
    color: #fff;
    background-color: #1989fa;
    border-color: #1989fa;
  }

  &--success {
    color: #fff;
    background-color: #07c160;
    border-color: #07c160;
  }

  &--warning {
    color: #fff;
    background-color: #ff976a;
    border-color: #ff976a;
  }

  &--danger {
    color: #fff;
    background-color: #ee0a24;
    border-color: #ee0a24;
  }

  &--default {
    color: #323233;
    background-color: #fff;
    border: 1px solid #ebedf0;
  }

  &--plain {
    &.bw-button--primary {
      color: $bw-primary-color;
      background-color: #e6f4ff;
      border-color: $bw-primary-color;
    }
    &.bw-button--success {
      color: $bw-success-color;
      background-color: #e7f7ed;
      border-color: $bw-success-color;
    }
    &.bw-button--warning {
      color: $bw-warning-color;
      background-color: #fff3e6;
      border-color: $bw-warning-color;
    }
    &.bw-button--danger {
      color: $bw-danger-color;
      background-color: #fff0f0;
      border-color: $bw-danger-color;
    }
    &.bw-button--default {
      color: $bw-text-color;
      background-color: #f7f8fa;
      border-color: $bw-border-color;
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
  }

  &__text {
    display: flex;
    align-items: center;
  }

  &--active {
    opacity: 0.6;
  }
}
</style>
