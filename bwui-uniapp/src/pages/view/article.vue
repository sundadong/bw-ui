<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基本用法</view>
      <Article title="文章标题" author="作者" publish-date="2024-01-01">
        <p>这里是文章正文内容，可以包含多段落文字。</p>
        <p>支持富文本内容展示。</p>
        <h2>二级标题</h2>
        <p>更多内容展示。</p>
      </Article>
    </view>
  </view>
</template>

<script setup lang="ts">
import Article from '@/components/view/article/index.vue';
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
}
</style>
