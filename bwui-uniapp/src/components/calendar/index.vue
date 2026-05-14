<template>
  <view class="bw-calendar">
    <view class="bw-calendar__header">
      <view class="bw-calendar__arrow" @tap="handlePrevMonth">‹</view>
      <view class="bw-calendar__title">{{ year }}年{{ month + 1 }}月</view>
      <view class="bw-calendar__arrow" @tap="handleNextMonth">›</view>
    </view>
    <view class="bw-calendar__weekdays">
      <view v-for="(day, index) in weekdays" :key="index" class="bw-calendar__weekday">{{ day }}</view>
    </view>
    <view class="bw-calendar__days">
      <view
        v-for="(day, index) in days"
        :key="index"
        class="bw-calendar__day"
        :class="{
          'bw-calendar__day--empty': !day,
          'bw-calendar__day--disabled': isDisabled(day),
          'bw-calendar__day--selected': isSelected(day),
          'bw-calendar__day--start': isStart(day),
          'bw-calendar__day--end': isEnd(day),
          'bw-calendar__day--range': isInRange(day)
        }"
        @tap="handleSelectDay(day)"
      >
        <text v-if="day">{{ day }}</text>
      </view>
    </view>
    <view v-if="showQuickSelect" class="bw-calendar__quick">
      <view class="bw-calendar__quick-btn" @tap="handleToday">今天</view>
      <view class="bw-calendar__quick-btn" @tap="handleClear">清除</view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Array], default: '' },
  type: { type: String, default: 'single' },
  showQuickSelect: { type: Boolean, default: true },
  minDate: { type: [String, Date], default: '' },
  maxDate: { type: [String, Date], default: '' }
});

const emit = defineEmits(['update:modelValue', 'change']);

const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
const today = new Date();
const year = ref(today.getFullYear());
const month = ref(today.getMonth());
const selectedDate = ref('');
const rangeStart = ref('');
const rangeEnd = ref('');

const days = computed(() => {
  const firstDay = new Date(year.value, month.value, 1).getDay();
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate();
  const daysArr = [];
  
  for (let i = 0; i < firstDay; i++) {
    daysArr.push('');
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArr.push(i);
  }
  return daysArr;
});

const formatDate = (d) => {
  return `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};

const isDisabled = (day) => {
  if (!day) return true;
  const date = new Date(formatDate(day));
  if (props.minDate && date < new Date(props.minDate)) return true;
  if (props.maxDate && date > new Date(props.maxDate)) return true;
  return false;
};

const isSelected = (day) => {
  if (!day) return false;
  const dateStr = formatDate(day);
  if (props.type === 'range') {
    return dateStr === rangeStart.value || dateStr === rangeEnd.value;
  }
  return dateStr === selectedDate.value;
};

const isStart = (day) => day && formatDate(day) === rangeStart.value;
const isEnd = (day) => day && formatDate(day) === rangeEnd.value;

const isInRange = (day) => {
  if (!day || props.type !== 'range') return false;
  const date = formatDate(day);
  return date > rangeStart.value && date < rangeEnd.value;
};

const handleSelectDay = (day) => {
  if (!day || isDisabled(day)) return;
  const dateStr = formatDate(day);
  
  if (props.type === 'range') {
    if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
      rangeStart.value = dateStr;
      rangeEnd.value = '';
    } else {
      if (dateStr < rangeStart.value) {
        rangeEnd.value = rangeStart.value;
        rangeStart.value = dateStr;
      } else {
        rangeEnd.value = dateStr;
      }
      emit('update:modelValue', [rangeStart.value, rangeEnd.value]);
      emit('change', { start: rangeStart.value, end: rangeEnd.value });
    }
  } else {
    selectedDate.value = dateStr;
    emit('update:modelValue', dateStr);
    emit('change', { date: dateStr });
  }
};

const handlePrevMonth = () => {
  if (month.value === 0) {
    month.value = 11;
    year.value--;
  } else {
    month.value--;
  }
};

const handleNextMonth = () => {
  if (month.value === 11) {
    month.value = 0;
    year.value++;
  } else {
    month.value++;
  }
};

const handleToday = () => {
  const now = new Date();
  year.value = now.getFullYear();
  month.value = now.getMonth();
};

const handleClear = () => {
  selectedDate.value = '';
  rangeStart.value = '';
  rangeEnd.value = '';
  emit('update:modelValue', '');
  emit('change', { date: '', start: '', end: '' });
};
</script>

<style scoped lang="scss">
.bw-calendar {
  background: #fff;
  padding: 16px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }
  &__title { font-size: 16px; font-weight: 600; color: #323233; }
  &__arrow {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #646566;
    &:active { background: #f7f8fa; }
  }
  &__weekdays { display: flex; margin-bottom: 8px; }
  &__weekday {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #969799;
  }
  &__days { display: flex; flex-wrap: wrap; }
  &__day {
    width: 14.28%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #323233;
    box-sizing: border-box;
    &--empty { visibility: hidden; }
    &--disabled { color: #c8c9cc; }
    &--selected { color: #fff; background: #1989fa; border-radius: 50%; }
    &--start { border-radius: 50% 0 0 50%; background: #1989fa; }
    &--end { border-radius: 0 50% 50% 0; background: #1989fa; }
    &--range { background: #e6f4ff; border-radius: 0; }
  }
  &__quick {
    display: flex;
    gap: 12px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #ebedf0;
  }
  &__quick-btn {
    flex: 1;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    color: #1989fa;
    background: #fff;
    border: 1px solid #1989fa;
    border-radius: 4px;
  }
}
</style>
