<template>
  <view v-if="show" class="bw-overlay" :style="overlayStyle" @tap="handleClick"></view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface OverlayProps {
  show: boolean
  zIndex?: number | string
  duration?: number | string
  color?: string
  opacity?: number
}

const props = withDefaults(defineProps<OverlayProps>(), {
  show: false,
  zIndex: 2000,
  duration: 0.3,
  color: 'black',
  opacity: 0.7
})

const emit = defineEmits<{
  click: [event: Event]
}>()

const overlayStyle = computed(() => {
  const style: Record<string, string> = {
    zIndex: String(props.zIndex),
    backgroundColor: hexToRgba(props.color, props.opacity)
  }
  return style
})

const hexToRgba = (color: string, opacity: number) => {
  if (color.startsWith('#')) {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
  return color
}

const handleClick = (event: Event) => {
  emit('click', event)
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
