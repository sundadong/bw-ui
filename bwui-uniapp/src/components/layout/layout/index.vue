<template>
  <view class="bw-row" :class="{ 'bw-row--space': gutter }" :style="rowStyle">
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

export interface RowProps {
  gutter?: number;
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  align?: 'top' | 'middle' | 'bottom';
}

const props = withDefaults(defineProps<RowProps>(), {
  gutter: 0,
  justify: 'start',
  align: 'top',
});

const rowStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.gutter) {
    style.marginLeft = `-${props.gutter / 2}px`;
    style.marginRight = `-${props.gutter / 2}px`;
  }
  return style;
});
</script>

<style lang="scss" scoped>
.bw-row {
  display: flex;
  flex-wrap: wrap;

  &--space {
    :deep(.bw-col) {
      padding-left: 8px;
      padding-right: 8px;
    }
  }
}
</style>
