<template>
  <demo-layout title="Calendar 日历">
    <div class="demo-block">
      <div class="demo-title">基础用法 - 单选</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showSingle = true">选择单个日期</bw-button>
        <span v-if="singleValue" class="demo-result">已选: {{ formatDate(singleValue) }}</span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">日期范围选择</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showRange = true">选择日期范围</bw-button>
        <span v-if="rangeValue && rangeValue.length === 2" class="demo-result">
          已选: {{ formatDate(rangeValue[0]) }} - {{ formatDate(rangeValue[1]) }}
        </span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">多选模式</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showMultiple = true">选择多个日期</bw-button>
        <span v-if="multipleValue && multipleValue.length" class="demo-result">
          已选 {{ multipleValue.length }} 个日期
        </span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showCustomColor = true" style="background-color: #07c160; border-color: #07c160;">绿色主题</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义日期范围</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showLimitRange = true">限制日期范围</bw-button>
      </div>
    </div>

    <bw-calendar
      v-model="singleValue"
      :show="showSingle"
      type="single"
      title="选择日期"
      @update:show="showSingle = $event"
      @confirm="onSingleConfirm"
    />

    <bw-calendar
      v-model="rangeValue"
      :show="showRange"
      type="range"
      title="选择日期范围"
      :allow-same-day="false"
      @update:show="showRange = $event"
    />

    <bw-calendar
      v-model="multipleValue"
      :show="showMultiple"
      type="multiple"
      title="选择多个日期"
      @update:show="showMultiple = $event"
    />

    <bw-calendar
      v-model="customColorValue"
      :show="showCustomColor"
      type="single"
      title="选择日期"
      color="#07c160"
      @update:show="showCustomColor = $event"
    />

    <bw-calendar
      v-model="limitRangeValue"
      :show="showLimitRange"
      type="single"
      title="选择日期"
      :min-date="minDate"
      :max-date="maxDate"
      @update:show="showLimitRange = $event"
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwCalendar from '../components/calendar/index.vue'

const showSingle = ref(false)
const singleValue = ref<Date | null>(null)

const showRange = ref(false)
const rangeValue = ref<Date[]>([])

const showMultiple = ref(false)
const multipleValue = ref<Date[]>([])

const showCustomColor = ref(false)
const customColorValue = ref<Date | null>(null)

const showLimitRange = ref(false)
const limitRangeValue = ref<Date | null>(null)
const minDate = new Date(2024, 0, 1)
const maxDate = new Date(2024, 11, 31)

const formatDate = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

const onSingleConfirm = (value: any) => {
  console.log('确认选择:', value)
}
</script>

<style lang="scss" scoped>
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