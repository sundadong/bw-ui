<template>
  <view class="bw-sticky" :style="containerStyle">
    <slot></slot>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  offsetTop: { type: Number, default: 0 },
  zIndex: { type: Number, default: 99 }
});

const isSticky = ref(false);
const containerStyle = ref({});
let scrollHandler = null;

onMounted(() => {
  scrollHandler = () => {
    const rect = uni.createSelectorQuery().in(getCurrentInstance()).select('.bw-sticky').boundingClientRect();
    if (rect) {
      const top = rect.top;
      isSticky.value = top <= props.offsetTop;
      if (isSticky.value) {
        containerStyle.value = {
          position: 'fixed',
          top: props.offsetTop + 'px',
          left: '0',
          right: '0',
          zIndex: props.zIndex
        };
      } else {
        containerStyle.value = {};
      }
    }
  };
  
  uni.onPageScroll(scrollHandler);
});

onUnmounted(() => {
  if (scrollHandler) {
    uni.offPageScroll(scrollHandler);
  }
});
</script>

<script>
import { getCurrentInstance } from 'vue';
export default { name: 'BwSticky' }
</script>

<style scoped lang="scss">
.bw-sticky { transition: all 0.3s; }
</style>
