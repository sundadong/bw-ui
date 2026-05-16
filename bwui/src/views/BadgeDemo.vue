<template>
  <demo-layout title="Badge 徽标">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-badge content="5">
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge content="99">
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge content="99+">
          <div class="demo-target"></div>
        </bw-badge>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">小红点</div>
      <div class="demo-row">
        <bw-badge dot>
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge dot>
          <div class="demo-target"></div>
        </bw-badge>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwBadge from '../components/badge/index.vue'
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

  .demo-row {
    display: flex;
    gap: 24px;
  }

  .demo-target {
    width: 44px;
    height: 44px;
    background-color: #f7f8fa;
    border-radius: 6px;
  }
}
</style>
