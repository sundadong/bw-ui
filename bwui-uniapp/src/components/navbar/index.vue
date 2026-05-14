<template>
  <view class="bw-navbar" :class="{ 'bw-navbar--fixed': fixed }">
    <view class="bw-navbar__status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
    <view class="bw-navbar__content" :style="{ height: navHeight + 'px' }">
      <view class="bw-navbar__left" @tap="handleBack">
        <view v-if="showBack" class="bw-navbar__arrow">‹</view>
        <slot name="left"></slot>
      </view>
      <view class="bw-navbar__title">
        <slot name="title">
          <text class="bw-navbar__title-text" :class="{ 'bw-navbar__title-text--ellipsis': ellipsis }">{{ title }}</text>
        </slot>
      </view>
      <view class="bw-navbar__right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  title: { type: String, default: '' },
  showBack: { type: Boolean, default: true },
  fixed: { type: Boolean, default: false },
  ellipsis: { type: Boolean, default: true }
});

const emit = defineEmits(['back']);

const statusBarHeight = ref(20);
const navHeight = ref(44);

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 20;
  navHeight.value = 44;
});

const handleBack = () => {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    uni.navigateBack();
  }
  emit('back');
};
</script>

<style scoped lang="scss">
.bw-navbar {
  background: #fff;
  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  &__status-bar { width: 100%; }
  &__content {
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
  &__left {
    display: flex;
    align-items: center;
    min-width: 60px;
  }
  &__arrow {
    font-size: 28px;
    color: #323233;
    font-weight: bold;
  }
  &__title {
    flex: 1;
    text-align: center;
  }
  &__title-text {
    font-size: 16px;
    font-weight: 600;
    color: #323233;
    &--ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  &__right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-width: 60px;
  }
}
</style>
