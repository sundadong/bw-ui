<template>
  <demo-layout title="Empty 空状态">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-empty description="暂无数据" />
    </div>

    <div class="demo-block">
      <div class="demo-title">图片类型</div>
      <bw-empty type="error" description="加载失败" />
      <bw-empty type="network" description="网络异常" />
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义图片</div>
      <bw-empty image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png" description="自定义图片" />
    </div>

    <div class="demo-block">
      <div class="demo-title">底部内容</div>
      <bw-empty description="暂无数据">
        <bw-button type="primary">按钮</bw-button>
      </bw-empty>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwEmpty from '../components/empty/index.vue'
import BwButton from '../components/button/index.vue'
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