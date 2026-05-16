<template>
  <div class="bw-progress">
    <div class="bw-progress__portion">
      <div class="bw-progress__pivot" v-if="showPivot" :style="pivotStyle">
        {{ pivotText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ProgressProps {
  percentage?: number
  color?: string
  trackColor?: string
  strokeWidth?: number | string
  pivotText?: string
  showPivot?: boolean
}

const props = withDefaults(defineProps<ProgressProps>(), {
  percentage: 0,
  color: '#1989fa',
  trackColor: '#ebedf0',
  strokeWidth: 4,
  pivotText: '',
  showPivot: false
})

const pivotStyle = computed(() => {
  return {
    backgroundColor: props.color,
    width: `${props.percentage}%`
  }
})
</script>

<style lang="scss">
.bw-progress {
  width: 100%;

  &__portion {
    position: relative;
    height: 4px;
    background-color: #ebedf0;
    border-radius: 999px;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: v-bind('percentage + "%"');
      background-color: v-bind('color');
      border-radius: inherit;
      transition: width 0.3s ease;
    }
  }

  &__pivot {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 5px;
    font-size: 10px;
    line-height: 1.5;
    color: #fff;
    background-color: #1989fa;
    border-radius: 999px;
    white-space: nowrap;
  }
}
</style>
