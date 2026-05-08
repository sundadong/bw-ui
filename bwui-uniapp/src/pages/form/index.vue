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
      <view class="section__content">
        <view class="mb-md"><text class="label">基础：</text><bw-stepper v-model="stepperValue" /></view>
        <view class="mb-md"><text class="label">带限制：</text><bw-stepper v-model="stepperValue2" :min="0" :max="10" /></view>
        <view><text class="label">禁用：</text><bw-stepper v-model="stepperValue" disabled /></view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import bwInput from '@/components/input/index.vue';
import bwTextarea from '@/components/textarea/index.vue';
import bwStepper from '@/components/stepper/index.vue';
const inputValue = ref('');
const inputValue2 = ref('禁用内容');
const textareaValue = ref('');
const stepperValue = ref(0);
const stepperValue2 = ref(5);
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 0; } }
.label { display: block; font-size: 12px; color: #646566; margin-bottom: 8px; }
.mb-md { margin-bottom: 12px; }
</style>
