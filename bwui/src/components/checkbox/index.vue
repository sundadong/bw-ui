<template>
  <div class="bw-checkbox" :class="{ 'bw-checkbox--checked': isChecked, 'bw-checkbox--disabled': disabled }" @click="handleClick">
    <div class="bw-checkbox__icon">
      <bw-icon v-if="isChecked" name="success" size="14px" />
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
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  shape: 'round',
  disabled: false
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

<style lang="scss" scoped>
.bw-checkbox {
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
    border-radius: $bw-border-radius-sm;
    background-color: $bw-white;
    transition: all $bw-animation-duration-fast $bw-animation-timing-function-ease;
    color: $bw-white;

    .bw-checkbox--checked & {
      background-color: $bw-primary-color;
      border-color: $bw-primary-color;
    }
  }

  &__label {
    margin-left: $bw-padding-sm;
    font-size: $bw-font-size-md;
    color: $bw-text-color;
    line-height: 1.2;
  }
}

.bw-checkbox--round {
  .bw-checkbox__icon {
    border-radius: 50%;
  }
}
</style>
