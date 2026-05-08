<template>
  <view class="bw-article">
    <view v-if="title" class="bw-article__title">{{ title }}</view>
    <view v-if="author || publishDate" class="bw-article__info">
      <text v-if="author">{{ author }}</text>
      <text v-if="author && publishDate"> · </text>
      <text v-if="publishDate">{{ publishDate }}</text>
    </view>
    <view class="bw-article__content">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

export interface ArticleProps {
  title?: string;
  author?: string;
  publishDate?: string;
}

withDefaults(defineProps<ArticleProps>(), {
  title: '',
  author: '',
  publishDate: '',
});
</script>

<style lang="scss" scoped>
.bw-article {
  padding: $padding-md;
  word-break: break-all;
  word-wrap: break-word;
  line-height: 1.6;

  &__title {
    margin-bottom: $padding-sm;
    font-size: $font-size-xxl;
    font-weight: 600;
    color: $text-color;
  }

  &__info {
    margin-bottom: $padding-md;
    font-size: $font-size-sm;
    color: $text-color-3;
  }

  &__content {
    font-size: $font-size-md;
    color: $text-color;

    :deep(h1),
    :deep(h2),
    :deep(h3) {
      margin: $padding-md 0 $padding-sm;
      font-weight: 600;
      color: $text-color;
    }

    :deep(h1) {
      font-size: $font-size-xxl;
    }

    :deep(h2) {
      font-size: $font-size-xl;
    }

    :deep(h3) {
      font-size: $font-size-lg;
    }

    :deep(p) {
      margin: $padding-sm 0;
      line-height: 1.6;
    }

    :deep(img) {
      display: block;
      width: 100%;
      margin: $padding-md 0;
      border-radius: $border-radius-md;
    }
  }
}
</style>
