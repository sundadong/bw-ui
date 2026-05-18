<template>
  <component
    :is="href ? 'a' : 'div'"
    class="bw-grid-item"
    :class="{
      'bw-grid-item--border': border,
      'bw-grid-item--square': square,
      'bw-grid-item--clickable': clickable,
      'bw-grid-item--horizontal': direction === 'horizontal',
      'bw-grid-item--reverse': reverse
    }"
    :href="href"
    :style="itemStyle"
    @click="handleClick"
  >
    <div class="bw-grid-item__icon">
      <slot name="icon">
        <bw-icon v-if="icon" :name="icon" :size="computedIconSize" :color="iconColor" :class-prefix="iconPrefix" />
      </slot>
      <bw-badge v-if="dot || badge" :dot="dot" :content="badge" v-bind="badgeProps" class="bw-grid-item__badge" />
    </div>
    <div class="bw-grid-item__text">
      <slot>
        <span v-if="text">{{ text }}</span>
      </slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import BwIcon from '../icon/index.vue'
import BwBadge from '../badge/index.vue'
import type { GridProps } from '../grid/index.vue'

export interface GridItemProps {
  text?: string
  icon?: string
  iconColor?: string
  iconPrefix?: string
  dot?: boolean
  badge?: string | number
  badgeProps?: Record<string, any>
  href?: string
}

const props = withDefaults(defineProps<GridItemProps>(), {
  iconPrefix: 'bwicon'
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const gridProps = inject<GridProps>('gridProps', {
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

const border = computed(() => gridProps.border)
const square = computed(() => gridProps.square)
const clickable = computed(() => gridProps.clickable)
const direction = computed(() => gridProps.direction)
const reverse = computed(() => gridProps.reverse)

const computedIconSize = computed(() => {
  return typeof gridProps.iconSize === 'number' ? `${gridProps.iconSize}px` : String(gridProps.iconSize)
})

const itemStyle = computed(() => {
  const style: Record<string, string> = {}
  const colNum = gridProps.columnNum || 4
  style.flexBasis = `${(100 / colNum).toFixed(4)}%`
  style.paddingTop = style.flexBasis

  if (gridProps.gutter) {
    const gutterVal = typeof gridProps.gutter === 'number' ? `${gridProps.gutter}px` : gridProps.gutter
    style.paddingRight = gutterVal
  }

  return style
})

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-grid-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
  color: @bw-text-color;
  background-color: @bw-bg-color;

  &--border {
    border-right: 1px solid  @bw-border-color;
    border-bottom: 1px solid  @bw-border-color;
  }

  &--square {
    height: 0;
  }

  &--clickable {
    cursor: pointer;

    &:active {
      background-color: @bw-active-color;
    }
  }

  &--horizontal {
    flex-direction: row;

    .bw-grid-item__icon {
      margin-right: 8px;
    }
  }

  &--reverse {
    flex-direction: column-reverse;
  }

  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__badge {
    position: absolute;
    top: -4px;
    right: -10px;
  }

  &__text {
    margin-top: 8px;
    font-size: @bw-font-size-sm;
    color: @bw-text-color-1;
    text-align: center;
    word-break: break-all;
    line-height: @bw-line-height-sm;
  }
}
</style>