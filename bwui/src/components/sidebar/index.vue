<template>
  <div class="bw-sidebar">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'

export interface SidebarProps {
  modelValue?: number | string
}

const props = withDefaults(defineProps<SidebarProps>(), {
  modelValue: 0
})

const emit = defineEmits<{
  'update:modelValue': [value: number | string]
  change: [index: number | string]
}>()

const activeIndex = ref<number | string>(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    activeIndex.value = val
  }
)

const updateActive = (index: number | string) => {
  activeIndex.value = index
  emit('update:modelValue', index)
  emit('change', index)
}

provide('sidebar', {
  activeIndex,
  updateActive
})
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.bw-sidebar {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 85px;
  height: 100%;
  overflow-y: auto;
  background-color: $bw-bg-color-gray;
  -webkit-overflow-scrolling: touch;
}
</style>