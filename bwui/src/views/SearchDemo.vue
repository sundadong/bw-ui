<template>
  <demo-layout title="Search 搜索">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-search v-model="value1" placeholder="请输入搜索关键词" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">监听搜索事件</div>
      <div class="demo-row">
        <bw-search
          v-model="value2"
          placeholder="请输入搜索关键词"
          show-action
          @search="handleSearch"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">可清除</div>
      <div class="demo-row">
        <bw-search v-model="value3" placeholder="请输入搜索关键词" clearable />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">圆角搜索框</div>
      <div class="demo-row">
        <bw-search v-model="value4" placeholder="请输入搜索关键词" shape="round" />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义背景</div>
      <div class="demo-row">
        <bw-search
          v-model="value5"
          placeholder="请输入搜索关键词"
          background="#f7f8fa"
          shape="round"
        />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">禁用状态</div>
      <div class="demo-row">
        <bw-search v-model="value6" placeholder="搜索已禁用" disabled />
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义操作按钮文字</div>
      <div class="demo-row">
        <bw-search
          v-model="value7"
          placeholder="请输入搜索关键词"
          show-action
          action-text="查找"
          shape="round"
        />
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwSearch from '../components/search/index.vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('搜索已禁用')
const value7 = ref('')

const handleSearch = (val: string) => {
  alert(`搜索: ${val}`)
}
</script>

<style lang="less" scoped>
.demo-block {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0;
  margin-bottom: 16px;
  overflow: hidden;

  .demo-title {
    font-size: 14px;
    color: #969799;
    padding: 16px 16px 8px;
  }
}

.demo-row {
  padding: 0 16px 16px;
}
</style>