<template>
  <div
    v-show="visible"
    class="bw-back-top"
    :style="backTopStyle"
    @click="handleClick"
  >
    <slot>
      <div class="bw-back-top__icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 4l-8 8h5v8h6v-8h5z" />
        </svg>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

export interface BackTopProps {
  modelValue?: boolean
  visibilityHeight?: number
  target?: string | HTMLElement
  right?: number | string
  bottom?: number | string
  zIndex?: number
  duration?: number
}

const props = withDefaults(defineProps<BackTopProps>(), {
  modelValue: undefined,
  visibilityHeight: 200,
  right: 16,
  bottom: 100,
  zIndex: 100,
  duration: 300
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  click: []
}>()

const visible = ref(false)
const scrollEl = ref<HTMLElement | Window | null>(null)

const backTopStyle = computed(() => {
  const rightVal = typeof props.right === 'number' ? `${props.right}px` : props.right
  const bottomVal = typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom
  return {
    right: rightVal as string,
    bottom: bottomVal as string,
    zIndex: props.zIndex
  }
})

const getScrollTop = (): number => {
  if (scrollEl.value instanceof Window) {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }
  if (scrollEl.value) {
    return (scrollEl.value as HTMLElement).scrollTop
  }
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
}

const scrollToTop = () => {
  const el = scrollEl.value
  if (!el) {
    window.scrollTo({ top: 0, behavior: props.duration > 0 ? 'smooth' : 'auto' })
    return
  }
  if (el instanceof Window) {
    window.scrollTo({ top: 0, behavior: props.duration > 0 ? 'smooth' : 'auto' })
  } else {
    const startTop = el.scrollTop
    const startTime = performance.now()

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / props.duration, 1)
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      el.scrollTop = startTop * (1 - easeInOutCubic)
      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    if (props.duration > 0) {
      requestAnimationFrame(animateScroll)
    } else {
      el.scrollTop = 0
    }
  }
}

const handleScroll = () => {
  const scrollTop = getScrollTop()
  const shouldShow = scrollTop >= props.visibilityHeight
  if (shouldShow !== visible.value) {
    visible.value = shouldShow
    emit('update:modelValue', shouldShow)
  }
}

const handleClick = () => {
  scrollToTop()
  emit('click')
}

const resolveTarget = () => {
  if (props.target) {
    if (typeof props.target === 'string') {
      const el = document.querySelector(props.target)
      if (el) {
        scrollEl.value = el as HTMLElement
        return
      }
    } else {
      scrollEl.value = props.target
      return
    }
  }
  scrollEl.value = window
}

const bindScroll = () => {
  if (scrollEl.value) {
    if (scrollEl.value instanceof Window) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    } else {
      ;(scrollEl.value as HTMLElement).addEventListener('scroll', handleScroll, { passive: true })
    }
  }
}

const unbindScroll = () => {
  if (scrollEl.value) {
    if (scrollEl.value instanceof Window) {
      window.removeEventListener('scroll', handleScroll)
    } else {
      ;(scrollEl.value as HTMLElement).removeEventListener('scroll', handleScroll)
    }
  }
}

watch(() => props.modelValue, (val) => {
  if (val !== undefined) {
    visible.value = val
  }
})

onMounted(() => {
  resolveTarget()
  bindScroll()
  handleScroll()
})

onBeforeUnmount(() => {
  unbindScroll()
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-back-top {
  position: fixed;
  width: 44px;
  height: 44px;
  background-color: @bw-bg-color;
  border-radius: @bw-border-radius-round;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  &:active {
    background-color: @bw-active-color;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: @bw-primary-color;
  }
}

.bw-back-top-fade-enter-active,
.bw-back-top-fade-leave-active {
  transition: opacity  @bw-animation-duration-base  @bw-animation-timing-function-base;
}

.bw-back-top-fade-enter-from,
.bw-back-top-fade-leave-to {
  opacity: 0;
}
</style>