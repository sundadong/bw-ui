<template>
  <view class="bw-date-picker">
    <view v-if="label" class="bw-date-picker__label">{{ label }}</view>
    <view class="bw-date-picker__value" @tap="handleClick">
      <text :class="{ 'bw-date-picker__placeholder': !displayValue }">{{ displayValue || placeholder }}</text>
      <text v-if="isLink" class="bw-date-picker__arrow">›</text>
    </view>
    <view v-if="showPicker" class="bw-date-picker__mask" @tap="handleClose"></view>
    <transition name="bw-date-picker">
      <view v-if="showPicker" class="bw-date-picker__popup">
        <view class="bw-date-picker__toolbar">
          <view class="bw-date-picker__cancel" @tap="handleCancel">取消</view>
          <view class="bw-date-picker__title">{{ title }}</view>
          <view class="bw-date-picker__confirm" @tap="handleConfirm">确定</view>
        </view>
        <picker-view
          class="bw-date-picker__view"
          :value="pickerValue"
          @change="handleChange"
        >
          <picker-view-column>
            <view v-for="(year, index) in years" :key="index" class="bw-date-picker__item">{{ year }}年</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="(month, index) in months" :key="index" class="bw-date-picker__item">{{ month + 1 }}月</view>
          </picker-view-column>
          <picker-view-column v-if="!hideDay">
            <view v-for="(day, index) in days" :key="index" class="bw-date-picker__item">{{ day + 1 }}日</view>
          </picker-view-column>
        </picker-view>
      </view>
    </transition>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  title: { type: String, default: '选择日期' },
  placeholder: { type: String, default: '请选择日期' },
  isLink: { type: Boolean, default: true },
  hideDay: { type: Boolean, default: false },
  minDate: { type: String, default: '' },
  maxDate: { type: String, default: '' }
});

const emit = defineEmits(['update:modelValue', 'change', 'confirm']);

const showPicker = ref(false);
const pickerValue = ref([0, 0, 0]);

const currentYear = new Date().getFullYear();
const years = computed(() => {
  const min = props.minDate ? new Date(props.minDate).getFullYear() : currentYear - 10;
  const max = props.maxDate ? new Date(props.maxDate).getFullYear() : currentYear + 10;
  const arr = [];
  for (let i = min; i <= max; i++) arr.push(i);
  return arr;
});

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const days = computed(() => {
  const year = years.value[pickerValue.value[0]] || currentYear;
  const month = pickerValue.value[1] || 0;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => i);
});

const displayValue = computed(() => {
  if (!props.modelValue) return '';
  const [y, m, d] = props.modelValue.split('-');
  if (props.hideDay) return `${y}-${m}`;
  return props.modelValue;
});

const parseValue = (val) => {
  if (!val) return [years.value.length - 5, 0, 0];
  const [y, m, d] = val.split('-').map(Number);
  const yearIndex = years.value.indexOf(y);
  return [
    yearIndex !== -1 ? yearIndex : 0,
    m - 1,
    d ? d - 1 : 0
  ];
};

watch(() => props.modelValue, (val) => {
  if (val) pickerValue.value = parseValue(val);
}, { immediate: true });

const handleClick = () => { showPicker.value = true; };

const handleClose = () => { showPicker.value = false; };

const handleCancel = () => { showPicker.value = false; };

const handleChange = (e) => {
  pickerValue.value = e.detail.value;
};

const handleConfirm = () => {
  const year = years.value[pickerValue.value[0]];
  const month = String(pickerValue.value[1] + 1).padStart(2, '0');
  const day = String((pickerValue.value[2] || 0) + 1).padStart(2, '0');
  const value = props.hideDay ? `${year}-${month}` : `${year}-${month}-${day}`;
  emit('update:modelValue', value);
  emit('change', { value });
  emit('confirm', { value });
  showPicker.value = false;
};
</script>

<style scoped lang="scss">
.bw-date-picker {
  background: #fff;
  &__label {
    padding: 12px 16px 0;
    font-size: 14px;
    color: #323233;
  }
  &__value {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    font-size: 14px;
    color: #323233;
  }
  &__placeholder { color: #c8c9cc; }
  &__arrow { font-size: 16px; color: #c8c9cc; }
  &__mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }
  &__popup {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 1000;
  }
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    border-bottom: 1px solid #ebedf0;
  }
  &__cancel, &__confirm { padding: 0 16px; font-size: 14px; color: #969799; }
  &__confirm { color: #1989fa; }
  &__title { font-size: 16px; font-weight: 600; color: #323233; }
  &__view { height: 200px; }
  &__item { display: flex; align-items: center; justify-content: center; font-size: 16px; color: #323233; }
}

.bw-date-picker-enter-active, .bw-date-picker-leave-active { transition: transform 0.2s; }
.bw-date-picker-enter-from, .bw-date-picker-leave-to { transform: translateY(100%); }
</style>
