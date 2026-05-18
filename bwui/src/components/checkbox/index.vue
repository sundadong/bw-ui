<template>
  <div class="bw-checkbox" :class="{ 'bw-checkbox--checked': isChecked, 'bw-checkbox--disabled': disabled, 'bw-checkbox--round': shape === 'round' }" @click="handleClick">
    <div class="bw-checkbox__icon">
      <bw-icon v-if="isChecked" name="success" :size="iconSize" />
    </div>
    <div v-if="$slots.default || label" class="bw-checkbox__label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BwIcon from '../icon/index.vue'

export interface CheckboxProps {
  modelValue?: boolean
  name?: string
  shape?: 'square' | 'round'
  disabled?: boolean
  label?: string
  iconSize?: string | number
  checkedColor?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  shape: 'square',
  disabled: false,
  iconSize: '20px',
  checkedColor: '#1989fa'
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

const isChecked = computed(() => !!props.modelValue)

const handleClick = () => {
  if (props.disabled) return
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style lang="less" scoped>
.bw-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &--checked {
    .bw-checkbox__icon {
      background-color: v-bind(checkedColor);
      border-color: v-bind(checkedColor);
    }
  }

  &--round {
    .bw-checkbox__icon {
      border-radius: 50%;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    border: 1px solid  @bw-border-color;
    border-radius: 2px;
    background-color: @bw-white;
    transition: all 0.2s;
    color: @bw-white;
  }

  &__label {
    margin-left: 12px;
    font-size: 14px;
    color: @bw-text-color;
    line-height: 1.2;
  }
}
</style>
