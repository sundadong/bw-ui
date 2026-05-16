<template>
  <demo-layout title="Icon 图标">
    <div class="demo-block">
      <div class="demo-title">基础图标</div>
      <div class="demo-icons">
        <div class="demo-icon-item">
          <bw-icon name="success" size="24px" />
          <span class="demo-icon-name">success</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="fail" size="24px" />
          <span class="demo-icon-name">fail</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="warning" size="24px" />
          <span class="demo-icon-name">warning</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="info" size="24px" />
          <span class="demo-icon-name">info</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="arrow" size="24px" />
          <span class="demo-icon-name">arrow</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="search" size="24px" />
          <span class="demo-icon-name">search</span>
        </div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">图标尺寸</div>
      <div class="demo-icons">
        <div class="demo-icon-item">
          <bw-icon name="success" size="16px" />
          <span class="demo-icon-name">16px</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="success" size="20px" />
          <span class="demo-icon-name">20px</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="success" size="24px" />
          <span class="demo-icon-name">24px</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="success" size="32px" />
          <span class="demo-icon-name">32px</span>
        </div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">图标颜色</div>
      <div class="demo-icons">
        <div class="demo-icon-item">
          <bw-icon name="success" size="24px" color="#1989fa" />
          <span class="demo-icon-name">primary</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="success" size="24px" color="#07c160" />
          <span class="demo-icon-name">success</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="success" size="24px" color="#ff976a" />
          <span class="demo-icon-name">warning</span>
        </div>
        <div class="demo-icon-item">
          <bw-icon name="success" size="24px" color="#ee0a24" />
          <span class="demo-icon-name">danger</span>
        </div>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwIcon from '../components/icon/index.vue'
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

  .demo-icons {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }

  .demo-icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 60px;
  }

  .demo-icon-name {
    font-size: 12px;
    color: #646566;
  }
}
</style>
