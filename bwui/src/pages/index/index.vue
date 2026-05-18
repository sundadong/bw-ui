<template>
  <view class="container">
    <view class="header">
      <text class="title">BWUI 组件库</text>
      <text class="subtitle">基于 Vue3 + uni-app，对齐 Vant4</text>
    </view>

    <view class="section">
      <text class="section-title">基础组件</text>
      
      <view class="component-group">
        <text class="group-title">Button 按钮</text>
        <view class="demo-row">
          <button type="primary">主要按钮</button>
          <button type="success">成功按钮</button>
          <button type="warning">警告按钮</button>
        </view>
        <view class="demo-row">
          <button type="danger">危险按钮</button>
          <button>默认按钮</button>
        </view>
      </view>

      <view class="component-group">
        <text class="group-title">Cell 单元格</text>
        <cell-group>
          <cell title="单元格" value="内容" />
          <cell title="单元格" is-link />
        </cell-group>
      </view>

      <view class="component-group">
        <text class="group-title">Tag 标签</text>
        <view class="demo-row">
          <tag type="primary">标签</tag>
          <tag type="success">成功</tag>
          <tag type="warning">警告</tag>
          <tag type="danger">危险</tag>
        </view>
      </view>

      <view class="component-group">
        <text class="group-title">Badge 微章</text>
        <view class="demo-row">
          <badge content="5">
            <view class="badge-target">消息</view>
          </badge>
          <badge dot>
            <view class="badge-target">通知</view>
          </badge>
        </view>
      </view>

      <view class="component-group">
        <text class="group-title">Empty 空状态</text>
        <empty description="暂无数据" />
      </view>
    </view>

    <view class="section">
      <text class="section-title">表单组件</text>
      
      <view class="component-group">
        <text class="group-title">Switch 开关</text>
        <cell-group>
          <cell title="开关">
            <template #right-icon>
              <switch :checked="switchChecked" @change="switchChecked =  @event.detail.value" />
            </template>
          </cell>
        </cell-group>
      </view>

      <view class="component-group">
        <text class="group-title">Checkbox 复选框</text>
        <view class="demo-row">
          <checkbox :checked="checkboxChecked" @change="checkboxChecked =  @event.detail.value">复选框</checkbox>
        </view>
      </view>

      <view class="component-group">
        <text class="group-title">Radio 单选框</text>
        <view class="demo-row">
          <radio-group @change="radioChange">
            <radio value="1" :checked="radioValue === '1'">选项 1</radio>
            <radio value="2" :checked="radioValue === '2'">选项 2</radio>
          </radio-group>
        </view>
      </view>
    </view>

    <view class="section">
      <text class="section-title">反馈组件</text>
      
      <view class="component-group">
        <text class="group-title">Dialog 对话框</text>
        <view class="demo-row">
          <button @click="showDialog">打开对话框</button>
        </view>
      </view>

      <view class="component-group">
        <text class="group-title">Toast 轻提示</text>
        <view class="demo-row">
          <button @click="showToast('success')">成功提示</button>
          <button @click="showToast('fail')">失败提示</button>
        </view>
      </view>

      <view class="component-group">
        <text class="group-title">Popup 弹出层</text>
        <view class="demo-row">
          <button @click="showPopup = true">打开弹出层</button>
        </view>
      </view>
    </view>

    <view class="footer">
      <text class="footer-text">BWUI v1.0.0</text>
      <text class="footer-text">支持 H5、微信小程序、支付宝小程序</text>
    </view>

    <dialog 
      :show="dialogVisible" 
      title="提示" 
      message="这是一个对话框"
      @confirm="dialogVisible = false"
      @cancel="dialogVisible = false"
    />

    <popup 
      :show="showPopup" 
      position="bottom"
      @update:show="showPopup =  @event"
    >
      <view class="popup-content">
        <text>这是底部弹出层</text>
        <button @click="showPopup = false">关闭</button>
      </view>
    </popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const switchChecked = ref(false)
const checkboxChecked = ref(false)
const radioValue = ref('1')
const dialogVisible = ref(false)
const showPopup = ref(false)

const switchChange = (e: any) => {
  switchChecked.value = e.detail.value
}

const radioChange = (e: any) => {
  radioValue.value = e.detail.value
}

const showDialog = () => {
  dialogVisible.value = true
}

const showToast = (type: string) => {
  uni.showToast({
    title: type === 'success' ? '成功' : '失败',
    icon: type === 'success' ? 'success' : 'fail'
  })
}
</script>

<style lang="less">
page {
  background-color: #f7f8fa;
}

.container {
  min-height: 100vh;
  padding: 20px;
  padding-bottom: 120px;
}

.header {
  text-align: center;
  padding: 40px 0;
  
  .title {
    display: block;
    font-size: 24px;
    font-weight: 600;
    color: #323233;
    margin-bottom: 12px;
  }
  
  .subtitle {
    display: block;
    font-size: 14px;
    color: #969799;
  }
}

.section {
  margin-bottom: 24px;
  
  .section-title {
    display: block;
    font-size: 18px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 16px;
    padding-left: 8px;
    border-left: 3px solid #1989fa;
  }
}

.component-group {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  
  .group-title {
    display: block;
    font-size: 14px;
    color: #646566;
    margin-bottom: 12px;
  }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  button {
    font-size: 14px;
    padding: 0 16px;
    height: 36px;
    line-height: 36px;
  }
}

.badge-target {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #646566;
}

.popup-content {
  padding: 20px;
  text-align: center;
  
  text {
    display: block;
    margin-bottom: 16px;
    color: #323233;
  }
  
  button {
    width: 100%;
  }
}

.footer {
  text-align: center;
  padding: 40px 0;
  
  .footer-text {
    display: block;
    font-size: 12px;
    color: #969799;
    margin-bottom: 4px;
  }
}
</style>
