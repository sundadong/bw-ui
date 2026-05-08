<template>
  <view class="page">
    <view class="section">
      <view class="section__title">数字徽章</view>
      <view class="section__content">
        <Badge content="1">
          <Avatar text="1" />
        </Badge>
        <Badge content="99">
          <Avatar text="99" />
        </Badge>
        <Badge content="100">
          <Avatar text="100" />
        </Badge>
        <Badge :content="100" :max="99">
          <Avatar text="100+" />
        </Badge>
      </view>
    </view>

    <view class="section">
      <view class="section__title">小红点</view>
      <view class="section__content">
        <Badge dot>
          <Avatar text="通知" />
        </Badge>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import Badge from '@/components/view/badge/index.vue';
import Avatar from '@/components/view/avatar/index.vue';
</script>

<style lang="scss" scoped>
.page {
  padding: 16px;
}

.section {
  margin-bottom: 24px;

  &__title {
    font-size: 14px;
    color: #969799;
    margin-bottom: 12px;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
