<template>
  <view class="page">
    <view class="section">
      <view class="section__title">警告提示</view>
      <view class="section__content"><bw-alert type="info" title="信息提示" message="这是一条信息提示" show-icon /><bw-alert type="success" title="成功提示" message="操作成功！" show-icon /><bw-alert type="warning" title="警告提示" message="警告：注意查看" show-icon /><bw-alert type="error" title="错误提示" message="错误：操作失败" show-icon /></view>
    </view>
    <view class="section">
      <view class="section__title">头像</view>
      <view class="section__content"><bw-avatar size="small" initials="S" bg-color="#1989fa" /><bw-avatar size="medium" initials="中" bg-color="#07c160" /><bw-avatar size="large" initials="大" bg-color="#ff976a" /></view>
    </view>
    <view class="section">
      <view class="section__title">徽章</view>
      <view class="section__content"><bw-badge content="5" type="primary"><view class="badge-box">消息</view></bw-badge><bw-badge content="99+" type="danger"><view class="badge-box">通知</view></bw-badge><bw-badge dot type="warning"><view class="badge-box">动态</view></bw-badge></view>
    </view>
    <view class="section">
      <view class="section__title">标签</view>
      <view class="section__content"><bw-tag>默认</bw-tag><bw-tag type="primary">主要</bw-tag><bw-tag type="success">成功</bw-tag><bw-tag type="warning">警告</bw-tag><bw-tag type="danger">危险</bw-tag><bw-tag plain type="primary">朴素</bw-tag><bw-tag round type="primary">圆角</bw-tag></view>
    </view>
    <view class="section">
      <view class="section__title">倒计时</view>
      <view class="section__content"><bw-countdown :time="timeValue" show-days @finish="onFinish" /></view>
    </view>
    <view class="section">
      <view class="section__title">空状态</view>
      <view class="section__content"><bw-empty description="暂无数据" /></view>
    </view>
    <view class="section">
      <view class="section__title">加载更多</view>
      <view class="section__content"><bw-loadmore :loading="loading" :finished="finished" /></view>
    </view>
    <view class="section">
      <view class="section__title">时间线</view>
      <view class="section__content"><bw-timeline :items="timelineItems" /></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import bwAlert from '@/components/alert/index.vue';
import bwAvatar from '@/components/avatar/index.vue';
import bwBadge from '@/components/badge/index.vue';
import bwTag from '@/components/tag/index.vue';
import bwCountdown from '@/components/countdown/index.vue';
import bwEmpty from '@/components/empty/index.vue';
import bwLoadmore from '@/components/loadmore/index.vue';
import bwTimeline from '@/components/timeline/index.vue';
const timeValue = ref(3665000);
const loading = ref(false);
const finished = ref(false);
const onFinish = () => { uni.showToast({ title: '倒计时结束', icon: 'none' }); };
const timelineItems = ref([
  { time: '09:00', title: '开始开发', description: '项目初始化和需求分析' },
  { time: '12:00', title: '完成设计', description: 'UI设计和组件规划' },
  { time: '18:00', title: '提交代码', description: '完成核心功能开发' }
]);
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 16px; } }
.badge-box { width: 50px; height: 50px; background: #f7f8fa; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #646566; }
</style>
