<template>
  <div :class="tabbarClass" :style="tabbarStyle">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

export interface TabbarProps {
  modelValue?: number | string
  fixed?: boolean
  placeholder?: boolean
  border?: boolean
  zIndex?: number | string
  activeColor?: string
  inactiveColor?: string
  safeAreaInsetBottom?: boolean
}

const props = withDefaults(defineProps<TabbarProps>(), {
  modelValue: 0,
  fixed: true,
  placeholder: false,
  border: true,
  zIndex: 100,
  safeAreaInsetBottom: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number | string]
  change: [value: number | string]
}>()

const activeName = ref<number | string>(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    activeName.value = val
  }
)

const updateActive = (name: number | string) => {
  activeName.value = name
  emit('update:modelValue', name)
  emit('change', name)
}

provide('tabbar', {
  activeName,
  updateActive,
  activeColor: computed(() => props.activeColor),
  inactiveColor: computed(() => props.inactiveColor)
})

const tabbarClass = computed(() => {
  return [
    'bw-tabbar',
    {
      'bw-tabbar--fixed': props.fixed,
      'bw-tabbar--border': props.border,
      'bw-tabbar--safe-area-inset-bottom': props.safeAreaInsetBottom
    }
  ]
})

const tabbarStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex) {
    style.zIndex = String(props.zIndex)
  }
  return style
})
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.bw-tabbar {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: $bw-tabbar-height;
  background-color: $bw-tabbar-background-color;

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &--border {
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: $bw-border-color;
      transform: scaleY(0.5);
    }
  }

  &--safe-area-inset-bottom {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>