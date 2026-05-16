<template>
  <div
    class="bw-space"
    :class="{
      'bw-space--wrap': wrap,
      'bw-space--fill': fill,
      [`bw-space--${direction}`]: true,
      [`bw-space--align-${align}`]: align !== 'start',
      [`bw-space--justify-${justify}`]: justify !== 'start'
    }"
    :style="spaceStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SpaceProps {
  size?: number | string | 'small' | 'medium' | 'large'
  direction?: 'horizontal' | 'vertical'
  align?: 'start' | 'center' | 'end' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
  fill?: boolean
}

const props = withDefaults(defineProps<SpaceProps>(), {
  size: 'small',
  direction: 'horizontal',
  align: 'start',
  justify: 'start',
  wrap: false,
  fill: false
})

const sizeMap: Record<string, string> = {
  small: '8px',
  medium: '16px',
  large: '24px'
}

const spaceStyle = computed(() => {
  const style: Record<string, string> = {}
  const gap = sizeMap[props.size] || (typeof props.size === 'number' ? `${props.size}px` : props.size)
  style.gap = gap
  return style
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-space {
  display: flex;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &--wrap {
    flex-wrap: wrap;
  }

  &--fill {
    width: 100%;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--align-baseline {
    align-items: baseline;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-between {
    justify-content: space-between;
  }

  &--justify-around {
    justify-content: space-around;
  }
}
</style>