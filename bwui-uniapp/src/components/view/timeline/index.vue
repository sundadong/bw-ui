<template>
  <view class="bw-timeline">
    <view
      v-for="(item, index) in items"
      :key="index"
      class="bw-timeline__item"
    >
      <view class="bw-timeline__dot" :class="{ 'is-active': item.active }"></view>
      <view class="bw-timeline__content">
        <view v-if="item.title || item.label" class="bw-timeline__header">
          <view v-if="item.title" class="bw-timeline__title">{{ item.title }}</view>
          <view v-if="item.label" class="bw-timeline__label">{{ item.label }}</view>
        </view>
        <view v-if="item.description || $slots.description" class="bw-timeline__description">
          <slot name="description">{{ item.description }}</slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

export interface TimelineItem {
  title?: string;
  label?: string;
  description?: string;
  active?: boolean;
}

export interface TimelineProps {
  items: TimelineItem[];
}

withDefaults(defineProps<TimelineProps>(), {
  items: () => [],
});
</script>

<style lang="scss" scoped>
.bw-timeline {
  padding: 0 16px;

  &__item {
    position: relative;
    display: flex;
    padding-left: 20px;
    padding-bottom: 24px;

    &::before {
      content: '';
      position: absolute;
      left: 4px;
      top: 8px;
      bottom: 0;
      width: 1px;
      background-color: $border-color;
    }

    &:last-child {
      padding-bottom: 0;

      &::before {
        display: none;
      }
    }
  }

  &__dot {
    position: absolute;
    left: 0;
    top: 6px;
    width: 8px;
    height: 8px;
    margin-left: 0;
    background-color: $border-color;
    border-radius: 50%;
    transform: translateX(0);
    z-index: 1;

    &.is-active {
      width: 14px;
      height: 14px;
      top: 2px;
      left: -1px;
      background-color: $primary-color;
      border: 3px solid lighten($primary-color, 30%);
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__header {
    margin-bottom: 4px;
  }

  &__title {
    font-size: $font-size-sm;
    color: $text-color;
    font-weight: 500;
  }

  &__label {
    margin-top: 2px;
    font-size: $font-size-xs;
    color: $text-color-3;
  }

  &__description {
    font-size: $font-size-sm;
    color: $text-color-2;
    line-height: 1.5;
  }
}
</style>
