<template>
  <demo-layout title="Progress 进度条">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-progress">
        <bw-progress :percentage="50" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">进度值</div>
      <div class="demo-progress">
        <bw-progress :percentage="25" />
        <bw-progress :percentage="50" />
        <bw-progress :percentage="75" />
        <bw-progress :percentage="100" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-progress">
        <bw-progress :percentage="50" color="#1989fa" />
        <bw-progress :percentage="50" color="#07c160" />
        <bw-progress :percentage="50" color="#ff976a" />
        <bw-progress :percentage="50" color="#ee0a24" />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwProgress from '../components/progress/index.vue'
</script>

<style lang="scss" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  .demo-title {
    font-size: 14px;
    color: #969799;
    margin-bottom: 16px;
  }

  .demo-progress {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
