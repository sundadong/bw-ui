<template>
  <div :class="bemClass" :style="containerStyle" @click="handleClick">
    <div v-if="loadingStatus === 'loading' && showLoading" class="bw-image__loading">
      <slot name="loading">
        <bw-loading v-if="loadingIcon" :name="loadingIcon" />
        <bw-loading v-else type="spinner" size="22px" />
      </slot>
    </div>
    <div v-else-if="loadingStatus === 'error' && showError" class="bw-image__error">
      <slot name="error">
        <bw-icon v-if="errorIcon" :name="errorIcon" size="22px" />
        <bw-icon v-else name="photo-fail" size="22px" />
      </slot>
    </div>
    <img
      v-else-if="loadingStatus === 'loaded'"
      ref="imgRef"
      class="bw-image__img"
      :src="src"
      :alt="alt"
      :style="imgStyle"
      @load="handleLoad"
      @error="handleError"
    />
    <img
      v-show="false"
      ref="preloadRef"
      :src="src"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import BwLoading from '../loading/index.vue'
import BwIcon from '../icon/index.vue'

export interface ImageProps {
  src?: string
  alt?: string
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  position?: 'center' | 'top' | 'right' | 'bottom' | 'left'
  radius?: string | number
  round?: boolean
  width?: string | number
  height?: string | number
  lazyLoad?: boolean
  showError?: boolean
  showLoading?: boolean
  errorIcon?: string
  loadingIcon?: string
}

const props = withDefaults(defineProps<ImageProps>(), {
  src: '',
  alt: '',
  fit: 'fill',
  position: 'center',
  radius: 0,
  round: false,
  width: '',
  height: '',
  lazyLoad: false,
  showError: true,
  showLoading: true,
  errorIcon: '',
  loadingIcon: ''
})

const emit = defineEmits<{
  click: [event: Event]
  load: [event: Event]
  error: [event: Event]
}>()

const loadingStatus = ref<'loading' | 'loaded' | 'error'>('loading')
const imgRef = ref<HTMLImageElement | null>(null)
const preloadRef = ref<HTMLImageElement | null>(null)

const bemClass = computed(() => {
  return [
    'bw-image',
    {
      'bw-image--round': props.round,
      'bw-image--error': loadingStatus.value === 'error',
      'bw-image--loading': loadingStatus.value === 'loading'
    }
  ]
})

const containerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) {
    style.width = typeof props.width === 'number' ? props.width + 'px' : props.width
  }
  if (props.height) {
    style.height = typeof props.height === 'number' ? props.height + 'px' : props.height
  }
  if (props.radius) {
    style.borderRadius = typeof props.radius === 'number' ? props.radius + 'px' : props.radius
  }
  if (props.round) {
    style.borderRadius = '999px'
    style.overflow = 'hidden'
  }
  return style
})

const imgStyle = computed(() => {
  const style: Record<string, string> = {}
  style.objectFit = props.fit
  if (props.fit === 'contain') {
    style.objectFit = 'contain'
  } else if (props.fit === 'cover') {
    style.objectFit = 'cover'
  } else if (props.fit === 'fill') {
    style.objectFit = 'fill'
  } else if (props.fit === 'none') {
    style.objectFit = 'none'
  } else if (props.fit === 'scale-down') {
    style.objectFit = 'scale-down'
  }
  style.objectPosition = props.position
  return style
})

const handleLoad = (event: Event) => {
  loadingStatus.value = 'loaded'
  emit('load', event)
}

const handleError = (event: Event) => {
  loadingStatus.value = 'error'
  emit('error', event)
}

const handleClick = (event: Event) => {
  emit('click', event)
}

const loadImage = () => {
  if (!props.src) {
    loadingStatus.value = 'error'
    return
  }
  loadingStatus.value = 'loading'
  const img = new Image()
  img.onload = () => {
    loadingStatus.value = 'loaded'
  }
  img.onerror = () => {
    loadingStatus.value = 'error'
  }
  img.src = props.src
}

watch(() => props.src, () => {
  loadImage()
})

onMounted(() => {
  loadImage()
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-image {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: $bw-bg-color-gray;
  overflow: hidden;

  &--round {
    border-radius: $bw-border-radius-round;
  }

  &__img {
    display: block;
    width: 100%;
    height: 100%;
  }

  &__loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $bw-text-color-3;
    font-size: $bw-font-size-xl;
  }

  &__error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $bw-text-color-3;
    font-size: $bw-font-size-xl;
  }
}
</style>