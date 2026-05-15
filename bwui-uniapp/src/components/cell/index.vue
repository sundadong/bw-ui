<template>
  <view
    class="bw-cell"
    :class="{
      'bw-cell--large': size === 'large',
      'bw-cell--clickable': clickable || isLink,
      'bw-cell--disabled': disabled
    }"
    @tap="handleClick"
  >
    <view v-if="icon" class="bw-cell__icon">{{ icon }}</view>
    <view class="bw-cell__title">
      <view class="bw-cell__title-text">
        <text v-if="required" class="bw-cell__required">*</text>
        <slot name="title">{{ title }}</slot>
      </view>
      <view v-if="label || useSlot('label')" class="bw-cell__label">
        <slot name="label">{{ label }}</slot>
      </view>
    </view>
    <view class="bw-cell__value">
      <slot name="value">{{ value }}</slot>
    </view>
    <view v-if="isLink || useSlot('right-icon')" class="bw-cell__right-icon">
      <slot name="right-icon">
        <text class="bw-cell__arrow" :class="`bw-cell__arrow--${arrowDirection}`">›</text>
      </slot>
    </view>
    <slot name="extra"></slot>
  </view>
</template>

<script setup>
import { useSlots } from 'vue';

const props = defineProps({
  title: { type: [String, Number], default: '' },
  value: { type: [String, Number], default: '' },
  label: { type: [String, Number], default: '' },
  size: { type: String, default: '' },
  icon: { type: String, default: '' },
  url: { type: String, default: '' },
  border: { type: Boolean, default: true },
  clickable: { type: Boolean, default: false },
  isLink: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  center: { type: Boolean, default: false },
  arrowDirection: { type: String, default: 'right' },
  disabled: { type: Boolean, default: false }
});

const emit = defineEmits(['click']);

const slots = useSlots();
const useSlot = (name) => slots[name];

const handleClick = (e) => {
  if (props.disabled) return;
  
  if (props.url) {
    window.location.href = props.url;
  }
  
  emit('click', e);
};
</script>

<style scoped lang="scss">
.bw-cell {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: #fff;
  font-size: 14px;
  color: #323233;
  
  &--large {
    padding: 12px 16px;
    .bw-cell__title { font-size: 16px; }
    .bw-cell__label { font-size: 14px; }
  }
  
  &--clickable { cursor: pointer; &:active { background: #f7f8fa; } }
  &--disabled { opacity: 0.5; }
  
  &__icon { margin-right: 8px; font-size: 16px; }
  
  &__title { flex: 1; }
  
  &__title-text {
    display: flex;
    align-items: center;
  }
  
  &__required {
    color: #ee0a24;
    margin-right: 2px;
  }
  
  &__label {
    font-size: 12px;
    color: #969799;
    margin-top: 4px;
  }
  
  &__value {
    flex-shrink: 0;
    color: #969799;
    text-align: right;
  }
  
  &__right-icon { margin-left: 4px; }
  
  &__arrow {
    font-size: 16px;
    color: #c8c9cc;
    &--up { transform: rotate(-90deg); }
    &--down { transform: rotate(90deg); }
    &--left { transform: rotate(180deg); }
  }
}
</style>
