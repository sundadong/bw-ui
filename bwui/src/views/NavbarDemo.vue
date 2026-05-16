<template>
  <demo-layout title="Navbar 导航栏">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-navbar title="导航栏" />
    </div>

    <div class="demo-block">
      <div class="demo-title">返回按钮</div>
      <bw-navbar title="导航栏" :left-arrow="true" @click-left="handleBack" />
    </div>

    <div class="demo-block">
      <div class="demo-title">副标题</div>
      <bw-navbar title="标题" subtitle="副标题" />
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwNavbar from '../components/navbar/index.vue'

const handleBack = () => {
  console.log('Back clicked')
}
</script>

<style lang="scss" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;

  .demo-title {
    font-size: 14px;
    color: #969799;
    padding: 16px 16px 0;
  }
}
</style>
