<template>
  <demo-layout title="SafeArea 安全区">
    <div class="demo-block">
      <div class="demo-title">顶部安全区</div>
      <div class="demo-desc">为内容添加顶部安全区适配（适用于刘海屏等设备）</div>
      <bw-safe-area position="top">
        <div class="safe-content top-content">
          <span>顶部安全区域内容</span>
        </div>
      </bw-safe-area>
    </div>

    <div class="demo-block">
      <div class="demo-title">底部安全区</div>
      <div class="demo-desc">为内容添加底部安全区适配</div>
      <bw-safe-area position="bottom">
        <div class="safe-content bottom-content">
          <span>底部安全区域内容</span>
        </div>
      </bw-safe-area>
    </div>

    <div class="demo-block">
      <div class="demo-title">包含多个子元素</div>
      <div class="demo-desc">安全区内可以包含多个子元素</div>
      <bw-safe-area position="bottom">
        <div class="safe-content bottom-content">
          <bw-button type="primary" block>主要操作</bw-button>
          <bw-button type="default" block style="margin-top: 8px">次要操作</bw-button>
        </div>
      </bw-safe-area>
    </div>

    <div class="demo-block">
      <div class="demo-title">与 Navbar 结合使用</div>
      <div class="demo-desc">顶部安全区通常与导航栏配合使用</div>
      <bw-safe-area position="top">
        <div class="safe-content top-content" style="display: flex; align-items: center; justify-content: space-between">
          <span>← 返回</span>
          <span>页面标题</span>
          <span>菜单</span>
        </div>
      </bw-safe-area>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwSafeArea from '../components/safe-area/index.vue'
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
    margin-bottom: 8px;
  }

  .demo-desc {
    font-size: 12px;
    color: #c8c9cc;
    margin-bottom: 12px;
  }

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}

.safe-content {
  padding: 12px;
  border-radius: 4px;
  font-size: 14px;
  color: #323233;

  &.top-content {
    background-color: #ecf5ff;
    border: 1px dashed #1989fa;
  }

  &.bottom-content {
    background-color: #f0f9eb;
    border: 1px dashed #07c160;
  }
}
</style>