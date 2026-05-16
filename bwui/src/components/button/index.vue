<template>
  <div
    :class="buttonClass"
    :style="buttonStyle"
    @click="handleClick"
  >
    <div v-if="loading" class="bw-button__loading">
      <bw-loading :size="loadingSize" :type="loadingType" />
    </div>
    <div v-else-if="icon && !loading" class="bw-button__icon">
      <bw-icon :name="icon" :class-prefix="iconPrefix" />
    </div>
    <div class="bw-button__text">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
  loading?: boolean
  loadingType?: 'spinner' | 'circular'
  loadingSize?: string | number
  disabled?: boolean
  hairline?: boolean
  text?: boolean
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

const buttonClass = computed(() => {
  return [
    'bw-button',
    `bw-button--${props.type}`,
    `bw-button--${props.size}`,
    {
      'bw-button--block': props.block,
      'bw-button--round': props.round,
      'bw-button--square': props.square,
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
