<template>
  <div class="bw-progress">
    <div class="bw-progress__outer">
      <div 
        class="bw-progress__inner" 
        :style="innerStyle"
      ></div>
      <div 
        v-if="showPivot" 
        class="bw-progress__pivot" 
        :style="pivotStyle"
      >
        {{ displayText }}
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

const safePercentage = computed(() => {
  let percentage = props.percentage
  percentage = Math.max(0, Math.min(100, percentage))
  return percentage
})

const displayText = computed(() => {
  return props.pivotText || `${safePercentage.value}%`
})

const innerStyle = computed(() => {
  return {
    width: `${safePercentage.value}%`,
    backgroundColor: props.color
  }
})

const pivotStyle = computed(() => {
  return {
    left: `${safePercentage.value}%`,
    backgroundColor: props.color
  }
})
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.bw-progress {
  width: 100%;
  display: flex;
  align-items: center;

  &__outer {
    position: relative;
    flex: 1;
    height: $bw-progress-height;
    background-color: v-bind('trackColor');
    border-radius: $bw-border-radius-round;
    overflow: visible;
  }

  &__inner {
    position: relative;
    height: 100%;
    background-color: $bw-primary-color;
    border-radius: inherit;
    transition: width $bw-animation-duration-base $bw-animation-timing-function-base;
  }

  &__pivot {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    min-width: 36px;
    padding: 0 6px;
    font-size: $bw-font-size-xs;
    line-height: 1.5;
    color: $bw-white;
    text-align: center;
    background-color: $bw-primary-color;
    border-radius: $bw-border-radius-round;
    white-space: nowrap;
  }
}
</style>
