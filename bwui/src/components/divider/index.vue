<template>
  <div
    class="bw-divider"
    :class="[
      `bw-divider--${contentPosition}`,
      { 'bw-divider--vertical': vertical, 'bw-divider--hairline': hairline }
    ]"
    :style="dividerStyle"
  >
    <div
      v-if="!vertical"
      class="bw-divider__line"
      :class="{
        'bw-divider__line--dashed': dashed,
        'bw-divider__line--hairline': hairline
      }"
      :style="lineStyle"
    ></div>
    <div
      v-if="$slots.default && !vertical"
      class="bw-divider__content"
      :style="contentStyle"
    >
      <slot></slot>
    </div>
    <div
      v-if="!vertical"
      class="bw-divider__line"
      :class="{
        'bw-divider__line--dashed': dashed,
        'bw-divider__line--hairline': hairline
      }"
      :style="lineStyle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface DividerProps {
  dashed?: boolean
  hairline?: boolean
  contentPosition?: 'left' | 'center' | 'right'
  vertical?: boolean
  color?: string
}

const props = withDefaults(defineProps<DividerProps>(), {
  dashed: false,
  hairline: true,
  contentPosition: 'center',
  vertical: false,
  color: '#ebedf0'
})

const dividerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.vertical) {
    style.borderLeft = `1px solid ${props.color}`
    if (props.dashed) {
      style.borderLeft = `1px dashed ${props.color}`
    }
  }
  return style
})

const lineStyle = computed(() => {
  const style: Record<string, string> = {}
  if (!props.dashed) {
    style.backgroundColor = props.color
  } else {
    style.borderTopColor = props.color
  }
  if (props.hairline) {
    style.transform = 'scaleY(0.5)'
  }
  return style
})

const contentStyle = computed(() => {
  return {
    color: props.color
  }
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-divider {
  display: flex;
  align-items: center;
  margin: @bw-padding-md 0;
  color: @bw-text-color-2;
  font-size: @bw-font-size-md;
  line-height: @bw-line-height-md;

  &--vertical {
    display: inline-flex;
    margin: 0  @bw-padding-xs;
    height: 0.9em;
    width: 1px;
    vertical-align: middle;
  }

  &--left {
    .bw-divider__line:first-child {
      display: none;
    }
  }

  &--right {
    .bw-divider__line:last-child {
      display: none;
    }
  }

  &__line {
    flex: 1;
    height: 1px;
    background-color: @bw-border-color;
    border-radius: @bw-border-radius-sm;

    &--dashed {
      background: none;
      height: 0;
      border-top: 1px dashed  @bw-border-color;
    }

    &--hairline {
      transform: scaleY(0.5);
    }
  }

  &__content {
    padding: 0  @bw-padding-md;
    font-size: @bw-font-size-md;
    color: @bw-text-color-2;
    white-space: nowrap;
    flex-shrink: 0;
  }
}
</style>