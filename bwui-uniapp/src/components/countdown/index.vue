<template>
  <view class="bw-countdown">
    <view v-if="showDays" class="bw-countdown__item"><text class="bw-countdown__time">{{ days }}</text></view>
    <text v-if="showDays" class="bw-countdown__sep">:</text>
    <view class="bw-countdown__item"><text class="bw-countdown__time">{{ hours }}</text></view>
    <text class="bw-countdown__sep">:</text>
    <view class="bw-countdown__item"><text class="bw-countdown__time">{{ minutes }}</text></view>
    <text class="bw-countdown__sep">:</text>
    <view class="bw-countdown__item"><text class="bw-countdown__time">{{ seconds }}</text></view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
const props = defineProps({
  time: { type: [Number, String], default: 0 },
  showDays: { type: Boolean, default: false },
  autoStart: { type: Boolean, default: true }
});
const emit = defineEmits(['finish', 'change']);
const remaining = ref(0);
let timer = null;
const totalSeconds = computed(() => Math.floor(remaining.value / 1000));
const days = computed(() => String(Math.floor(totalSeconds.value / 86400)).padStart(2, '0'));
const hours = computed(() => String(Math.floor((totalSeconds.value % 86400) / 3600)).padStart(2, '0'));
const minutes = computed(() => String(Math.floor((totalSeconds.value % 3600) / 60)).padStart(2, '0'));
const seconds = computed(() => String(totalSeconds.value % 60).padStart(2, '0'));
const stopTimer = () => { if (timer) { clearInterval(timer); timer = null; } };
const startTimer = () => {
  stopTimer();
  if (remaining.value <= 0) return;
  timer = setInterval(() => {
    remaining.value -= 1000;
    emit('change', remaining.value);
    if (remaining.value <= 0) {
      remaining.value = 0;
      stopTimer();
      emit('finish');
    }
  }, 1000);
};
watch(() => props.time, (val) => {
  remaining.value = Number(val);
  if (props.autoStart && remaining.value > 0) startTimer();
}, { immediate: true });
onMounted(() => { if (props.autoStart && remaining.value > 0) startTimer(); });
onUnmounted(() => stopTimer());
</script>

<style scoped lang="scss">
.bw-countdown {
  display: inline-flex;
  align-items: center;
  &__time {
    display: inline-block;
    min-width: 22px;
    padding: 2px 4px;
    background: #323233;
    color: #fff;
    font-size: 12px;
    text-align: center;
    border-radius: 4px;
  }
  &__sep { margin: 0 2px; font-weight: 600; }
}
</style>
