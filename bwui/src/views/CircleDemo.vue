<template>
  <demo-layout title="Circle 环形进度条">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-circle :model-value="50" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">不同进度</div>
      <div class="demo-row">
        <bw-circle :model-value="0" />
        <bw-circle :model-value="25" />
        <bw-circle :model-value="50" />
        <bw-circle :model-value="75" />
        <bw-circle :model-value="100" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义大小</div>
      <div class="demo-row">
        <bw-circle :model-value="50" :size="80" />
        <bw-circle :model-value="50" :size="120" />
        <bw-circle :model-value="50" :size="150" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-circle :model-value="50" color="#1989fa" />
        <bw-circle :model-value="50" color="#07c160" />
        <bw-circle :model-value="50" color="#ff976a" />
        <bw-circle :model-value="50" color="#ee0a24" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">渐变颜色</div>
      <div class="demo-row">
        <bw-circle
          :model-value="50"
          :color="{ '25': '#1989fa', '50': '#07c160', '75': '#ff976a', '100': '#ee0a24', default: '#1989fa' }"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义线条宽度</div>
      <div class="demo-row">
        <bw-circle :model-value="50" :stroke-width="2" />
        <bw-circle :model-value="50" :stroke-width="6" />
        <bw-circle :model-value="50" :stroke-width="10" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义文字</div>
      <div class="demo-row">
        <bw-circle :model-value="75" text="已完成" />
        <bw-circle :model-value="75">
          <span style="font-size: 12px; color: #1989fa">自定义</span>
        </bw-circle>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">逆时针</div>
      <div class="demo-row">
        <bw-circle :model-value="50" :clockwise="false" />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwCircle from '../components/circle/index.vue'
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
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>