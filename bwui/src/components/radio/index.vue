<template>
  <div class="bw-radio" :class="{ 'bw-radio--disabled': disabled, 'bw-radio--checked': isChecked, 'bw-radio--square': shape === 'square' }" @click="handleClick">
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
  name?: string | number | boolean
  shape?: 'round' | 'square'
  disabled?: boolean
  label?: string
  iconSize?: string | number
  checkedColor?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  shape: 'round',
  disabled: false,
  iconSize: '20px',
  checkedColor: '#1989fa'
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
}>()

const isChecked = computed(() => {
  return props.modelValue === props.name
})

const handleClick = () => {
  if (props.disabled) return
  emit('update:modelValue', props.name)
  emit('change', props.name)
}
</script>

<style lang="less" scoped>
.bw-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--checked {
    .bw-radio__icon {
      border-color: v-bind(checkedColor);
    }
    .bw-radio__icon-dot {
      background-color: v-bind(checkedColor);
    }
  }

  &--square {
    .bw-radio__icon {
      border-radius: 4px;
    }
    .bw-radio__icon-dot {
      border-radius: 2px;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    border: 1px solid  @bw-border-color;
    border-radius: 50%;
    background-color: @bw-white;
    transition: all 0.2s;
  }

  &__icon-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  &__label {
    margin-left: 12px;
    font-size: 14px;
    color: @bw-text-color;
    line-height: 1.2;
  }
}
</style>
