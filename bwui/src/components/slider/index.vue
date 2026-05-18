<template>
  <div
    class="bw-slider"
    :class="{
      'bw-slider--disabled': disabled,
      'bw-slider--vertical': vertical
    }"
    @click="handleBarClick"
  >
    <div
      class="bw-slider__bar"
      :style="barStyle"
    >
      <div
        class="bw-slider__track"
        :style="trackStyle"
      />
      <div
        v-if="range"
        class="bw-slider__range"
        :style="rangeStyle"
      />
      <div
        class="bw-slider__button"
        :class="{ 'bw-slider__button--dragging': dragging }"
        :style="buttonStyle"
        @mousedown.prevent="handleButtonDown"
        @touchstart.prevent="handleButtonDown"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface SliderProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  barHeight?: number | string
  activeColor?: string
  inactiveColor?: string
  buttonSize?: number | string
  vertical?: boolean
  range?: boolean
}

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  barHeight: 2,
  activeColor: '#1989fa',
  inactiveColor: '#e5e5e5',
  buttonSize: 24,
  vertical: false,
  range: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [value: number]
  'drag-start': []
  'drag-end': []
}>()

const dragging = ref(false)

const barHeightPx = computed(() => {
  if (typeof props.barHeight === 'number') {
    return `${props.barHeight}px`
  }
  return props.barHeight
})

const buttonSizePx = computed(() => {
  if (typeof props.buttonSize === 'number') {
    return `${props.buttonSize}px`
  }
  return props.buttonSize
})

const barStyle = computed(() => {
  return {
    height: props.vertical ? '100%' : barHeightPx.value,
    width: props.vertical ? barHeightPx.value : '100%',
    backgroundColor: props.inactiveColor,
    borderRadius: barHeightPx.value
  }
})

const percentage = computed(() => {
  if (props.max === props.min) return 0
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const trackStyle = computed(() => {
  return {
    width: props.vertical ? '100%' : `${percentage.value}%`,
    height: props.vertical ? `${percentage.value}%` : '100%',
    backgroundColor: props.activeColor
  }
})

const rangeStyle = computed(() => {
  return {}
})

const buttonStyle = computed(() => {
  return {
    width: buttonSizePx.value,
    height: buttonSizePx.value,
    left: props.vertical ? `calc(50% - ${buttonSizePx.value} / 2)` : `${percentage.value}%`,
    top: props.vertical ? `${percentage.value}%` : `calc(50% - ${buttonSizePx.value} / 2)`,
    marginLeft: props.vertical ? '0' : `calc(-${buttonSizePx.value} / 2)`,
    marginTop: props.vertical ? `calc(-${buttonSizePx.value} / 2)` : '0'
  }
})

const getValueFromPosition = (clientX: number, clientY: number): number => {
  const barEl = document.querySelector('.bw-slider__bar')
  if (!barEl) return props.modelValue

  const rect = barEl.getBoundingClientRect()

  let ratio: number
  if (props.vertical) {
    const offsetY = rect.bottom - clientY
    ratio = Math.max(0, Math.min(1, offsetY / rect.height))
  } else {
    const offsetX = clientX - rect.left
    ratio = Math.max(0, Math.min(1, offsetX / rect.width))
  }

  const rawValue = props.min + ratio * (props.max - props.min)
  const steppedValue = Math.round(rawValue / props.step) * props.step
  return Math.max(props.min, Math.min(props.max, steppedValue))
}

const emitValue = (value: number) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const handleBarClick = (event: MouseEvent | TouchEvent) => {
  if (props.disabled) return

  let clientX: number, clientY: number
  if (event instanceof MouseEvent) {
    clientX = event.clientX
    clientY = event.clientY
  } else {
    const touch = event.touches[0]
    clientX = touch.clientX
    clientY = touch.clientY
  }

  const value = getValueFromPosition(clientX, clientY)
  emitValue(value)
}

const handleButtonDown = (event: MouseEvent | TouchEvent) => {
  if (props.disabled) return

  dragging.value = true
  emit('drag-start')

  const handleMove = (e: MouseEvent | TouchEvent) => {
    let clientX: number, clientY: number
    if (e instanceof MouseEvent) {
      clientX = e.clientX
      clientY = e.clientY
    } else {
      const touch = e.touches[0]
      clientX = touch.clientX
      clientY = touch.clientY
    }

    const value = getValueFromPosition(clientX, clientY)
    emitValue(value)
  }

  const handleUp = () => {
    dragging.value = false
    emit('drag-end')
    document.removeEventListener('mousemove', handleMove)
    document.removeEventListener('mouseup', handleUp)
    document.removeEventListener('touchmove', handleMove)
    document.removeEventListener('touchend', handleUp)
  }

  document.addEventListener('mousemove', handleMove)
  document.addEventListener('mouseup', handleUp)
  document.addEventListener('touchmove', handleMove)
  document.addEventListener('touchend', handleUp)
}
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-slider {
  position: relative;
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &--disabled {
    opacity: @bw-disabled-opacity;
    cursor: not-allowed;
  }

  &--vertical {
    width: 24px;
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }

  &__bar {
    position: relative;
    width: 100%;
    border-radius: 999px;
    background-color: @bw-progress-background-color;

    .bw-slider--vertical & {
      width: 2px;
      height: 100%;
    }
  }

  &__track {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: inherit;
    background-color: @bw-primary-color;
    transition: width 0.2s;

    .bw-slider--vertical & {
      top: auto;
      bottom: 0;
      width: 100%;
      height: 0;
      transition: height 0.2s;
    }
  }

  &__range {
    position: absolute;
    top: 0;
    height: 100%;
    border-radius: inherit;
  }

  &__button {
    position: absolute;
    border-radius: 50%;
    background-color: @bw-white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s;

    &--dragging {
      transform: scale(1.2);
    }
  }
}
</style>