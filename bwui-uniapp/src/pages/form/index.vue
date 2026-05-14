<template>
  <view class="page">
    <view class="section">
      <view class="section__title">输入框</view>
      <view class="section__content"><bw-input v-model="inputValue" placeholder="请输入内容" clearable label="标题" /></view>
      <view class="section__content"><bw-input v-model="inputValue2" placeholder="禁用状态" disabled /></view>
    </view>
    <view class="section">
      <view class="section__title">文本域</view>
      <view class="section__content"><bw-textarea v-model="textareaValue" placeholder="请输入多行文本" :rows="4" show-count label="描述" /></view>
    </view>
    <view class="section">
      <view class="section__title">步进器</view>
      <view class="section__content section__content--pad">
        <view class="mb-md"><text class="label">基础：</text><bw-stepper v-model="stepperValue" /></view>
        <view class="mb-md"><text class="label">带限制：</text><bw-stepper v-model="stepperValue2" :min="0" :max="10" /></view>
        <view><text class="label">禁用：</text><bw-stepper v-model="stepperValue" disabled /></view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">开关</view>
      <view class="section__content section__content--pad">
        <view class="mb-md"><text class="label">基础：</text><bw-switch v-model="switchValue" /></view>
        <view class="mb-md"><text class="label">小尺寸：</text><bw-switch v-model="switchValue" size="small" /></view>
        <view class="mb-md"><text class="label">大尺寸：</text><bw-switch v-model="switchValue" size="large" /></view>
        <view><text class="label">禁用：</text><bw-switch v-model="switchValue" disabled /></view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">进度条</view>
      <view class="section__content section__content--col">
        <bw-progress :percentage="progressValue" />
        <bw-progress :percentage="progressValue" color="#07c160" />
        <bw-progress :percentage="progressValue" show-pivot color="#ff976a" />
        <view class="flex gap-sm mt-md">
          <bw-button size="small" @click="progressValue = Math.max(0, progressValue - 10)">减少</bw-button>
          <bw-button size="small" @click="progressValue = Math.min(100, progressValue + 10)">增加</bw-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import bwInput from '@/components/input/index.vue';
import bwTextarea from '@/components/textarea/index.vue';
import bwStepper from '@/components/stepper/index.vue';
import bwSwitch from '@/components/switch/index.vue';
import bwProgress from '@/components/progress/index.vue';
import bwButton from '@/components/button/index.vue';
const inputValue = ref('');
const inputValue2 = ref('禁用内容');
const textareaValue = ref('');
const stepperValue = ref(0);
const stepperValue2 = ref(5);
const switchValue = ref(true);
const progressValue = ref(30);
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 0; &--pad { padding: 16px; } &--col { padding: 16px; display: flex; flex-direction: column; gap: 16px; } } }
.label { display: block; font-size: 12px; color: #646566; margin-bottom: 8px; }
.mb-md { margin-bottom: 12px; }
.mt-md { margin-top: 8px; }
.flex { display: flex; }
.gap-sm { gap: 8px; }
</style>
