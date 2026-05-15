<template>
  <view class="bw-image" :class="{ 'bw-image--round': round }" :style="imageStyle" @tap="handleClick">
    <image v-if="src && !loadError" :src="src" :mode="mode" :lazy-load="lazyLoad" class="bw-image__img" @load="handleLoad" @error="handleError" />
    <view v-else class="bw-image__error">
      <text v-if="!src">占位图</text>
      <text v-else>加载失败</text>
    </view>
    <view v-if="loading && src && !loadError" class="bw-image__loading">加载中...</view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  src: { type: String, default: '' },
  mode: { type: String, default: 'scaleToFill' },
  width: { type: [Number, String], default: '100%' },
  height: { type: [Number, String], default: '225px' },
  round: { type: Boolean, default: false },
  lazyLoad: { type: Boolean, default: true },
  showError: { type: Boolean, default: true }
});

const emit = defineEmits(['click', 'load', 'error']);

const loadError = ref(false);
const loading = ref(false);

const imageStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height
}));

const handleClick = () => { emit('click'); };
const handleLoad = (e) => {
  loading.value = false;
  loadError.value = false;
  emit('load', e);
};
const handleError = (e) => {
  loading.value = false;
  loadError.value = true;
  emit('error', e);
};
</script>

<style scoped lang="scss">
.bw-image {
  position: relative;
  overflow: hidden;
  background: #f7f8fa;
  &--round { border-radius: 50%; }
  &__img { width: 100%; height: 100%; }
  &__error, &__loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #c8c9cc;
  }
  &__error { background: #f7f8fa; }
  &__loading { background: rgba(0, 0, 0, 0.3); color: #fff; }
}
</style>
