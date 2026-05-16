<template>
  <demo-layout title="Toast 轻提示">
    <div class="demo-block">
      <div class="demo-title">文字提示</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showTextToast">文字提示</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">加载提示</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showLoadingToast">加载提示</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">成功/失败提示</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showSuccessToast">成功提示</bw-button>
        <bw-button type="primary" @click="showFailToast">失败提示</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义图标</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showIconToast">自定义图标</bw-button>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义位置</div>
      <div class="demo-row">
        <bw-button type="primary" @click="showPositionToast('top')">顶部展示</bw-button>
        <bw-button type="primary" @click="showPositionToast('bottom')">底部展示</bw-button>
      </div>
    </div>

    <bw-toast
      :show="textVisible"
      :message="textMessage"
      @update:show="textVisible = $event"
    />

    <bw-toast
      :show="loadingVisible"
      type="loading"
      message="加载中..."
    />

    <bw-toast
      :show="resultVisible"
      :type="resultType"
      :message="resultMessage"
      @update:show="resultVisible = $event"
    />

    <bw-toast
      :show="iconVisible"
      :message="iconMessage"
      icon="like-o"
      icon-size="40px"
      @update:show="iconVisible = $event"
    />

    <bw-toast
      :show="positionVisible"
      :message="positionMessage"
      :position="currentPosition"
      @update:show="positionVisible = $event"
    />
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwButton from '../components/button/index.vue'
import BwToast from '../components/toast/index.vue'

const textVisible = ref(false)
const textMessage = ref('')

const loadingVisible = ref(false)

const resultVisible = ref(false)
const resultType = ref<'success' | 'fail'>('success')
const resultMessage = ref('')

const iconVisible = ref(false)
const iconMessage = ref('')

const positionVisible = ref(false)
const positionMessage = ref('')
const currentPosition = ref<'top' | 'bottom'>('top')

const showTextToast = () => {
  textMessage.value = '这是一条文字提示'
  textVisible.value = true
}

const showLoadingToast = () => {
  loadingVisible.value = true
  setTimeout(() => {
    loadingVisible.value = false
  }, 2000)
}

const showSuccessToast = () => {
  resultType.value = 'success'
  resultMessage.value = '操作成功'
  resultVisible.value = true
}

const showFailToast = () => {
  resultType.value = 'fail'
  resultMessage.value = '操作失败'
  resultVisible.value = true
}

const showIconToast = () => {
  iconMessage.value = '自定义图标'
  iconVisible.value = true
}

const showPositionToast = (position: 'top' | 'bottom') => {
  currentPosition.value = position
  positionMessage.value = position === 'top' ? '顶部展示' : '底部展示'
  positionVisible.value = true
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