<template>
  <teleport to="body">
    <transition name="bw-notify">
      <view v-if="visible" class="bw-notify" :class="`bw-notify--${type}`">
        <text>{{ message }}</text>
      </view>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  message: { type: String, default: '' },
  type: { type: String, default: 'primary' },
  duration: { type: Number, default: 3000 },
  show: Boolean
});
const visible = defineModel();
watch(() => props.show, (val) => {
  visible.value = val;
  if (val && props.duration > 0) {
    setTimeout(() => { visible.value = false; }, props.duration);
  }
}, { immediate: true });
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
