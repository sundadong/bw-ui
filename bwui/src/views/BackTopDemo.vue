<template>
  <demo-layout title="BackTop 回到顶部">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <div class="demo-placeholder">
          <span>向下滚动页面查看效果</span>
        </div>
        <bw-back-top :model-value="show" @click="show = false" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义位置</div>
      <div class="demo-row">
        <div class="demo-placeholder">
          <span>自定义 right 和 bottom</span>
        </div>
        <bw-back-top :model-value="true" :right="50" :bottom="150" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义内容</div>
      <div class="demo-row">
        <div class="demo-placeholder">
          <span>使用插槽自定义按钮内容</span>
        </div>
        <bw-back-top :model-value="true">
          <span style="font-size: 12px; color: #1989fa">TOP</span>
        </bw-back-top>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">不同层级</div>
      <div class="demo-row">
        <div class="demo-placeholder">
          <span>设置 z-index</span>
        </div>
        <bw-back-top :model-value="true" :z-index="999" />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwBackTop from '../components/back-top/index.vue'

const show = ref(true)
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
  }

  .demo-placeholder {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f7f8fa;
    border-radius: 8px;
    color: #969799;
    font-size: 14px;
  }
}
</style>