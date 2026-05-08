<template>
  <view class="page">
    <view class="section">
      <view class="section__title">加载状态</view>
      <view class="section__content"><bw-loading show type="spinner" /><bw-loading show type="circular" /><bw-loading show type="spinner" text="加载中..." /></view>
    </view>
    <view class="section">
      <view class="section__title">通知提示</view>
      <view class="section__content">
        <bw-button size="small" type="primary" @click="showNotify('primary')">主要</bw-button>
        <bw-button size="small" type="success" @click="showNotify('success')">成功</bw-button>
        <bw-button size="small" type="warning" @click="showNotify('warning')">警告</bw-button>
        <bw-button size="small" type="danger" @click="showNotify('danger')">危险</bw-button>
      </view>
    </view>
    <view class="section">
      <view class="section__title">弹出层</view>
      <view class="section__content">
        <bw-button size="small" @click="showPopup = true">居中弹出</bw-button>
        <bw-button size="small" @click="showBottom = true">底部弹出</bw-button>
      </view>
    </view>
    <bw-notify v-model="notifyVisible" :message="notifyMessage" :type="notifyType" :show="notifyVisible" />
    <bw-popup v-model="showPopup" title="居中弹出" position="center"><view style="padding: 20px; text-align: center;"><text>这是一个居中弹出的内容</text></view></bw-popup>
    <bw-popup v-model="showBottom" title="底部弹出" position="bottom"><view style="padding: 20px; text-align: center;"><text>这是一个底部弹出的内容</text></view></bw-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import bwLoading from '@/components/loading/index.vue';
import bwButton from '@/components/button/index.vue';
import bwNotify from '@/components/notify/index.vue';
import bwPopup from '@/components/popup/index.vue';
const notifyVisible = ref(false);
const notifyMessage = ref('');
const notifyType = ref('primary');
const showPopup = ref(false);
const showBottom = ref(false);
const showNotify = (type) => {
  const messages = { primary: '这是一条主要通知', success: '操作成功！', warning: '警告：注意查看', danger: '错误：操作失败' };
  notifyMessage.value = messages[type];
  notifyType.value = type;
  notifyVisible.value = true;
};
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 16px; display: flex; flex-wrap: wrap; gap: 8px; } }
</style>
