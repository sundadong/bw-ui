<template>
  <demo-layout title="Sidebar 侧边导航">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <div class="sidebar-demo">
          <bw-sidebar v-model="active1">
            <bw-sidebar-item title="标签1" />
            <bw-sidebar-item title="标签2" />
            <bw-sidebar-item title="标签3" />
            <bw-sidebar-item title="标签4" />
          </bw-sidebar>
        </div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">徽标提示</div>
      <div class="demo-row">
        <div class="sidebar-demo">
          <bw-sidebar v-model="active2">
            <bw-sidebar-item title="标签1" dot />
            <bw-sidebar-item title="标签2" badge="5" />
            <bw-sidebar-item title="标签3" badge="99+" />
            <bw-sidebar-item title="标签4" badge="0" />
          </bw-sidebar>
        </div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用选项</div>
      <div class="demo-row">
        <div class="sidebar-demo">
          <bw-sidebar v-model="active3">
            <bw-sidebar-item title="标签1" />
            <bw-sidebar-item title="标签2" />
            <bw-sidebar-item title="标签3" disabled />
            <bw-sidebar-item title="标签4" />
          </bw-sidebar>
        </div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义内容</div>
      <div class="demo-row">
        <div class="sidebar-demo">
          <bw-sidebar v-model="active4">
            <bw-sidebar-item>
              自定义1
            </bw-sidebar-item>
            <bw-sidebar-item>
              自定义2
            </bw-sidebar-item>
            <bw-sidebar-item>
              自定义3
            </bw-sidebar-item>
          </bw-sidebar>
        </div>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwSidebar from '../components/sidebar/index.vue'
import BwSidebarItem from '../components/sidebar-item/index.vue'

const active1 = ref(0)
const active2 = ref(0)
const active3 = ref(0)
const active4 = ref(0)
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

  .sidebar-demo {
    height: 280px;
    overflow: hidden;
  }
}
</style>