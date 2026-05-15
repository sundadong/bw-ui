<template>
  <view class="bw-circle" :style="circleStyle">
    <canvas :canvas-id="canvasId" :id="canvasId" class="bw-circle__canvas"></canvas>
    <view class="bw-circle__text" v-if="showText">
      <slot><text>{{ currentValue }}%</text></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  size: { type: [Number, String], default: 120 },
  fill: { type: String, default: 'none' },
  layerColor: { type: String, default: '#ebedf0' },
  color: { type: [String, Object], default: '#1989fa' },
  strokeWidth: { type: Number, default: 4 },
  clockwise: { type: Boolean, default: true },
  speed: { type: Number, default: 50 },
  showText: { type: Boolean, default: true }
});

const emit = defineEmits(['update:modelValue', 'finish']);

const canvasId = `bw-circle-${Math.random().toString(36).substr(2, 9)}`;
const currentValue = ref(props.modelValue || props.rate);

const circleStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size
}));

const drawCircle = (value) => {
  const ctx = uni.createCanvasContext(canvasId);
  const width = props.size;
  const height = props.size;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = (width - props.strokeWidth) / 2;
  
  ctx.clearRect(0, 0, width, height);
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.setStrokeStyle(props.layerColor);
  ctx.setLineWidth(props.strokeWidth);
  ctx.stroke();
  
  const startAngle = props.clockwise ? -Math.PI / 2 : Math.PI * 1.5;
  const endAngle = startAngle + (2 * Math.PI * value / 100);
  
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  const strokeColor = typeof props.color === 'object' ? props.color[value] || props.color.default || '#1989fa' : props.color;
  ctx.setStrokeStyle(strokeColor);
  ctx.setLineWidth(props.strokeWidth);
  ctx.stroke();
  
  ctx.draw();
};

onMounted(() => {
  if (props.speed === 0) {
    currentValue.value = props.rate || props.modelValue;
    drawCircle(currentValue.value);
  } else {
    const timer = setInterval(() => {
      if (currentValue.value >= (props.rate || props.modelValue)) {
        clearInterval(timer);
        emit('finish');
      } else {
        currentValue.value += 1;
        drawCircle(currentValue.value);
      }
    }, props.speed);
  }
});

watch(() => props.rate, (val) => {
  currentValue.value = val;
  drawCircle(val);
});
</script>

<style scoped lang="scss">
.bw-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &__canvas { position: absolute; top: 0; left: 0; }
  &__text { position: relative; z-index: 1; font-size: 14px; color: #323233; }
}
</style>
