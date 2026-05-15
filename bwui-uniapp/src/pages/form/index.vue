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
        <view><text class="label">禁用：</text><bw-switch v-model="switchValue" disabled /></view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">复选框</view>
      <view class="section__content section__content--pad">
        <view class="mb-md"><bw-checkbox v-model="checkboxValue" label="复选框" /></view>
        <view><bw-checkbox v-model="checkboxValue2" label="禁用复选框" disabled /></view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">单选框</view>
      <view class="section__content section__content--pad">
        <view class="mb-md"><bw-radio v-model="radioValue" name="1" label="选项一" /></view>
        <view><bw-radio v-model="radioValue" name="2" label="选项二" /></view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">评分</view>
      <view class="section__content section__content--pad">
        <view class="mb-md"><text class="label">基础评分：</text><bw-rate v-model="rateValue" /></view>
        <view><text class="label">当前分值：{{ rateValue }}</text></view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">滑块</view>
      <view class="section__content section__content--pad">
        <view class="mb-md"><bw-slider v-model="sliderValue" /></view>
        <view><text class="label">当前值：{{ sliderValue }}</text></view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">进度条</view>
      <view class="section__content section__content--col">
        <bw-progress :percentage="progressValue" />
        <bw-progress :percentage="progressValue" color="#07c160" />
        <bw-progress :percentage="progressValue" show-pivot color="#ff976a" />
        <view class="flex gap-sm">
          <bw-button size="small" @click="progressValue = Math.max(0, progressValue - 10)">减少</bw-button>
          <bw-button size="small" @click="progressValue = Math.min(100, progressValue + 10)">增加</bw-button>
        </view>
      </view>
    </view>
    <view class="section">
      <view class="section__title">选择器</view>
      <view class="section__content section__content--pad">
        <bw-picker v-model="pickerValue" label="水果" title="选择水果" :columns="pickerColumns" />
      </view>
    </view>
    <view class="section">
      <view class="section__title">日期选择</view>
      <view class="section__content section__content--pad">
        <bw-date-picker v-model="dateValue" label="日期" title="选择日期" />
      </view>
    </view>
    <view class="section">
      <view class="section__title">地址选择</view>
      <view class="section__content section__content--pad">
        <bw-area-picker v-model="areaValue" label="地区" title="选择地区" />
      </view>
    </view>
    <view class="section">
      <view class="section__title">日历</view>
      <view class="section__content section__content--col">
        <bw-calendar v-model="calendarValue" />
      </view>
    </view>
    <view class="section">
      <view class="section__title">搜索框</view>
      <view class="section__content section__content--pad">
        <bw-search v-model="searchValue" placeholder="搜索商品" />
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
import bwCheckbox from '@/components/checkbox/index.vue';
import bwRadio from '@/components/radio/index.vue';
import bwRate from '@/components/rate/index.vue';
import bwSlider from '@/components/slider/index.vue';
import bwProgress from '@/components/progress/index.vue';
import bwButton from '@/components/button/index.vue';
import bwPicker from '@/components/picker/index.vue';
import bwDatePicker from '@/components/date-picker/index.vue';
import bwAreaPicker from '@/components/area-picker/index.vue';
import bwCalendar from '@/components/calendar/index.vue';
import bwSearch from '@/components/search/index.vue';
const inputValue = ref('');
const inputValue2 = ref('禁用内容');
const textareaValue = ref('');
const stepperValue = ref(0);
const stepperValue2 = ref(5);
const switchValue = ref(true);
const checkboxValue = ref(false);
const checkboxValue2 = ref(false);
const radioValue = ref('1');
const rateValue = ref(4);
const sliderValue = ref(50);
const progressValue = ref(30);
const pickerValue = ref('apple');
const pickerColumns = [['苹果', '香蕉', '橙子', '葡萄']];
const dateValue = ref('');
const areaValue = ref('');
const calendarValue = ref('');
const searchValue = ref('');
</script>

<style scoped lang="scss">
.page { padding: 16px; }
.section { margin-bottom: 24px; background: #fff; border-radius: 8px; overflow: hidden; &__title { font-size: 14px; font-weight: 600; color: #323233; padding: 16px; border-bottom: 1px solid #ebedf0; } &__content { padding: 0; &--pad { padding: 16px; } &--col { padding: 16px; display: flex; flex-direction: column; gap: 16px; } } }
.label { display: block; font-size: 12px; color: #646566; margin-bottom: 8px; }
.mb-md { margin-bottom: 12px; }
.flex { display: flex; }
.gap-sm { gap: 8px; }
</style>
