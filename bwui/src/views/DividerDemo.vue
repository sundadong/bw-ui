<template>
  <demo-layout title="Divider 分割线">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <span>文本</span>
        <bw-divider />
        <span>文本</span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">展示文字</div>
      <div class="demo-row">
        <bw-divider>文字</bw-divider>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">内容位置</div>
      <div class="demo-row">
        <bw-divider content-position="left">左侧内容</bw-divider>
        <bw-divider content-position="center">居中内容</bw-divider>
        <bw-divider content-position="right">右侧内容</bw-divider>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">虚线</div>
      <div class="demo-row">
        <bw-divider :dashed="true">虚线分割线</bw-divider>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-divider color="#1989fa">蓝色</bw-divider>
        <bw-divider color="#07c160">绿色</bw-divider>
        <bw-divider color="#ee0a24" :dashed="true">红色虚线</bw-divider>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">垂直分割线</div>
      <div class="demo-row">
        <span>文本</span>
        <bw-divider :vertical="true" />
        <span>文本</span>
        <bw-divider :vertical="true" :dashed="true" />
        <span>文本</span>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">细线条 (hairline)</div>
      <div class="demo-row">
        <bw-divider :hairline="true">细线条</bw-divider>
        <bw-divider :hairline="false">粗线条</bw-divider>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwDivider from '../components/divider/index.vue'
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
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
    width: 100%;

    > span {
      font-size: 14px;
      color: #323233;
    }
  }
}
</style>