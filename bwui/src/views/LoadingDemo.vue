<template>
  <demo-layout title="Loading 加载">
    <div class="demo-block">
      <div class="demo-title">加载类型</div>
      <div class="demo-row">
        <bw-loading type="circular"></bw-loading>
        <bw-loading type="spinner"></bw-loading>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-loading type="circular" color="#1989fa"></bw-loading>
        <bw-loading type="circular" color="#07c160"></bw-loading>
        <bw-loading type="circular" color="#ff976a"></bw-loading>
        <bw-loading type="circular" color="#ee0a24"></bw-loading>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">加载尺寸</div>
      <div class="demo-row">
        <bw-loading type="circular" size="20px"></bw-loading>
        <bw-loading type="circular" size="30px"></bw-loading>
        <bw-loading type="circular" size="40px"></bw-loading>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">加载文字</div>
      <div class="demo-row">
        <bw-loading>加载中...</bw-loading>
        <bw-loading vertical>加载中...</bw-loading>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义尺寸类型组合</div>
      <div class="demo-row">
        <bw-loading type="spinner" size="30px" color="#1989fa">加载中</bw-loading>
        <bw-loading type="spinner" size="40px" vertical>加载中</bw-loading>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwLoading from '../components/loading/index.vue'
</script>

<style lang="less" scoped>
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
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
  }
}
</style>
