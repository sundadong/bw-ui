<template>
  <view class="home">
    <view class="home__header">
      <view class="home__logo">BW</view>
      <view class="home__title">BWUI</view>
      <view class="home__subtitle">基于 uni-app 的多端组件库</view>
      <view class="home__tags">
        <text class="tag">Vue 3</text>
        <text class="tag">TypeScript</text>
        <text class="tag">SCSS</text>
      </view>
    </view>
    <view class="home__section">
      <view class="home__section-title">组件分类</view>
      <view class="home__grid">
        <view class="home__card" @tap="goPage('/pages/basic/index')"><view class="home__card-icon">🔘</view><view class="home__card-name">基础组件</view><view class="home__card-desc">Button / Icon / Cell</view></view>
        <view class="home__card" @tap="goPage('/pages/form/index')"><view class="home__card-icon">📝</view><view class="home__card-name">表单组件</view><view class="home__card-desc">Input / Checkbox / Radio</view></view>
        <view class="home__card" @tap="goPage('/pages/feedback/index')"><view class="home__card-icon">🔔</view><view class="home__card-name">反馈组件</view><view class="home__card-desc">Dialog / ActionSheet</view></view>
        <view class="home__card" @tap="goPage('/pages/layout/index')"><view class="home__card-icon">📐</view><view class="home__card-name">布局组件</view><view class="home__card-desc">Layout / Space / SafeArea</view></view>
        <view class="home__card" @tap="goPage('/pages/nav/index')"><view class="home__card-icon">📑</view><view class="home__card-name">导航组件</view><view class="home__card-desc">Tabs / NavBar / Grid</view></view>
        <view class="home__card" @tap="goPage('/pages/view/index')"><view class="home__card-icon">🎨</view><view class="home__card-name">视图组件</view><view class="home__card-desc">Alert / Card / Skeleton</view></view>
      </view>
    </view>
    <view class="home__stats">
      <view class="home__stat"><text class="home__stat-num">50</text><text class="home__stat-label">精选组件</text></view>
      <view class="home__stat"><text class="home__stat-num">4</text><text class="home__stat-label">适配平台</text></view>
      <view class="home__stat"><text class="home__stat-num">Vue3</text><text class="home__stat-label">最新语法</text></view>
    </view>
  </view>
</template>

<script setup>
const goPage = (url) => { uni.navigateTo({ url }); };
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  background: #f7f8fa;
  &__header { background: linear-gradient(135deg, #1989fa, #4a90e2); color: #fff; padding: 40px 20px; text-align: center; }
  &__logo { width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 20px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: bold; }
  &__title { font-size: 32px; font-weight: 600; margin-bottom: 8px; }
  &__subtitle { font-size: 14px; opacity: 0.9; margin-bottom: 16px; }
  &__tags { display: flex; justify-content: center; gap: 8px; .tag { padding: 4px 12px; background: rgba(255,255,255,0.2); border-radius: 12px; font-size: 12px; } }
  &__section { padding: 20px; }
  &__section-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #323233; }
  &__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
  &__card { background: #fff; border-radius: 8px; padding: 20px; text-align: center; transition: transform 0.2s; &:active { transform: scale(0.98); } }
  &__card-icon { font-size: 32px; margin-bottom: 8px; }
  &__card-name { font-size: 14px; font-weight: 600; color: #323233; margin-bottom: 4px; }
  &__card-desc { font-size: 12px; color: #969799; }
  &__stats { display: flex; justify-content: space-around; padding: 24px 20px; background: #fff; margin: 0 20px 20px; border-radius: 8px; }
  &__stat { text-align: center; }
  &__stat-num { display: block; font-size: 24px; font-weight: 600; color: #1989fa; margin-bottom: 4px; }
  &__stat-label { font-size: 12px; color: #969799; }
}
</style>
