<template>
  <view class="bw-notice-bar" :class="[`bw-notice-bar--${type}`]" @tap="handleClick">
    <view class="bw-notice-bar__left-icon">{{ type === 'warning' ? '⚠' : 'ℹ' }}</view>
    <view class="bw-notice-bar__content">
      <view class="bw-notice-bar__wrapper" :class="{ 'bw-notice-bar__wrapper--scroll': scrollable && !paused }" :style="{ animationDuration: duration + 's' }">
        <text class="bw-notice-bar__text">{{ text }}</text>
      </view>
    </view>
    <view v-if="closable" class="bw-notice-bar__right-icon" @tap.stop="handleClose">✕</view>
  </view>
</template>

<script setup>
const props = defineProps({
  text: { type: String, default: '' },
  mode: { type: String, default: '' },
  type: { type: String, default: 'primary' },
  closable: { type: Boolean, default: false },
  scrollable: { type: Boolean, default: true },
  delay: { type: Number, default: 0 },
  speed: { type: Number, default: 60 }
});

const emit = defineEmits(['close', 'click']);

const paused = ref(false);

const duration = computed(() => {
  return props.text.length * (60 / props.speed);
});

const handleClick = () => { emit('click'); };
const handleClose = () => { emit('close'); };
</script>

<script>
import { ref, computed } from 'vue';
export default { name: 'BwNoticeBar' }
</script>

<style scoped lang="scss">
.bw-notice-bar {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: #fef0ec;
  &--primary { background: #e6f4ff; color: #1989fa; }
  &--success { background: #f6ffed; color: #07c160; }
  &--warning { background: #fff7e6; color: #faad14; }
  &--danger { background: #fff2f0; color: #ff4d4f; }
  &__left-icon { font-size: 16px; margin-right: 8px; }
  &__content { flex: 1; overflow: hidden; }
  &__wrapper { display: flex; white-space: nowrap; }
  &__wrapper--scroll { animation: notice-scroll linear infinite; }
  &__text { font-size: 14px; }
  &__right-icon { font-size: 14px; margin-left: 8px; cursor: pointer; }
}

@keyframes notice-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
</style>
