<template>
  <view class="bw-alert" :class="`bw-alert--${type}`">
    <view v-if="showIcon" class="bw-alert__icon" :class="`bw-alert__icon--${type}`">!</view>
    <view class="bw-alert__content">
      <view v-if="title" class="bw-alert__title">{{ title }}</view>
      <view class="bw-alert__message"><slot>{{ message }}</slot></view>
    </view>
    <view v-if="closable" class="bw-alert__close" @tap="handleClose">×</view>
  </view>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'info' },
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  closable: { type: Boolean, default: false },
  showIcon: { type: Boolean, default: false }
});
const emit = defineEmits(['close']);
const handleClose = () => emit('close');
</script>

<style scoped lang="scss">
.bw-alert {
  display: flex;
  padding: 12px 16px;
  border-radius: 4px;
  font-size: 14px;
  &--info { background: #e6f7ff; color: #1890ff; }
  &--success { background: #f6ffed; color: #52c41a; }
  &--warning { background: #fffbe6; color: #faad14; }
  &--error { background: #fff2f0; color: #ff4d4f; }
  &__icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
    margin-right: 8px;
    flex-shrink: 0;
    &--info { background: #1890ff; }
    &--success { background: #52c41a; }
    &--warning { background: #faad14; }
    &--error { background: #ff4d4f; }
  }
  &__content { flex: 1; }
  &__title { font-weight: 600; margin-bottom: 4px; }
  &__message { opacity: 0.8; }
  &__close { font-size: 20px; opacity: 0.5; cursor: pointer; margin-left: 8px; }
}
</style>
