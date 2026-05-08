<template>
  <view class="page">
    <view class="section">
      <view class="section__title">基础用法</view>
      <Timeline :items="items1" />
    </view>

    <view class="section">
      <view class="section__title">带描述</view>
      <Timeline :items="items2" />
    </view>
  </view>
</template>

<script setup lang="ts">
import Timeline from '@/components/view/timeline/index.vue';

const items1 = [
  { title: '第一步', label: '2024-01-01 10:00', description: '开始执行任务' },
  { title: '第二步', label: '2024-01-01 12:00', description: '完成任务', active: true },
  { title: '第三步', label: '2024-01-01 14:00', description: '等待审核' },
];

const items2 = [
  { title: '订单已支付', description: '订单金额 ¥128.00' },
  { title: '商品已发货', description: '顺丰快递 SF1234567890' },
  { title: '已签收', description: '感谢您的购买', active: true },
];
</script>

<style lang="scss" scoped>
.page {
  padding: 0;
}
</style>
