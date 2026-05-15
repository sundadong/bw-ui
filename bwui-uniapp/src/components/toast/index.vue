<template>
  <view class="bw-toast" :class="{ 'bw-toast--show': show, [`bw-toast--${type}`]: type }">
    <view v-if="icon" class="bw-toast__icon">{{ icon }}</view>
    <view v-else-if="type === 'loading'" class="bw-toast__loading"></view>
    <view class="bw-toast__text">{{ message }}</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: '' },
  icon: { type: String, default: '' },
  duration: { type: Number, default: 2000 },
  position: { type: String, default: 'middle' }
});

const show = ref(false);
let timer = null;

const showToast = (options) => {
  if (timer) clearTimeout(timer);
  show.value = true;
  if (options?.duration !== 0) {
    timer = setTimeout(() => {
      show.value = false;
    }, options?.duration || props.duration);
  }
};

const hideToast = () => {
  if (timer) clearTimeout(timer);
  show.value = false;
};

defineExpose({ show: showToast, hide: hideToast });
</script>

<style scoped lang="scss">
.bw-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  padding: 16px 24px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  z-index: 9999;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 70%;
  &--show { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  &--success { background: rgba(7, 193, 96, 0.9); }
  &--fail { background: rgba(238, 10, 36, 0.9); }
  &--warn { background: rgba(255, 145, 0, 0.9); }
  &__loading {
    width: 36px;
    height: 36px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 8px;
  }
  &__icon { font-size: 48px; margin-bottom: 8px; }
  &__text { font-size: 14px; color: #fff; text-align: center; }
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
