<template>
  <view class="bw-picker">
    <view v-if="label" class="bw-picker__label">{{ label }}</view>
    <view class="bw-picker__value" @tap="handleClick">
      <text :class="{ 'bw-picker__placeholder': !displayValue }">{{ displayValue || placeholder }}</text>
      <text v-if="isLink" class="bw-picker__arrow">›</text>
    </view>
    <view v-if="showPicker" class="bw-picker__mask" @tap="handleClose"></view>
    <transition name="bw-picker">
      <view v-if="showPicker" class="bw-picker__popup">
        <view class="bw-picker__toolbar">
          <view class="bw-picker__cancel" @tap="handleCancel">取消</view>
          <view class="bw-picker__title">{{ title }}</view>
          <view class="bw-picker__confirm" @tap="handleConfirm">确定</view>
        </view>
        <picker-view
          class="bw-picker__view"
          :value="pickerValue"
          @change="handleChange"
          @columnchange="handleColumnChange"
        >
          <picker-view-column v-for="(column, index) in columns" :key="index">
            <view v-for="(item, idx) in column" :key="idx" class="bw-picker__item">
              {{ typeof item === 'object' ? item.text : item }}
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </transition>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: { type: [String, Number, Array], default: '' },
  label: { type: String, default: '' },
  title: { type: String, default: '' },
  placeholder: { type: String, default: '请选择' },
  columns: { type: Array, default: () => [] },
  isLink: { type: Boolean, default: true }
});

const emit = defineEmits(['update:modelValue', 'change', 'confirm']);

const showPicker = ref(false);
const pickerValue = ref([0]);

const displayValue = computed(() => {
  if (!props.columns.length || !props.columns[0].length) return '';
  const firstColumn = props.columns[0];
  if (typeof firstColumn[0] === 'object') {
    return firstColumn[pickerValue.value[0] || 0]?.text || '';
  }
  return firstColumn[pickerValue.value[0] || 0] || '';
});

watch(() => props.modelValue, (val) => {
  if (val !== undefined && val !== '') {
    const index = props.columns[0]?.findIndex(item => 
      typeof item === 'object' ? item.value === val : item === val
    );
    if (index !== -1) {
      pickerValue.value = [index];
    }
  }
}, { immediate: true });

const handleClick = () => {
  showPicker.value = true;
};

const handleClose = () => {
  showPicker.value = false;
};

const handleCancel = () => {
  showPicker.value = false;
};

const handleConfirm = () => {
  const selectedIndex = pickerValue.value[0] || 0;
  const item = props.columns[0]?.[selectedIndex];
  const value = typeof item === 'object' ? item.value : item;
  const text = typeof item === 'object' ? item.text : item;
  emit('update:modelValue', value);
  emit('change', { value, text, index: selectedIndex });
  emit('confirm', { value, text, index: selectedIndex });
  showPicker.value = false;
};

const handleChange = (e) => {
  pickerValue.value = e.detail.value;
};

const handleColumnChange = () => {};
</script>

<style scoped lang="scss">
.bw-picker {
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

.bw-picker-enter-active, .bw-picker-leave-active { transition: transform 0.2s; }
.bw-picker-enter-from, .bw-picker-leave-to { transform: translateY(100%); }
</style>
