<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基础用法</view>
      <Row>
        <Col :span="8"><view class="grid-item">col-8</view></Col>
        <Col :span="4"><view class="grid-item">col-4</view></Col>
      </Row>
      <Row>
        <Col :span="4"><view class="grid-item">col-4</view></Col>
        <Col :span="4"><view class="grid-item">col-4</view></Col>
        <Col :span="4"><view class="grid-item">col-4</view></Col>
        <Col :span="4"><view class="grid-item">col-4</view></Col>
        <Col :span="4"><view class="grid-item">col-4</view></Col>
        <Col :span="4"><view class="grid-item">col-4</view></Col>
      </Row>
      <Row>
        <Col :span="6"><view class="grid-item">col-6</view></Col>
        <Col :span="6"><view class="grid-item">col-6</view></Col>
        <Col :span="6"><view class="grid-item">col-6</view></Col>
        <Col :span="6"><view class="grid-item">col-6</view></Col>
      </Row>
    </view>

    <view class="section">
      <view class="section__title">带间距</view>
      <Row :gutter="16">
        <Col :span="8"><view class="grid-item">col-8</view></Col>
        <Col :span="8"><view class="grid-item">col-8</view></Col>
        <Col :span="8"><view class="grid-item">col-8</view></Col>
      </Row>
    </view>

    <view class="section">
      <view class="section__title">偏移</view>
      <Row>
        <Col :span="12" :offset="6"><view class="grid-item">col-12 offset-6</view></Col>
      </Row>
    </view>
  </view>
</template>

<script setup lang="ts">
import Row from '@/components/layout/layout/index.vue';
import Col from '@/components/layout/layout/col.vue';
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
}

.grid-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #ffffff;
  background-color: #1989fa;
  border-radius: 4px;
}
</style>
