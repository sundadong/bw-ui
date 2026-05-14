<template>
  <view class="bw-card" :class="{ 'bw-card--bordered': bordered }">
    <view v-if="title || $slots.header" class="bw-card__header">
      <slot name="header">
        <view class="bw-card__title">{{ title }}</view>
        <view v-if="subtitle" class="bw-card__subtitle">{{ subtitle }}</view>
      </slot>
    </view>
    <view class="bw-card__body" :class="{ 'bw-card__body--no-padding': noPadding }">
      <slot></slot>
    </view>
    <view v-if="$slots.footer" class="bw-card__footer">
      <slot name="footer"></slot>
    </view>
  </view>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  bordered: { type: Boolean, default: true },
  noPadding: { type: Boolean, default: false }
});
</script>

<style scoped lang="scss">
.bw-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;

  &--bordered { border: 1px solid #ebedf0; }

  &__header {
    padding: 12px 16px;
    border-bottom: 1px solid #ebedf0;
  }

  &__title { font-size: 14px; font-weight: 600; color: #323233; }
  &__subtitle { font-size: 12px; color: #969799; margin-top: 4px; }

  &__body {
    padding: 16px;
    &--no-padding { padding: 0; }
  }

  &__footer {
    padding: 12px 16px;
    border-top: 1px solid #ebedf0;
    font-size: 12px;
    color: #969799;
  }
}
</style>
