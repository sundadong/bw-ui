<template>
  <demo-layout title="Badge 徽标">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-badge content="5">
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge content="10">
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge content="hot">
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge dot>
          <div class="demo-target"></div>
        </bw-badge>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">最大值</div>
      <div class="demo-row">
        <bw-badge :content="20" :max="9">
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge :content="50" :max="20">
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge :content="200" :max="99">
          <div class="demo-target"></div>
        </bw-badge>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-badge content="5" color="#1989fa">
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge content="10" color="#07c160">
          <div class="demo-target"></div>
        </bw-badge>
        <bw-badge dot color="#ff976a">
          <div class="demo-target"></div>
        </bw-badge>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">独立展示</div>
      <div class="demo-row">
        <bw-badge content="99+" />
        <bw-badge content="200" :max="99" />
        <bw-badge content="hot" color="#07c160" />
        <bw-badge dot />
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
    align-items: center;
  }

  .demo-target {
    width: 44px;
    height: 44px;
    background-color: #f7f8fa;
    border-radius: 6px;
  }
}
</style>