<template>
  <div
    class="bw-grid"
    :class="{
      'bw-grid--border': border,
      'bw-grid--center': center,
      'bw-grid--square': square,
      'bw-grid--clickable': clickable,
      'bw-grid--reverse': reverse
    }"
    :style="gridStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'

export interface GridProps {
  columnNum?: number
  border?: boolean
  center?: boolean
  square?: boolean
  gutter?: number | string
  iconSize?: number | string
  direction?: 'horizontal' | 'vertical'
  reverse?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<GridProps>(), {
  columnNum: 4,
  border: true,
  center: true,
  square: false,
  gutter: 0,
  iconSize: 28,
  direction: 'vertical',
  reverse: false,
  clickable: false
})

provide('gridProps', props)

const gridStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.gutter) {
    const gutterVal = typeof props.gutter === 'number' ? `${props.gutter}px` : props.gutter
    style.paddingLeft = gutterVal
  }
  return style
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-grid {
  display: flex;
  flex-wrap: wrap;
  background-color: @bw-bg-color;

  &--border {
    border-top: 1px solid  @bw-border-color;
    border-left: 1px solid  @bw-border-color;
  }

  &--square {
    overflow: hidden;
  }

  &--clickable {
    .bw-grid-item {
      cursor: pointer;
    }
  }
}
</style>