<template>
  <view class="page">
    <view class="section">
      <view class="section__title">居中弹出</view>
      <view class="section__content">
        <Button type="primary" @click="showPopup('center')">显示 Popup</Button>
      </view>
    </view>

    <view class="section">
      <view class="section__title">底部弹出</view>
      <view class="section__content">
        <Button @click="showPopup('bottom')">底部弹出</Button>
      </view>
    </view>

    <Popup :show="show" :position="position" @update:show="show = $event" @close="show = false">
      <view class="popup-content">
        <view class="popup-content__title">标题</view>
        <view class="popup-content__body">这里是弹出内容</view>
      </view>
    </Popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/basic/button/index.vue';
import Popup from '@/components/feedback/popup/index.vue';

const show = ref(false);
const position = ref<'center' | 'top' | 'bottom' | 'left' | 'right'>('center');

const showPopup = (pos: 'center' | 'top' | 'bottom' | 'left' | 'right') => {
  position.value = pos;
  show.value = true;
};
</script>

<style lang="scss" scoped>
.page {
  padding: 16px;
}

.section {
  margin-bottom: 24px;

  &__title {
    font-size: 14px;
    color: #969799;
    margin-bottom: 12px;
  }

  &__content {
    display: flex;
    gap: 12px;
  }
}

.popup-content {
  padding: 20px;
  min-width: 200px;

  &__title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__body {
    font-size: 14px;
    color: #646566;
  }
}
</style>
