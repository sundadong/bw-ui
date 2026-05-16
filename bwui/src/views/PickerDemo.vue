<template>
  <demo-layout title="Picker 选择器">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showBasic = true">单列选择</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">多列选择</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showMulti = true">多列选择</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">级联选择</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showCascade = true">级联选择</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">加载状态</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showLoading = true">加载中</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义配置</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showCustom = true">自定义按钮文案</bw-button>
      </div>
    </div>

    <bw-picker
      v-model="basicValue"
      :show="showBasic"
      :columns="simpleColumns"
      title="单列选择"
      @update:show="showBasic = $event"
      @confirm="onBasicConfirm"
      @cancel="showBasic = false"
    />

    <bw-picker
      v-model="multiValue"
      :show="showMulti"
      :columns="multiColumns"
      title="多列选择"
      @update:show="showMulti = $event"
    />

    <bw-picker
      v-model="cascadeValue"
      :show="showCascade"
      :columns="cascadeColumns"
      title="级联选择"
      @update:show="showCascade = $event"
    />

    <bw-picker
      v-model="loadingValue"
      :show="showLoading"
      :columns="simpleColumns"
      title="加载中"
      :loading="true"
      @update:show="showLoading = $event"
    />

    <bw-picker
      v-model="customValue"
      :show="showCustom"
      :columns="simpleColumns"
      title="自定义文案"
      confirm-text="完成"
      cancel-text="返回"
      @update:show="showCustom = $event"
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwPicker from '../components/picker/index.vue'

const simpleColumns = [
  { text: '选项1', value: 1 },
  { text: '选项2', value: 2 },
  { text: '选项3', value: 3 },
  { text: '选项4', value: 4 },
  { text: '选项5', value: 5 }
]

const multiColumns = [
  [
    { text: '北京', value: 'beijing' },
    { text: '上海', value: 'shanghai' },
    { text: '广州', value: 'guangzhou' }
  ],
  [
    { text: '朝阳区', value: 'chaoyang' },
    { text: '海淀区', value: 'haidian' },
    { text: '浦东新区', value: 'pudong' }
  ]
]

const cascadeColumns = [
  {
    text: '浙江',
    value: 'zhejiang',
    children: [
      { text: '杭州', value: 'hangzhou' },
      { text: '宁波', value: 'ningbo' },
      { text: '温州', value: 'wenzhou' }
    ]
  },
  {
    text: '江苏',
    value: 'jiangsu',
    children: [
      { text: '南京', value: 'nanjing' },
      { text: '苏州', value: 'suzhou' },
      { text: '无锡', value: 'wuxi' }
    ]
  },
  {
    text: '广东',
    value: 'guangdong',
    children: [
      { text: '广州', value: 'guangzhou' },
      { text: '深圳', value: 'shenzhen' }
    ]
  }
]

const showBasic = ref(false)
const basicValue = ref(1)

const showMulti = ref(false)
const multiValue = ref(['beijing', 'chaoyang'])

const showCascade = ref(false)
const cascadeValue = ref(['zhejiang', 'hangzhou'])

const showLoading = ref(false)
const loadingValue = ref(1)

const showCustom = ref(false)
const customValue = ref(1)

const onBasicConfirm = (value: any) => {
  console.log('确认选择:', value)
  showBasic.value = false
}
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
}
</style>