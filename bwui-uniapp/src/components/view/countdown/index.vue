<template>
  <view class="bw-countdown">
    <view v-if="showDay && days > 0" class="bw-countdown__item">
      <view class="bw-countdown__digit">{{ formatTime(days) }}</view>
      <view v-if="showColon" class="bw-countdown__colon">:</view>
    </view>
    <view class="bw-countdown__item">
      <view class="bw-countdown__digit">{{ formatTime(hours) }}</view>
      <view v-if="showColon" class="bw-countdown__colon">:</view>
    </view>
    <view class="bw-countdown__item">
      <view class="bw-countdown__digit">{{ formatTime(minutes) }}</view>
      <view v-if="showColon" class="bw-countdown__colon">:</view>
    </view>
    <view class="bw-countdown__item">
      <view class="bw-countdown__digit">{{ formatTime(seconds) }}</view>
    </view>
    <view v-if="showMillisecond" class="bw-countdown__item">
      <view class="bw-countdown__digit bw-countdown__millisecond">{{ milliseconds }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, onMounted, onUnmounted } from 'vue';

export interface CountdownProps {
  time: number;
  showDay?: boolean;
  showColon?: boolean;
  showMillisecond?: boolean;
  autoStart?: boolean;
}

const props = withDefaults(defineProps<CountdownProps>(), {
  showDay: false,
  showColon: true,
  showMillisecond: false,
  autoStart: true,
});

const emit = defineEmits<{
  finish: [];
  change: [time: number];
}>();

const remainingTime = ref(props.time);
let timer: ReturnType<typeof setInterval> | null = null;

const days = computed(() => Math.floor(remainingTime.value / (1000 * 60 * 60 * 24)));
const hours = computed(() => Math.floor((remainingTime.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
const minutes = computed(() => Math.floor((remainingTime.value % (1000 * 60 * 60)) / (1000 * 60)));
const seconds = computed(() => Math.floor((remainingTime.value % (1000 * 60)) / 1000));
const milliseconds = computed(() => Math.floor((remainingTime.value % 1000) / 100));

const formatTime = (value: number): string => {
  return String(value).padStart(2, '0');
};

const start = () => {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value -= props.showMillisecond ? 100 : 1000;
      if (remainingTime.value < 0) {
        remainingTime.value = 0;
      }
      emit('change', remainingTime.value);
    } else {
      clearInterval(timer!);
      timer = null;
      emit('finish');
    }
  }, props.showMillisecond ? 100 : 1000);
};

const stop = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

const reset = () => {
  stop();
  remainingTime.value = props.time;
};

onMounted(() => {
  if (props.autoStart && remainingTime.value > 0) {
    start();
  }
});

onUnmounted(() => {
  stop();
});

defineExpose({
  start,
  stop,
  reset,
});
</script>

<style lang="scss" scoped>
.bw-countdown {
  display: inline-flex;
  align-items: center;

  &__item {
    display: flex;
    align-items: center;
  }

  &__digit {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    font-size: $font-size-sm;
    color: $text-color;
    background-color: #f7f8fa;
    border-radius: $border-radius-sm;
  }

  &__millisecond {
    min-width: 16px;
    font-size: $font-size-xs;
  }

  &__colon {
    margin: 0 2px;
    font-size: $font-size-sm;
    color: $text-color;
  }
}
</style>
