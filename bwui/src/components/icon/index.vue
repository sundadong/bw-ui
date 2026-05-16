<template>
  <div class="bw-icon" :class="iconClass" :style="iconStyle">
    <img v-if="isImage" class="bw-icon__image" :src="name" alt="" />
    <span v-else class="bw-icon__text">{{ iconMap[name] || '' }}</span>
  </div>
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
  classPrefix: 'bwicon'
})

const iconClass = computed(() => {
  return [`bw-icon--${props.name}`]
})

const iconStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.size !== 'inherit') {
    style.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size
    style.width = style.fontSize
    style.height = style.fontSize
  }
  if (props.color !== 'inherit') {
    style.color = props.color
  }
  return style
})

const isImage = computed(() => {
  return /\.(gif|jpg|jpeg|png|webp|svg)/i.test(props.name)
})

const iconMap: Record<string, string> = {
  success: '✓',
  fail: '✕',
  warning: '⚠',
  info: 'ℹ',
  arrow: '→',
  search: '⌕',
  plus: '+',
  minus: '-',
  close: '✕',
  cross: '✕',
  location: '📍',
  setting: '⚙',
  star: '★',
  heart: '♥',
  clock: '⏰',
  photo: '🖼',
  like: '👍',
  chat: '💬',
  shop: '🛒'
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: $bw-icon-size-md;
  line-height: 1;
  color: inherit;
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;

  &__image {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  &__text {
    font-size: inherit;
    line-height: 1;
  }
}
</style>
