<template>
  <view
    :class="['bw-icon', `bw-icon-${name}`, { 'bw-icon--spin': spin }]"
    :style="customStyle"
  ></view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface IconProps {
  name: string;
  size?: string | number;
  color?: string;
  spin?: boolean;
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'inherit',
  color: 'inherit',
  spin: false,
});

const customStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.size !== 'inherit') {
    style.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size;
  }
  if (props.color !== 'inherit') {
    style.color = props.color;
  }
  return style;
});
</script>

<style lang="scss" scoped>
@import '@/styles/icons.scss';

.bw-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'bw-iconfont';
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  line-height: 1;
  text-transform: none;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: middle;

  &--spin {
    animation: icon-spin 1s linear infinite;
  }
}

@keyframes icon-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
