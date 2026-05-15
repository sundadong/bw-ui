<template>
  <view class="bw-radio" :class="{ 'bw-radio--disabled': isDisabled }" @tap="handleClick">
    <view
      class="bw-radio__icon"
      :class="{ 'bw-radio__icon--checked': isChecked }"
    >
      <view class="bw-radio__dot"></view>
    </view>
    <view class="bw-radio__label" @tap.stop>
      <slot>{{ label }}</slot>
    </view>
  </view>
</template>

<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number, Boolean], default: '' },
  name: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue', 'change', 'click']);

const radioGroup = inject('radioGroup', null);

const isDisabled = computed(() => {
  return props.disabled || (radioGroup?.disabled?.value ?? false);
});

const isChecked = computed(() => {
  if (radioGroup) {
    return radioGroup.value?.value?.value === props.name;
  }
  return props.modelValue === props.name;
});

const handleClick = () => {
  if (isDisabled.value) return;
  emit('click');
  if (radioGroup?.updateValue) {
    radioGroup.updateValue(props.name);
  } else {
    emit('update:modelValue', props.name);
    emit('change', props.name);
  }
};
</script>

<style scoped lang="scss">
.bw-radio {
  display: inline-flex;
  align-items: center;
  
  &--disabled { opacity: 0.5; cursor: not-allowed; }
  
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border: 1px solid #c8c9cc;
    border-radius: 50%;
    transition: all 0.2s;
    
    &--checked {
      border-color: #1989fa;
    }
  }
  
  &__dot {
    width: 8px;
    height: 8px;
    background: #1989fa;
    border-radius: 50%;
    opacity: 0;
    transform: scale(0);
    transition: all 0.2s;
    
    .bw-radio__icon--checked & {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  &__label {
    margin-left: 8px;
    font-size: 14px;
    color: #323233;
  }
}
</style>
