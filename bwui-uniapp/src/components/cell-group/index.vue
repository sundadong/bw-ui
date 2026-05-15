<template>
  <view class="bw-cell-group" :class="{ 'bw-cell-group--inset': inset }">
    <view v-if="title" class="bw-cell-group__title">{{ title }}</view>
    <view class="bw-cell-group__content" :class="{ 'bw-cell-group__content--border': border }">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  inset: { type: Boolean, default: false },
  border: { type: Boolean, default: true }
});
</script>

<style scoped lang="scss">
.bw-cell-group {
  &__title {
    padding: 16px 16px 8px;
    font-size: 14px;
    color: #969799;
  }
  
  &__content {
    &--border > :not(:last-child) { border-bottom: 1px solid #ebedf0; }
  }
  
  &--inset {
    margin: 12px;
    border-radius: 8px;
    overflow: hidden;
    
    .bw-cell-group__title {
      padding-left: 16px;
    }
  }
}
</style>
