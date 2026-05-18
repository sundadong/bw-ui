<template>
  <img v-if="isImage" class="bw-icon" :src="name" alt="" :style="iconStyle" />
  <i v-else class="bw-icon" :class="iconClass" :style="iconStyle"></i>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface IconProps {
  name: string
  size?: string | number
  color?: string
  classPrefix?: string
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'inherit',
  color: 'inherit',
  classPrefix: 'van'
})

const iconClass = computed(() => {
  return [`${props.classPrefix}-icon`, `${props.classPrefix}-icon-${props.name}`]
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.size !== 'inherit') {
    style.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size
  }
  if (props.color !== 'inherit') {
    style.color = props.color
  }
  return style
})

const isImage = computed(() => {
  return /\.(gif|jpg|jpeg|png|webp|svg)/i.test(props.name)
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-icon {
  position: relative;
  display: inline-block;
  font: normal normal normal 14px/1 'vant-icon';
  font: normal normal normal 14px/1 var(--van-icon-font-family, 'vant-icon');
  font-size: @bw-icon-size-md;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  line-height: 1;
  color: inherit;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
}
</style>
