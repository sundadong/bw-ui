<template>
  <div class="bw-switch" :class="{ 'bw-switch--on': isChecked, 'bw-switch--disabled': disabled }" @click="handleClick">
    <div class="bw-switch__node">
      <div v-if="loading" class="bw-switch__loading"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SwitchProps {
  modelValue?: boolean
  loading?: boolean
  disabled?: boolean
  activeColor?: string
  inactiveColor?: string
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  loading: false,
  disabled: false,
  activeValue: true,
  inactiveValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

const isChecked = computed(() => {
  return props.modelValue === props.activeValue
})

const handleClick = () => {
  if (props.disabled || props.loading) return

  const newValue = isChecked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style lang="scss" scoped>
.bw-switch {
  position: relative;
  display: inline-block;
  box-sizing: content-box;
  width: $bw-switch-width;
  height: $bw-switch-height;
  font-size: 10px;
  background-color: $bw-gray-5;
  border-radius: $bw-switch-border-radius;
  cursor: pointer;
  transition: background-color $bw-animation-duration-base $bw-animation-timing-function-ease;

  &--on {
    background-color: $bw-primary-color;
  }

  &--disabled {
    opacity: $bw-disabled-opacity;
    cursor: not-allowed;
  }

  &__node {
    position: absolute;
    top: 1px;
    left: 1px;
    width: $bw-switch-node-size;
    height: calc(#{$bw-switch-height} - 2px);
    background-color: $bw-white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform $bw-animation-duration-base $bw-animation-timing-function-ease;

    .bw-switch--on & {
      transform: translateX(calc(#{$bw-switch-width} - #{$bw-switch-node-size} - 2px));
    }
  }

  &__loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid transparent;
    border-top-color: currentColor;
    border-radius: 50%;
    animation: bw-switch-loading 0.8s linear infinite;
  }
}

@keyframes bw-switch-loading {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
