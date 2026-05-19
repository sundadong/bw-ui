<template>
  <div 
    class="bw-switch" 
    :class="{ 'bw-switch--on': isChecked, 'bw-switch--disabled': disabled }" 
    :style="{
      fontSize: size,
      backgroundColor: isChecked ? (activeColor || '') : (inactiveColor || '')
    }"
    @click="handleClick"
  >
    <div class="bw-switch__node">
      <div v-if="loading" class="bw-switch__loading"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SwitchProps {
  modelValue?: boolean | string | number
  loading?: boolean
  disabled?: boolean
  size?: string | number
  activeColor?: string
  inactiveColor?: string
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  loading: false,
  disabled: false,
  size: '26px',
  activeValue: true,
  inactiveValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
}>()

const isChecked = computed(() => {
  return props.modelValue === props.activeValue
})

const handleClick = (event: MouseEvent) => {
  event.stopPropagation()
  
  if (props.disabled || props.loading) return

  const newValue = isChecked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style lang="less" scoped>
.bw-switch {
  position: relative;
  display: inline-block;
  box-sizing: content-box;
  width: calc(1.8em + 4px);
  height: calc(1em + 4px);
  background-color: rgba(120, 120, 128, 0.16);
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.3s;
  z-index: 1;
  user-select: none;
  touch-action: manipulation;

  &--on {
    background-color: @bw-primary-color;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &__node {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1em;
    height: 1em;
    background-color: @bw-white;
    border-radius: 50%;
    box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05);
    transition: transform 0.3s;

    .bw-switch--on & {
      transform: translateX(calc(100% - 4px));
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
