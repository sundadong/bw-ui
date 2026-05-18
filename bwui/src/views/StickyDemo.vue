<template>
  <demo-layout title="Sticky 粘性布局">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-sticky>
        <div class="sticky-demo">顶部粘性区域</div>
      </bw-sticky>
      <div class="sticky-placeholder">
        <p v-for="i in 20" :key="i" class="sticky-line">内容行 {{ i }}</p>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义偏移</div>
      <bw-sticky :offset-top="60">
        <div class="sticky-demo sticky-demo--offset">距顶部 60px</div>
      </bw-sticky>
      <div class="sticky-placeholder">
        <p v-for="i in 15" :key="i" class="sticky-line">内容行 {{ i }}</p>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">底部粘性</div>
      <bw-sticky position="bottom" :offset-bottom="0">
        <div class="sticky-demo sticky-demo--bottom">底部粘性区域</div>
      </bw-sticky>
      <div class="sticky-placeholder">
        <p v-for="i in 20" :key="i" class="sticky-line">内容行 {{ i }}</p>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义 zIndex</div>
      <bw-sticky :z-index="1000">
        <div class="sticky-demo">高 zIndex 粘性</div>
      </bw-sticky>
      <div class="sticky-placeholder">
        <p v-for="i in 10" :key="i" class="sticky-line">内容行 {{ i }}</p>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwSticky from '../components/sticky/index.vue'
</script>

<style lang="less" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0;
  margin-bottom: 16px;
  overflow: hidden;

  .demo-title {
    font-size: 14px;
    color: #969799;
    padding: 16px 16px 0;
    margin-bottom: 16px;
  }
}

.sticky-demo {
  padding: 16px;
  background-color: #1989fa;
  color: #ffffff;
  font-size: 14px;
  text-align: center;

  &--offset {
    background-color: #07c160;
  }

  &--bottom {
    background-color: #ff976a;
  }
}

.sticky-placeholder {
  padding: 8px 16px;
  background-color: #f7f8fa;
}

.sticky-line {
  padding: 4px 0;
  font-size: 13px;
  color: #969799;
  line-height: 1.6;
}
</style>