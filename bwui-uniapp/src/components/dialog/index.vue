<template>
  <transition name="bw-dialog">
    <view v-if="modelValue" class="bw-dialog" @tap="handleClose">
      <view class="bw-dialog__content" @tap.stop>
        <view v-if="title" class="bw-dialog__header">
          <text>{{ title }}</text>
        </view>
        <view class="bw-dialog__body">
          <slot><text>{{ message }}</text></slot>
        </view>
        <view class="bw-dialog__footer">
          <view v-if="showCancel" class="bw-dialog__btn bw-dialog__btn--cancel" @tap="handleCancel">
            {{ cancelText }}
          </view>
          <view class="bw-dialog__btn bw-dialog__btn--confirm" @tap="handleConfirm">
            {{ confirmText }}
          </view>
        </view>
      </view>
    </view>
  </transition>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  showCancel: { type: Boolean, default: true },
  cancelText: { type: String, default: '取消' },
  confirmText: { type: String, default: '确认' },
  closeOnClickOverlay: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel', 'close']);

const handleConfirm = () => {
  emit('confirm');
  emit('update:modelValue', false);
};

const handleCancel = () => {
  emit('cancel');
  emit('update:modelValue', false);
};

const handleClose = () => {
  emit('close');
  emit('update:modelValue', false);
};
</script>

<style scoped lang="scss">
.bw-dialog {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);

  &__content {
    width: 80%;
    max-width: 320px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  &__header {
    padding: 24px 16px 16px;
    font-size: 16px;
    font-weight: 600;
    color: #323233;
    text-align: center;
  }

  &__body {
    padding: 0 16px 24px;
    font-size: 14px;
    color: #646566;
    line-height: 1.6;
    text-align: center;
  }

  &__footer {
    display: flex;
    border-top: 1px solid #ebedf0;
  }

  &__btn {
    flex: 1;
    padding: 16px;
    font-size: 16px;
    text-align: center;
    &:active { background: #f7f8fa; }
    &--cancel {
      color: #323233;
      border-right: 1px solid #ebedf0;
    }
    &--confirm { color: #1989fa; }
  }
}

.bw-dialog-enter-active, .bw-dialog-leave-active { transition: opacity 0.2s; }
.bw-dialog-enter-from, .bw-dialog-leave-to { opacity: 0; }
</style>
