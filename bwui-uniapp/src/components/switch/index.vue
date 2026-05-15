<template>
  <view
    class="bw-switch"
    :class="{ 'bw-switch--disabled': disabled, 'bw-switch--loading': loading }"
    @tap="handleClick"
  >
    <view class="bw-switch__node">
      <slot name="node"></slot>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [Boolean, String, Number], default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  size: { type: [Number, String], default: 26 },
  activeColor: { type: String, default: '#1989fa' },
  inactiveColor: { type: String, default: 'rgba(120, 120, 128, 0.16)' },
  activeValue: { type: [Boolean, String, Number], default: true },
  inactiveValue: { type: [Boolean, String, Number], default: false }
});

const emit = defineEmits(['update:modelValue', 'change', 'click']);

const isChecked = () => props.modelValue === props.activeValue;

const handleClick = () => {
  if (props.disabled || props.loading) return;
  
  const newValue = isChecked() ? props.inactiveValue : props.activeValue;
  emit('update:modelValue', newValue);
  emit('change', newValue);
  emit('click', newValue);
};
</script>

<style scoped lang="scss">
.bw-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  width: calc(1.8em + 4px);
  height: calc(1em + 4px);
  background: rgba(120, 120, 128, 0.16);
  border-radius: 999px;
  transition: background-color 0.2s;
  cursor: pointer;
  
  &--disabled { opacity: 0.5; cursor: not-allowed; }
  &--loading { opacity: 0.7; cursor: wait; }
  
  &__node {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 1em;
    height: 1em;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 3px 1px 0 rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }
}
</style>
