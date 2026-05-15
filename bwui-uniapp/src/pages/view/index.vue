<template>
  <view class="page">
    <view class="section">
      <view class="section__title">骨架屏</view>
      <view class="section__content section__content--col">
        <bw-skeleton :avatar="true" :title="true" :rows="3" />
      </view>
    </view>
    <view class="section">
      <view class="section__title">通知栏</view>
      <view class="section__content section__content--col">
        <bw-notice-bar text="这是一条通知信息，内容滚动展示" type="primary" />
        <bw-notice-bar text="成功提示：操作已完成" type="success" />
        <bw-notice-bar text="警告提示：请注意查看" type="warning" />
        <bw-notice-bar text="错误提示：操作失败" type="danger" />
      </view>
    </view>
    <view class="section">
      <view class="section__title">折叠面板</view>
      <view class="section__content section__content--col">
        <bw-collapse v-model="collapseValue" :items="collapseItems" />
      </view>
    </view>
    <view class="section">
      <view class="section__title">圆环进度</view>
      <view class="section__content">
        <bw-circle :rate="circleRate" :size="80" show-text />
        <bw-circle :rate="circleRate" :size="80" color="#07c160" />
        <bw-circle :rate="circleRate" :size="80" color="#ff976a" />
      </view>
    </view>
    <view class="section">
      <view class="section__title">图片</view>
      <view class="section__content section__content--col">
        <bw-image width="100" height="100" />
        <bw-image width="100" height="100" round />
        <bw-image width="100" height="100" src="/static/logo.png" />
      </view>
    </view>
    <view class="section">
      <view class="section__title">警告提示</view>
      <view class="section__content section__content--col"><bw-alert type="info" title="信息提示" message="这是一条信息提示" show-icon /><bw-alert type="success" title="成功提示" message="操作成功！" show-icon /><bw-alert type="warning" title="警告提示" message="警告：注意查看" show-icon /><bw-alert type="error" title="错误提示" message="错误：操作失败" show-icon /></view>
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
      <view class="section__content section__content--col"><bw-empty description="暂无数据" /></view>
    </view>
    <view class="section">
      <view class="section__title">加载更多</view>
      <view class="section__content section__content--col"><bw-loadmore :loading="loading" :finished="finished" /></view>
    </view>
    <view class="section">
      <view class="section__title">时间线</view>
      <view class="section__content"><bw-timeline :items="timelineItems" /></view>
    </view>
    <view class="section">
      <view class="section__title">分割线</view>
      <view class="section__content section__content--col">
        <bw-divider />
        <bw-divider>带文字</bw-divider>
        <bw-divider dashed />
      </view>
    </view>
    <view class="section">
      <view class="section__title">卡片</view>
      <view class="section__content section__content--col">
        <bw-card title="卡片标题" subtitle="副标题文案">
          这是卡片内容区域，可以放置任意内容。
        </bw-card>
        <bw-card>
          <template #header>
            <view class="custom-header">自定义卡片头部</view>
          </template>
          通过 slot 自定义卡片头部区域。
          <template #footer>
            <view class="custom-footer">底部信息</view>
          </template>
        </bw-card>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import bwSkeleton from '@/components/skeleton/index.vue';
import bwNoticeBar from '@/components/notice-bar/index.vue';
import bwCollapse from '@/components/collapse/index.vue';
import bwCircle from '@/components/circle/index.vue';
import bwImage from '@/components/image/index.vue';
import bwAlert from '@/components/alert/index.vue';
import bwAvatar from '@/components/avatar/index.vue';
import bwBadge from '@/components/badge/index.vue';
import bwTag from '@/components/tag/index.vue';
import bwCountdown from '@/components/countdown/index.vue';
import bwEmpty from '@/components/empty/index.vue';
import bwLoadmore from '@/components/loadmore/index.vue';
import bwTimeline from '@/components/timeline/index.vue';
import bwDivider from '@/components/divider/index.vue';
import bwCard from '@/components/card/index.vue';
const timeValue = ref(3665000);
const loading = ref(false);
const finished = ref(false);
const circleRate = ref(70);
const collapseValue = ref(0);
const collapseItems = ref([
  { title: '标题1', content: '这里是内容区域1，可以放置任意内容' },
  { title: '标题2', content: '这里是内容区域2，支持折叠展开' },
  { title: '标题3', content: '这里是内容区域3，点击切换展开状态' }
]);
const onFinish = () => { uni.showToast({ title: '倒计时结束', icon: 'none' }); };
const timelineItems = ref([
  { time: '09:00', title: '开始开发', description: '项目初始化和需求分析' },
  { time: '12:00', title: '完成设计', description: 'UI设计和组件规划' },
  { time: '18:00', title: '提交代码', description: '完成核心功能开发' }
]);
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; &--col { display: block; } } }
.badge-box { width: 50px; height: 50px; background: #f7f8fa; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #646566; }
.custom-header { font-weight: 600; color: #323233; }
.custom-footer { color: #969799; font-size: 12px; }
</style>
