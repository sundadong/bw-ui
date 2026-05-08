<template>
  <view class="page">
    <view class="header">
      <view class="header__logo">BWUI</view>
      <view class="header__subtitle">uni-app 多端组件库</view>
    </view>
    
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navigateTo(item.path)">
        <view class="nav-item__icon" :style="{ backgroundColor: item.color }">
          <text :class="`bw-icon bw-icon-${item.icon}`"></text>
        </view>
        <view class="nav-item__content">
          <view class="nav-item__title">{{ item.title }}</view>
          <view class="nav-item__desc">{{ item.desc }}</view>
        </view>
        <text class="nav-item__arrow bw-icon bw-icon-chevron-right"></text>
      </view>
    </view>

    <view class="footer">
      <view class="footer__text">基于 Vue 3 + TypeScript</view>
      <view class="footer__text">支持微信/支付宝/H5/App</view>
    </view>
  </view>
</template>

<script setup lang="ts">
const navList = [
  { title: '基础组件', desc: 'Button 图标', icon: 'file', color: '#1989fa', path: '/pages/basic/button' },
  { title: '表单组件', desc: 'Input Textarea Stepper', icon: 'edit', color: '#07c160', path: '/pages/form/input' },
  { title: '反馈组件', desc: 'Loading Notify Popup', icon: 'alert', color: '#ff976a', path: '/pages/feedback/loading' },
  { title: '布局组件', desc: 'Cell Layout', icon: 'package', color: '#909399', path: '/pages/layout/cell' },
  { title: '导航组件', desc: 'Tabs', icon: 'location', color: '#ee0a24', path: '/pages/nav/tabs' },
  { title: '视图组件', desc: 'Tag Badge Empty 等', icon: 'check-circle', color: '#1989fa', path: '/pages/view/alert' },
];

const navigateTo = (path: string) => {
  uni.navigateTo({ url: path });
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0 40px;
  background: linear-gradient(135deg, #1989fa 0%, #096dd9 100%);

  &__logo {
    font-size: 40px;
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 12px;
  }

  &__subtitle {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
  }
}

.nav-list {
  padding: 16px;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 10px;
    margin-right: 12px;
    color: #ffffff;
    font-size: 20px;
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: #323233;
    margin-bottom: 4px;
  }

  &__desc {
    font-size: 12px;
    color: #969799;
  }

  &__arrow {
    font-size: 16px;
    color: #c8c9cc;
  }
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  color: #969799;
  font-size: 12px;

  &__text {
    margin-bottom: 4px;
  }
}
</style>
