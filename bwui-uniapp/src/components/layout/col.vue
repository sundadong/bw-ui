<template>
  <view
    class="bw-col"
    :class="colClass"
    :style="colStyle"
  >
    <slot></slot>
  </view>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

export interface ColProps {
  span?: number | string;
  offset?: number | string;
  pull?: number | string;
  push?: number | string;
}

const props = withDefaults(defineProps<ColProps>(), {
  span: 12,
  offset: 0,
  pull: 0,
  push: 0,
});

const colClass = computed(() => {
  return [];
});

const colStyle = computed(() => {
  const style: Record<string, string> = {};
  const span = typeof props.span === 'string' ? parseInt(props.span) : props.span;
  const offset = typeof props.offset === 'string' ? parseInt(props.offset) : props.offset;
  const pull = typeof props.pull === 'string' ? parseInt(props.pull) : props.pull;
  const push = typeof props.push === 'string' ? parseInt(props.push) : props.push;

  style.flex = `0 0 ${(span / 12) * 100}%`;
  style.maxWidth = `${(span / 12) * 100}%`;

  if (offset > 0) {
    style.marginLeft = `${(offset / 12) * 100}%`;
  }
  if (pull > 0) {
    style.right = `${(pull / 12) * 100}%`;
  }
  if (push > 0) {
    style.left = `${(push / 12) * 100}%`;
  }

  return style;
});
</script>

<style lang="scss" scoped>
.bw-col {
  position: relative;
  min-height: 1px;
  box-sizing: border-box;
}
</style>
