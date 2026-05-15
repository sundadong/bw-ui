<template>
  <view class="bw-popup" :class="`bw-popup--${position}`">
    <view v-if="modelValue" class="bw-popup__overlay" :style="overlayStyle" @tap="handleOverlayClick"></view>
    <transition name="bw-popup">
      <view v-if="modelValue" class="bw-popup__content" :class="[`bw-popup__content--${position}`]" @tap.stop>
        <view v-if="title || closeable" class="bw-popup__header">
          <text class="bw-popup__title">{{ title }}</text>
          <view v-if="closeable" class="bw-popup__close" @tap="handleClose">✕</view>
        </view>
        <view class="bw-popup__body">
          <slot></slot>
        </view>
        <view v-if="$slots.footer" class="bw-popup__footer">
          <slot name="footer"></slot>
        </view>
      </view>
    </transition>
  </view>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  position: { type: String, default: 'center' },
  title: { type: String, default: '' },
  closeable: { type: Boolean, default: false },
  overlay: { type: Boolean, default: true },
  overlayStyle: { type: Object, default: () => ({}) },
  closeOnClickOverlay: { type: Boolean, default: true },
  round: { type: Boolean, default: false },
  duration: { type: [Number, Object], default: 300 },
  zIndex: { type: Number, default: 1000 },
  lockScroll: { type: Boolean, default: true }
});

const emit = defineEmits(['update:modelValue', 'close', 'open', 'closed']);

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    emit('close');
    emit('update:modelValue', false);
  }
};

const handleClose = () => {
  emit('close');
  emit('update:modelValue', false);
};
</script>

<style scoped lang="scss">
.bw-popup {
  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
  }
  
  &__content {
    position: fixed;
    background: #fff;
    overflow: hidden;
    
    &--center {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 16px;
      width: 320px;
      max-width: 90%;
      max-height: 70%;
      display: flex;
      flex-direction: column;
    }
    
    &--top {
      top: 0;
      left: 0;
      right: 0;
      border-radius: 0 0 16px 16px;
      max-height: 70%;
    }
    
    &--bottom {
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 16px 16px 0 0;
      max-height: 70%;
    }
    
    &--left {
      top: 0;
      left: 0;
      bottom: 0;
      width: 50%;
      max-width: 300px;
      border-radius: 0 16px 16px 0;
    }
    
    &--right {
      top: 0;
      right: 0;
      bottom: 0;
      width: 50%;
      max-width: 300px;
      border-radius: 16px 0 0 16px;
    }
  }
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid #ebedf0;
  }
  
  &__title {
    font-size: 16px;
    font-weight: 600;
    color: #323233;
  }
  
  &__close {
    font-size: 20px;
    color: #c8c9cc;
    cursor: pointer;
  }
  
  &__body {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
  }
  
  &__footer {
    padding: 12px 16px;
    border-top: 1px solid #ebedf0;
  }
}

.bw-popup-enter-active, .bw-popup-leave-active { transition: opacity 0.3s; }
.bw-popup-enter-from, .bw-popup-leave-to { opacity: 0; }
</style>
