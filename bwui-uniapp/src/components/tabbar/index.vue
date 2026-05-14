<template>
  <view class="bw-tabbar" :class="{ 'bw-tabbar--fixed': fixed }">
    <view
      v-for="(item, index) in tabs"
      :key="index"
      class="bw-tabbar__item"
      :class="{ 'bw-tabbar__item--active': modelValue === index }"
      @tap="handleClick(index)"
    >
      <view class="bw-tabbar__icon">
        <text v-if="item.icon">{{ item.icon }}</text>
        <image v-else-if="item.image" :src="modelValue === index ? item.selectedImage || item.image : item.image" mode="aspectFit" />
      </view>
      <view class="bw-tabbar__text">{{ item.title }}</view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Number, default: 0 },
  tabs: { type: Array, default: () => [] },
  fixed: { type: Boolean, default: false }
});

const emit = defineEmits(['update:modelValue', 'change']);

const handleClick = (index) => {
  emit('update:modelValue', index);
  emit('change', index);
};
</script>

<style scoped lang="scss">
.bw-tabbar {
  display: flex;
  background: #fff;
  border-top: 1px solid #ebedf0;
  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6px 0;
    &--active {
      .bw-tabbar__text { color: #1989fa; }
    }
  }
  &__icon {
    font-size: 20px;
    margin-bottom: 2px;
    image { width: 24px; height: 24px; }
  }
  &__text {
    font-size: 10px;
    color: #646566;
  }
}
</style>
