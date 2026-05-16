<template>
  <div class="bw-radio" :class="{ 'bw-radio--disabled': disabled, 'bw-radio--checked': isChecked }" @click="handleClick">
    <div class="bw-radio__icon">
      <div v-if="isChecked" class="bw-radio__icon-dot"></div>
    </div>
    <div v-if="$slots.default || label" class="bw-radio__label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface RadioProps {
  modelValue?: boolean | string | number
  name?: string
  shape?: 'round' | 'square'
  disabled?: boolean
  label?: string
  value?: string | number | boolean
}

const props = withDefaults(defineProps<RadioProps>(), {
  shape: 'round',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

const isChecked = computed(() => {
  return props.modelValue === props.value
})

const handleClick = () => {
  if (props.disabled) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style lang="scss" scoped>
.bw-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &--disabled {
    cursor: not-allowed;
    opacity: $bw-disabled-opacity;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid $bw-border-color;
    border-radius: 50%;
    background-color: $bw-white;
    transition: all $bw-animation-duration-fast $bw-animation-timing-function-ease;

    .bw-radio--checked & {
      border-color: $bw-primary-color;
    }

    &-dot {
      width: 8px;
      height: 8px;
      background-color: $bw-primary-color;
      border-radius: 50%;
    }
  }

  &__label {
    margin-left: $bw-padding-sm;
    font-size: $bw-font-size-md;
    color: $bw-text-color;
    line-height: 1.2;
  }
}
</style>
