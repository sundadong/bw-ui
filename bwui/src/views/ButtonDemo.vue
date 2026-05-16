<template>
  <demo-layout title="Button 按钮">
    <div class="demo-block">
      <div class="demo-title">按钮类型</div>
      <div class="demo-row">
        <bw-button type="primary">主要按钮</bw-button>
        <bw-button type="success">成功按钮</bw-button>
        <bw-button type="warning">警告按钮</bw-button>
        <bw-button type="danger">危险按钮</bw-button>
        <bw-button type="default">默认按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">按钮尺寸</div>
      <div class="demo-row">
        <bw-button size="small">小按钮</bw-button>
        <bw-button size="medium">中按钮</bw-button>
        <bw-button size="large">大按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">朴素按钮</div>
      <div class="demo-row">
        <bw-button type="primary" plain>主要按钮</bw-button>
        <bw-button type="success" plain>成功按钮</bw-button>
        <bw-button type="warning" plain>警告按钮</bw-button>
        <bw-button type="danger" plain>危险按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">圆角按钮</div>
      <div class="demo-row">
        <bw-button type="primary" round>主要按钮</bw-button>
        <bw-button type="success" round>成功按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <div class="demo-row">
        <bw-button type="primary" disabled>禁用按钮</bw-button>
        <bw-button type="default" disabled>禁用按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">加载状态</div>
      <div class="demo-row">
        <bw-button type="primary" loading>加载中</bw-button>
        <bw-button type="default" loading>加载中</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">块级按钮</div>
      <div class="demo-block-row">
        <bw-button type="primary" block>主要按钮</bw-button>
      </div>
      <div class="demo-block-row">
        <bw-button type="success" block>成功按钮</bw-button>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
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
    gap: 12px;
  }

  .demo-block-row {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
