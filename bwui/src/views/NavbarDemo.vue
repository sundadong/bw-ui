<template>
  <demo-layout title="Navbar 导航栏">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-navbar title="标题" />
    </div>

    <div class="demo-block">
      <div class="demo-title">返回按钮</div>
      <bw-navbar
        title="标题"
        left-text="返回"
        :left-arrow="true"
        @click-left="onClickLeft"
      />
    </div>

    <div class="demo-block">
      <div class="demo-title">副标题</div>
      <bw-navbar title="标题">
        <template #title>
          <div class="navbar-title-wrap">
            <span class="navbar-title-text">标题</span>
            <span class="navbar-subtitle-text">副标题</span>
          </div>
        </template>
      </bw-navbar>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义内容</div>
      <bw-navbar title="标题" left-text="返回" :left-arrow="true">
        <template #right>
          <bw-icon name="search" size="20px" />
        </template>
      </bw-navbar>
    </div>

    <div class="demo-block">
      <div class="demo-title">固定顶部</div>
      <bw-navbar title="标题" left-text="返回" :left-arrow="true" :fixed="true" />
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwNavbar from '../components/navbar/index.vue'
import BwIcon from '../components/icon/index.vue'

const onClickLeft = () => {
  console.log('返回')
}
</script>

<style lang="less" scoped>
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

.navbar-title-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbar-title-text {
  font-size: 16px;
  font-weight: 500;
  color: #323233;
  line-height: 1.2;
}

.navbar-subtitle-text {
  font-size: 12px;
  color: #969799;
  line-height: 1.2;
}
</style>