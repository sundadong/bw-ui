<template>
  <demo-layout title="Swipe 轮播">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <bw-swipe :autoplay="3000" style="height: 160px;">
        <bw-swipe-item style="background-color: #39a9ed; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">1</bw-swipe-item>
        <bw-swipe-item style="background-color: #66c6f2; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">2</bw-swipe-item>
        <bw-swipe-item style="background-color: #1989fa; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">3</bw-swipe-item>
      </bw-swipe>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义指示器颜色</div>
      <bw-swipe :autoplay="3000" indicator-color="#fff" indicator-active-color="#ee0a24" style="height: 160px;">
        <bw-swipe-item style="background-color: #39a9ed; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">1</bw-swipe-item>
        <bw-swipe-item style="background-color: #66c6f2; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">2</bw-swipe-item>
        <bw-swipe-item style="background-color: #1989fa; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">3</bw-swipe-item>
      </bw-swipe>
    </div>

    <div class="demo-block">
      <div class="demo-title">隐藏指示器</div>
      <bw-swipe :autoplay="3000" :show-indicators="false" style="height: 160px;">
        <bw-swipe-item style="background-color: #39a9ed; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">1</bw-swipe-item>
        <bw-swipe-item style="background-color: #66c6f2; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">2</bw-swipe-item>
      </bw-swipe>
    </div>

    <div class="demo-block">
      <div class="demo-title">取消循环播放</div>
      <bw-swipe :autoplay="3000" :loop="false" style="height: 160px;">
        <bw-swipe-item style="background-color: #39a9ed; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">1</bw-swipe-item>
        <bw-swipe-item style="background-color: #66c6f2; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">2</bw-swipe-item>
        <bw-swipe-item style="background-color: #1989fa; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">3</bw-swipe-item>
      </bw-swipe>
    </div>

    <div class="demo-block">
      <div class="demo-title">单张图片</div>
      <bw-swipe style="height: 160px;">
        <bw-swipe-item style="background-color: #39a9ed; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px;">1</bw-swipe-item>
      </bw-swipe>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import DemoLayout from './DemoLayout.vue'
import BwSwipe from '../components/swipe/index.vue'
import BwSwipeItem from '../components/swipe-item/index.vue'
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