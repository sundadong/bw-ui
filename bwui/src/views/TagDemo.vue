<template>
  <demo-layout title="Tag 标签">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-tag type="primary">标签</bw-tag>
        <bw-tag type="success">标签</bw-tag>
        <bw-tag type="warning">标签</bw-tag>
        <bw-tag type="danger">标签</bw-tag>
        <bw-tag type="default">标签</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">标签大小</div>
      <div class="demo-row">
        <bw-tag type="primary">标签</bw-tag>
        <bw-tag type="primary" size="medium">标签</bw-tag>
        <bw-tag type="primary" size="small">标签</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-tag color="#7232dd">标签</bw-tag>
        <bw-tag color="#ffe1e1" plain>标签</bw-tag>
        <bw-tag color="#7232dd" plain>标签</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">样式风格</div>
      <div class="demo-row">
        <bw-tag type="primary" plain>标签</bw-tag>
        <bw-tag type="success" plain>标签</bw-tag>
        <bw-tag type="warning" plain>标签</bw-tag>
        <bw-tag type="danger" plain>标签</bw-tag>
        <bw-tag type="default" plain>标签</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">圆角样式</div>
      <div class="demo-row">
        <bw-tag type="primary" round>标签</bw-tag>
        <bw-tag type="success" round>标签</bw-tag>
        <bw-tag type="warning" round>标签</bw-tag>
        <bw-tag type="danger" round>标签</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">标记样式</div>
      <div class="demo-row">
        <bw-tag type="primary" mark>标签</bw-tag>
        <bw-tag type="success" mark>标签</bw-tag>
        <bw-tag type="danger" mark>标签</bw-tag>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">可关闭标签</div>
      <div class="demo-row">
        <bw-tag type="primary" closable @close="handleClose">标签</bw-tag>
        <bw-tag type="success" closable @close="handleClose">标签</bw-tag>
        <bw-tag type="warning" closable @close="handleClose">标签</bw-tag>
        <bw-tag type="danger" closable @close="handleClose">标签</bw-tag>
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
    align-items: center;
  }
}
</style>