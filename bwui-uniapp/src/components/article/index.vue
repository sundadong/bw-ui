<template>
  <view class="bw-article">
    <view v-if="title" class="bw-article__title">{{ title }}</view>
    <view v-if="author || date" class="bw-article__meta"><text v-if="author">{{ author }}</text><text v-if="author && date"> · </text><text v-if="date">{{ date }}</text></view>
    <view class="bw-article__content"><slot></slot></view>
  </view>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  author: { type: String, default: '' },
  date: { type: String, default: '' }
});
</script>

<style scoped lang="scss">
.bw-article {
  padding: 16px;
  background: #fff;
  &__title { font-size: 20px; font-weight: 600; color: #323233; margin-bottom: 12px; line-height: 1.4; }
  &__meta { font-size: 12px; color: #969799; margin-bottom: 16px; }
  &__content { font-size: 14px; color: #323233; line-height: 1.8; }
}
</style>
