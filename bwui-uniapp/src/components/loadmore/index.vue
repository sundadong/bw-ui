<template>
  <view class="bw-loadmore">
    <view v-if="loading" class="bw-loadmore__loading">
      <view class="bw-loadmore__spinner"></view>
      <text class="bw-loadmore__text">{{ loadingText }}</text>
    </view>
    <view v-else-if="finished" class="bw-loadmore__finished">
      <text class="bw-loadmore__line"></text>
      <text class="bw-loadmore__text">{{ finishedText }}</text>
      <text class="bw-loadmore__line"></text>
    </view>
    <view v-else class="bw-loadmore__nodata" @tap="handleClick">
      <text class="bw-loadmore__text">{{ error ? errorText : statusText }}</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  finished: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  loadingText: { type: String, default: '加载中...' },
  finishedText: { type: String, default: '没有更多了' },
  errorText: { type: String, default: '加载失败，点击重试' },
  statusText: { type: String, default: '加载更多' }
});
const emit = defineEmits(['load', 'click']);
const handleClick = () => emit('click');
</script>

<style scoped lang="scss">
.bw-loadmore {
  padding: 16px;
  text-align: center;
  &__loading { display: flex; align-items: center; justify-content: center; }
  &__spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #ebedf0;
    border-top-color: #1989fa;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
  }
  &__text { font-size: 12px; color: #969799; }
  &__finished { display: flex; align-items: center; justify-content: center; }
  &__line { flex: 1; height: 1px; background: #ebedf0; margin: 0 12px; }
  &__nodata { cursor: pointer; }
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
