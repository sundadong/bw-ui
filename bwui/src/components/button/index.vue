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
    // 判断是否为渐变颜色
    const isGradient = props.color.includes('gradient')
    
    if (props.plain) {
      style.color = props.color
      // 解析颜色并生成半透明背景
      if (props.color.startsWith('#')) {
        // 处理十六进制颜色
        let r = parseInt(props.color.slice(1, 3), 16)
        let g = parseInt(props.color.slice(3, 5), 16)
        let b = parseInt(props.color.slice(5, 7), 16)
        if (props.color.length === 4) {
          r = parseInt(props.color[1] + props.color[1], 16)
          g = parseInt(props.color[2] + props.color[2], 16)
          b = parseInt(props.color[3] + props.color[3], 16)
        }
        style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.1)`
        style.borderColor = props.color
      } else if (isGradient) {
        // 渐变颜色在plain模式下不使用渐变，只使用边框
        style.backgroundColor = 'transparent'
        style.borderColor = '#969799'
        style.color = '#969799'
      } else {
        style.backgroundColor = 'transparent'
        style.borderColor = props.color
      }
    } else if (props.text) {
      style.color = props.color
      style.backgroundColor = 'transparent'
      style.borderColor = 'transparent'
    } else {
      // 普通模式
      if (isGradient) {
        style.color = '#fff'
        if (!props.loading) {
          style.background = props.color
        }
        style.borderColor = 'transparent'
      } else {
        style.color = '#fff'
        if (!props.loading) {
          style.backgroundColor = props.color
        }
        style.borderColor = props.color
      }
    }
    if (props.hairline && !isGradient) {
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
@import '../../styles/variables.scss';

.bw-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
  font-size: $bw-font-size-md;
  line-height: 1.4;
  text-align: center;
  border: $bw-button-border-width solid $bw-button-border-color;
  border-radius: $bw-border-radius-md;
  background-color: $bw-white;
  cursor: pointer;
  transition: opacity $bw-animation-duration-fast;
  -webkit-appearance: none;
  user-select: none;

  &--small {
    height: $bw-button-height-sm;
    padding: 0 $bw-padding-sm;
    font-size: $bw-font-size-sm;
  }

  &--medium {
    height: $bw-button-height-md;
    padding: 0 $bw-padding-md;
    font-size: $bw-font-size-md;
  }

  &--large {
    height: $bw-button-height-lg;
    padding: 0 $bw-padding-lg;
    font-size: $bw-font-size-lg;
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &--round {
    border-radius: $bw-border-radius-round;
  }

  &--square {
    border-radius: 0;
  }

  &--disabled {
    cursor: not-allowed;
    opacity: $bw-disabled-opacity;
  }

  &--loading {
    cursor: default;
  }

  &--hairline {
    border-width: 0.5px;
  }

  &--text {
    background-color: transparent;
    border-color: transparent;
    
    &:active {
      opacity: $bw-active-opacity;
    }
  }

  &--primary {
    color: $bw-white;
    background-color: $bw-primary-color;
    border-color: $bw-primary-color;
  }

  &--success {
    color: $bw-white;
    background-color: $bw-success-color;
    border-color: $bw-success-color;
  }

  &--warning {
    color: $bw-white;
    background-color: $bw-warning-color;
    border-color: $bw-warning-color;
  }

  &--danger {
    color: $bw-white;
    background-color: $bw-danger-color;
    border-color: $bw-danger-color;
  }

  &--default {
    color: $bw-text-color;
    background-color: $bw-white;
    border-color: $bw-border-color;
  }

  &--plain {
    &.bw-button--primary {
      color: $bw-primary-color;
      background-color: rgba($bw-primary-color, 0.1);
      border-color: $bw-primary-color;
    }
    &.bw-button--success {
      color: $bw-success-color;
      background-color: rgba($bw-success-color, 0.1);
      border-color: $bw-success-color;
    }
    &.bw-button--warning {
      color: $bw-warning-color;
      background-color: rgba($bw-warning-color, 0.1);
      border-color: $bw-warning-color;
    }
    &.bw-button--danger {
      color: $bw-danger-color;
      background-color: rgba($bw-danger-color, 0.1);
      border-color: $bw-danger-color;
    }
    &.bw-button--default {
      color: $bw-text-color;
      background-color: $bw-bg-color-gray;
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

  &:active {
    opacity: $bw-active-opacity;
  }
}
</style>
