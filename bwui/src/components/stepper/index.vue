<template>
  <div class="bw-stepper" :class="[`bw-stepper--${theme}`, { 'bw-stepper--disabled': disabled }]">
    <button
      class="bw-stepper__minus"
      :class="{ 'bw-stepper__minus--disabled': isMinDisabled }"
      :disabled="disabled"
      :style="{ width: buttonSizePx, height: buttonSizePx }"
      @click="handleMinus"
    >
      <span class="bw-stepper__icon">-</span>
    </button>
    <input
      class="bw-stepper__input"
      :value="modelValue"
      :disabled="disabled"
      :style="{ width: inputWidthPx, height: buttonSizePx, fontSize: buttonSize }"
      @input="handleInputChange"
      @blur="handleBlur"
    />
    <button
      class="bw-stepper__plus"
      :class="{ 'bw-stepper__plus--disabled': isMaxDisabled }"
      :disabled="disabled"
      :style="{ width: buttonSizePx, height: buttonSizePx }"
      @click="handlePlus"
    >
      <span class="bw-stepper__icon">+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface StepperProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  integer?: boolean
  inputWidth?: number | string
  buttonSize?: number | string
  theme?: 'default' | 'round'
}

const props = withDefaults(defineProps<StepperProps>(), {
  modelValue: 1,
  min: 1,
  max: Infinity,
  step: 1,
  disabled: false,
  integer: false,
  inputWidth: 40,
  buttonSize: 28,
  theme: 'default'
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [value: number]
  'overlimit': [type: string]
  'plus': []
  'minus': []
  'blur': [event: Event]
  'focus': [event: Event]
}>()

const isMinDisabled = computed(() => {
  return props.modelValue <= props.min
})

const isMaxDisabled = computed(() => {
  if (props.max === Infinity) return false
  return props.modelValue >= props.max
})

const buttonSizePx = computed(() => {
  if (typeof props.buttonSize === 'number') {
    return `${props.buttonSize}px`
  }
  return props.buttonSize
})

const inputWidthPx = computed(() => {
  if (typeof props.inputWidth === 'number') {
    return `${props.inputWidth}px`
  }
  return props.inputWidth
})

const formatValue = (value: number): number => {
  let val = value

  if (props.integer) {
    val = Math.round(val)
  }

  if (val < props.min) {
    val = props.min
  }

  if (props.max !== Infinity && val > props.max) {
    val = props.max
  }

  return val
}

const emitValue = (value: number) => {
  const formatted = formatValue(value)
  emit('update:modelValue', formatted)
  emit('change', formatted)
}

const handleMinus = () => {
  if (props.disabled) return

  const newValue = props.modelValue - props.step

  if (newValue < props.min) {
    emit('overlimit', 'minus')
    emitValue(props.min)
  } else {
    emit('minus')
    emitValue(newValue)
  }
}

const handlePlus = () => {
  if (props.disabled) return

  const newValue = props.modelValue + props.step

  if (props.max !== Infinity && newValue > props.max) {
    emit('overlimit', 'plus')
    emitValue(props.max)
  } else {
    emit('plus')
    emitValue(newValue)
  }
}

const handleInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const rawValue = target.value

  if (rawValue === '' || rawValue === '-') return

  const val = Number(rawValue)
  if (!isNaN(val)) {
    emitValue(val)
  }
}

const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement
  const rawValue = target.value

  if (rawValue === '' || rawValue === '-' || isNaN(Number(rawValue))) {
    emitValue(props.min)
  } else {
    emitValue(Number(rawValue))
  }

  emit('blur', event)
}
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-stepper {
  display: inline-flex;
  align-items: center;

  &--disabled {
    opacity: @bw-disabled-opacity;
  }

  &__minus,
  &__plus {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid  @bw-border-color;
    background-color: @bw-white;
    color: @bw-text-color;
    font-size: @bw-font-size-lg;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 0;
    outline: none;

    &--disabled {
      color: @bw-text-color-3;
      cursor: not-allowed;
    }
  }

  &__icon {
    display: inline-block;
    line-height: 1;
  }

  &__input {
    width: 40px;
    padding: 0;
    border: none;
    border-top: 1px solid  @bw-border-color;
    border-bottom: 1px solid  @bw-border-color;
    background-color: @bw-white;
    color: @bw-text-color;
    font-size: @bw-font-size-md;
    text-align: center;
    outline: none;
    box-sizing: border-box;

    &:disabled {
      background-color: @bw-bg-color-light;
      cursor: not-allowed;
    }
  }

  &--round {
    .bw-stepper__minus {
      border-radius: @bw-border-radius-round 0 0  @bw-border-radius-round;
    }

    .bw-stepper__plus {
      border-radius: 0  @bw-border-radius-round  @bw-border-radius-round 0;
    }
  }
}
</style>