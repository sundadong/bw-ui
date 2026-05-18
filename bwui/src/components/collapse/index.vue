<template>
  <div class="bw-collapse" :class="{ 'bw-collapse--border': border }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, ref, watch } from 'vue'

export interface CollapseProps {
  modelValue?: (string | number)[]
  accordion?: boolean
  border?: boolean
}

const props = withDefaults(defineProps<CollapseProps>(), {
  modelValue: () => [],
  accordion: false,
  border: true
})

const emit = defineEmits<{
  'update:modelValue': [value: (string | number)[]]
  change: [activeNames: (string | number)[]]
}>()

const activeNames = ref<(string | number)[]>([...props.modelValue])

watch(() => props.modelValue, (val) => {
  activeNames.value = [...val]
})

const toggleItem = (name: string | number) => {
  const index = activeNames.value.indexOf(name)
  if (index > -1) {
    activeNames.value.splice(index, 1)
  } else {
    if (props.accordion) {
      activeNames.value = [name]
    } else {
      activeNames.value.push(name)
    }
  }
  emit('update:modelValue', [...activeNames.value])
  emit('change', [...activeNames.value])
}

const isActive = (name: string | number) => {
  return activeNames.value.includes(name)
}

provide('collapse', {
  toggleItem,
  isActive,
  activeNames
})
</script>

<style lang="less" scoped>
@import '../../styles/variables.less';

.bw-collapse {
  &--border {
    border-top: 1px solid  @bw-border-color;
    border-bottom: 1px solid  @bw-border-color;
  }
}
</style>