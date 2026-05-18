<template>
  <demo-layout title="Collapse 折叠面板">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-collapse v-model="activeNames">
        <bw-collapse-item name="1" title="标题1">
          代码是写出来给人看的，附带能在机器上运行
        </bw-collapse-item>
        <bw-collapse-item name="2" title="标题2">
          技术无非就是那些开发它的人的共同灵魂
        </bw-collapse-item>
        <bw-collapse-item name="3" title="标题3">
          在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准
        </bw-collapse-item>
      </bw-collapse>
    </div>

    <div class="demo-block">
      <div class="demo-title">手风琴模式</div>
      <bw-collapse v-model="accordionNames" accordion>
        <bw-collapse-item name="a1" title="面板1">
          内容1
        </bw-collapse-item>
        <bw-collapse-item name="a2" title="面板2">
          内容2
        </bw-collapse-item>
        <bw-collapse-item name="a3" title="面板3">
          内容3
        </bw-collapse-item>
      </bw-collapse>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <bw-collapse v-model="disabledNames">
        <bw-collapse-item name="d1" title="可展开">
          正常内容
        </bw-collapse-item>
        <bw-collapse-item name="d2" title="禁用" disabled>
          禁用内容
        </bw-collapse-item>
        <bw-collapse-item name="d3" title="只读" readonly>
          只读内容
        </bw-collapse-item>
      </bw-collapse>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义图标</div>
      <bw-collapse v-model="iconNames">
        <bw-collapse-item name="i1" title="面板1" icon="success">
          内容1
        </bw-collapse-item>
        <bw-collapse-item name="i2" title="面板2" icon="star">
          内容2
        </bw-collapse-item>
      </bw-collapse>
    </div>

    <div class="demo-block">
      <div class="demo-title">大尺寸</div>
      <bw-collapse v-model="largeNames">
        <bw-collapse-item name="l1" title="大号面板" size="large">
          大号面板内容
        </bw-collapse-item>
      </bw-collapse>
    </div>

    <div class="demo-block">
      <div class="demo-title">隐藏箭头</div>
      <bw-collapse v-model="noLinkNames">
        <bw-collapse-item name="n1" title="无箭头" :is-link="false">
          内容
        </bw-collapse-item>
      </bw-collapse>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwCollapse from '../components/collapse/index.vue'
import BwCollapseItem from '../components/collapse-item/index.vue'

const activeNames = ref<(string | number)[]>(['1'])
const accordionNames = ref<(string | number)[]>([])
const disabledNames = ref<(string | number)[]>(['d1'])
const iconNames = ref<(string | number)[]>([])
const largeNames = ref<(string | number)[]>([])
const noLinkNames = ref<(string | number)[]>([])
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