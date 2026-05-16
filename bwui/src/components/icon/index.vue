<template>
  <div class="bw-icon" :class="[`bw-icon--${name}`]" :style="iconStyle">
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
  location: '📍',
  setting: '⚙',
  star: '★',
  heart: '♥',
  clock: '⏰'
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

  &--inherit {
    font-size: inherit;
  }

  &__image {
    width: 1em;
    height: 1em;
  }
}
</style>
