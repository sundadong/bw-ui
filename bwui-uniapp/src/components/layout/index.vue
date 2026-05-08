<template>
  <view class="bw-layout"><slot></slot></view>
</template>

<script setup>
defineProps({ gutter: { type: [Number, String], default: 0 } });
</script>

<style scoped lang="scss">
.bw-layout { display: flex; flex-wrap: wrap; width: 100%; }
</style>
