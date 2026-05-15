<template>
  <transition name="bw-dialog">
    <view v-if="show" class="bw-dialog" @tap="handleOverlayClick">
      <view class="bw-dialog__content" :class="{ 'bw-dialog__content--round': theme === 'round-button' }" @tap.stop>
        <view v-if="title || useSlot('title')" class="bw-dialog__header">
          <slot name="title">{{ title }}</slot>
        </view>
        <view class="bw-dialog__body" :class="`bw-dialog__body--${messageAlign}`">
          <slot><text>{{ message }}</text></slot>
        </view>
        <view v-if="showConfirmButton || showCancelButton" class="bw-dialog__footer" :class="{ 'bw-dialog__footer--round': theme === 'round-button' }">
          <view
            v-if="showCancelButton"
            class="bw-dialog__button bw-dialog__button--cancel"
            :style="{ color: cancelButtonColor }"
            @tap="handleCancel"
          >
            {{ cancelButtonText }}
          </view>
          <view
            v-if="showConfirmButton"
            class="bw-dialog__button bw-dialog__button--confirm"
            :class="{ 'bw-dialog__button--disabled': confirmButtonDisabled }"
            :style="{ color: confirmButtonColor }"
            @tap="handleConfirm"
          >
            {{ confirmButtonText }}
          </view>
        </view>
      </view>
    </view>
  </transition>
</template>

<script setup>
import { useSlots } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  messageAlign: { type: String, default: 'center' },
  theme: { type: String, default: 'default' },
  width: { type: [Number, String], default: 320 },
  showCancelButton: { type: Boolean, default: false },
  showConfirmButton: { type: Boolean, default: true },
  confirmButtonText: { type: String, default: '确认' },
  confirmButtonColor: { type: String, default: '#ee0a24' },
  confirmButtonDisabled: { type: Boolean, default: false },
  cancelButtonText: { type: String, default: '取消' },
  cancelButtonColor: { type: String, default: 'black' },
  cancelButtonDisabled: { type: Boolean, default: false },
  closeOnClickOverlay: { type: Boolean, default: false },
  closeOnPopstate: { type: Boolean, default: true },
  zIndex: { type: Number, default: 2000 },
  overlay: { type: Boolean, default: true },
  overlayStyle: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['update:show', 'confirm', 'cancel', 'close', 'open', 'opened', 'close', 'closed']);

const slots = useSlots();
const useSlot = (name) => slots[name];

const handleConfirm = () => {
  emit('confirm');
  emit('update:show', false);
};

const handleCancel = () => {
  emit('cancel');
  emit('update:show', false);
};

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    emit('close');
    emit('update:show', false);
  }
};
</script>

<style scoped lang="scss">
.bw-dialog {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  
  &__content {
    width: 320px;
    max-width: 90%;
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    
    &--round {
      border-radius: 16px;
    }
  }
  
  &__header {
    padding: 26px 24px 16px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color: #323233;
  }
  
  &__body {
    padding: 12px 24px 24px;
    font-size: 14px;
    line-height: 1.6;
    color: #646566;
    text-align: center;
    
    &--left { text-align: left; }
    &--right { text-align: right; }
  }
  
  &__footer {
    display: flex;
    border-top: 1px solid #ebedf0;
    
    &--round {
      padding: 12px;
      .bw-dialog__button { border-radius: 999px; }
    }
  }
  
  &__button {
    flex: 1;
    padding: 16px;
    font-size: 16px;
    text-align: center;
    background: #fff;
    border: none;
    cursor: pointer;
    &:active { background: #f7f8fa; }
    
    &--cancel {
      border-right: 1px solid #ebedf0;
    }
    
    &--confirm { }
    
    &--disabled { opacity: 0.5; cursor: not-allowed; }
  }
}

.bw-dialog-enter-active, .bw-dialog-leave-active { transition: opacity 0.3s; }
.bw-dialog-enter-from, .bw-dialog-leave-to { opacity: 0; }
</style>
