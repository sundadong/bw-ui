<template>
  <transition name="bw-notify">
    <view v-if="modelValue" class="bw-notify" :class="`bw-notify--${type}`">
      <text>{{ message }}</text>
    </view>
  </transition>
</template>

<script setup>
import { watch } from 'vue';
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  message: { type: String, default: '' },
  type: { type: String, default: 'primary' },
  duration: { type: Number, default: 3000 }
});
const emit = defineEmits(['update:modelValue']);
const visible = defineModel();
watch(visible, (val) => {
  if (val && props.duration > 0) {
    setTimeout(() => { visible.value = false; }, props.duration);
  }
});
</script>

<style scoped lang="scss">
.bw-notify {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  color: #fff;
  z-index: 9999;
  &--primary { background: #1989fa; }
  &--success { background: #07c160; }
  &--warning { background: #ff976a; }
  &--danger { background: #ee0a24; }
}
.bw-notify-enter-active, .bw-notify-leave-active { transition: all 0.3s ease; }
.bw-notify-enter-from, .bw-notify-leave-to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
</style>
