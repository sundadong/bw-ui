<template>
  <view class="bw-tabs">
    <view class="bw-tabs__nav">
      <view v-for="(tab, index) in tabs" :key="index" class="bw-tabs__tab" :class="{ active: index === currentIndex }" @tap="handleTabClick(index)">
        {{ tab.title }}
      </view>
      <view class="bw-tabs__line" :style="lineStyle"></view>
    </view>
    <view class="bw-tabs__content"><slot></slot></view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  tabs: { type: Array, default: () => [] }
});
const emit = defineEmits(['update:modelValue', 'change']);
const currentIndex = defineModel();
const lineStyle = computed(() => ({
  width: `${100 / props.tabs.length}%`,
  transform: `translateX(${currentIndex.value * 100}%)`
}));
const handleTabClick = (index) => {
  currentIndex.value = index;
  emit('change', index);
};
</script>

<style scoped lang="scss">
.bw-tabs {
  &__nav { display: flex; position: relative; background: #fff; border-bottom: 1px solid #ebedf0; }
  &__tab {
    flex: 1;
    text-align: center;
    padding: 12px 0;
    font-size: 14px;
    color: #646566;
    transition: color 0.3s;
    &.active { color: #1989fa; font-weight: 600; }
  }
  &__line {
    position: absolute;
    bottom: 0;
    height: 3px;
    background: #1989fa;
    transition: transform 0.3s;
  }
  &__content { padding: 16px; }
}
</style>
