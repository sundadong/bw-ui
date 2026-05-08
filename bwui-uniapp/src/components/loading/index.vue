<template>
  <view v-if="show" class="bw-loading">
    <view class="bw-loading__spinner">
      <view v-for="i in 12" :key="i" class="bw-loading__dot"></view>
    </view>
    <text v-if="text" class="bw-loading__text">{{ text }}</text>
  </view>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: true },
  text: { type: String, default: '' }
});
</script>

<style scoped lang="scss">
.bw-loading {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__spinner {
    width: 36px;
    height: 36px;
    position: relative;
  }

  &__dot {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    &::before {
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      margin: 0 auto;
      background: #999;
      border-radius: 50%;
      animation: loadDot 1.2s ease-in-out infinite;
    }
    @for $i from 1 through 12 {
      &:nth-child(#{$i}) {
        transform: rotate($i * 30deg);
        &::before { animation-delay: $i * 0.1s; }
      }
    }
  }

  &__text {
    margin-top: 8px;
    font-size: 12px;
    color: #999;
  }
}

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes loadDot {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}
</style>
