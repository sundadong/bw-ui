<template>
  <demo-layout title="NoticeBar 通知栏">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-notice-bar
        model-value="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
      />
    </div>

    <div class="demo-block">
      <div class="demo-title">可关闭</div>
      <bw-notice-bar
        v-model="noticeText"
        mode="closeable"
      />
    </div>

    <div class="demo-block">
      <div class="demo-title">可点击链接</div>
      <bw-notice-bar
        model-value="技术无非就是那些开发它的人的共同灵魂。"
        mode="link"
      />
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <bw-notice-bar
        model-value="自定义颜色通知栏"
        color="#1989fa"
        background="#ecf9ff"
      />
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义图标</div>
      <bw-notice-bar
        model-value="使用 info 图标"
        left-icon="info"
      />
    </div>

    <div class="demo-block">
      <div class="demo-title">多行换行</div>
      <bw-notice-bar
        model-value="这是一条很长的通知消息，会自动换行显示。当内容超出时，可以设置 wrapable 来换行展示。"
        wrapable
      />
    </div>

    <div class="demo-block">
      <div class="demo-title">关闭滚动</div>
      <bw-notice-bar
        model-value="不滚动显示的通知栏"
        :scrollable="false"
      />
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwNoticeBar from '../components/notice-bar/index.vue'

const noticeText = ref('这是一条可关闭的通知消息')
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
    margin-bottom: 16px;
  }
}
</style>