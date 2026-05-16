<template>
  <div class="bw-avatar" :class="[sizeClass, shapeClass]" :style="avatarStyle">
    <img
      v-if="modelValue && !showFallback"
      :src="modelValue"
      :alt="alt"
      class="bw-avatar__image"
      :style="{ objectFit: fit }"
      @error="handleError"
      @load="handleLoad"
    />
    <div v-else class="bw-avatar__fallback">
      <slot>
        <bw-icon v-if="icon" :name="icon" :class-prefix="iconPrefix" />
        <span v-else class="bw-avatar__fallback-text">{{ fallbackText }}</span>
      </slot>
    </div>
    <bw-badge
      v-if="badge || badge === 0 || dot"
      :content="badge"
      :dot="dot"
      v-bind="badgeProps"
      class="bw-avatar__badge"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import BwBadge from '../badge/index.vue'
import BwIcon from '../icon/index.vue'

export interface AvatarProps {
  modelValue?: string
  size?: 'small' | 'medium' | 'large' | number | string
  shape?: 'circle' | 'square'
  icon?: string
  iconPrefix?: string
  alt?: string
  fit?: 'cover' | 'contain' | 'fill'
  badge?: string | number
  badgeProps?: Record<string, unknown>
  color?: string
  background?: string
  dot?: boolean
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'medium',
  shape: 'circle',
  iconPrefix: 'bwicon',
  fit: 'cover',
  dot: false
})

const emit = defineEmits<{
  error: [event: Event]
  load: [event: Event]
}>()

const showFallback = ref(false)

const handleError = (event: Event) => {
  showFallback.value = true
  emit('error', event)
}

const handleLoad = (event: Event) => {
  showFallback.value = false
  emit('load', event)
}

const sizeMap: Record<string, string> = {
  small: '32px',
  medium: '48px',
  large: '64px'
}

const avatarSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return sizeMap[props.size] || sizeMap.medium
})

const sizeClass = computed(() => {
  if (typeof props.size === 'string' && ['small', 'medium', 'large'].includes(props.size)) {
    return `bw-avatar--${props.size}`
  }
  return ''
})

const shapeClass = computed(() => {
  return `bw-avatar--${props.shape}`
})

const avatarStyle = computed(() => {
  const style: Record<string, string> = {
    width: avatarSize.value,
    height: avatarSize.value
  }
  if (props.color) {
    style.color = props.color
  }
  if (props.background) {
    style.backgroundColor = props.background
  }
  if (typeof props.size === 'number') {
    style.width = `${props.size}px`
    style.height = `${props.size}px`
  }
  return style
})

const fallbackText = computed(() => {
  if (props.alt) {
    return props.alt.charAt(0).toUpperCase()
  }
  return ''
})
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.bw-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  color: $bw-white;
  background-color: $bw-text-color-3;

  &--small {
    width: 32px;
    height: 32px;
  }

  &--medium {
    width: 48px;
    height: 48px;
  }

  &--large {
    width: 64px;
    height: 64px;
  }

  &--circle {
    border-radius: 50%;
  }

  &--square {
    border-radius: $bw-border-radius-sm;
  }

  &__image {
    width: 100%;
    height: 100%;
    display: block;
  }

  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: calc(var(--avatar-size, 48px) * 0.4);
  }

  &__fallback-text {
    font-weight: 500;
    text-transform: uppercase;
  }

  &__badge {
    position: absolute;
    top: -2px;
    right: -2px;
  }
}
</style>