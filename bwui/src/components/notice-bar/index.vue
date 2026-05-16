<template>
  <div class="bw-notice-bar" :class="{ 'bw-notice-bar--wrapable': wrapable }" :style="barStyle" @click="handleClick">
    <div v-if="leftIcon || $slots['left-icon']" class="bw-notice-bar__left-icon">
      <slot name="left-icon">
        <bw-icon v-if="leftIcon" :name="leftIcon" size="16px" />
      </slot>
    </div>
    <div
      ref="contentRef"
      class="bw-notice-bar__content"
      :class="{ 'bw-notice-bar__content--scrollable': scrollable && !wrapable }"
    >
      <span
        ref="textRef"
        class="bw-notice-bar__text"
        :class="{ 'bw-notice-bar__text--scroll': isScrolling }"
        :style="scrollStyle"
      >
        {{ modelValue }}
      </span>
    </div>
    <div v-if="mode !== '' || $slots['right-icon'] || rightIcon" class="bw-notice-bar__right-icon">
      <slot name="right-icon">
        <bw-icon
          v-if="mode === 'closeable'"
          name="close"
          size="16px"
          class="bw-notice-bar__close-icon"
          @click.stop="handleClose"
        />
        <bw-icon
          v-else-if="mode === 'link'"
          name="arrow-right"
          size="16px"
        />
        <bw-icon
          v-else-if="rightIcon"
          :name="rightIcon"
          size="16px"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import BwIcon from '../icon/index.vue'

export interface NoticeBarProps {
  modelValue?: string
  mode?: 'closeable' | 'link' | ''
  color?: string
  background?: string
  leftIcon?: string
  delay?: number | string
  speed?: number | string
  scrollable?: boolean
  wrapable?: boolean
  rightIcon?: string
}

const props = withDefaults(defineProps<NoticeBarProps>(), {
  modelValue: '',
  mode: '',
  color: '#ed6a0c',
  background: '#fffbe8',
  leftIcon: 'volume-o',
  delay: 1,
  speed: 50,
  scrollable: true,
  wrapable: false,
  rightIcon: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  close: []
  click: [event: Event]
}>()

const contentRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const isScrolling = ref(false)
const scrollDuration = ref(0)
const textWidth = ref(0)
const contentWidth = ref(0)
let animationTimer: ReturnType<typeof setTimeout> | null = null

const barStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.color = props.color
  }
  if (props.background) {
    style.backgroundColor = props.background
  }
  return style
})

const scrollStyle = computed(() => {
  if (!isScrolling.value) return {}
  return {
    animationDuration: `${scrollDuration.value}s`
  }
})

const startScroll = () => {
  if (!props.scrollable || props.wrapable) return
  nextTick(() => {
    if (textRef.value && contentRef.value) {
      textWidth.value = textRef.value.offsetWidth
      contentWidth.value = contentRef.value.offsetWidth
      if (textWidth.value > contentWidth.value) {
        const speed = typeof props.speed === 'string' ? parseInt(props.speed) : props.speed
        scrollDuration.value = textWidth.value / speed
        isScrolling.value = true
      }
    }
  })
}

const handleClick = (event: Event) => {
  emit('click', event)
}

const handleClose = () => {
  emit('update:modelValue', '')
  emit('close')
}

onMounted(() => {
  const delay = typeof props.delay === 'string' ? parseInt(props.delay) : props.delay
  animationTimer = setTimeout(() => {
    startScroll()
  }, delay * 1000)
})

onUnmounted(() => {
  if (animationTimer) {
    clearTimeout(animationTimer)
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.bw-notice-bar {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 $bw-padding-md;
  font-size: $bw-font-size-md;
  line-height: 24px;
  color: #ed6a0c;
  background-color: #fffbe8;

  &--wrapable {
    height: auto;
    padding-top: 8px;
    padding-bottom: 8px;

    .bw-notice-bar__content {
      white-space: normal;
      word-wrap: break-word;
    }
  }

  &__left-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-right: $bw-padding-xs;
    min-width: 20px;
  }

  &__content {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    overflow: hidden;
    position: relative;

    &--scrollable {
      .bw-notice-bar__text {
        white-space: nowrap;
      }
    }
  }

  &__text {
    &--scroll {
      animation: bw-notice-bar-scroll linear infinite;
    }
  }

  &__right-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-left: $bw-padding-xs;
    min-width: 20px;
    cursor: pointer;
  }
}

@keyframes bw-notice-bar-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>