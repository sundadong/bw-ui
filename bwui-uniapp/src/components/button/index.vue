<template>
  <view
    class="bw-button"
    :class="[
      `bw-button--${type}`,
      `bw-button--${size}`,
      { 'bw-button--block': block },
      { 'bw-button--plain': plain },
      { 'bw-button--square': square },
      { 'bw-button--round': round },
      { 'bw-button--disabled': disabled },
      { 'bw-button--hairline': hairline },
      { 'bw-button--loading': loading }
    ]"
    :style="customStyle"
    @tap="handleClick"
  >
    <view v-if="loading" class="bw-button__loading">
      <view class="bw-button__loading-icon" :class="`bw-button__loading-icon--${loadingType}`"></view>
      <text v-if="loadingText" class="bw-button__loading-text">{{ loadingText }}</text>
    </view>
    <template v-else>
      <view v-if="icon && iconPosition === 'left'" class="bw-button__icon">{{ icon }}</view>
      <slot></slot>
      <view v-if="icon && iconPosition === 'right'" class="bw-button__icon">{{ icon }}</view>
    </template>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: 'normal' },
  text: { type: String, default: '' },
  color: { type: String, default: '' },
  icon: { type: String, default: '' },
  iconPosition: { type: String, default: 'left' },
  block: { type: Boolean, default: false },
  plain: { type: Boolean, default: false },
  square: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  hairline: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  loadingText: { type: String, default: '' },
  loadingType: { type: String, default: 'circular' },
  loadingSize: { type: [Number, String], default: 20 },
  url: { type: String, default: '' },
  to: { type: [String, Object], default: '' },
  replace: { type: Boolean, default: false }
});

const emit = defineEmits(['click']);

const customStyle = computed(() => {
  const style = {};
  if (props.color) {
    if (props.plain) {
      style['color'] = props.color;
      style['border-color'] = props.color;
    } else {
      style['background'] = props.color;
    }
  }
  return style;
});

const handleClick = (e) => {
  if (props.disabled || props.loading) return;
  
  if (props.url) {
    window.location.href = props.url;
  } else if (props.to) {
    uni.navigateTo({ url: props.to });
  }
  
  emit('click', e);
};
</script>

<style scoped lang="scss">
.bw-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #dcdee0;
  background: #fff;
  color: #323233;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
  
  &--block { display: flex; width: 100%; }
  &--round { border-radius: 999px; }
  &--square { border-radius: 0; }
  &--hairline { border-width: 0.5px; }
  &--disabled { opacity: 0.5; cursor: not-allowed; }
  
  &--default {
    &.bw-button--plain { background: #fff; }
  }
  
  &--primary {
    background: #1989fa;
    border-color: #1989fa;
    color: #fff;
    &.bw-button--plain { background: #fff; color: #1989fa; }
  }
  
  &--success {
    background: #07c160;
    border-color: #07c160;
    color: #fff;
    &.bw-button--plain { background: #fff; color: #07c160; }
  }
  
  &--warning {
    background: #ff976a;
    border-color: #ff976a;
    color: #fff;
    &.bw-button--plain { background: #fff; color: #ff976a; }
  }
  
  &--danger {
    background: #ee0a24;
    border-color: #ee0a24;
    color: #fff;
    &.bw-button--plain { background: #fff; color: #ee0a24; }
  }
  
  &--large {
    height: 50px;
    font-size: 16px;
  }
  
  &--normal {
    height: 44px;
    font-size: 14px;
  }
  
  &--small {
    height: 32px;
    padding: 0 8px;
    font-size: 12px;
  }
  
  &--mini {
    height: 24px;
    padding: 0 8px;
    font-size: 10px;
  }
  
  &__icon { font-size: 1.2em; }
  
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  
  &__loading-icon {
    width: 20px;
    height: 20px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: bw-button-spin 0.8s linear infinite;
    
    &--spinner {
      width: 14px;
      height: 14px;
      border-width: 2px;
    }
  }
  
  &__loading-text { margin-left: 4px; }
}

@keyframes bw-button-spin { to { transform: rotate(360deg); } }
</style>
