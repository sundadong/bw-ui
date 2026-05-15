<template>
  <div id="app">
    <bw-navbar title="BWUI 组件库" :left-arrow="true" @click-left="handleBack" />
    <div class="demo-container">
      <h2>基础组件</h2>
      <section class="demo-section">
        <h3>Button 按钮</h3>
        <div class="demo-buttons">
          <bw-button type="primary">主要按钮</bw-button>
          <bw-button type="success">成功按钮</bw-button>
          <bw-button type="warning">警告按钮</bw-button>
          <bw-button type="danger">危险按钮</bw-button>
          <bw-button type="default">默认按钮</bw-button>
        </div>
        <div class="demo-buttons">
          <bw-button size="small">小按钮</bw-button>
          <bw-button size="medium">中按钮</bw-button>
          <bw-button size="large">大按钮</bw-button>
        </div>
        <div class="demo-buttons">
          <bw-button plain>朴素按钮</bw-button>
          <bw-button round>圆角按钮</bw-button>
          <bw-button disabled>禁用按钮</bw-button>
          <bw-button loading>加载中</bw-button>
        </div>
      </section>

      <section class="demo-section">
        <h3>Cell 单元格</h3>
        <bw-cell-group>
          <bw-cell title="单元格" value="内容" />
          <bw-cell title="单元格" label="描述信息" value="内容" />
          <bw-cell title="单元格" is-link value="内容" />
          <bw-cell title="单元格" icon="success" value="内容" />
        </bw-cell-group>
      </section>

      <section class="demo-section">
        <h3>Tag 标签</h3>
        <div class="demo-tags">
          <bw-tag type="primary">标签</bw-tag>
          <bw-tag type="success">成功</bw-tag>
          <bw-tag type="warning">警告</bw-tag>
          <bw-tag type="danger">危险</bw-tag>
          <bw-tag type="default">默认</bw-tag>
        </div>
        <div class="demo-tags">
          <bw-tag plain>朴素</bw-tag>
          <bw-tag round>圆角</bw-tag>
          <bw-tag mark>标记</bw-tag>
          <bw-tag closable @close="handleTagClose">可关闭</bw-tag>
        </div>
      </section>

      <section class="demo-section">
        <h3>Badge 微章</h3>
        <div class="demo-badge">
          <bw-badge content="5">
            <div class="badge-target">消息</div>
          </bw-badge>
          <bw-badge dot>
            <div class="badge-target">通知</div>
          </bw-badge>
        </div>
      </section>

      <section class="demo-section">
        <h3>Tabs 标签页</h3>
        <bw-tabs :tabs="tabs" v-model="currentTab">
          <div>标签 1 内容</div>
          <div>标签 2 内容</div>
          <div>标签 3 内容</div>
        </bw-tabs>
      </section>

      <section class="demo-section">
        <h3>表单组件</h3>
        <bw-cell-group title="开关">
          <bw-cell title="开关">
            <template #right-icon>
              <bw-switch v-model="switchValue" />
            </template>
          </bw-cell>
        </bw-cell-group>

        <bw-cell-group title="复选框">
          <div class="demo-checkboxes">
            <bw-checkbox v-model="checkboxValue1">复选框 1</bw-checkbox>
            <bw-checkbox v-model="checkboxValue2">复选框 2</bw-checkbox>
          </div>
        </bw-cell-group>

        <bw-cell-group title="单选框">
          <div class="demo-radios">
            <bw-radio v-model="radioValue" :value="1">选项 1</bw-radio>
            <bw-radio v-model="radioValue" :value="2">选项 2</bw-radio>
          </div>
        </bw-cell-group>
      </section>

      <section class="demo-section">
        <h3>反馈组件</h3>
        <div class="demo-buttons">
          <bw-button @click="showPopup = true">弹出层</bw-button>
          <bw-button @click="showDialog">对话框</bw-button>
          <bw-button @click="showToast">轻提示</bw-button>
        </div>
      </section>

      <section class="demo-section">
        <h3>Empty 空状态</h3>
        <bw-empty description="暂无数据" />
      </section>
    </div>

    <bw-popup :show="showPopup" position="bottom" @update:show="showPopup = $event">
      <div style="padding: 20px; text-align: center;">
        <p>这是底部弹出层</p>
        <bw-button @click="showPopup = false">关闭</bw-button>
      </div>
    </bw-popup>

    <bw-dialog
      :show="showDialogFlag"
      title="提示"
      message="这是一个对话框"
      @confirm="showDialogFlag = false"
      @cancel="showDialogFlag = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/button/index.vue'
import Cell from './components/cell/index.vue'
import CellGroup from './components/cell-group/index.vue'
import Tag from './components/tag/index.vue'
import Badge from './components/badge/index.vue'
import Tabs from './components/tabs/index.vue'
import Switch from './components/switch/index.vue'
import Checkbox from './components/checkbox/index.vue'
import Radio from './components/radio/index.vue'
import Popup from './components/popup/index.vue'
import Dialog from './components/dialog/index.vue'
import Empty from './components/empty/index.vue'
import Navbar from './components/navbar/index.vue'
import './components/button/index.vue'

const tabs = [
  { title: '标签 1' },
  { title: '标签 2' },
  { title: '标签 3' }
]

const currentTab = ref(0)
const switchValue = ref(false)
const checkboxValue1 = ref(false)
const checkboxValue2 = ref(false)
const radioValue = ref(1)
const showPopup = ref(false)
const showDialogFlag = ref(false)

const handleBack = () => {
  console.log('back')
}

const handleTagClose = () => {
  console.log('tag close')
}

const showToast = () => {
  alert('Toast 提示')
}

const showDialog = () => {
  showDialogFlag.value = true
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background-color: #f7f8fa;
}

.demo-container {
  padding: 20px;
  padding-top: 64px;

  h2 {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #323233;
  }
}

.demo-section {
  margin-bottom: 24px;

  h3 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 12px;
    color: #646566;
  }
}

.demo-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;

  > * {
    margin-bottom: 8px;
  }
}

.demo-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.demo-badge {
  display: flex;
  gap: 24px;

  .badge-target {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
}

.demo-checkboxes,
.demo-radios {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
}
</style>
