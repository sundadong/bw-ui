<template>
  <view
    v-if="visible"
    class="bw-notify"
    :class="`bw-notify--${type}`"
    :style="notifyStyle"
  >
    <text>{{ message }}</text>
  </view>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, watch, onUnmounted } from 'vue';

export interface NotifyProps {
  message: string;
  type?: 'primary' | 'info' | 'success' | 'danger';
  duration?: number;
  top?: number;
}

const props = withDefaults(defineProps<NotifyProps>(), {
  type: 'info',
  duration: 3000,
  top: 0,
});

const visible = ref(false);
let timer: ReturnType<typeof setTimeout> | null = null;

const notifyStyle = computed(() => ({
  top: `${props.top}px`,
}));

const show = () => {
  visible.value = true;
  if (props.duration > 0) {
    timer = setTimeout(() => {
      visible.value = false;
    }, props.duration);
  }
};

const hide = () => {
  visible.value = false;
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

watch(
  () => props.message,
  () => {
    hide();
    setTimeout(() => {
      show();
    }, 100);
  },
  { immediate: true }
);

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer);
  }
});

defineExpose({
  show,
  hide,
});
</script>

<style lang="scss" scoped>
.bw-notify {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 44px;
  padding: $padding-xs $padding-md;
  font-size: $font-size-sm;
  color: #ffffff;
  line-height: 1.5;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  transform: translateY(-100%);
  transition: transform $animation-duration-normal;

  &--primary {
    background-color: lighten($primary-color, 10%);
  }

  &--info {
    background-color: lighten($info-color, 10%);
  }

  &--success {
    background-color: lighten($success-color, 10%);
  }

  &--danger {
    background-color: lighten($danger-color, 10%);
  }
}
</style>
