<template>
  <view class="bw-badge" :class="badgeClass">
    <slot></slot>
    <view v-if="showBadge" class="bw-badge__content" :class="{ 'bw-badge__content--dot': dot }">
      <template v-if="!dot && content !== undefined">{{ content }}</template>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface BadgeProps {
  modelValue?: boolean
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

const showBadge = computed(() => {
  const value = props.modelValue
  if (typeof value === 'boolean') {
    return value
  }
  if (typeof value === 'number') {
    return value > 0 || props.showZero
  }
  return true
})

const badgeClass = computed(() => {
  return [
    {
      'bw-badge--fixed': true,
      'bw-badge--dot': props.dot,
      'bw-badge--has-content': !props.dot && props.content !== undefined
    }
  ]
})
</script>

<style lang="scss">
.bw-badge {
  position: relative;
  display: inline-block;

  &--fixed {
    .bw-badge__content {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
    color: #fff;
    background-color: #ee0a24;
    border-radius: 999px;
    box-sizing: border-box;
    transform-origin: center;

    &--dot {
      width: 8px;
      height: 8px;
      min-width: 0;
      padding: 0;
    }
  }
}
</style>
