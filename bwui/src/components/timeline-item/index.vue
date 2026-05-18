<template>
  <div
    class="bw-timeline-item"
    :class="{
      'bw-timeline-item--last': isLast,
      'bw-timeline-item--horizontal': direction === 'horizontal'
    }"
  >
    <div class="bw-timeline-item__line" :style="lineStyle"></div>
    <div
      class="bw-timeline-item__dot"
      :style="dotStyle"
    >
      <slot name="dot">
        <div class="bw-timeline-item__dot-inner"></div>
      </slot>
    </div>
    <div class="bw-timeline-item__content">
      <div v-if="time ||  $slots.time" class="bw-timeline-item__time">
        <slot name="time">{{ time }}</slot>
      </div>
      <div class="bw-timeline-item__body">
        <slot>{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'

export interface TimelineItemProps {
  color?: string
  dot?: string
  content?: string
  time?: string
  lineColor?: string
}

const props = withDefaults(defineProps<TimelineItemProps>(), {
  color: '#1989fa',
  lineColor: '#ebedf0'
})

const isLast = inject<boolean>('bwTimelineItemLast', false)
const direction = inject<string>('bwTimelineDirection', 'vertical')

const dotStyle = computed(() => {
  return {
    backgroundColor: props.color
  }
})

const lineStyle = computed(() => {
  return {
    backgroundColor: props.lineColor
  }
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-timeline-item {
  position: relative;
  padding-left: 24px;
  padding-bottom: 24px;

  &--last {
    padding-bottom: 0;
  }

  &--horizontal {
    padding-left: 0;
    padding-bottom: 0;
    padding-top: 24px;
    min-width: 100px;
    flex-shrink: 0;

    .bw-timeline-item__line {
      top: 5px;
      left: 12px;
      right: auto;
      bottom: auto;
      width: calc(100% - 24px);
      height: 2px;
    }

    .bw-timeline-item__dot {
      top: 0;
      left: 0;
    }

    .bw-timeline-item__content {
      padding-top: 8px;
    }
  }

  &__line {
    position: absolute;
    left: 5px;
    top: 12px;
    bottom: -24px;
    width: 2px;
    background-color: @bw-border-color;

    .bw-timeline-item--last & {
      display: none;
    }
  }

  &__dot {
    position: absolute;
    left: 0;
    top: 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: @bw-primary-color;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__dot-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &__content {
    flex: 1;
  }

  &__time {
    font-size: @bw-font-size-sm;
    color: @bw-text-color-2;
    margin-bottom: 4px;
    line-height: 1;
  }

  &__body {
    font-size: @bw-font-size-md;
    color: @bw-text-color;
    line-height: @bw-line-height-md;
  }
}
</style>