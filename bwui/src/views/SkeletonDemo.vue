<template>
  <demo-layout title="Skeleton 骨架屏">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-skeleton />
    </div>

    <div class="demo-block">
      <div class="demo-title">显示标题</div>
      <bw-skeleton title :row="3" />
    </div>

    <div class="demo-block">
      <div class="demo-title">显示头像</div>
      <bw-skeleton avatar />
    </div>

    <div class="demo-block">
      <div class="demo-title">标题+头像</div>
      <bw-skeleton title avatar />
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义行宽</div>
      <bw-skeleton :row="3" :row-width="['80%', '60%', '40%']" />
    </div>

    <div class="demo-block">
      <div class="demo-title">圆角样式</div>
      <bw-skeleton :row="3" round />
    </div>

    <div class="demo-block">
      <div class="demo-title">方形头像</div>
      <bw-skeleton avatar avatar-shape="square" avatar-size="48" />
    </div>

    <div class="demo-block">
      <div class="demo-title">关闭动画</div>
      <bw-skeleton :row="3" :animate="false" />
    </div>

    <div class="demo-block">
      <div class="demo-title">加载切换</div>
      <bw-skeleton :loading="showSkeleton">
        <div style="padding: 16px; font-size: 14px; color: #323233;">
          内容已加载完成
        </div>
      </bw-skeleton>
      <div style="margin-top: 12px; text-align: center;">
        <bw-button type="primary" size="small" @click="showSkeleton = !showSkeleton">
          切换状态
        </bw-button>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwSkeleton from '../components/skeleton/index.vue'
import BwButton from '../components/button/index.vue'

const showSkeleton = ref(true)
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