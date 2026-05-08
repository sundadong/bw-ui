<template>
  <view class="bw-col" :style="colStyle"><slot></slot></view>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  span: { type: [Number, String], default: 12 },
  offset: { type: [Number, String], default: 0 }
});
const colStyle = computed(() => ({
  width: `${(props.span / 24) * 100}%`,
  marginLeft: `${(props.offset / 24) * 100}%`,
  boxSizing: 'border-box'
}));
</script>

<style scoped lang="scss">
.bw-col { display: block; }
</style>
