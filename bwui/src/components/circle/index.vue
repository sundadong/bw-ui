<template>
  <div class="bw-circle" :style="circleStyle">
    <svg class="bw-circle__svg" :width="computedSize" :height="computedSize">
      <circle
        class="bw-circle__track"
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke="layerColor"
        :stroke-width="strokeWidth"
        fill="none"
      />
      <circle
        class="bw-circle__progress"
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke="computedColor"
        :stroke-width="strokeWidth"
        :stroke-linecap="strokeLinecap"
        fill="none"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        :transform="circleTransform"
      />
    </svg>
    <div class="bw-circle__text" :style="textStyle">
      <slot>
        <span>{{ displayText }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'

export interface CircleProps {
  modelValue?: number
  currentRate?: number
  size?: number | string
  color?: string | Record<string, string>
  layerColor?: string
  fill?: string
  speed?: number
  strokeWidth?: number
  clockwise?: boolean
  text?: string
}

const props = withDefaults(defineProps<CircleProps>(), {
  modelValue: 0,
  currentRate: 0,
  size: 100,
  color: '#1989fa',
  layerColor: '#ebedf0',
  fill: 'none',
  speed: 0,
  strokeWidth: 4,
  clockwise: true,
  text: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'update:currentRate': [value: number]
  finish: []
}>()

const animatedValue = ref(0)
const strokeLinecap = 'round'

const computedSize = computed(() => {
  return typeof props.size === 'number' ? props.size : parseInt(props.size as string) || 100
})

const targetRate = computed(() => {
  return props.currentRate || props.modelValue || 0
})

const center = computed(() => computedSize.value / 2)
const radius = computed(() => (computedSize.value - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

const computedColor = computed(() => {
  if (typeof props.color === 'object' && props.color !== null) {
    const rate = Math.floor(targetRate.value)
    if (props.color[rate] !== undefined) {
      return props.color[rate]
    }
    if (props.color['default'] !== undefined) {
      return props.color['default']
    }
  }
  return props.color as string
})

const displayText = computed(() => {
  if (props.text !== undefined) {
    return props.text
  }
  return `${Math.floor(animatedValue.value)}%`
})

const dashOffset = computed(() => {
  const progress = animatedValue.value / 100
  return circumference.value * (1 - progress)
})

const circleTransform = computed(() => {
  const rotation = props.clockwise ? -90 : 90
  return `rotate(${rotation} ${center.value} ${center.value})`
})

const circleStyle = computed(() => {
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    width: size as string,
    height: size as string
  }
})

const textStyle = computed(() => {
  return {
    color: computedColor.value as string
  }
})

let animationTimer: ReturnType<typeof setInterval> | null = null

const animate = () => {
  if (animationTimer) {
    clearInterval(animationTimer)
  }

  const target = Math.min(100, Math.max(0, targetRate.value))

  if (props.speed && props.speed > 0) {
    animationTimer = setInterval(() => {
      if (animatedValue.value >= target) {
        if (animationTimer) {
          clearInterval(animationTimer)
          animationTimer = null
        }
        animatedValue.value = target
        emit('finish')
        return
      }
      animatedValue.value = Math.min(animatedValue.value + 1, target)
      emit('update:modelValue', animatedValue.value)
      emit('update:currentRate', animatedValue.value)
    }, props.speed)
  } else {
    animatedValue.value = target
  }
}

onMounted(() => {
  animate()
})

watch(() => props.modelValue, () => {
  animate()
})

watch(() => props.currentRate, () => {
  animate()
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__svg {
    display: block;
  }

  &__track {
    transition: stroke  @bw-animation-duration-base  @bw-animation-timing-function-base;
  }

  &__progress {
    transition: stroke-dashoffset  @bw-animation-duration-base  @bw-animation-timing-function-base,
      stroke  @bw-animation-duration-base  @bw-animation-timing-function-base;
  }

  &__text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: @bw-font-size-md;
    color: @bw-text-color;
    line-height: 1;
  }
}
</style>