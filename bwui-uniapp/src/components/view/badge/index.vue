<template>
  <view class="bw-badge">
    <slot></slot>
    <view
      v-if="dot"
      class="bw-badge__dot"
      :class="{ 'bw-badge__dot--fixed': !inSlot }"
    ></view>
    <view
      v-else-if="content !== undefined"
      class="bw-badge__num"
      :class="{ 'bw-badge__num--fixed': !inSlot }"
    >
      {{ displayContent }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

export interface BadgeProps {
  content?: number | string;
  dot?: boolean;
  max?: number;
  color?: string;
  inSlot?: boolean;
}

const props = withDefaults(defineProps<BadgeProps>(), {
  dot: false,
  max: 99,
  inSlot: true,
});

const displayContent = computed(() => {
  if (typeof props.content === 'number' && props.max) {
    return props.content > props.max ? `${props.max}+` : props.content;
  }
  return props.content;
});
</script>

<style lang="scss" scoped>
.bw-badge {
  position: relative;
  display: inline-block;

  &__num,
  &__dot {
    position: absolute;
    z-index: 1;
    color: #ffffff;
    background-color: $danger-color;
  }

  &__num {
    top: -8px;
    right: -4px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    font-size: 10px;
    line-height: 16px;
    text-align: center;
    border-radius: 8px;
    transform: translate(50%, 0);
    white-space: nowrap;
    box-sizing: border-box;

    &--fixed {
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
  }

  &__dot {
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    padding: 0;
    font-size: 0;
    text-indent: -9999px;
    border-radius: 50%;
    transform: translate(50%, -50%);

    &--fixed {
      top: 0;
      right: 0;
    }
  }
}
</style>
