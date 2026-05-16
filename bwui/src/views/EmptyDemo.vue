<template>
  <demo-layout title="Empty 空状态">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-empty description="暂无数据" />
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义描述</div>
      <bw-empty description="这里空空如也" />
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwEmpty from '../components/empty/index.vue'
</script>

<style lang="scss" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 24px 16px;
  margin-bottom: 16px;

  .demo-title {
    font-size: 14px;
    color: #969799;
    margin-bottom: 16px;
  }
}
</style>
