<template>
  <demo-layout title="DatePicker 日期时间选择器">
    <div class="demo-block">
      <div class="demo-title">日期选择</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showDate = true">选择日期</bw-button>
        <span v-if="dateValue" class="demo-result">{{ formatDate(dateValue) }}</span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">时间选择</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showTime = true">选择时间</bw-button>
        <span v-if="timeValue" class="demo-result">{{ formatTime(timeValue) }}</span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">日期时间选择</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showDatetime = true">选择日期时间</bw-button>
        <span v-if="datetimeValue" class="demo-result">{{ formatDatetime(datetimeValue) }}</span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">年月选择</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showYearMonth = true">选择年月</bw-button>
        <span v-if="yearMonthValue" class="demo-result">{{ formatYearMonth(yearMonthValue) }}</span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义列顺序</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showOrder = true">月日年顺序</bw-button>
      </div>
    </div>

    <bw-date-picker
      v-model="dateValue"
      :show="showDate"
      type="date"
      title="选择日期"
      @update:show="showDate =  @event"
    />

    <bw-date-picker
      v-model="timeValue"
      :show="showTime"
      type="time"
      title="选择时间"
      @update:show="showTime =  @event"
    />

    <bw-date-picker
      v-model="datetimeValue"
      :show="showDatetime"
      type="datetime"
      title="选择日期时间"
      @update:show="showDatetime =  @event"
    />

    <bw-date-picker
      v-model="yearMonthValue"
      :show="showYearMonth"
      type="year-month"
      title="选择年月"
      @update:show="showYearMonth =  @event"
    />

    <bw-date-picker
      v-model="orderValue"
      :show="showOrder"
      type="date"
      title="选择日期"
      :columns-order="['month', 'day', 'year']"
      @update:show="showOrder =  @event"
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwDatePicker from '../components/date-picker/index.vue'

const showDate = ref(false)
const dateValue = ref<Date | null>(null)

const showTime = ref(false)
const timeValue = ref<Date | null>(null)

const showDatetime = ref(false)
const datetimeValue = ref<Date | null>(null)

const showYearMonth = ref(false)
const yearMonthValue = ref<Date | null>(null)

const showOrder = ref(false)
const orderValue = ref<Date | null>(null)

const padZero = (n: number): string => String(n).padStart(2, '0')

const formatDate = (date: Date): string => {
  return `${date.getFullYear()}/${padZero(date.getMonth() + 1)}/${padZero(date.getDate())}`
}

const formatTime = (date: Date): string => {
  return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`
}

const formatDatetime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`
}

const formatYearMonth = (date: Date): string => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`
}
</script>

<style lang="less" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  .demo-title {
    font-size: 14px;
    color: #969799;
    margin-bottom: 16px;
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
  }
}

.demo-result {
  font-size: 14px;
  color: #1989fa;
  margin-left: 8px;
}
</style>