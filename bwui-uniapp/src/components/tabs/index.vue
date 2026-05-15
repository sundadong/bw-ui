<template>
  <view class="bw-tabs">
    <view class="bw-tabs__wrap">
      <scroll-view scroll-x class="bw-tabs__scroll">
        <view class="bw-tabs__nav" :class="{ 'bw-tabs__nav--line': type === 'line', 'bw-tabs__nav--card': type === 'card' }">
          <view
            v-for="(tab, index) in tabs"
            :key="index"
            class="bw-tabs__tab"
            :class="{
              'bw-tabs__tab--active': index === modelValue,
              'bw-tabs__tab--disabled': tab.disabled
            }"
            @tap="handleClick(index)"
          >
            <text>{{ tab.title }}</text>
          </view>
          <view v-if="type === 'line'" class="bw-tabs__line" :style="lineStyle"></view>
        </view>
      </scroll-view>
    </view>
    <view class="bw-tabs__content">
      <slot :name="`tab${modelValue}`"></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  tabs: { type: Array, default: () => [] },
  type: { type: String, default: 'line' },
  duration: { type: Number, default: 300 }
});

const emit = defineEmits(['update:modelValue', 'change', 'click']);

const currentIndex = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  currentIndex.value = val;
});

const lineStyle = computed(() => ({
  width: `${100 / props.tabs.length}%`,
  transform: `translateX(${currentIndex.value * 100}%)`
}));

const handleClick = (index) => {
  if (props.tabs[index]?.disabled) return;
  currentIndex.value = index;
  emit('update:modelValue', index);
  emit('change', index);
  emit('click', index);
};
</script>

<style scoped lang="scss">
.bw-tabs {
  &__wrap {
    background: #fff;
    border-bottom: 1px solid #ebedf0;
  }
  
  &__scroll { width: 100%; }
  
  &__nav {
    position: relative;
    display: flex;
    
    &--line {
      .bw-tabs__tab {
        flex: 1;
        justify-content: center;
        padding: 12px 16px;
        font-size: 14px;
        color: #646566;
        background: #fff;
        &--active { color: #1989fa; }
        &--disabled { color: #c8c9cc; cursor: not-allowed; }
      }
    }
    
    &--card {
      padding: 0 16px;
      .bw-tabs__tab {
        padding: 8px 12px;
        font-size: 14px;
        color: #646566;
        background: #f7f8fa;
        margin-right: 8px;
        border-radius: 4px 4px 0 0;
        &--active { color: #1989fa; background: #fff; }
        &--disabled { color: #c8c9cc; cursor: not-allowed; }
      }
    }
  }
  
  &__tab {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  &__line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: #1989fa;
    transition: transform 0.3s;
  }
  
  &__content {
    padding: 16px;
    background: #fff;
  }
}
</style>
