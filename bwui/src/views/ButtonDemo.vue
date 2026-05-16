<template>
  <div class="demo-page">
    <div class="demo-header" @click="goBack">
      <span class="back-arrow">‹</span>
      <span class="demo-title">Button 按钮</span>
    </div>

    <div class="demo-content">
      <div class="demo-block">
        <div class="demo-title">按钮类型</div>
        <div class="demo-row">
          <bw-button type="primary">主要按钮</bw-button>
          <bw-button type="success">成功按钮</bw-button>
          <bw-button type="default">默认按钮</bw-button>
        </div>
      </div>

      <div class="demo-block">
        <div class="demo-title">按钮尺寸</div>
        <div class="demo-row">
          <bw-button size="small">小按钮</bw-button>
          <bw-button size="medium">中按钮</bw-button>
          <bw-button size="large">大按钮</bw-button>
        </div>
      </div>

      <div class="demo-block">
        <div class="demo-title">朴素按钮</div>
        <div class="demo-row">
          <bw-button type="primary" plain>主要按钮</bw-button>
          <bw-button type="success" plain>成功按钮</bw-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import BwButton from '../components/button/index.vue'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.demo-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.demo-header {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #ebedf0;
  cursor: pointer;

  .back-arrow {
    font-size: 24px;
    color: #323233;
    margin-right: 8px;
    line-height: 1;
  }

  .demo-title {
    font-size: 16px;
    font-weight: 500;
    color: #323233;
  }
}

.demo-content {
  padding: 16px;
}

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
