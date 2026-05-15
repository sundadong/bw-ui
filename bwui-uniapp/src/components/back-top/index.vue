<template>
  <view v-if="show" class="bw-back-top" :style="backTopStyle" @tap="handleClick">
    <text>↑</text>
  </view>
</template>

<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  duration: { type: Number, default: 300 },
  right: { type: Number, default: 16 },
  bottom: { type: Number, default: 100 }
});

const emit = defineEmits(['click']);

const backTopStyle = {
  right: `${props.right}px`,
  bottom: `${props.bottom}px`
};

const handleClick = () => {
  uni.pageScrollTo({ scrollTop: 0, duration: props.duration });
  emit('click');
};
</script>

<style scoped lang="scss">
.bw-back-top {
  position: fixed;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  z-index: 99;
  cursor: pointer;
  &:active { background: rgba(0, 0, 0, 0.8); }
}
</style>
