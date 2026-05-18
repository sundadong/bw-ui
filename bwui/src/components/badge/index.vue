<template>
  <div class="bw-badge" :class="badgeClass">
    <slot></slot>
    <div 
      v-if="showBadge" 
      class="bw-badge__content" 
      :class="{ 'bw-badge__content--dot': dot }"
      :style="contentStyle"
    >
      <template v-if="!dot && displayContent !== undefined">{{ displayContent }}</template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface BadgeProps {
  modelValue?: boolean | number | string
  content?: string | number
  max?: number | string
  dot?: boolean
  color?: string
  showZero?: boolean
}

const props = withDefaults(defineProps<BadgeProps>(), {
  modelValue: true,
  max: 99,
  dot: false,
  showZero: false
})

const displayContent = computed(() => {
  const max = typeof props.max === 'string' ? parseInt(props.max) : props.max
  const content = props.content !== undefined ? props.content : props.modelValue
  
  if (typeof content === 'number' && !isNaN(content)) {
    return content > max ? `${max}+` : content
  }
  
  return content
})

const showBadge = computed(() => {
  const value = props.content !== undefined ? props.content : props.modelValue
  
  if (props.dot) {
    return !!props.modelValue
  }
  
  if (typeof value === 'boolean') {
    return value
  }
  
  if (typeof value === 'number') {
    return value > 0 || (props.showZero && value === 0)
  }
  
  return value !== undefined && value !== null && value !== ''
})

const badgeClass = computed(() => {
  return [
    {
      'bw-badge--fixed': true,
      'bw-badge--dot': props.dot,
      'bw-badge--has-content': !props.dot && displayContent !== undefined
    }
  ]
})

const contentStyle = computed(() => {
  if (props.color) {
    return {
      backgroundColor: props.color
    }
  }
  return {}
})
</script>

<style lang="less">
@import '../../styles/variables.less';

.bw-badge {
  position: relative;
  display: inline-block;
  vertical-align: middle;

  &--fixed {
    .bw-badge__content {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
      z-index: 1;
    }
  }

  &__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: @bw-badge-font-size * 1.5;
    height: @bw-badge-font-size * 1.5;
    padding: 0 3px;
    font-size: @bw-badge-font-size;
    font-weight: 500;
    line-height: 1.2;
    color: @bw-white;
    background-color: @bw-danger-color;
    border-radius: @bw-border-radius-round;
    box-sizing: border-box;
    transform-origin: center;
    white-space: nowrap;

    &--dot {
      width: @bw-badge-dot-size;
      height: @bw-badge-dot-size;
      min-width: 0;
      padding: 0;
      border-radius: 50%;
    }
  }
}
</style>
