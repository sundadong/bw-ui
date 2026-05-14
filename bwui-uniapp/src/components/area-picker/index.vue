<template>
  <view class="bw-area-picker">
    <view v-if="label" class="bw-area-picker__label">{{ label }}</view>
    <view class="bw-area-picker__value" @tap="handleClick">
      <text :class="{ 'bw-area-picker__placeholder': !displayValue }">{{ displayValue || placeholder }}</text>
      <text v-if="isLink" class="bw-area-picker__arrow">›</text>
    </view>
    <view v-if="showPicker" class="bw-area-picker__mask" @tap="handleClose"></view>
    <transition name="bw-area-picker">
      <view v-if="showPicker" class="bw-area-picker__popup">
        <view class="bw-area-picker__toolbar">
          <view class="bw-area-picker__cancel" @tap="handleCancel">取消</view>
          <view class="bw-area-picker__title">{{ title }}</view>
          <view class="bw-area-picker__confirm" @tap="handleConfirm">确定</view>
        </view>
        <view class="bw-area-picker__tabs">
          <view
            v-for="(tab, index) in tabs"
            :key="index"
            class="bw-area-picker__tab"
            :class="{ 'bw-area-picker__tab--active': currentTab === index }"
            @tap="currentTab = index"
          >{{ tab }}</view>
        </view>
        <view class="bw-area-picker__content">
          <scroll-view scroll-y class="bw-area-picker__list">
            <view
              v-for="(item, index) in currentList"
              :key="index"
              class="bw-area-picker__item"
              :class="{ 'bw-area-picker__item--selected': isSelected(item) }"
              @tap="handleSelect(item, index)"
            >
              <text>{{ item.name }}</text>
              <text v-if="isSelected(item)" class="bw-area-picker__check">✓</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </transition>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  title: { type: String, default: '选择地区' },
  placeholder: { type: String, default: '请选择地区' },
  isLink: { type: Boolean, default: true }
});

const emit = defineEmits(['update:modelValue', 'change', 'confirm']);

const showPicker = ref(false);
const currentTab = ref(0);
const selected = ref({ province: null, city: null, district: null });

const provinceData = [
  { name: '北京市', code: '110000', children: [{ name: '市辖区', code: '110100', children: [{ name: '东城区', code: '110101' }, { name: '西城区', code: '110102' }, { name: '朝阳区', code: '110105' }, { name: '海淀区', code: '110108' }] }] },
  { name: '上海市', code: '310000', children: [{ name: '市辖区', code: '310100', children: [{ name: '黄浦区', code: '310101' }, { name: '徐汇区', code: '310104' }, { name: '长宁区', code: '310105' }, { name: '静安区', code: '310106' }] }] },
  { name: '广东省', code: '440000', children: [{ name: '广州市', code: '440100', children: [{ name: '天河区', code: '440106' }, { name: '白云区', code: '440111' }, { name: '黄埔区', code: '440112' }, { name: '番禺区', code: '440113' }] }, { name: '深圳市', code: '440300', children: [{ name: '罗湖区', code: '440303' }, { name: '福田区', code: '440304' }, { name: '南山区', code: '440305' }, { name: '宝安区', code: '440306' }] }] },
  { name: '浙江省', code: '330000', children: [{ name: '杭州市', code: '330100', children: [{ name: '上城区', code: '330102' }, { name: '下城区', code: '330103' }, { name: '西湖区', code: '330106' }, { name: '滨江区', code: '330108' }] }] },
  { name: '江苏省', code: '320000', children: [{ name: '南京市', code: '320100', children: [{ name: '玄武区', code: '320102' }, { name: '秦淮区', code: '320104' }, { name: '建邺区', code: '320105' }, { name: '鼓楼区', code: '320106' }] }] }
];

const tabs = computed(() => {
  const arr = ['请选择'];
  if (selected.value.province) arr[0] = selected.value.province.name;
  if (selected.value.city) arr[1] = selected.value.city.name;
  if (selected.value.district) arr[2] = selected.value.district.name;
  return arr.slice(0, 3);
});

const currentList = computed(() => {
  if (currentTab.value === 0) return provinceData;
  if (currentTab.value === 1 && selected.value.province) return selected.value.province.children || [];
  if (currentTab.value === 2 && selected.value.city) return selected.value.city.children || [];
  return [];
});

const displayValue = computed(() => {
  const parts = [];
  if (selected.value.province) parts.push(selected.value.province.name);
  if (selected.value.city) parts.push(selected.value.city.name);
  if (selected.value.district) parts.push(selected.value.district.name);
  return parts.join('/');
});

const isSelected = (item) => {
  if (currentTab.value === 0 && selected.value.province?.code === item.code) return true;
  if (currentTab.value === 1 && selected.value.city?.code === item.code) return true;
  if (currentTab.value === 2 && selected.value.district?.code === item.code) return true;
  return false;
};

const handleClick = () => { showPicker.value = true; };

const handleClose = () => { showPicker.value = false; };

const handleCancel = () => { showPicker.value = false; };

const handleSelect = (item, index) => {
  if (currentTab.value === 0) {
    selected.value = { province: item, city: null, district: null };
    if (item.children?.length) currentTab.value = 1;
  } else if (currentTab.value === 1) {
    selected.value.city = item;
    selected.value.district = null;
    if (item.children?.length) currentTab.value = 2;
  } else if (currentTab.value === 2) {
    selected.value.district = item;
    handleConfirm();
  }
};

const handleConfirm = () => {
  const value = displayValue.value;
  const codes = [selected.value.province?.code, selected.value.city?.code, selected.value.district?.code].filter(Boolean).join(',');
  emit('update:modelValue', value);
  emit('change', { value, codes, ...selected.value });
  emit('confirm', { value, codes, ...selected.value });
  showPicker.value = false;
};
</script>

<style scoped lang="scss">
.bw-area-picker {
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
    height: 60%;
    background: #fff;
    border-radius: 12px 12px 0 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
  }
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    border-bottom: 1px solid #ebedf0;
    flex-shrink: 0;
  }
  &__cancel, &__confirm { padding: 0 16px; font-size: 14px; color: #969799; }
  &__confirm { color: #1989fa; }
  &__title { font-size: 16px; font-weight: 600; color: #323233; }
  &__tabs {
    display: flex;
    border-bottom: 1px solid #ebedf0;
    flex-shrink: 0;
  }
  &__tab {
    flex: 1;
    padding: 12px 0;
    text-align: center;
    font-size: 14px;
    color: #646566;
    &--active { color: #1989fa; border-bottom: 2px solid #1989fa; }
  }
  &__content { flex: 1; overflow: hidden; }
  &__list { height: 100%; }
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    font-size: 14px;
    color: #323233;
    border-bottom: 1px solid #ebedf0;
    &:active { background: #f7f8fa; }
    &--selected { color: #1989fa; }
  }
  &__check { color: #1989fa; font-weight: bold; }
}

.bw-area-picker-enter-active, .bw-area-picker-leave-active { transition: transform 0.2s; }
.bw-area-picker-enter-from, .bw-area-picker-leave-to { transform: translateY(100%); }
</style>
