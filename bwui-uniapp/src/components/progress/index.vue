<template>
  <view class="bw-progress">
    <view class="bw-progress__track">
      <view
        class="bw-progress__bar"
        :class="`bw-progress__bar--${status}`"
        :style="{ width: percentage + '%', background: showPivot ? '' : color }"
      >
        <view v-if="showPivot && pivotText" class="bw-progress__pivot" :style="{ background: color }">
          {{ pivotText }}
        </view>
      </view>
    </view>
    <view v-if="showPivot && !pivotText && percentage > 0" class="bw-progress__pivot" :style="{ left: percentage + '%', background: color }">
      {{ percentage }}%
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  percentage: { type: Number, default: 0 },
  color: { type: String, default: '#1989fa' },
  trackColor: { type: String, default: '#ebedf0' },
  strokeWidth: { type: [Number, String], default: 4 },
  showPivot: { type: Boolean, default: false },
  pivotText: { type: String, default: '' },
  status: { type: String, default: '' }
});

const pivotText = computed(() => {
  if (props.pivotText) return props.pivotText;
  return '';
});
</script>

<style scoped lang="scss">
.bw-progress {
  position: relative;
  display: flex;
  align-items: center;

  &__track {
    flex: 1;
    height: 4px;
    background: #ebedf0;
    border-radius: 999px;
    overflow: visible;
  }

  &__bar {
    height: 4px;
    border-radius: 999px;
    transition: width 0.3s;

    &--success { background: #07c160; }
    &--warning { background: #ff976a; }
    &--error { background: #ee0a24; }
  }

  &__pivot {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 2px 6px;
    font-size: 10px;
    color: #fff;
    border-radius: 999px;
    white-space: nowrap;
  }
}
</style>
