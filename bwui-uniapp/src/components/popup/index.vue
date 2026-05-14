<template>
  <transition name="bw-popup">
    <view v-if="modelValue" class="bw-popup" :class="`bw-popup--${position}`" @tap="handleOverlayClick">
      <view class="bw-popup__content" @tap.stop>
        <view v-if="title" class="bw-popup__header">{{ title }}</view>
        <view class="bw-popup__body"><slot></slot></view>
        <view v-if="showClose" class="bw-popup__close" @tap="handleClose">×</view>
      </view>
    </view>
  </transition>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  position: { type: String, default: 'center' },
  showClose: { type: Boolean, default: true }
});
const emit = defineEmits(['update:modelValue', 'close']);
const handleOverlayClick = () => {
  emit('update:modelValue', false);
  emit('close');
};
const handleClose = () => {
  emit('update:modelValue', false);
  emit('close');
};
</script>

<style scoped lang="scss">
.bw-popup {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  &__content {
    position: absolute;
    background: #fff;
    min-width: 200px;
    max-height: 80%;
    overflow: auto;
  }
  &--center &__content {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    max-width: 90%;
  }
  &--bottom &__content { bottom: 0; left: 0; right: 0; border-radius: 8px 8px 0 0; }
  &--top &__content { top: 0; left: 0; right: 0; border-radius: 0 0 8px 8px; }
  &__header {
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #ebedf0;
  }
  &__body { padding: 16px; }
  &__close {
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 24px;
    color: #969799;
    cursor: pointer;
  }
}
.bw-popup-enter-active, .bw-popup-leave-active { transition: opacity 0.3s; }
.bw-popup-enter-from, .bw-popup-leave-to { opacity: 0; }
</style>
