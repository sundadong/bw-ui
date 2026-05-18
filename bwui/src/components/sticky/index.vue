<template>
  <div ref="rootRef" class="bw-sticky" :style="rootStyle">
    <div :class="{ 'bw-sticky--fixed': isFixed }" :style="stickyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

export interface StickyProps {
  position?: 'top' | 'bottom'
  offsetTop?: number | string
  offsetBottom?: number | string
  zIndex?: number | string
  container?: HTMLElement | null
}

const props = withDefaults(defineProps<StickyProps>(), {
  position: 'top',
  offsetTop: 0,
  offsetBottom: 0,
  zIndex: 99,
  container: null
})

const emit = defineEmits<{
  change: [fixed: boolean]
  scroll: [detail: { scrollTop: number; isFixed: boolean }]
}>()

const rootRef = ref<HTMLElement | null>(null)
const isFixed = ref(false)
const stickyTop = ref(0)
const stickyHeight = ref(0)

const offsetTopNum = computed(() => {
  return typeof props.offsetTop === 'string' ? parseInt(props.offsetTop) : props.offsetTop
})

const offsetBottomNum = computed(() => {
  return typeof props.offsetBottom === 'string' ? parseInt(props.offsetBottom) : props.offsetBottom
})

const rootStyle = computed(() => {
  if (isFixed.value) {
    return {
      height: stickyHeight.value + 'px'
    }
  }
  return {}
})

const stickyStyle = computed(() => {
  if (!isFixed.value) return {}

  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: typeof props.zIndex === 'string' ? props.zIndex : String(props.zIndex)
  }

  if (props.position === 'top') {
    style.top = offsetTopNum.value + 'px'
  } else {
    style.bottom = offsetBottomNum.value + 'px'
  }

  return style
})

const handleScroll = () => {
  if (!rootRef.value) return

  const rect = rootRef.value.getBoundingClientRect()
  const offset = props.position === 'top' ? offsetTopNum.value : offsetBottomNum.value

  let shouldFix = false

  if (props.container) {
    const containerRect = props.container.getBoundingClientRect()
    if (props.position === 'top') {
      shouldFix = rect.top <= offset && containerRect.bottom > offset + stickyHeight.value
    } else {
      shouldFix = window.innerHeight - rect.bottom <= offset && containerRect.top < window.innerHeight - offset
    }
  } else {
    if (props.position === 'top') {
      shouldFix = rect.top <= offset
    } else {
      shouldFix = window.innerHeight - rect.bottom <= offset
    }
  }

  if (shouldFix !== isFixed.value) {
    isFixed.value = shouldFix
    emit('change', shouldFix)
  }

  emit('scroll', {
    scrollTop: window.scrollY,
    isFixed: isFixed.value
  })
}

onMounted(() => {
  if (rootRef.value) {
    stickyHeight.value = rootRef.value.offsetHeight
    stickyTop.value = rootRef.value.offsetTop
  }
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-sticky {
  &--fixed {
    position: fixed;
    z-index: 99;
  }
}
</style>