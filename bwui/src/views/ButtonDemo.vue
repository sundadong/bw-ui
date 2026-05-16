<template>
  <demo-layout title="Button 按钮">
    <div class="demo-block">
      <div class="demo-title">按钮类型</div>
      <div class="demo-row">
        <bw-button type="primary">主要按钮</bw-button>
        <bw-button type="success">成功按钮</bw-button>
        <bw-button type="warning">警告按钮</bw-button>
        <bw-button type="danger">危险按钮</bw-button>
        <bw-button type="default">默认按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">朴素按钮</div>
      <div class="demo-row">
        <bw-button type="primary" plain>主要按钮</bw-button>
        <bw-button type="success" plain>成功按钮</bw-button>
        <bw-button type="warning" plain>警告按钮</bw-button>
        <bw-button type="danger" plain>危险按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">细边框</div>
      <div class="demo-row">
        <bw-button type="primary" hairline plain>主要按钮</bw-button>
        <bw-button type="success" hairline plain>成功按钮</bw-button>
        <bw-button type="warning" hairline plain>警告按钮</bw-button>
        <bw-button type="danger" hairline plain>危险按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <div class="demo-row">
        <bw-button type="primary" disabled>禁用状态</bw-button>
        <bw-button type="success" disabled>禁用状态</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">加载状态</div>
      <div class="demo-row">
        <bw-button type="primary" loading>加载中</bw-button>
        <bw-button type="success" loading>加载中</bw-button>
        <bw-button type="warning" loading>加载中</bw-button>
        <bw-button type="danger" loading>加载中</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">按钮形状</div>
      <div class="demo-row">
        <bw-button type="primary" square>方形按钮</bw-button>
        <bw-button type="success" round>圆角按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">图标按钮</div>
      <div class="demo-row">
        <bw-button type="primary" icon="plus" />
        <bw-button type="primary" icon="success" />
        <bw-button type="primary" icon="search" />
        <bw-button type="primary" icon="star" />
        <bw-button type="primary" icon="setting" />
      </div>
      <div class="demo-row" style="margin-top: 12px">
        <bw-button type="primary" icon="plus">按钮</bw-button>
        <bw-button type="primary" icon="success">按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">按钮尺寸</div>
      <div class="demo-row">
        <bw-button type="primary" size="large">大号按钮</bw-button>
        <bw-button type="primary" size="medium">普通按钮</bw-button>
        <bw-button type="primary" size="small">小型按钮</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">块级元素</div>
      <div class="demo-block-row">
        <bw-button type="primary" block>块级元素</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <bw-button color="#7232dd">单色按钮</bw-button>
        <bw-button color="#7232dd" plain>单色按钮</bw-button>
        <bw-button color="linear-gradient(to right, #ff6034, #ee0a24)">
          渐变按钮
        </bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">页面导航</div>
      <div class="demo-row">
        <bw-button type="primary" href="https://vant-ui.github.io/vant">
          URL 跳转
        </bw-button>
        <bw-button type="primary" href="/">
          Vue Router
        </bw-button>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
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
  }

  .demo-block-row {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>