<template>
  <div class="bw-swipe" ref="swipeRef">
    <div
      class="bw-swipe__track"
      :class="{ 'bw-swipe__track--vertical': vertical }"
      :style="trackStyle"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <slot></slot>
    </div>
    <div v-if="showIndicators && itemCount > 1" class="bw-swipe__indicators" :class="{ 'bw-swipe__indicators--vertical': vertical }">
      <i
        v-for="index in itemCount"
        :key="index"
        class="bw-swipe__indicator"
        :class="{ 'bw-swipe__indicator--active': index - 1 === currentIndex }"
        :style="{
          backgroundColor: index - 1 === currentIndex ? indicatorActiveColor : indicatorColor
        }"
      ></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, provide, nextTick } from 'vue'

export interface SwipeProps {
  modelValue?: number
  autoplay?: number | string
  duration?: number | string
  interval?: number | string
  loop?: boolean
  vertical?: boolean
  touchable?: boolean
  indicatorColor?: string
  indicatorActiveColor?: string
  showIndicators?: boolean
  lazyRender?: boolean
}

const props = withDefaults(defineProps<SwipeProps>(), {
  modelValue: 0,
  autoplay: 0,
  duration: 500,
  interval: 3000,
  loop: true,
  vertical: false,
  touchable: true,
  indicatorColor: '#c8c9cc',
  indicatorActiveColor: '#1989fa',
  showIndicators: true,
  lazyRender: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [index: number]
}>()

const swipeRef = ref<HTMLElement | null>(null)
const currentIndex = ref(props.modelValue)
const itemCount = ref(0)
const swipeWidth = ref(0)
const swipeHeight = ref(0)
const touching = ref(false)
const startPos = ref({ x: 0, y: 0 })
const delta = ref({ x: 0, y: 0 })
const offset = ref(0)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const trackStyle = computed(() => {
  const duration = typeof props.duration === 'string' ? parseInt(props.duration) : props.duration
  const size = props.vertical ? swipeHeight.value : swipeWidth.value

  return {
    transitionDuration: touching.value ? '0ms' : `${duration}ms`,
    transform: props.vertical
      ? `translate3d(0, ${-currentIndex.value * size + offset.value}px, 0)`
      : `translate3d(${-currentIndex.value * size + offset.value}px, 0, 0)`
  }
})

watch(() => props.modelValue, (val) => {
  currentIndex.value = val
})

const updateSize = () => {
  if (swipeRef.value) {
    swipeWidth.value = swipeRef.value.offsetWidth
    swipeHeight.value = swipeRef.value.offsetHeight
    const track = swipeRef.value.querySelector('.bw-swipe__track')
    if (track) {
      itemCount.value = track.children.length
    }
  }
}

const goTo = (index: number) => {
  if (itemCount.value === 0) return
  let target = index
  if (props.loop) {
    if (target < 0) {
      target = itemCount.value - 1
    } else if (target >= itemCount.value) {
      target = 0
    }
  } else {
    target = Math.max(0, Math.min(target, itemCount.value - 1))
  }
  currentIndex.value = target
  emit('update:modelValue', target)
  emit('change', target)
}

const next = () => {
  goTo(currentIndex.value + 1)
}

const prev = () => {
  goTo(currentIndex.value - 1)
}

const startAutoplay = () => {
  stopAutoplay()
  const interval = typeof props.interval === 'string' ? parseInt(props.interval) : props.interval
  if (props.autoplay && interval > 0 && itemCount.value > 1) {
    autoplayTimer = setInterval(() => {
      next()
    }, interval)
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const onTouchStart = (e: TouchEvent) => {
  if (!props.touchable) return
  stopAutoplay()
  touching.value = true
  startPos.value = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY
  }
  delta.value = { x: 0, y: 0 }
  offset.value = 0
}

const onTouchMove = (e: TouchEvent) => {
  if (!touching.value) return
  const dx = e.touches[0].clientX - startPos.value.x
  const dy = e.touches[0].clientY - startPos.value.y
  delta.value = { x: dx, y: dy }
  offset.value = props.vertical ? dy : dx
}

const onTouchEnd = () => {
  if (!touching.value) return
  touching.value = false
  const threshold = 50
  const size = props.vertical ? swipeHeight.value : swipeWidth.value
  const moved = props.vertical ? delta.value.y : delta.value.x

  if (Math.abs(moved) > threshold) {
    if (moved > 0) {
      prev()
    } else {
      next()
    }
  }
  offset.value = 0
  startAutoplay()
}

provide('swipe', {
  itemCount,
  swipeWidth,
  swipeHeight
})

onMounted(() => {
  nextTick(() => {
    updateSize()
    startAutoplay()
  })
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  stopAutoplay()
  window.removeEventListener('resize', updateSize)
})

defineExpose({
  goTo,
  next,
  prev
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-swipe {
  position: relative;
  overflow: hidden;
  width: 100%;

  &__track {
    display: flex;
    width: 100%;
    height: 100%;
    transition-property: transform;

    &--vertical {
      flex-direction: column;
    }
  }

  &__indicators {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;

    &--vertical {
      bottom: auto;
      top: 50%;
      right: 12px;
      left: auto;
      transform: translateY(-50%);
      flex-direction: column;
    }
  }

  &__indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #c8c9cc;
    transition: background-color $bw-animation-duration-base;

    &--active {
      background-color: $bw-primary-color;
    }
  }
}
</style>