<template>
  <demo-layout title="Tag 标签">
    <div class="demo-block">
      <div class="demo-title">标签类型</div>
      <div class="demo-row">
        <bw-tag type="primary">标签</bw-tag>
        <bw-tag type="success">成功</bw-tag>
        <bw-tag type="warning">警告</bw-tag>
        <bw-tag type="danger">危险</bw-tag>
        <bw-tag type="default">默认</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">朴素标签</div>
      <div class="demo-row">
        <bw-tag type="primary" plain>标签</bw-tag>
        <bw-tag type="success" plain>成功</bw-tag>
        <bw-tag type="warning" plain>警告</bw-tag>
        <bw-tag type="danger" plain>危险</bw-tag>
        <bw-tag type="default" plain>默认</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">圆角标签</div>
      <div class="demo-row">
        <bw-tag type="primary" round>标签</bw-tag>
        <bw-tag type="success" round>成功</bw-tag>
        <bw-tag type="warning" round>警告</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">标记</div>
      <div class="demo-row">
        <bw-tag type="primary" mark>标签</bw-tag>
        <bw-tag type="success" mark>成功</bw-tag>
        <bw-tag type="danger" mark>危险</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">可关闭</div>
      <div class="demo-row">
        <bw-tag type="primary" closable @close="handleClose">标签</bw-tag>
        <bw-tag type="success" closable @close="handleClose">成功</bw-tag>
        <bw-tag type="default" closable @close="handleClose">默认</bw-tag>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwTag from '../components/tag/index.vue'

const handleClose = () => {
  console.log('Tag closed')
}
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
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>
