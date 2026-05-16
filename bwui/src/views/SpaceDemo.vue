<template>
  <demo-layout title="Space 间距">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-space>
        <bw-button type="primary">按钮</bw-button>
        <bw-button type="primary">按钮</bw-button>
        <bw-button type="primary">按钮</bw-button>
      </bw-space>
    </div>

    <div class="demo-block">
      <div class="demo-title">间距大小</div>
      <div class="demo-row">
        <bw-space size="small">
          <bw-button type="primary">小</bw-button>
          <bw-button type="primary">小</bw-button>
        </bw-space>
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <bw-space size="medium">
          <bw-button type="primary">中</bw-button>
          <bw-button type="primary">中</bw-button>
        </bw-space>
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <bw-space size="large">
          <bw-button type="primary">大</bw-button>
          <bw-button type="primary">大</bw-button>
        </bw-space>
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <bw-space :size="30">
          <bw-button type="primary">30px</bw-button>
          <bw-button type="primary">30px</bw-button>
        </bw-space>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">垂直排列</div>
      <bw-space direction="vertical" size="medium">
        <bw-button type="primary" block>按钮1</bw-button>
        <bw-button type="primary" block>按钮2</bw-button>
        <bw-button type="primary" block>按钮3</bw-button>
      </bw-space>
    </div>

    <div class="demo-block">
      <div class="demo-title">对齐方式</div>
      <div class="demo-row">
        <bw-space align="center">
          <bw-button type="primary" size="small">小按钮</bw-button>
          <bw-button type="primary" size="large">大按钮</bw-button>
          <span>文本</span>
        </bw-space>
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <bw-space align="end">
          <bw-button type="primary" size="small">小按钮</bw-button>
          <bw-button type="primary" size="large">大按钮</bw-button>
          <span>文本</span>
        </bw-space>
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <bw-space align="baseline">
          <bw-button type="primary" size="small">小按钮</bw-button>
          <span style="font-size: 24px">大文本</span>
          <span>普通文本</span>
        </bw-space>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">排列方式</div>
      <div class="demo-row">
        <bw-space justify="center" fill>
          <bw-button type="primary">居中</bw-button>
          <bw-button type="primary">居中</bw-button>
        </bw-space>
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <bw-space justify="end" fill>
          <bw-button type="primary">靠右</bw-button>
          <bw-button type="primary">靠右</bw-button>
        </bw-space>
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <bw-space justify="between" fill>
          <bw-button type="primary">左边</bw-button>
          <bw-button type="primary">右边</bw-button>
        </bw-space>
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <bw-space justify="around" fill>
          <bw-button type="primary">均匀</bw-button>
          <bw-button type="primary">均匀</bw-button>
        </bw-space>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自动换行</div>
      <bw-space :wrap="true" size="medium">
        <bw-button type="primary">按钮1</bw-button>
        <bw-button type="primary">按钮2</bw-button>
        <bw-button type="primary">按钮3</bw-button>
        <bw-button type="primary">按钮4</bw-button>
        <bw-button type="primary">按钮5</bw-button>
        <bw-button type="primary">按钮6</bw-button>
        <bw-button type="primary">按钮7</bw-button>
        <bw-button type="primary">按钮8</bw-button>
      </bw-space>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwSpace from '../components/space/index.vue'
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
}
</style>