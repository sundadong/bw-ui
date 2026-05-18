<template>
  <demo-layout title="Grid 宫格">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-grid>
        <bw-grid-item v-for="i in 4" :key="i" :text="'文字'" icon="photo" />
      </bw-grid>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义列数</div>
      <bw-grid :column-num="3">
        <bw-grid-item v-for="i in 3" :key="i" :text="'文字'" icon="photo" />
      </bw-grid>
    </div>

    <div class="demo-block">
      <div class="demo-title">正方形格子</div>
      <bw-grid :square="true">
        <bw-grid-item v-for="i in 4" :key="i" :text="'文字'" icon="photo" />
      </bw-grid>
    </div>

    <div class="demo-block">
      <div class="demo-title">格子间距</div>
      <bw-grid :gutter="10" :border="false">
        <bw-grid-item v-for="i in 4" :key="i" :text="'文字'" icon="photo" />
      </bw-grid>
    </div>

    <div class="demo-block">
      <div class="demo-title">横向排列</div>
      <bw-grid direction="horizontal" :column-num="1">
        <bw-grid-item v-for="i in 3" :key="i" :text="'文字'" icon="photo" />
      </bw-grid>
    </div>

    <div class="demo-block">
      <div class="demo-title">徽标提示</div>
      <bw-grid>
        <bw-grid-item text="文字" icon="photo" :dot="true" />
        <bw-grid-item text="文字" icon="photo" :badge="'99+'" />
        <bw-grid-item text="文字" icon="photo" :badge="'1'" />
        <bw-grid-item text="文字" icon="photo" />
      </bw-grid>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <bw-grid>
        <bw-grid-item text="文字" icon="photo" icon-color="#1989fa" />
        <bw-grid-item text="文字" icon="photo" icon-color="#07c160" />
        <bw-grid-item text="文字" icon="photo" icon-color="#ff976a" />
        <bw-grid-item text="文字" icon="photo" icon-color="#ee0a24" />
      </bw-grid>
    </div>

    <div class="demo-block">
      <div class="demo-title">导航链接</div>
      <bw-grid>
        <bw-grid-item text="Vant" icon="photo" href="https://vant-ui.github.io/vant" />
        <bw-grid-item text="Vue" icon="photo" href="https://vuejs.org" />
        <bw-grid-item text="GitHub" icon="photo" href="https://github.com" />
        <bw-grid-item text="更多" icon="photo" />
      </bw-grid>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwGrid from '../components/grid/index.vue'
import BwGridItem from '../components/grid-item/index.vue'
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

  .demo-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>