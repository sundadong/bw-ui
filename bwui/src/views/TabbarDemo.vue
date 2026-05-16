<template>
  <demo-layout title="Tabbar 底部标签栏">
    <div class="demo-block">
      <div class="demo-title">基础用法</div>
      <div class="demo-row">
        <div class="tabbar-demo">
          <bw-tabbar v-model="active1">
            <bw-tabbar-item name="home" icon="home">
              首页
            </bw-tabbar-item>
            <bw-tabbar-item name="search" icon="search">
              搜索
            </bw-tabbar-item>
            <bw-tabbar-item name="cart" icon="cart">
              购物车
            </bw-tabbar-item>
            <bw-tabbar-item name="user" icon="user">
              我的
            </bw-tabbar-item>
          </bw-tabbar>
        </div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">徽标提示</div>
      <div class="demo-row">
        <div class="tabbar-demo">
          <bw-tabbar v-model="active2">
            <bw-tabbar-item name="home" icon="home" dot>
              首页
            </bw-tabbar-item>
            <bw-tabbar-item name="search" icon="search" badge="5">
              搜索
            </bw-tabbar-item>
            <bw-tabbar-item name="cart" icon="cart" badge="99+">
              购物车
            </bw-tabbar-item>
            <bw-tabbar-item name="user" icon="user">
              我的
            </bw-tabbar-item>
          </bw-tabbar>
        </div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义颜色</div>
      <div class="demo-row">
        <div class="tabbar-demo">
          <bw-tabbar v-model="active3" active-color="#ee0a24" inactive-color="#999">
            <bw-tabbar-item name="home" icon="home">
              首页
            </bw-tabbar-item>
            <bw-tabbar-item name="search" icon="search">
              搜索
            </bw-tabbar-item>
            <bw-tabbar-item name="cart" icon="cart">
              购物车
            </bw-tabbar-item>
            <bw-tabbar-item name="user" icon="user">
              我的
            </bw-tabbar-item>
          </bw-tabbar>
        </div>
      </div>
    </div>

    <div class="demo-block">
      <div class="demo-title">自定义图标</div>
      <div class="demo-row">
        <div class="tabbar-demo">
          <bw-tabbar v-model="active4">
            <bw-tabbar-item name="home" icon="home">
              首页
            </bw-tabbar-item>
            <bw-tabbar-item name="message" icon="success">
              消息
            </bw-tabbar-item>
            <bw-tabbar-item name="my">
              <template #icon>
                <span style="font-size: 22px">★</span>
              </template>
              我的
            </bw-tabbar-item>
          </bw-tabbar>
        </div>
      </div>
    </div>
  </demo-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DemoLayout from './DemoLayout.vue'
import BwTabbar from '../components/tabbar/index.vue'
import BwTabbarItem from '../components/tabbar-item/index.vue'

const active1 = ref('home')
const active2 = ref('home')
const active3 = ref('home')
const active4 = ref('home')
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

  .tabbar-demo {
    width: 100%;
    position: relative;
    height: 50px;
    background-color: #f7f8fa;
  }
}
</style>