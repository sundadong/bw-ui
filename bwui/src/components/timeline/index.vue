<template>
  <div
    class="bw-timeline"
    :class="{
      'bw-timeline--reverse': reverse,
      'bw-timeline--horizontal': direction === 'horizontal'
    }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'

export interface TimelineProps {
  reverse?: boolean
  direction?: 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<TimelineProps>(), {
  reverse: false,
  direction: 'vertical'
})

provide('bwTimelineReverse', props.reverse)
provide('bwTimelineDirection', props.direction)
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-timeline {
  padding: 0  @bw-padding-md;

  &--reverse {
    display: flex;
    flex-direction: column-reverse;
  }

  &--horizontal {
    display: flex;
    flex-direction: row;
    overflow-x: auto;

    &.bw-timeline--reverse {
      flex-direction: row-reverse;
    }
  }
}
</style>