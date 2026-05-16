<template>
  <demo-layout title="Avatar 头像">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" />
        <bw-avatar icon="user" />
        <bw-avatar>U</bw-avatar>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">不同形状</div>
      <div class="demo-row">
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" shape="circle" />
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" shape="square" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">不同尺寸</div>
      <div class="demo-row">
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" size="small" />
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" size="medium" />
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" size="large" />
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" :size="72" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-avatar color="#fff" background="#1989fa">蓝</bw-avatar>
        <bw-avatar color="#fff" background="#07c160">绿</bw-avatar>
        <bw-avatar color="#fff" background="#ee0a24">红</bw-avatar>
        <bw-avatar color="#fff" background="#ff976a">橙</bw-avatar>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">徽标提示</div>
      <div class="demo-row">
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" badge="5" />
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" dot />
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" badge="99+" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">图片填充模式</div>
      <div class="demo-row">
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" fit="cover" />
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" fit="contain" />
        <bw-avatar model-value="https://img.yzcdn.cn/vant/cat.jpeg" fit="fill" />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwAvatar from '../components/avatar/index.vue'
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
    align-items: center;
  }
}
</style>